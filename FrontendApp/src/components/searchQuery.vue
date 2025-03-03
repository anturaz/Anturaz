<template>
  <div>
    <div v-if="!$q.screen.lt.md">
      <p class="text-subtitle1">
        Payment Terms
      </p>
      <div class="q-pb-md">
        <q-checkbox
          v-model="payment_terms.cash_on_delivery"
          label="Cash on Delivery"
          ref="paymen_terms_cash"
        />
        <br />
        <q-checkbox
          v-model="payment_terms.cash_on_fulfillment"
          label="Cash on Fulfillment"
        />

        <br />
        <!-- <q-checkbox v-model="payment_terms.layaway" label="Layaway" /> -->
      </div>
      <q-separator />
      <br />
      <p class="text-subtitle1">Price</p>
      <div class="row">
        <q-input
          class="col-5"
          type="number"
          square
          outlined
          v-model="price.min"
          label="Min"
          dense
        />
        <q-input
          class="col-5"
          type="number"
          square
          outlined
          v-model="price.max"
          label="Max"
          dense
        />
        <q-btn
          color="primary"
          style="border-radius: 0px"
          @click="$parent.applyFilter()"
          class="col-2"
          label=">"
          unelevated
        />
      </div>
      <br />

      <q-separator />
      <br />
      <!-- {{ $parent.getData }} -->
      <p class="text-subtitle1">Rating</p>
      <!-- <q-checkbox v-model="rating.five" /> -->
      <q-rating
        v-model="localRating"
        size="2em"
        :max="5"
        :min="0"
        color="primary"
        @input="updateRating"
      />
      <br />
      <br />

      <q-separator />

      <br />
      <!-- {{ categories }} -->
      <p class="text-subtitle1">Categories</p>
      <!-- <div v-for="category in categories" :key="category._id">
      <q-checkbox
        v-model="localSelCategories"
        :label="category.category_name"
        :val="category._id"
        checked-icon="swipe_left"
        unchecked-icon="swipe_right"
        keep-color
        @input="emitSelectedCategories"
      />
    </div> -->

      <div class="q-gutter-md row">
        <q-select
          v-model="inputCat"
          use-input
          input-debounce="0"
          label="Input Category"
          option-label="category_name"
          option-value="category_name"
          :options="filteredCategoriesWithAll"
          @filter="filterFn"
          style="width: 250px"
          @input="emitSelectedCategories"
        />
      </div>

      <!-- <br />
    <q-checkbox v-model="rating.four" />
    <q-rating readonly :value="4" size="2em" :max="5" color="primary" />
    <br />
    <q-checkbox v-model="rating.three" />
    <q-rating readonly :value="3" size="2em" :max="5" color="primary" />
    <br />
    <q-checkbox v-model="rating.two" />
    <q-rating readonly :value="2" size="2em" :max="5" color="primary" />
    <br />
    <q-checkbox v-model="rating.one" />
    <q-rating readonly :value="1" size="2em" :max="5" color="primary" /> -->
    </div>

    <div class="row justify-between" v-else>
      <div class="col-7 ">
        <q-input
          v-model="localSearch"
          @input="updateSearch"
          label="Search"
          rounded
          outlined
          size="sm"
          dense
        />
      </div>
      <div class="col-5 text-right">
        <q-btn
          label="Filter"
          :icon="showFilter ? 'remove' : 'add'"
          color="primary"
          size="md"
          flat
          @click="toggleFilter"
        />
      </div>
    </div>
    <div v-if="showFilter && $q.screen.lt.md" class="row q-mt-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Filter Options</div>
          </q-card-section>
          <q-card-section>
            <!-- Add your filter inputs or options here -->
            <p class="text-subtitle1">
              Payment Terms
            </p>
            <div class="row items-center q-pb-md">
              <div class="col-auto">
                <q-checkbox
                  v-model="payment_terms.cash_on_delivery"
                  label="Cash on Delivery"
                  ref="paymen_terms_cash"
                />
              </div>
              <div class="col-auto">
                <q-checkbox
                  v-model="payment_terms.cash_on_fulfillment"
                  label="Cash on Fulfillment"
                />
              </div>
            </div>

            <q-separator />
            <br />
            <p class="text-subtitle1">Price</p>
            <div class="row">
              <q-input
                class="col-5"
                type="number"
                square
                outlined
                v-model="price.min"
                label="Min"
                dense
              />
              <q-input
                class="col-5"
                type="number"
                square
                outlined
                v-model="price.max"
                label="Max"
                dense
              />
              <q-btn
                color="primary"
                style="border-radius: 0px"
                @click="$parent.applyFilter()"
                class="col-2"
                label=">"
                unelevated
              />
            </div>
            <br />
            <q-separator />
            <br />
            <p class="text-subtitle1">Categories</p>

            <div class="q-gutter-md row">
              <q-select
                v-model="inputCat"
                use-input
                input-debounce="0"
                label="Input Category"
                option-label="category_name"
                option-value="category_name"
                style="width: 100%;"
                :options="filteredCategoriesWithAll"
                @filter="filterFn"
                @input="emitSelectedCategories"
              />
            </div>
            <q-separator />

            <div v-if="$q.screen.lt.md">
              <br />
              <p class="text-subtitle1">Location</p>

              <div class="q-gutter-md row">
                <q-select
                  input-debounce="0"
                  v-model="mobileLocation"
                  :options="$provinceList"
                  label="Select Location"
                  use-input
                  style="width: 100%;"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "payment_terms",
    "price",
    "ratingModel",
    "queryItems",
    "getSearchQuery",
    "categories",
    "selCategories",
    "search"
  ],

  data() {
    return {
      localRating: this.ratingModel,
      // categories: {},
      selectedCategories: [],
      selection: [],
      filteredCategories: [],
      localSelCategories: this.selCategories, // Initialize from parent
      inputCat: null,
      showFilter: false,
      localSearch: this.search,
      mobileLocation: ""
    };
  },
  computed: {
    filteredCategoriesWithAll() {
      return [{ category_name: "All" }, ...this.filteredCategories];
    }
  },
  watch: {
    search: {
      handler: function(newVal, oldVal) {
        this.localSearch = newVal;
      }
    },
    mobileLocation: {
      handler(newVal) {
        this.updateQueryParam("location", newVal);
      },
      immediate: true
    },
    "$route.query": {
      handler(newQuery) {
        if (newQuery.query) {
          this.localSearch = newQuery.query; // Update localSearch with the query value
          this.updateSearch(); // Emit the updated value
        }
      },
      immediate: true // Ensures the watcher runs immediately when the component is mounted
    }
    // localSearch: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal);
    //   },
    //   deep: true
    // }
  },
  methods: {
    updateQueryParam(param, value) {
      const query = { ...this.$route.query }; // Clone existing query params
      if (this.$q.screen.lt.md) {
        if (value) {
          query[param] = value; // Update or add the parameter
        } else {
          delete query[param]; // Remove the parameter if empty
        }
        this.$router.replace({ query }); // Update the URL without reloading
      }
    },
    updateSearch() {
      this.$emit("update:search", this.localSearch);
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    emitSelectedCategories() {
      this.$emit("update:selectedCategories", this.inputCat);
    },
    updateRating(val) {
      this.$emit("update:ratingModel", val);
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.filteredCategories = this.categories;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.filteredCategories = this.categories.filter(v =>
          v.category_name.toLowerCase().includes(needle)
        );
      });
    }

    // getCategories: async function() {
    //   try {
    //     const response = await this.$dbCon.service("categories").find({});
    //     this.categories = response.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },

  mounted() {
    if (this.$route.query.category) {
      this.inputCat = { category_name: this.$route.query.category };
    }
    // this.getCategories();
    // console.log(this.$parent.getData);
    // this.$parent.getData ? this.$parent.getData() : $parent.queryItems();
  }
};
</script>
