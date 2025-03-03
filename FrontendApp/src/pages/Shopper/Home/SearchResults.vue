<template>
  <div class="q-pa-lg row">
    <div class="col-12 q-pb-xl">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Search" icon="search" />
      </q-breadcrumbs>
      <q-separator />
    </div>

    <div class="col-md-2 q-pt-md" v-if="!$q.screen.lt.md">
      <SearchQuery
        :payment_terms="payment_terms"
        :price="price"
        :rating="rating"
        :queryItems="queryItems"
        :getSearchQuery="getSearchQuery"
        :categories="categories"
        @update:selectedCategories="childrenCategories"
        :ratingModel.sync="ratingModel"
      />
    </div>

    <div class="col-12" v-else>
      <br />
      <SearchQuery
        :payment_terms="payment_terms"
        :price="price"
        :rating="rating"
        :ratingModel.sync="ratingModel"
        :queryItems="queryItems"
        :getSearchQuery="getSearchQuery"
        :categories="categories"
        :search="search"
        @update:search="updateSearch"
        @update:selectedCategories="childrenCategories"
      />
    </div>
    <div
      class="col-md-10 q-pt-md"
      :class="$q.screen.lt.md ? 'col-md-12 col-xs-12' : 'q-pl-md'"
    >
      <div class="row">
        <p class="text-h6 ">
          Search Result of
          {{
            this.$route.query.query.trim() == ""
              ? `"All"`
              : `"${this.$route.query.query}"`
          }}
        </p>
      </div>
      <div
        class="col-md-12 col-xs-12 q-pt-md q-pb-md"
        :class="$q.screen.lt.md ? '' : 'q-pl-md'"
      >
        <div class="row" v-if="!$q.screen.lt.md">
          <q-card
            flat
            bordered
            class="q-ma-xs"
            v-for="item in sortedData"
            :key="item._id"
            @click="onHandleCard(item._id, item)"
            :class="{ 'bg-yellow-1': item.subscribe == true }"
          >
            <q-card-section class="q-pa-xs" style="height: 180px; width: 200px">
              <q-img :ratio="1" :src="item.photos[0]" />
            </q-card-section>
            <q-card-section class="q-pa-xs" style="height: 65px; width: 200px">
              <div
                class="text-title text-bold  q-mt-md"
                v-if="'product_name' in item"
              >
                <p
                  style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                  class="ellipsis"
                >
                  {{ item.product_name }}
                </p>
              </div>
              <div class="text-title text-bold" v-if="'service_name' in item">
                <p
                  class="ellipsis q-mt-md"
                  style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100% ;"
                >
                  {{ item.service_name }}
                </p>
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
                <div
                  class="text-grey"
                  style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                >
                  <a
                    :href="'#/StoreDetails?store=' + item.store_id"
                    target="_blank"
                    style="text-decoration: none; color: gray;"
                  >
                    <p
                      style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                    >
                      {{ item.store_name }}
                    </p>
                  </a>
                </div>
              </div>
            </q-card-section>

            <q-card-section
              class="q-pa-xs"
              style="height: 50px; width: 200px"
              align="right"
            >
              <q-btn
                v-if="'product_name' in item"
                color="primary"
                class="full-width  q-mt-sm"
                label="View"
                @click="
                  $router.replace({ path: `/ProductDetails/${item._id}` })
                "
                unelevated
              />
              <q-btn
                v-if="'service_name' in item"
                color="primary"
                class="full-width  q-mt-sm"
                label="View"
                @click="
                  $router.replace({ path: `/ServiceDetails/${item._id}` })
                "
                unelevated
              />
            </q-card-section>
          </q-card>
        </div>

        <div v-else>
          <div class="row text-dark rounded-borders q-col-gutter-lg">
            <div class="col-12 q-pb-lg">
              <div class="row q-col-gutter-sm">
                <!-- Loop through sortedData -->
                <div
                  class="col-6 col-sm-6 col-md-3 q-pb-md"
                  :class="sortedData.length === 1 ? 'col-12' : 'col-6'"
                  v-for="item in sortedData"
                  :key="item._id"
                >
                  <q-card
                    flat
                    bordered
                    class=""
                    :class="{ 'bg-yellow-1': item.subscribe == true }"
                  >
                    <q-card-section class="q-pa-none q-pb-sm">
                      <q-img :ratio="1" :src="item.photos[0]" />
                    </q-card-section>
                    <q-card-section class="q-pa-xs ">
                      <div
                        class="text-title text-bold"
                        v-if="'product_name' in item"
                      >
                        <p
                          style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                          class="ellipsis"
                        >
                          {{ item.product_name }}
                        </p>
                      </div>
                      <div
                        class="text-title text-bold"
                        v-if="'service_name' in item"
                      >
                        <p
                          class="ellipsis "
                          style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                        >
                          {{ item.service_name }}
                        </p>
                      </div>
                      <div>
                        <font class="text-bold text-primary">{{
                          item.sale_price != ""
                            ? $prettyMoney(item.sale_price)
                            : $prettyMoney(item.regular_price)
                        }}</font>
                        <br />
                        <font class="text-grey " v-if="item.sale_price != ''">
                          <strike>{{
                            $prettyMoney(item.regular_price)
                          }}</strike>
                        </font>
                        <font v-else class="text-grey ">
                          <strike>-</strike>
                        </font>
                      </div>
                      <div class="row">
                        <div
                          class="text-grey"
                          style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                        >
                          <a
                            :href="'#/StoreDetails?store=' + item.store_id"
                            target="_blank"
                            style="text-decoration: none; color: gray;"
                          >
                            <p
                              style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                            >
                              {{ item.store_name }}
                            </p>
                          </a>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-pa-xs ">
                      <q-btn
                        v-if="'product_name' in item"
                        color="primary"
                        rounded
                        size="sm"
                        style="width: 100%;"
                        @click="
                          $router.replace({
                            path: `/ProductDetails/${item._id}`
                          })
                        "
                        unelevated
                      >
                        <span class="text-body1"> View </span>
                      </q-btn>
                      <q-btn
                        v-if="'service_name' in item"
                        color="primary"
                        size="sm"
                        rounded
                        style="width: 100%;"
                        @click="
                          $router.replace({
                            path: `/ServiceDetails/${item._id}`
                          })
                        "
                        unelevated
                      >
                        <span class="text-body1"> View </span>
                      </q-btn>
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
import SearchQuery from "../../../components/searchQuery.vue";

