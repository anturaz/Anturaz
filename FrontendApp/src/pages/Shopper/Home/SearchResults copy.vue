<template>
  <div class="q-pa-lg row">
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Search" icon="search" />
      </q-breadcrumbs>
      <q-separator />
    </div>

    <div class="col-md-2 q-pt-md">
      <SearchQuery
        :payment_terms="payment_terms"
        :price="price"
        :rating="rating"
        :queryItems="queryItems"
        :getSearchQuery="getSearchQuery"
        :categories="categories"
        @update:selectedCategories="childrenCategories"
      />
    </div>
    <div class="col-md-10 q-pt-md q-pl-md">
      <div class="row">
        <q-card
          flat
          bordered
          class="q-ma-sm"
          v-for="item in sortedData"
          :key="item._id"
          :class="{ 'bg-yellow-1': item.subscribe == true }"
        >
          <q-card-section style="height: 180px; width: 200px">
            <q-img :ratio="1" :src="item.photos[0]" />
          </q-card-section>
          <q-card-section style="height: 75px; width: 200px">
            <div class="text-title text-bold" v-if="'product_name' in item">
              {{ item.product_name }}
            </div>
            <div class="text-title text-bold" v-if="'service_name' in item">
              {{ item.service_name }}
            </div>
            <div>
              <font class="text-bold text-primary">{{
                item.sale_price != ""
                  ? $prettyMoney(item.sale_price)
                  : $prettyMoney(item.regular_price)
              }}</font>
              <font class="text-grey q-pl-sm" v-if="item.sale_price != ''">
                <strike>{{ $prettyMoney(item.regular_price) }}</strike>
              </font>
            </div>
            <div class="row">
              <div>Store: &nbsp;</div>
              <div class="text-primary" style="cursor: pointer">
                Gilbert Shop
              </div>
            </div>
          </q-card-section>
          <q-card-section style="height: 55px; width: 200px" align="right">
            <q-btn
              v-if="'product_name' in item"
              color="primary"
              label="View >"
              @click="$router.replace({ path: `/ProductDetails/${item._id}` })"
              unelevated
            />
            <q-btn
              v-if="'service_name' in item"
              color="primary"
              label="View >"
              @click="$router.replace({ path: `/ServiceDetails/${item._id}` })"
              unelevated
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { watch } from "fs";
import SearchQuery from "../../../components/searchQuery.vue";

