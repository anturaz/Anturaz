<template>
  <div class="bg-white  q-pt-md">
    <h5 class="bg-white" style="margin-top:0px; padding-top:3%;">
      <span>Made For You</span>
    </h5>
    <!-- <p class="text-h5 text-center text-bold">Recommended Services</p> -->
    <br />
    <div style="height: 340px" v-if="!$q.screen.lt.md">
      <q-scroll-area horizontal style="height: 100%; width: 100%">
        <div class="q-pa-md row no-wrap items-start col-lg-3 q-gutter-md ">
          <q-card
            bordered
            :style="
              'border-color:' + (currentItem == index ? $primaryColor : 'white')
            "
            style="cursor: pointer"
            square
            class="q-ma-sm"
            v-for="(item, index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
            @click="routeService(item._id)"
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
                </p>
              </q-card>
            </q-card-section>
            <q-card-section style="height: 120px; width: 200px;">
              <div style="margin: 5px;">
                <br />

                <div class="text-subtitle1" v-if="'service_name' in item">
                  <p
                    style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                  >
                    {{ item.service_name }}
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

                <!-- <div class="row">
                <div>Store: &nbsp;</div>
                <div class="text-primary" style="cursor: pointer">
                  Gilbert Shop
                </div>
              </div> -->
              </div>
            </q-card-section>
            <!-- <q-card-section>
              <div style="margin: 10px;">
                <font class="q-pr-md text-primary">
                  {{ finalStores[index] }}
                </font>
              </div>
            
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
                        {{ item.service_name }}
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
                      @click="routeService(item._id)"
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
                      @click="routeService(item._id)"
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
import {
  getStoreFuelDelivery,
  storeFuelDeliveryLoc
} from "../../../api/services/storeFuelDeliveryService";
import { findServices } from "../../../api/services/serviceServices";
import { getStore } from "../../../api/services/storeServices";

export default {
  data() {
    return {
      data: [],
      currentItem: "none",
      store: [],
      finalStores: [],
      storeIds: []
    };
  },
  // computed: {
  //   // a computed getter
  //   reversedMessage: function () {
  //     // `this` points to the vm instance
  //     return this.message.split('').reverse().join('')
  //   }
  // }
  computed: {
    trueCount() {
      return this.rating
        ? Object.values(this.rating).filter(value => value === true).length
        : 0;
    },
    falseCount() {
      return this.rating
        ? Object.values(this.rating).filter(value => value === false).length
        : 0;
    },
    totalCount() {
      return this.trueCount + this.falseCount;
    },
    truePercentage() {
      return this.totalCount ? (this.trueCount / this.totalCount) * 100 : 0;
    },
    falsePercentage() {
      return this.totalCount ? (this.falseCount / this.totalCount) * 100 : 0;
    },
    sortedData() {
      return this.data.sort((a, b) => b.subscribe - a.subscribe);
    }
  },

  methods: {
    routeService: function(serviceId) {
      if (this.$route.path === "/") {
        this.$router.push({
          path: `/ServiceDetails/${serviceId}`
        });
      } else {
        window.open(`#/ServiceDetails/${serviceId}`, "_blank");
      }
    },

    async getStoreIds() {
      const query = {};

      // if (this.$local.getItem("mun")) {
      //   query.fuel_delivery = {
      //     $elemMatch: {
      //       location: this.$local.getItem("mun")
      //     }
      //   };
      // }

      try {
        const storeFuelDel = await storeFuelDeliveryLoc(query);
        this.storeIds = storeFuelDel.map(store => store.store_id);
      } catch (error) {
        console.error("Error fetching store IDs:", error);
      }
    },

    async fetchData(serviceFunction) {
      if (!this.storeIds.length) return [];

      const query = {
        query: {
          deleted: false,
          store_id: { $in: this.storeIds }
        }
      };

      try {
        const results = await serviceFunction(query);
        return await Promise.all(
          results.map(async item => {
            const resStore = await getStore(item.store_id);
            return {
              ...item,
              store_name: resStore[0].store_name
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },

    async getRecommended() {
      try {
        const [services] = await Promise.all([this.fetchData(findServices)]);

        this.data = [...services];
      } catch (error) {
        console.error("Error fetching recommended services:", error);
      }
    }
  },

  async mounted() {
    await this.getStoreIds();
    await this.getRecommended();
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