export default {
  components: {
    SearchQuery
  },
  data() {
    return {
      search: "",
      payment_terms: {
        cash_on_delivery: false,
        cash_on_fulfillment: false,
        layaway: true
      },
      price: {
        min: 1,
        max: 999999
      },
      ratingModel: "",
      data: [],
      categories: [],
      selCategory: null
    };
  },

  methods: {
    updateSearch(newSearch) {
      this.search = newSearch;
    },

    onHandleCard: async function(id, item) {
      const path = item.product_name ? "ProductDetails" : "ServiceDetails";

      return this.$router.push({ path: `/${path}/${id}` });
    },

    getCategories: async function() {
      try {
        const response = await this.$dbCon.service("categories").find({
          query: {
            $sort: {
              category_name: 1
            }
          }
        });
        this.categories = response.data;

        //  this.selCategory = { category_name: this.$route.query.category };
      } catch (error) {
        console.log(error);
      }
    },

    applyFilter: async function() {
      this.$q.loading.show();
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
          rating: this.rating // Rating filter value
        };

        const storeCriteria = {
          categories: this.selCategory ? this.selCategory.category_name : null
        };

        const createPriceQuery = (min, max) => ({
          $gte: min !== "" ? parseInt(min) : 0,
          $lte: max !== "" ? parseInt(max) : Number.MAX_SAFE_INTEGER
        });

        const [
          resStore,
          resSubscribedStores,
          resStoreDetails
        ] = await Promise.all([
          this.$dbCon.service("store-fuel-delivery").find({
            query: {
              fuel_delivery: {
                $elemMatch: { province: this.$route.query.location }
              }
            }
          }),
          this.$dbCon.service("store-advertisment").find({
            query: {
              $select: ["store_id"],
              "subscriptions.date_end": {
                $gte: new Date().toISOString()
              }
            }
          }),
          this.$dbCon.service("store").find({})
        ]);

        const storeIds = resStore.data.map(item => item.store_id);
        const subscribedStoreIds = resSubscribedStores.data.map(
          item => item.store_id
        );

        // Create a mapping of store_id to store_name
        const storeMap = resStoreDetails.data.reduce((map, store) => {
          map[store._id] = store.store_name;
          return map;
        }, {});

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
        });

        const queryProduct = createQuery(this.price.min, this.price.max);
        const queryServices = createQuery(this.price.min, this.price.max);

        // queryProduct.cod = !criteria.paymentTerms.cashOnDelivery
        //   ? { $in: [false, true] }
        //   : { $in: [true] };

        // queryServices.cof = !criteria.paymentTerms.cashOnFulfillment
        //   ? { $in: [false, true] }
        //   : { $in: [true] };

        // Apply payment terms filters
        const isCodSelected = criteria.paymentTerms.cashOnDelivery;
        const isCofSelected = criteria.paymentTerms.cashOnFulfillment;

        queryProduct.cod = isCodSelected
          ? { $in: [true] }
          : { $in: [false, true] };
        queryServices.cof = isCofSelected
          ? { $in: [true] }
          : { $in: [false, true] };

        if (this.selCategory && this.selCategory.category_name !== "All") {
          queryProduct.category = this.selCategory.category_name;
          queryServices.category = this.selCategory.category_name;
        } else {
          delete queryProduct.category;
          delete queryServices.category;
        }

        if (this.$route.query.location != "All") {
          queryProduct.store_id = { $in: storeIds };
          queryServices.store_id = { $in: storeIds };
        }

        if (
          this.$route.query.query.trim() != "" &&
          this.$route.query.query != undefined
        ) {
          queryProduct["$search"] = this.$route.query.query;
          queryServices["$search"] = this.$route.query.query;
        }

        if (this.ratingModel && this.ratingModel > 0) {
          queryProduct.average_rating = { $gte: this.ratingModel }; // Only include products >= selected rating
          queryServices.average_rating = { $gte: this.ratingModel }; // Only include services >= selected rating
        }

        // if (this.ratingModel && this.ratingModel > 0) {
        //   queryProduct.$or = [
        //     { average_rating: { $gte: this.ratingModel } }, // Products with rating >= selected rating
        //     { average_rating: { $exists: false } } // Products with no rating
        //   ];

        //   queryServices.$or = [
        //     { average_rating: { $gte: this.ratingModel } }, // Services with rating >= selected rating
        //     { average_rating: { $exists: false } } // Services with no rating
        //   ];
        // }

        // Decide which collections to fetch based on payment filter selection
        let resServices = { data: [] };
        let resProducts = { data: [] };

        if (isCofSelected && !isCodSelected) {
          // Fetch only from services
          resServices = await this.$dbCon
            .service("services")
            .find({ query: queryServices });
        } else if (isCodSelected && !isCofSelected) {
          // Fetch only from products
          resProducts = await this.$dbCon
            .service("products")
            .find({ query: queryProduct });
        } else {
          // Fetch both if no specific selection
          [resServices, resProducts] = await Promise.all([
            this.$dbCon.service("services").find({ query: queryServices }),
            this.$dbCon.service("products").find({ query: queryProduct })
          ]);
        }

        const addSubscriptionKey = (data, subscribedStoreIds) => {
          return data.map(item => ({
            ...item,
            subscribe: subscribedStoreIds.includes(item.store_id),
            store_name: storeMap[item.store_id] || "Unknown"
          }));
        };

        const servicesWithSubscription = addSubscriptionKey(
          resServices.data,
          subscribedStoreIds
        );
        const productsWithSubscription = addSubscriptionKey(
          resProducts.data,
          subscribedStoreIds
        );

        this.data = [...servicesWithSubscription, ...productsWithSubscription];
      } catch (e) {
        this.err = e;
      }
      this.$q.loading.hide();
    },

    childrenCategories: function(category) {
      this.selCategory = category;
      this.applyFilter();
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
      } catch (e) {
        console.log(e);
      }
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
      this.$q.loading.hide();
    }
  },
  mounted() {
    // this.queryItems();
    // this.getSearchQuery();

    this.getCategories();
    // Set default category from URL query parameter
    if (this.$route.query.category) {
      this.selCategory = { category_name: this.$route.query.category };
    }
    this.applyFilter(); // Call applyFilter when the component is mounted
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
    search: {
      handler(newVal) {
        this.$router.replace({
          query: { ...this.$route.query, query: newVal }
        });
      },
      deep: true
    },

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
    },
    ratingModel: {
      handler: function(newVal, oldVal) {
        this.applyFilter();
      },
      deep: true
    }
  }
};
</script>
