<template>
  <div class="q-pa-lg">
    <p class="text-h5 text-center text-bold">Recommended Products</p>

    <div style="height: 330px">
      <q-scroll-area
        horizontal
        style="height: 100%; width: 100%"
      
      >
        <div class="row no-wrap">
          <q-card
            bordered
            :style="'border-color:'+(currentItem == index? $primaryColor: 'white')"
            style="cursor:pointer"
            square
            class="q-ma-sm"
            v-for="(item,index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
             @click="
                    $router.replace({ path: `/ProductDetails/${item._id}` })
                  "
          >
            <q-card
              class="bg-primary text-white text-bold text-center absolute"
              style="
                width: 80px;
                height: 40px;
                z-index: 1;
              "
              v-if="item.sale_price != '' "
              square
              flat
            >
              <p class="q-pa-xs q-mt-xs">{{(((item.regular_price-item.sale_price)/item.regular_price)*100).toFixed(0)}}% OFF</p></q-card
            >
            <q-card-section style="height: 180px; width: 200px">
              <q-img :ratio="1" :src="item.photos[0]" />
            </q-card-section>
            <q-card-section style="height: 75px; width: 200px" align="center">
              <br />
              <div class="text-subtitle1" v-if="'product_name' in item">
                {{ item.product_name }}
              </div>
              <div class="text-title text-bold" v-if="'service_name' in item">
                {{ item.service_name }}
              </div>
              <div>
                <font class="text-grey q-pr-sm" v-if="item.sale_price != ''">
                  <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                </font>
                <font class="text-bold text-primary">{{
                  item.sale_price != ""
                    ? $prettyMoney(item.sale_price)
                    : $prettyMoney(item.regular_price)
                }}</font>
              </div>
              <!-- STORE NAME IS HIDDEN -->
              <!-- <div class="row">
                <div>Store: &nbsp;</div>
                <div class="text-primary" style="cursor: pointer">
                 
                  Gilbert Shop
                </div>
              </div> -->
            </q-card-section>
            <q-card-section style="height: 55px; width: 200px">
              <transition
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
              </transition>
              <q-btn
                v-if="'service_name' in item"
                color="primary"
                label="Views >"
                @click="
                  $router.replace({ path: `/ServiceDetails/${item._id}` })
                "
                unelevated
              />
            </q-card-section>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      currentItem: "none"
    };
  },
  async mounted() {
  
    var products = await this.$dbCon
      .service("product-advertisment")
      .find({
        query: {
          $select: ["related_id"],
          date_end: {
            $gte: new Date(),
          },
        },
      })
      .then((productsID) => {
        var arrFeaturedProductsId = [];
        productsID.data.forEach(function (featureProduct) {
          arrFeaturedProductsId.push(featureProduct.related_id);
        });
        return arrFeaturedProductsId;
      });

    await this.$dbCon
      .service("products")
      .find({
        query: {
          // _id: {
          //   $in: products
          // }
        },
      })
      .then((results) => {
        this.data = results.data;
      });
  },
};
</script>