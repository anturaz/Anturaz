<template>
  <div class="q-pa-lg" v-if="data.length">
    
            <h6><span>Featured Shops</span></h6><q-separator vertical/>
          <!-- <q-btn class="text-primary bg-white"  label="Shop Now" /> -->
        <div class="q-pl-md text-black">
          <!-- <q-scroll-area horizontal style="overflow: overlay; height: 175px; width: 100%;"> -->
            <div class="row no-wrap">
              <div class="row no-wrap justify-center " v-for="store in data" :key="store._id" >
                    <q-separator vertical inset />
                    <q-card flat style="cursor:pointer; height: 150px; width: 225px">
                    
                      <q-card-section  class="column items-center">
                        <div class="row inline">
                            
                          <div>
                          <q-icon :name="store.logo" size="80px"/>
                          </div>
                        </div>
                      
                        
                      </q-card-section>
                      <q-card-section class="column items-center" style="height: 100px; width: 200px;">
                        
                        <div class="text-h6" v-if="'store_name' in store">
                          {{ store.store_name }}
                        </div>
                      </q-card-section>
                
                  </q-card>
          
                

              </div>
         
              
              <!-- <div class="q-ma-md" v-for="store in data" :key="store._id" style="width: 200px">
                
                <q-icon name="img:/../assets/facebook_logo.png" color="primary" size="150px"/>
              
                <div class="text-bold" >{{store.store_name}}
                  
                </div>  
                
                 <q-separator vertical />

                <q-card-section style="height:55px;width:200px" align="right">
                  <q-btn color="primary" label="View >" unelevated @click="$router.push('/store/'+store.unique_link)" />
                </q-card-section>  
              </div> -->
             </div>
            
          <!-- </q-scroll-area> -->
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: "1",
      data:[
        {
          _id: "1",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "2",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "3",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "4",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "5",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "6",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "7",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "8",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },
        {
          _id: "9",
          logo: "img:/../assets/facebook_logo.png",
          store_name: "store name"
        },


      ]
    };
  },
  async mounted() {

    // var stores=await this.$dbCon.service("store-advertisment").find({
    //   query: {
    //     "$select": ['store_id'],
    //     "subscriptions.date_end": {
    //       $gte: new Date()
    //     }
    //   }
    // }).then(featuredStoresId=>{
    //   var arrFeaturedStoresId=[]
    //   console.log("featuredStoresId",featuredStoresId)
    //   featuredStoresId.data.forEach(function(featureStore){
    //     console.log("IDD",featureStore)
    //     arrFeaturedStoresId.push(featureStore.store_id)
    //   });
    //   return arrFeaturedStoresId
    // });
    
    // await this.$dbCon.service("store").find({
    //   query:{
    //     _id: {
    //       $in: stores
    //     }
    //   }
    // }).then(results=>{
    //  console.log("resres", results)
    //  this.data=results.data
    // })
  }
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
.vl {
  border-left: 1.5px solid #d8a957;
  height: 220px;
}
</style>