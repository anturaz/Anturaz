<template>
  <div class="q-pa-lg">
    <h6><span>Recommend Services</span></h6>
    <!-- <p class="text-h5 text-center text-bold">Recommended Services</p> -->

    <div style="height: 340px">
      <q-scroll-area
        horizontal
        style="height: 100%; width: 100%"
       
      >
        <div class="q-pa-md row no-wrap items-start col-lg-3 q-gutter-md ">
          <q-card
            
            bordered
            :style="
              'border-color:' + (currentItem == index ? $primaryColor : 'white')
            "
            style="cursor: pointer"
            square
            class="q-ma-sm"
            v-for="(item,index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
            @click="$router.replace({ path: `/ServiceDetails/${item._id}` })"
          >
           
            <q-card-section style="height: 180px; width: 200px">
                <q-img :ratio="1" :src="item.photos[0]" />
                <q-card
                    class="bg-primary text-white text-bold text-center absolute"
                    style="
                    position: absolute;
                      right: 0px;
                      height: 40px;
                      width: 80px;
                      top: 160px
                      z-index: 1;
                    "
                    v-if="item.sale_price != ''"
                    square
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
                  </q-card
                  >
            </q-card-section>
            <q-card-section style="height: 75px; width: 200px">
              <div style="margin: 10px;">
                <br />
          
                <div class="text-subtitle1" v-if="'service_name' in item">
                <p class="ellipsis"> {{ item.service_name }} </p>
                </div>
              
              <div>
                  <font class="q-pr-sm text-black" v-show="!item.sale_price">{{
            
                    $prettyMoney(0)
                }}</font>
                
                      <font class="text-black q-pr-sm text-primary">
                        {{
                  item.sale_price != ""
                    ? $prettyMoney(item.sale_price)
                    : $prettyMoney(item.regular_price)
                }}</font>
                <font class="text-primary q-pr-sm" v-if="item.sale_price != ''">
                  <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                </font>
              </div>
              <!-- <div class="row">
                <div>Store: &nbsp;</div>
                <div class="text-primary" style="cursor: pointer">
                  Gilbert Shop
                </div>
              </div> -->
              </div>
            </q-card-section>
            <q-card-section >
              <div style="margin: 10px;">
                <font class="q-pr-md text-primary">

                  {{finalStores[index]}}
                </font>
              </div>
              <!-- <transition
                appear
                enter-active-class="animated slideInUp"
                leave-active-class="animated fadeOut"
              >
                <q-btn
                  class="full-width"
                  v-if="'service_name' in item && currentItem == index"
                  color="primary"
                  label="View >"
                  @click="
                    $router.replace({ path: `/ServiceDetails/${item._id}` })
                  "
                  unelevated
                />
              </transition> -->
            </q-card-section>
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
      finalStores: []
    };
  },
  // computed: {
  //   // a computed getter
  //   reversedMessage: function () {
  //     // `this` points to the vm instance
  //     return this.message.split('').reverse().join('')
  //   }
  // }
  async mounted() {
    var services = await this.$dbCon
      .service("service-advertisment")
      .find({
        query: {
          $select: ["related_id"],
          date_end: {
            $gte: new Date(),
          },
        },
      })
      .then((servicesID) => {
        var arrFeaturedServicesId = [];
        servicesID.data.forEach(function (featureService) {
          arrFeaturedServicesId.push(featureService.related_id);
        });
        return arrFeaturedServicesId;
      });

    await this.$dbCon
      .service("services")
      .find({
        query: {
          // _id: {
          //   $in: services
          // }
        },
      })
      .then( (results) => {
        console.log("results",results)
        this.data = results.data;
      
          
      
        
      });

      await this.$dbCon
      .service("store")
      .find({
      }).then((results) => {
        console.log("results",results)
        this.store = results.data;
      });
      
      this.data.forEach(service => {
        this.store.forEach(store => {
          if(store._id == service.store_id){
            this.finalStores.push(store.store_name)
          }
        })
      });

      console.log("data", this.data)
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
    padding:0 10px; 
}

.q-card__section {
  padding: 0px
}

.content{    
    position:relative;
}

.content q-card{
    padding: 150px;
    float: right;
}

</style>