export default {
  components: {
    SearchQuery
  },
  data() {
    return {
      payment_terms: {
        cash_on_delivery: true,
        cash_on_fulfillment: true,
        layaway: true
      },
      price: {
        min: 1,
        max: 99999
      },
      rating: {
        five: false,
        four: false,
        three: true,
        two: false,
        one: false
      },
      data: [],
      categories: [],
      selCategory: null
    };
  },

  methods: {
    getCategories: async function() {
      try {
        const response = await this.$dbCon.service("categories").find({
          query: {
            $sort: {
              name: 1
            }
          }
        });
        this.categories = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    applyFilter: async function() {
      try {
        const criteria = {
          paymentTerms: {
            cashOnDelivery: this.payment_terms.cash_on_delivery,
            cashOnFulfillment: this.payment_terms.cash_on_fulfillment
          },
          priceRange: {
            min: this.price.min,
            max: this.price.max
          },
          rating: this.ratingModel
        };

        const storeCriteria = {
          categories: this.selCategory.category_name
        };

        const createPriceQuery = (min, max) => ({
          $gte: min !== "" ? parseInt(min) : 0,
          $lte: max !== "" ? parseInt(max) : Number.MAX_SAFE_INTEGER
        });

        // const createCategoryQuery = category => ({
        //   categories: category
        // });
        const [resStore] = await Promise.all([
          this.$dbCon.service("store-fuel-delivery").find({
            query: {
              fuel_delivery: {
                $elemMatch: { province: this.$route.query.location }
              }
            }
          })
        ]);

        const storeIds = resStore.data.map(item => item.store_id);
        // const createCategoryQuery = category => ({
        //   category: category
        // });

        const createStoreQuery = store_id => ({
          store_id: { $in: store_id }
        });

        const createCategoryQuery = category => ({
          category: category
        });

        const createQuery = (min, max) => ({
          deleted: false,
          $or: [
            { regular_price: createPriceQuery(min, max) },
            { sale_price: createPriceQuery(min, max) }
          ]

          // ...createCategoryQuery(category)
          // store_id: { $in: storeIds }
        });

        const queryProduct = createQuery(this.price.min, this.price.max);

        const queryServices = createQuery(this.price.min, this.price.max);

        queryProduct.cod = criteria.paymentTerms.cashOnDelivery;
        queryServices.cof = criteria.paymentTerms.cashOnFulfillment;

        if (this.selCategory) {
          queryProduct.category = this.selCategory.category_name;
          queryServices.category = this.selCategory.category_name;
        }
        // console.log(this.$route.query.location);
        if (this.$route.query.location != "All") {
          queryProduct.store_id = { $in: storeIds };
          queryServices.store_id = { $in: storeIds };
        }

        if (
          this.$route.query.query.trim() != "" &&
          this.$route.query.query != undefined
        ) {
          queryProduct["$search"] = this.$route.query.query;
        }
        // const queryString = new URLSearchParams(queryProduct).toString();

        const [resServices, resProducts] = await Promise.all([
          this.$dbCon.service("services").find({ query: queryServices }),
          this.$dbCon.service("products").find({ query: queryProduct })
        ]);

        // console.log("services", queryServices);

        this.data = [...resServices.data, ...resProducts.data];
      } catch (e) {
        this.err = e;
      }
    },

    categoryFilter: async function(category) {
      this.$q.loading.show();

      try {
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
        }, 1000);
      }
    },
    tryAlert() {
      this.$q.dialog({
        title: "Alert",
        message: "This is a test alert",
        ok: "OK"
      });
    },

    childrenCategories: function(category) {
      this.selCategory = category;
      // console.log(category);
      // this.categoryFilter(category);
      this.applyFilter();
      // this.getSearchQuery();
      // return this.categories.filter(item => item.parent_id == category._id);
    },

    storeAdvetisment: async function() {
      // RVBLxOOMYDFkg5Rq
      // try {
      //   const res = await this.$dbCon.service("store-advertisment").find({
      //     query: {
      //       store_id: this.store._id
      //     }
      //   });
      //   let currentDate = new Date().toISOString().split("T")[0];
      //   let filteredData = res.data[0].subscriptions.filter(item => {
      //     console.log(item.date_end);
      //     const subscriptionEndDate = new Date(item.date_end)
      //       .toISOString()
      //       .split("T")[0];
      //     return subscriptionEndDate >= currentDate;
      //   });
      //   this.advertisement = filteredData;
      // } catch (e) {}
    },

    getSearchQuery: async function() {
      this.data = [];
      var query = {};

      if (this.$route.query.location) {
        if (
          this.$route.query.query.trim() != "" &&
          this.$route.query.query != undefined
        ) {
          query["$search"] = this.$route.query.query;
        }
      }
      try {
        const { data } = await this.$axios({
          method: "GET",
          url: `${this.$appLink}/search-all?search=${this.$route.query.query}`
        });
        this.data.push(...data.products);

        // console.log(data.products);
      } catch (e) {
        console.log(e);
      }

      // await this.$axios({
      //   method: "GET",
      //   url: this.$appLink + "/search-all?search=" + this.$route.query.query
      // });

      // console.log(
      //   "sad",
      //   `${this.$appLink}/search-all?search="${this.$route.query.query}"`
      // );
    },

    queryItems: async function() {
      this.$q.loading.show();
      this.data = [];
      var query = {};
      if (this.$route.query.location) {
        if (
          this.$route.query.query.trim() != "" &&
          this.$route.query.query != undefined
        ) {
          query["$search"] = this.$route.query.query;
        }
      }

      await this.$dbCon
        .service("services")
        .find({
          query: query
        })
        .then(results => {
          this.data.push(...results.data);
        });
      // await this.$dbCon
      //   .service("products")
      //   .find({
      //     query: query
      //   })
      //   .then(results => {
      //     this.data.push(...results.data);
      //   });
      this.$q.loading.hide();
    }
  },
  mounted() {
    this.queryItems();
    this.getSearchQuery();
    this.getCategories();
  },

  computed: {
    sortedData() {
      return this.data.slice().sort((a, b) => {
        if (a.subscribe && !b.subscribe) return -1;
        if (!a.subscribe && b.subscribe) return 1;
        return 0;
      });
    }
  },
  watch: {
    "payment_terms.cash_on_delivery": function() {
      this.applyFilter();
    },
    "payment_terms.cash_on_fulfillment": function() {
      this.applyFilter();
    },
    "payment_terms.layaway": function() {
      this.applyFilter();
    },
    selCategories: function() {
      // this.queryItems();
    },
    "$route.query": function() {
      this.applyFilter();
      // this.getSearchQuery();
    }
  }
};
</script>
