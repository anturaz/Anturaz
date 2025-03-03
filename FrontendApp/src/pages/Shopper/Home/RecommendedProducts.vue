<template>
  <div class="bg-white q-pt-md">
    <h5 class="bg-white" style="margin-top:0px; padding-top:3%;">
      <span>Made For You</span>
    </h5>
    <br />
    <div style="height: 340px;" v-if="!$q.screen.lt.md">
      <q-scroll-area
        horizontal
        style="height: 100%; width: 100%"
        :visible="true"
      >
        <!-- <div class="q-pa-md row no-wrap items-start col-lg-3 q-gutter-md "> -->
        <div class="q-pa-md row no-wrap items-start col-lg-3 q-gutter-md">
          <q-card
            bordered
            :style="
              'border-color:' + (currentItem == index ? $primaryColor : 'white')
            "
            style="cursor:pointer"
            class="q-ma-md"
            v-for="(item, index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
            @click="routeToProduct(item._id)"
          >
            <q-card-section
              class="col-auto"
              style="height: 180px; width: 200px"
            >
              <q-img :ratio="1" :src="item.photos[0]" />
              <q-card
                class="bg-primary text-white text-bold text-center absolute"
                style="
                    position: absolute;
                      right: 0px;
                      height: 40px;
                      width: 80px;
                      top: 160px;
                      z-index: 1;
                    "
                v-if="item.sale_price != ''"
                flat
              >
                <p class="q-pa-xs q-mt-xs">
                  {{
                    (
                      ((item.regular_price - item.sale_price) /
                        item.regular_price) *
                      100
                    ).toFixed(0)
                  }}% OFF
                </p></q-card
              >
            </q-card-section>
            <q-card-section style="height: 120px; width: 200px;">
              <div style="margin: 5px;">
                <br />
                <div class="text-subtitle1" v-if="'product_name' in item">
                  <p
                    style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                  >
                    {{ item.product_name }}
                  </p>
                </div>

                <div class="q-pt-sm">
                  <font class="text-bold text-primary text-h6">{{
                    item.sale_price != ""
                      ? $prettyMoney(item.sale_price)
                      : $prettyMoney(item.regular_price)
                  }}</font>
                  <font class="text-grey q-pl-sm" v-if="item.sale_price != ''">
                    <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                  </font>
                </div>

                <font class="q-pr-md text-primary text-body1">
                  <p
                    style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                  >
                    {{ item.store_name }}
                  </p>
                </font>

                <!-- STORE NAME IS HIDDEN -->
                <!-- <div class="row" align="center">
                <div>Store: &nbsp;</div>
                <div class="text-primary" style="cursor: pointer">
                 
                  Gilbert Shop
                </div>
              </div> -->
              </div>
            </q-card-section>

            <!-- <transition
                appear
                enter-active-class="animated slideInUp"
                leave-active-class="animated fadeOut"
              >
                <q-btn
                  class="full-width"
                  v-if="'product_name' in item && currentItem == index"
                  color="primary"
                  label="View >"
                  @click="
                    $router.replace({ path: `/ProductDetails/${item._id}` })
                  "
                  unelevated
                />
              </transition> -->
            <!-- <q-btn
                v-if="'service_name' in item"
                color="primary"
                label="Views >"
                @click="
                  $router.replace({ path: `/ServiceDetails/${item._id}` })
                "
                unelevated
              /> -->
            <!-- <q-card-section style="height:55px;width:200px" align="right">
            <q-btn
              v-if="'product_name' in item"
              color="primary"
              label="View >"
              @click="$router.replace({ path: `/ProductDetails/${item._id}` }) "
              unelevated
            />
            <q-btn
              v-if="'service_name' in item"
              color="primary"
              label="View >"
              @click="$router.replace({ path: `/ServiceDetails/${item._id}` }) "
              unelevated
            />
          </q-card-section> -->
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div v-else class="">
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
                  <q-card-section style="padding:2%;" class="q-pa-xs ">
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
                        <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                      </font>
                      <font v-else class="text-grey ">
                        <strike>-</strike>
                      </font>
                    </div>
                    <div class="row">
                      <div
                        class="text-grey"
                        style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                        clickable
                        v-ripple
                        @click="
                          $router.push('/StoreDetails?store=' + item.store_id)
                        "
                      >
                        <p
                          style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                        >
                          {{ item.store_name }}
                        </p>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section style="padding:2%;" class="q-pa-xs ">
                    <q-btn
                      v-if="'product_name' in item"
                      color="primary"
                      rounded
                      size="sm"
                      style="width: 100%;"
                      @click="routeToProduct(item._id)"
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
                      @click="routeToProduct(item._id)"
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
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      currentItem: "none",
      store: [],
      finalStore: [],
      items: []
    };
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
  },

  methods: {
    routeToProduct: function(productId) {
      if (this.$route.path === "/") {
        this.$router.push({
          path: `/ProductDetails/${productId}`
        });
      } else {
        window.open(`#/ProductDetails/${productId}`, "_blank");
      }
      // //
      // // window.location.replace(paymentUrl);
      // window.location.href = `#/ProductDetails/${productId}`;
    },
    async getStoreName(storeId) {
      const store = await this.$dbCon
        .service("store")
        .get(storeId)
        .then(store => {
          return store.store_name;
        });
      return store;
    }
  },

  async mounted() {
    try {
      await this.$dbCon.authenticate();
    } catch (e) {
      console.log(e);
    }

    var products = await this.$dbCon
      .service("product-advertisment")
      .find({
        query: {
          $select: ["related_id"],
          date_end: {
            $gte: new Date()
          }
        }
      })
      .then(productsID => {
        var arrFeaturedProductsId = [];
        productsID.data.forEach(function(featureProduct) {
          arrFeaturedProductsId.push(featureProduct.related_id);
        });
        return arrFeaturedProductsId;
      });

    const query = {};

    // if (this.$local.getItem("mun") != null) {
    //   query.fuel_delivery = {
    //     $elemMatch: {
    //       location: this.$local.getItem("mun")
    //     }
    //   };
    // }

    //  get stores in store-fuel-delivery service by city name
    const storeFuelDelivery = await this.$dbCon
      .service("store-fuel-delivery")
      .find({ query });

    // extrating the store ids from the store-fuel-delivery service
    const storeIds = storeFuelDelivery.data.map(store => store.store_id);

    // get products in products service by store ids
    await this.$dbCon
      .service("products")
      .find({
        query: {
          deleted: false,
          store_id: { $in: storeIds }
        }
      })
      .then(async results => {
        // const store = await this.$dbCon.service("store").find({
        //   query: {
        //     _id: { $in: results.store_id }
        //   }
        // });

        const newProductArray = [];

        results.data.forEach(async product => {
          const store = await this.getStoreName(product.store_id);
          newProductArray.push({ ...product, store_name: store });
        });
        // console.log("product result", results);
        this.data = newProductArray;
      });

    await this.$dbCon
      .service("store")
      .find({})
      .then(results => {
        // console.log("results", results);
        this.store = results.data;
      });

    // for(let i=0; i< this.data.length; i++){
    //   for(let j=0; j< this.store.length; j++){
    //     if(this.store[j]._id == this.data[i].store_id){
    //         this.finalStore.push(store.store_name)
    //       }
    //   }
    // }

    this.data.forEach(service => {
      this.store.forEach(store => {
        if (store._id == service.store_id) {
          this.finalStore.push(store.store_name);
        }
      });
    });
  }
};
</script>
<style scoped>
h5 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #d8a957;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

h5 span {
  background: #fff;
  padding: 10px;
}

.q-card__section {
  padding: 0px;
}

/* .my-card{
  width: 100%
  max-width: 250px
} */
</style>
