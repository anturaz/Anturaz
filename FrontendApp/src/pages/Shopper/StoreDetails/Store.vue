<template>
  <div>
    <div class="row justify-between q-mt-sm">
      <div
        class="col-6 row col-md-6 col-sm-12 col-xs-12"
        v-if="!$q.screen.lt.md"
      >
        <div class="col-4 col-xs-4 row-btn-class text-center">
          <q-btn
            size="12px"
            flat
            icon="groups"
            :label="
              this.storeFollowers.length
                ? `${this.storeFollowers.length} Followers`
                : `0 Followers`
            "
            style="padding: 0"
          />
        </div>

        <div class="col-4 col-xs-4 row-btn-class text-center">
          <q-btn
            size="12px"
            flat
            icon="store"
            :label="following ? 'Unfollow' : 'Follow'"
            style="padding: 0"
            @click="toggleFollow()"
          />
        </div>

        <div class="col-4 col-xs-4 row-btn-class text-center">
          <q-btn
            flat
            size="12px"
            icon="star"
            label="49 Reviews"
            :label="
              this.product_reviews.length != 0
                ? `${this.product_reviews} Reviews`
                : `0 Reviews`
            "
            style="padding: 0"
          />
        </div>
      </div>

      <div
        class="row col-6 col-md-6 col-sm-12 col-xs-12"
        align="right"
        v-if="!$q.screen.lt.md"
      >
        <q-input
          class="col-sm-12 col-xs-12 col-md-4 offset-md-8"
          rounded
          outlined
          dense
          placeholder="Search in this store"
          v-model="search"
          input-class="text-right"
          debounce="500"
        >
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
      </div>
    </div>

    <div class="q-pt-md row">
      <!-- <q-input
        class="col-sm-12 col-md-2 offset-md-10"
        rounded
        outlined
        dense
        placeholder="Search in this store"
        v-model="search"
        input-class="text-right"
        debounce="500"
      >
        <template v-slot:append>
          <q-icon v-if="search === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="search = ''"
          />
        </template>
      </q-input> -->
      <div class="col-md-2 col-sm-12 col-xs-12 q-pt-md">
        <SearchQuery
          :payment_terms="payment_terms"
          :price="price"
          :ratingModel.sync="ratingModel"
          :search="search"
          @update:search="updateSearch"
          :categories="categories"
          @update:selectedCategories="childrenCategories"
        />
      </div>

      <div
        class="col-md-10 col-xs-12 q-pt-md "
        :class="$q.screen.lt.md ? '' : 'q-pl-md'"
      >
        <div class="row" v-if="!$q.screen.lt.md">
          <q-card
            flat
            @click="onHandleCard(item._id, item)"
            bordered
            class="q-mr-xs"
            :class="{ 'bg-yellow-1': advertisement.length > 0 }"
            v-for="(item, index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
          >
            <q-card-section class="q-pa-xs" style="height: 180px; width: 190px">
              <q-img :ratio="1" :src="item.photos[0]" />
            </q-card-section>
            <q-card-section class="q-pa-xs" style="height: 65px; width: 190px">
              <div class="q-mt-md" v-if="'product_name' in item">
                <p
                  style="margin-bottom: 5px ; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                  class="ellipsis"
                >
                  {{ item.product_name }}
                </p>
              </div>
              <div class="" v-if="'service_name' in item">
                <p
                  class="ellipsis q-mt-md"
                  style="margin-bottom: 5px ; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
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
                  <p
                    style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                  >
                    {{ store.store_name }}
                  </p>
                </div>
              </div>
            </q-card-section>
            <q-card-section
              class="q-pa-xs"
              style="height: 50px; width: 190px"
              align="right"
            >
              <!-- <q-btn
                class="full-width"
                v-if="'product_name' in item && currentItem == index"
                color="primary"
                label="Views"
                @click="
                  $router.replace({ path: `/ProductDetails/${item._id}` })
                "
                unelevated
              /> -->
              <q-btn
                v-if="'product_name' in item"
                class="full-width q-mt-sm"
                color="primary"
                label="View"
                @click="
                  $router.replace({ path: `/ProductDetails/${item._id}` })
                "
                unelevated
              />
              <q-btn
                v-if="'service_name' in item"
                class="full-width q-mt-sm"
                color="primary"
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
              <div class="row q-col-gutter-sm ">
                <div
                  class="col-sm-6 col-md-3 q-pb-md "
                  :class="sortedData.length === 1 ? 'col-12' : 'col-6'"
                  v-for="item in sortedData"
                  :key="item._id"
                >
                  <q-card
                    flat
                    bordered
                    @click="onHandleCard(item._id, item)"
                    :class="{ 'bg-yellow-1': item.subscribe == true }"
                  >
                    <q-card-section class="q-pa-none q-pb-sm ">
                      <q-img :ratio="1" :src="item.photos[0]" />
                    </q-card-section>
                    <q-card-section class="q-pa-xs ">
                      <div v-if="'product_name' in item">
                        <p
                          style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                          class="ellipsis"
                        >
                          {{ item.product_name }}
                        </p>
                      </div>
                      <div v-if="'service_name' in item">
                        <p
                          class="ellipsis "
                          style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
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
                          <p
                            style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                          >
                            {{ store.store_name }}
                          </p>
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
      following: false,
      num_followers: 200,
      currentItem: "none",
      search: "",
      payment_terms: {
        cash_on_delivery: false,
        credit_debit_card: false,
        cash_on_fulfillment: false,
        zero_interest: false,
        layaway: false
      },
      price: {
        min: "",
        max: ""
      },
      ratingModel: 3,
      data: [],
      err: null,
      store: {},
      advertisement: {},
      user: {},
      isFollowed: false,
      storeFollowers: [],
      products: [],
      services: [],
      categories: [],
      selCategory: null,

      product_reviews: ""
    };
  },

  watch: {
    search: function() {
      this.getData();
    },
    "payment_terms.cash_on_delivery": {
      handler: function(newVal, oldVal) {
        this.getData();
      },
      deep: true
    },

    "payment_terms.cash_on_fulfillment": {
      handler: function(newVal, oldVal) {
        this.getData();
      },
      deep: true
    },
    "payment_terms.layaway": {
      handler: function(newVal, oldVal) {
        this.getData();
      },
      deep: true
    },
    ratingModel: {
      handler: function(newVal, oldVal) {
        this.getData();
      },
      deep: true
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
        this.categories = response.data;
        //  this.selCategory = { category_name: this.$route.query.category };
      } catch (error) {
        console.log(error);
      }
    },

    childrenCategories: function(category) {
      this.selCategory = category;
      console.log(category);
      this.applyFilter();
    },

    updateSearch(newSearch) {
      this.search = newSearch;
    },

    saveFollowing: async function(query) {
      this.$q.loading.show();
      try {
        const { data } = await this.$dbCon
          .service("store-following")
          .create(query);
        this.storeFollowers = [...this.storeFollowers, data];
        return true;
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully followed",
            color: "primary"
          });
        }, 500);
      }
    },
    removeFollowing: async function(query) {
      this.$q.loading.show();
      try {
        const { data } = await this.$dbCon
          .service("store-following")
          .find({ query: query });

        await this.$dbCon.service("store-following").remove(data[0]._id);
        await this.getFollowers();

        return false;
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully unfollowed",
            color: "primary"
          });
        }, 500);
      }
    },

    toggleFollow: async function() {
      const originalState = this.following;

      if (!this.$local.has(this.$appLink + "-jwt")) {
        this.$q.loading.show();
        this.$local.clear();
        setTimeout(() => {
          this.$router.push("/ShopperLogin");
          this.$q.loading.hide();
        }, 500);
      } else {
        this.following = !this.following;
        const query = {
          store_id: this.data[0].store_id,
          user_id: this.user._id
        };

        if (originalState) {
          const response = await this.removeFollowing(query);
          this.following = response;
        } else {
          const response = await this.saveFollowing(query);
          this.following = response;
        }
      }
    },
    searchFilter: async function() {
      try {
        var query = {
          store_id: this.store._id,
          $search: this.search,
          cod: this.payment_terms.cash_on_delivery
          // cash_on_fulfillment: this.payment_terms.cash_on_fulfillment,
          // zero_interest: this.payment_terms.zero_interest,
          // lay_away: this.payment_terms.layaway
        };
        const resProducts = await this.$dbCon.service("products").find({
          query: query
        });
        // console.log(resProducts);
      } catch {}
    },

    onHandleCard: async function(id, item) {
      const path = item.product_name ? "ProductDetails" : "ServiceDetails";

      return this.$router.push({ path: `/${path}/${id}` });
    },

    storeAdvetisment: async function() {
      // RVBLxOOMYDFkg5Rq
      try {
        const res = await this.$dbCon.service("store-advertisment").find({
          query: {
            store_id: this.store._id
          }
        });
        let currentDate = new Date().toISOString().split("T")[0];

        let filteredData = res.data[0].subscriptions.filter(item => {
          const subscriptionEndDate = new Date(item.date_end)
            .toISOString()
            .split("T")[0];
          return subscriptionEndDate >= currentDate;
        });

        this.advertisement = filteredData;
      } catch (e) {}
    },

    getProductData: async function() {
      var query = {
        store_id: this.store._id
      };

      const res = await this.$dbCon.service("products").find({
        query: query
      });
      const products = [...res.data];

      return products;
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
          categories: this.selCategory ? this.selCategory.category_name : null
        };
        console.log(this.selCategory);
        const createPriceQuery = (min, max) => ({
          $gte: min !== "" ? parseInt(min) : 0,
          $lte: max !== "" ? parseInt(max) : Number.MAX_SAFE_INTEGER
        });

        const createQuery = (storeId, min, max) => ({
          store_id: storeId,
          deleted: false,
          $or: [
            { regular_price: createPriceQuery(min, max) },
            { sale_price: createPriceQuery(min, max) }
          ]
        });
        const queryProduct = createQuery(
          this.store._id,
          this.price.min,
          this.price.max
        );
        const queryServices = createQuery(
          this.store._id,
          this.price.min,
          this.price.max
        );
        if (this.selCategory) {
          queryProduct.category = this.selCategory.category_name;
          queryServices.category = this.selCategory.category_name;
        }

        queryProduct.cod = !criteria.paymentTerms.cashOnDelivery
          ? { $in: [false, true] }
          : { $in: [true] };

        queryServices.cof = !criteria.paymentTerms.cashOnFulfillment
          ? { $in: [false, true] }
          : { $in: [true] };
        // if (criteria.paymentTerms.cashOnDelivery) {
        //   queryProduct.cod = !criteria.paymentTerms.cashOnFulfillment;
        // }

        // if (criteria.paymentTerms.cashOnFulfillment) {
        //   queryServices.cof = criteria.paymentTerms.cashOnFulfillment;
        // }

        if (this.search.trim() !== "") {
          queryProduct["$search"] = this.search;
        }

        if (this.search.trim() !== "") {
          queryServices["$search"] = this.search;
        }

        const queryString = new URLSearchParams(queryProduct).toString();

        const [resServices, resProducts] = await Promise.all([
          this.$dbCon.service("services").find({ query: queryServices }),
          this.$dbCon.service("products").find({ query: queryProduct })
        ]);

        this.data = [...resProducts.data, ...resServices.data];
      } catch (e) {
        this.err = e;
      }
    },

    getData: async function() {
      this.applyFilter();

      try {
      } catch (e) {
        this.err = e;
      }
    },

    getPaymentTerms: async function() {
      return (query["or"] = { sale_price: { $gte: "200" } });
    },

    follow: async function() {
      if (!this.$local.has(this.$appLink + "-jwt")) {
        this.$local.clear();
        this.$router.push("/ShopperLogin");
      } else {
        this.$dbCon.authenticate();
        var user = await this.$getUser();
        var follow_query = {
          store_id: this.data[0].store_id,
          user_id: user._id
        };

        this.$dbCon.service("store-following").create(follow_query);
      }
    },

    checkIfFollowed: async function() {
      try {
        var user = await this.$getUser();
        this.user = user;
        const storeFollowing = await this.$dbCon
          .service("store-following")
          .find({
            query: {
              store_id: this.$route.query.store,
              user_id: user._id
            }
          });

        this.following = storeFollowing.data.length > 0;
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    },

    getFollowers: async function() {
      try {
        const { data } = await this.$dbCon.service("store-following").find({
          query: {
            store_id: this.$route.query.store
          }
        });
        this.store.follower_id = data._id;
        this.storeFollowers = data;
      } catch (e) {}
    },

    unFollow: async function() {
      var user = await this.$getUser();
      const storeFollowers = this.storeFollowers;
      var follower_id = storeFollowers.find(data => data.user_id == user._id);
      this.$dbCon.service("store-following").remove(follower_id._id);
      const res = await this.$dbCon.service("store-following").find({
        query: {
          store_id: this.$route.query.store
        }
      });

      this.isFollowed = false;
    },

    getRevies: async function() {
      const product_reviews = [];
      try {
        const res = await this.$dbCon.service("product-reviews").find({
          query: {
            store_id: this.$route.query.store
          }
        });

        res.data.map(async review => {
          const product_response = await this.$dbCon.service("products").find({
            query: {
              _id: review.product_id
            }
          });
          const product_data = product_response.data[0];
          const data = {
            ...product_data,
            ...review
          };

          product_reviews.push(data);
          this.product_reviews = product_reviews.length;
        });
      } catch (e) {}
    }
  },

  async mounted() {
    await this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$route.query.store
        }
      })
      .then(result => {
        this.store = result.data[0];
      });

    this.getFollowers();
    this.getProductData();
    this.getRevies();
    this.storeAdvetisment();
    this.checkIfFollowed();
    this.getCategories();
    await this.$dbCon.service("products").onDataChange(() => {
      this.getData();
    });
    await this.$dbCon.service("store-following").onDataChange(() => {
      this.getFollowers();
      this.checkIfFollowed();
    });

    // console.log("BUTTON", this.$refs.btn_view0);
  },

  computed: {
    trueCount() {
      return Object.values(this.rating).filter(value => value === true).length;
    },
    falseCount() {
      return Object.values(this.rating).filter(value => value === false).length;
    },
    totalCount() {
      return this.trueCount + this.falseCount;
    },
    truePercentage() {
      return (this.trueCount / this.totalCount) * 100;
    },
    falsePercentage() {
      return (this.falseCount / this.totalCount) * 100;
    },
    sortedData() {
      return this.data.slice().sort((a, b) => {
        if (a.subscribe && !b.subscribe) return -1;
        if (!a.subscribe && b.subscribe) return 1;
        return 0;
      });
    }
  }
};
</script>

<style scoped>
@media (min-width: 576px) {
  .row-btn-class {
    text-align: center;
  }
}

@media (min-width: 768px) {
  .row-btn-class {
    text-align: left;
  }
}

@media (min-width: 992px) {
  .row-btn-class {
    text-align: left;
  }
}

@media (min-width: 1200px) {
  .row-btn-class {
    text-align: left;
  }
}

@media (min-width: 1400px) {
}
</style>
