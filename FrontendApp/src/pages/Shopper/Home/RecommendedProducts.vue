<template>
  <div class="q-pa-lg">
    <h6><span>Made for you</span></h6>

    <div style="height: 340px">
      <q-scroll-area
        horizontal
        style="height: 100%; width: 100%"
        :visible="true"
      
      >
        
        <div class="q-pa-md row no-wrap items-start col-lg-3 q-gutter-md ">
          <q-card
            bordered
            :style="'border-color:'+(currentItem == index? $primaryColor: 'white')"
            style="cursor:pointer"
            class="q-ma-sm"
            v-for="(item,index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
             @click="
                    $router.replace({ path: `/ProductDetails/${item._id}` })
                  "
          >
           
            <q-card-section class="col-auto" style="height: 180px; width: 200px">
              <q-img :ratio="1" :src="item.photos[0]" />
               <q-card
              class="bg-primary text-white text-bold text-center absolute"
              style="
                right: 0px;
                height: 40px;
                width: 80px;
                top: 160px
              "
              v-if="item.sale_price != '' "
              flat
            >
              <p class="q-pa-xs q-mt-xs">{{(((item.regular_price-item.sale_price)/item.regular_price)*100).toFixed(0)}}% OFF</p></q-card
            >
            </q-card-section>
            <q-card-section style="height: 120px; width: 200px;">
              <div style="margin: 10px;">
              <br />
              <div class="text-subtitle1" v-if="'product_name' in item">
                
                <p class="ellipsis">{{ item.product_name }}</p>
              </div>
              
              <div>
                <font class="q-pr-sm text-black" v-show="!item.sale_price">{{
            
                    $prettyMoney(0)
                }}</font>
                <font class="q-pr-sm text-black" v-show="item.sale_price">{{
                  item.sale_price != ""
                    ? $prettyMoney(item.sale_price)
                    : $prettyMoney(item.regular_price)
                }}</font>

                

                <font class="text-primary q-pr-sm" v-if="item.sale_price != ''">
                  <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                </font>

                <font class="text-bold text-black" v-if="item.regular_price == 0">{{
                  item.regular_price
                }}</font>
              </div>

              <font class="q-pr-md text-primary">

                  {{finalStore[index]}}
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      currentItem: "none",
      store: [],
      finalStore: []
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

    await this.$dbCon
      .service("store")
      .find({
      }).then((results) => {
        console.log("results",results)
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
          if(store._id == service.store_id){
            this.finalStore.push(store.store_name)
          }
        })
      });
  },
};
</script>
<style scoped>
h6 {
   width: 100%; 
   text-align: center; 
   border-bottom: 1px solid #d8a957; 
   line-height: 0.1em;
   margin: 10px 0 20px; 
} 

h6 span { 
    background:#fff;
    padding:10px; 
}

.q-card__section {
  padding: 0px
}

/* .my-card{
  width: 100%
  max-width: 250px
} */
</style>