<template>
  <div class=" q-pt-md row">
    <q-input
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
    </q-input>
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
                {{ $parent.data.store_name }}
              </div>
            </div>
          </q-card-section>
          <q-card-section style="height: 55px; width: 200px" align="right">
            <transition
              appear
              enter-active-class="animated slideInUp"
              leave-active-class="animated fadeOut"
            >
              <q-btn
                class="full-width"
                v-if="'product_name' in item && currentItem == index"
                color="primary"
                label="Views >"
                @click="
                  $router.replace({ path: `/ProductDetails/${item._id}` })
                "
                unelevated
              />
            </transition>
            <q-btn
              v-if="'service_name' in item"
              color="primary"
              label="Views >"
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
        zero_interest: false,
        layaway: false
      },
      price: {
        min: "",
        max: ""
      },
      rating: {
        five: true,
        four: true,
        three: true,
        two: false,
        one: false
      },
      data: [],
      err: null,
      store: {}
    };
  },
  methods: {
    getProductData: async function() {
      var query = {
        store_id: this.store._id
      };
      const res = await this.$dbCon.service("products").find({
        query: query
      });
      const products = [...res.data];
      console.log("sawa na ako", products);
      // return products;
    },

    getData: async function() {
      var products = [];
      var services = [];

      console.log("store id", this.store._id);

      var query = {
        store_id: this.store._id
      };
      if (this.search.trim() != "") {
        query["$search"] = this.search;
      }

      console.log("search", query);

      try {
        const resProducts = await this.$dbCon.service("products").find({
          query: query
        });
        const resServices = await this.$dbCon.service("services").find({
          query: query
        });
        products = [...resProducts.data];
        // services.push(...resServices.data);

        console.log("data productsss", [...resServices.data]);
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
      console.log("realshit na to", ...products);
      this.data = [...products, ...services];
      this.$forceUpdate();
    }
  },
  async mounted() {
    this.getProductData();

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
    console.log("BUTTON", this.$refs.btn_view0);
  },
  watch: {
    search: function() {
      this.getData();
    }
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
