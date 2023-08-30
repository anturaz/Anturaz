<template>
  <div>
    <div class="row justify-between q-mt-sm">
      <div class="col-6 row col-md-6 col-sm-12 col-xs-12">
        <div class="col-4 col-xs-6 row-btn-class text-center">
          <q-btn
            size="12px"
            flat
            icon="person_add"
            :label="`${this.store.followers} Followers`"
            style="padding: 0"
            @click="follow()"
            v-if="!isFollowed"
          />

          <q-btn
            size="12px"
            flat
            icon="person_add"
            :label="`${this.store.followers} Unfollow`"
            style="padding: 0"
            @click="unFollow()"
            v-else
          />
        </div>
        <div class="col-4 col-xs-6 row-btn-class text-center">
          <q-btn
            flat
            size="12px"
            icon="star"
            label="49 Reviews"
            style="padding: 0"
          />
        </div>
      </div>
      <div class="row col-6 col-md-6 col-sm-12 col-xs-12" align="right">
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
      <div class="col-md-2 q-pt-md">
        <SearchQuery
          :payment_terms="payment_terms"
          :price="price"
          :rating="rating"
        />
      </div>

      <div class="col-md-8 q-pt-md q-pl-md">
        <div class="row">
          <q-card
            flat
            bordered
            class="q-ma-sm"
            v-for="(item, index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
          >
            <q-card-section style="height: 180px; width: 200px">
              <q-img :ratio="1" :src="item.photos[0]" />
            </q-card-section>
            <q-card-section style="height: 75px; width: 200px">
              <div
                class="text-title text-bold q-mt-md"
                v-if="'product_name' in item"
              >
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
                  {{ $parent.data.store_name }}
                </div>
              </div>
            </q-card-section>
            <q-card-section style="height: 55px; width: 200px" align="right">
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
                class="full-width"
                color="primary"
                label="Views"
                @click="
                  $router.replace({ path: `/ProductDetails/${item._id}` })
                "
                unelevated
              />
              <q-btn
                v-if="'service_name' in item"
                color="primary"
                label="Views"
                @click="
                  $router.replace({ path: `/ServiceDetails/${item._id}` })
                "
                unelevated
              />
            </q-card-section>
          </q-card>
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
      rating: 0,
      data: [],
      err: null,
      store: {},
      user: {},
      isFollowed: false,
      storeFollowers: []
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
    }
  },

  methods: {
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
        console.log(resProducts);
      } catch {}
    },

    getProductData: async function() {
      var query = {
        store_id: this.store._id
      };
      const res = await this.$dbCon.service("products").find({
        query: query
      });
      const products = [...res.data];
      // return products;
    },

    getData: async function() {
      var products = [];
      var services = [];

      var query = {
        store_id: this.store._id
      };
      if (this.search.trim() != "") {
        query["$search"] = this.search;
      }

      if (this.price.min != "") {
        console.log("has value");
      }

      if (!Object.values(this.payment_terms).every(value => !value)) {
        query["$or"] = [];
        for (const terms in this.payment_terms) {
          if (this.payment_terms[terms] === true) {
            switch (terms) {
              case "cash_on_delivery":
                query["$or"].push({ cod: this.payment_terms[terms] });
                if (!Object.values(this.price).every(value => !value)) {
                  var price = {};
                  price["$or"] = [];
                  if (this.price.min != "" && this.price.max == "") {
                    query["$or"].push({
                      cod: this.payment_terms[terms],
                      sale_price: { $gte: this.price.min }
                    });
                    query["$or"].push({
                      cod: this.payment_terms[terms],
                      regular_price: { $gte: this.price.min }
                    });
                  }
                }

                break;
              case "credit_debit_card":
                break;
              case "cash_on_fulfillment":
                query["$or"].push({
                  cash_on_fulfillment: this.payment_terms[terms]
                });
                break;
              case "zero_interest":
                break;
              case "layaway":
                query["$or"].push({ lay_away: this.payment_terms[terms] });
                break;
            }
          }
        }
      }

      if (!Object.values(this.price).every(value => !value)) {
        //   var sale_price = [];
        // var price = {};
        // price["$or"] = [];
        // console.log(this.price);
        // if (this.price.min != "" && this.price.max == "") {
        //   price["$or"].push({ sale_price: { $gte: this.price.min } });
        //   price["$or"].push({ regular_price: { $gte: this.price.min } });
        //   query["$or"].push();
        // }
        //   // data["sale_price"] = { $gte: this.price.min };
        //   // data["regular_price"] = { $gte: this.price.min };
        //   // console.log(data);
        //   // query["$or"].push(data);
        // } else if (this.price.max != "" && this.price.min == "") {
        //   data["sale_price"] = { $lte: this.price.max };
        //   data["regular_price"] = { $lte: this.price.max };
        // } else {
        //   data["sale_price"] = { $gte: this.price.min, $lte: this.price.max };
        //   data["regular_price"] = {
        //     $gte: this.price.min,
        //     $lte: this.price.max
        //   };
        // }
      }

      // var query = {
      //   store_id: "uFrKMPJa2eHjIcc3",
      //   $or: [
      //     {
      //       cod: true,
      //       $or: [
      //         { sale_price: { $gte: "1601" } },
      //         { regular_price: { $gte: "1601" } }
      //       ]
      //     },
      //     {
      //       lay_away: true,
      //       $or: [
      //         { sale_price: { $gte: "1601" } },
      //         { regular_price: { $gte: "1600" } }
      //       ]
      //     }
      //   ]
      // };

      console.log(query);
      // for (const price in this.price) {
      //   query["sale_price"] = {};
      //   if (this.price[price] != "") {
      //     switch (price) {
      //       case "min":
      //         query["sale_price"].push({ $gte: this.this.price[price] });
      //         break;
      //       case "max":
      //         query["sale_price"].push({ $lte: this.this.price[price] });
      //         break;
      //     }
      //   }
      // }

      // payment_terms.forEach(terms => {
      //   console.log(terms);
      // });

      // const terms = this.payment_terms;

      // for (const terms in this.payment_terms) {
      //   console.log(this.payment_terms[terms]);
      //   if (this.payment_terms[terms] === true) {
      //     console.log(terms);
      //   }
      // }

      // console.log(terms);
      try {
        const resProducts = await this.$dbCon.service("products").find({
          query: query
        });
        const resServices = await this.$dbCon.service("services").find({
          query: query
        });
        products = [...resProducts.data];
        console.log(products);
        // services.push(...resServices.data);
      } catch (e) {
        this.err = e;
      }
      // //GET ALL PRODUCTS
      // await this.$dbCon
      //   .service("products")
      //   .find({
      //     query: query
      //   })
      //   .then(results => {
      //     // products = [...results.data];
      //   })
      //   .catch(e => {
      //     this.err = e;
      //   });
      // //GET ALL SERVICES
      // await this.$dbCon
      //   .service("services")
      //   .find({
      //     query: query
      //   })
      //   .then(results => {
      //     services.push(...results.data);
      //   })
      //   .catch(e => {
      //     this.err = e;
      //   });
      this.data = [...products, ...services];
      this.$forceUpdate();
    },

    getPaymentTerms: async function() {
      // var query = {
      //   store_id: this.store._id
      // };
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

        this.$dbCon.service("store-followers").create(follow_query);
        this.followers();
      }

      // try {
      //   console.log(await this.$dbCon.authenticate());
      // } catch (error) {}
    },

    followers: async function() {
      var user = await this.$getUser();
      try {
        const res = await this.$dbCon.service("store-followers").find({
          query: {
            store_id: this.$route.query.store
          }
        });
        this.store.followers = res.data.length;
        this.store.follower_id = res.data._id;
        this.storeFollowers = res.data;
        const data = res.data;

        this.isFollowed = data.some(data => data.user_id == user._id);
      } catch (e) {}
    },

    unFollow: async function() {
      var user = await this.$getUser();
      const storeFollowers = this.storeFollowers;

      var follower_id = storeFollowers.find(data => data.user_id == user._id);
      this.$dbCon.service("store-followers").remove(follower_id._id);
      const res = await this.$dbCon.service("store-followers").find({
        query: {
          store_id: this.$route.query.store
        }
      });
      this.store.followers = res.data.length;

      this.isFollowed = false;
    }
  },

  async mounted() {
    this.getProductData();
    this.followers();
    console.log(this.followers);
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
    await this.$dbCon.service("products").onDataChange(() => {
      this.getData();
    });
    await this.$dbCon.service("store-followers").onDataChange(() => {
      this.unFollow();
    });

    console.log("BUTTON", this.$refs.btn_view0);
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
