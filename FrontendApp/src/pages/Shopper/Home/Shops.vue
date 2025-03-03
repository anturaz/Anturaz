<template>
  <div class="q-pa-lg row">
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Shops" icon="search" />
      </q-breadcrumbs>
      <q-separator />
    </div>

    <div class="col-12 q-pt-md">
      <!-- <div class="row justify-center q-pb-md">
        <div class="col-6 col-md-6 ">
          <q-input
            v-model="search"
            label="Input store name"
            @input="debouncedSearch"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon name="search" size="30px" />
              </q-avatar>
            </template>
          </q-input>
        </div>
      </div> -->

      <div class="row justify-center q-pb-md">
        <div class="col-6 col-md-6 col-lg-6 col-xs-12">
          <div class="row item-right ">
            <q-input
              v-model="search"
              label="Search store name"
              dense
              class="col-7 col-xs-12 col-lg-8"
              @input="debouncedSearch"
            />
            <q-select
              v-model="selCategory"
              :options="categoryOptions"
              label="Filter Store by Categories"
              option-label="category_name"
              option-value="category_name"
              dense
              class="col-4 col-xs-12 col-lg-4"
              :class="$q.screen.lt.md ? '' : 'q-pl-sm'"
            />
            <!-- <q-btn flat color="grey" icon="search" class="col-1 col-xs-1" /> -->
          </div>
        </div>
      </div>

      <div class="row justify-center q-gutter-md" v-if="!$q.screen.lt.md">
        <div
          v-for="store in filteredStores"
          :key="store._id"
          :class="$q.screen.lt.md ? 'q-col-6' : 'q-col-2'"
        >
          <q-card
            flat
            bordered
            class="q-ma-xs cursor-pointer"
            @click="routeStore(store._id)"
          >
            <q-card-section
              class="q-pa-xs"
              style="height: 180px; width: 200px; "
            >
              <div class="row justify-center">
                <q-icon
                  v-if="!store.logo"
                  name="store"
                  color="grey"
                  size="100px"
                  style="height: 180px; width: 200px;  "
                />
                <q-img v-else :src="store.logo" :ratio="1" />
              </div>
            </q-card-section>

            <q-card-section
              class="q-pa-xs q-mt-lg text-center"
              style="height: 25px; width: 200px"
            >
              <div class="text-title text-bold q-mt-md">
                <p
                  class="q-pr-md text-primary text-body1"
                  style="margin: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                >
                  {{ store.store_name }}
                </p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div v-else class="q-pa-md">
        <div
          class="col-md-10 col-xs-12 q-pt-md "
          :class="$q.screen.lt.md ? '' : 'q-pl-md'"
        >
          <div class="row text-dark rounded-borders q-col-gutter-lg">
            <div class="col-12 q-pb-lg">
              <div class="row q-col-gutter-sm ">
                <div
                  class="col-sm-6 col-md-3 q-pb-md "
                  :class="sortedData.length === 1 ? 'col-12' : 'col-6'"
                  v-for="store in filteredStores"
                  :key="store._id"
                >
                  <q-card flat bordered @click="routeStore(store._id)">
                    <q-card-section
                      class="q-pa-none q-pb-sm row justify-center"
                    >
                      <q-img
                        v-if="store.logo"
                        style="height: 140px;"
                        :ratio="1"
                        :src="store.logo"
                      />
                      <q-icon
                        size="140px"
                        color="grey"
                        :ratio="1"
                        name="store"
                        :style="
                          filteredStores.length === 1
                            ? 'transform: translateX(50%);'
                            : ''
                        "
                        v-else
                      />
                    </q-card-section>
                    <q-card-section class="q-pa-xs q-mt-lg text-center">
                      <div class="text-title text-bold q-mt-md">
                        <p
                          class="q-pr-md text-primary text-body1"
                          style="max-width: 100%; margin: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                        >
                          {{ store.store_name }}
                        </p>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStores, findStore } from "../../../api/services/storeServices";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      stores: [],
      search: "",
      filteredStores: [],
      categoryOptions: [],
      selCategory: { category_name: "All" }
    };
  },
  computed: {
    sortedData() {
      return this.filteredStores.sort((a, b) => b.subscribe - a.subscribe);
    }
  },
  watch: {
    selCategory() {
      this.filterStores();
    }
  },
  methods: {
    getCategories: async function() {
      try {
        const response = await this.$dbCon.service("categories").find({
          query: {
            $sort: {
              category_name: 1
            }
          }
        });
        this.categoryOptions = [{ category_name: "All" }, ...response.data];
      } catch (error) {
        console.log(error);
      }
    },
    routeStore(id) {
      this.$router.push({
        path: `/StoreDetails?store=${id}`
      });
    },
    async getAllStores() {
      const resStores = await getStores();
      this.stores = resStores.data || resStores;
      this.filteredStores = this.stores;
    },
    filterStores() {
      this.filteredStores = this.stores.filter(store => {
        const matchesSearch = store.store_name
          .toLowerCase()
          .includes(this.search.toLowerCase());

        const matchesCategory =
          !this.selCategory || // If no category is selected, show all
          this.selCategory.category_name === "All" || // Show all if "All" is selected
          store.categories.includes(this.selCategory.category_name);

        return matchesSearch && matchesCategory;
      });
    },
    debouncedSearch: debounce(function() {
      this.filterStores();
    }, 300),
    debouncedSearch: debounce(function() {
      this.filteredStores = this.stores.filter(store =>
        store.store_name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.filterStores();
    }, 300)
  },
  mounted() {
    this.getAllStores();
    this.getCategories();
  }
};
</script>
