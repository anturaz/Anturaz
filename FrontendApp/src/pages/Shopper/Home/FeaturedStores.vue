<template>
  <div class="q-pa-lg" v-if="data.length!=0">
    <q-card flat class="bg-primary text-white">
      <q-card-section class="row">
        <div class="col-2">
          <p class="text-h5">Featured Stores</p>
          <p class="text-title">Check out our most popular stores!</p>
          <q-btn class="text-primary bg-white"  label="Shop Now" />
        </div>
        <div class="col-10 q-pl-md text-black" style="height:330px">
          <q-scroll-area horizontal style="height: 100%; width: 100%;" class="bg-grey-1">
            <div class="row no-wrap">
              <q-card flat bordered class="q-ma-sm" v-for="store in data" :key="store._id">
                <q-card-section style="height:220px;width:200px">
                  <q-icon v-if="store.logo==''" name="store" color="primary" size="170px"/>
                </q-card-section>
                <q-card-section class="text-bold" style="height:35px;width:200px">{{store.store_name}}</q-card-section>
                <q-card-section style="height:55px;width:200px" align="right">
                  <q-btn color="primary" label="View >" unelevated @click="$router.push('/store/'+store.unique_link)" />
                </q-card-section>  
              </q-card>
            </div>
          </q-scroll-area>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: "1",
      data:[]
    };
  },
  async mounted() {

    var stores=await this.$dbCon.service("store-advertisment").find({
      query: {
        "$select": ['store_id'],
        "subscriptions.date_end": {
          $gte: new Date()
        }
      }
    }).then(featuredStoresId=>{
      var arrFeaturedStoresId=[]
      featuredStoresId.data.forEach(function(featureStore){
        console.log("IDD",featureStore)
        arrFeaturedStoresId.push(featureStore.store_id)
      });
      return arrFeaturedStoresId
    });
    
    await this.$dbCon.service("store").find({
      query:{
        _id: {
          $in: stores
        }
      }
    }).then(results=>{
     this.data=results.data
    })
  }
};
</script>