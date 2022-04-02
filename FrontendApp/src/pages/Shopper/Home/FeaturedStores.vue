<template>
<div class="q-pa-md">
  <h6><span>Featured Shops</span></h6><q-separator vertical/>
        <!-- <q-btn class="text-primary bg-white"  label="Shop Now" /> -->
        <div class=" row justify-center relative-position">
          
          <q-carousel
            style="overflow: overlay; text-align:center; width: 50%;"
            animated
            control-color="black"
            v-model="slide"
            infinite
            :autoplay="autoplay"
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
          <!-- img-src="https://cdn.quasar.dev/img/mountains.jpg" /> -->
            <q-carousel-slide v-for="(store) in data" :key="store._id" :name="store._id" :img-src="store.logo" style="
  background-size: contain;
  background-repeat: no-repeat; 
  background-color: white;" >
            <div class="absolute-bottom custom-caption">
              <div class="text-subtitle1">{{store.store_name}}</div>
            </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
  </div>


  <!-- <div class="q-pa-lg" v-if="data.length">

    
        <h6><span>Featured Shops</span></h6><q-separator vertical/>
          <q-btn class="text-primary bg-white"  label="Shop Now" />
        <div class=" row text-black">
          <q-scroll-area horizontal style="overflow: overlay; height: 175px; width: 100%;">
            <div class="float-left" style="cursor:pointer; height: 100px">
                <q-btn @click="moveCurrentIndex(1)"  v-show="currentIndex >= 6"  flat> 
                  <q-icon  name="fas fa-angle-left" style="height:150px;"/> 
                </q-btn>
            </div>
            <div class="row no-wrap">
              
              <div class="row no-wrap justify-center " v-for="(store) in selectedData" :key="store._id" >
                
                <div v-else style="cursor:pointer; height: 100px">
                    <q-btn @click="moveCurrentIndex(1)" v-if="currentIndex != 0" flat> <q-icon  name="fas fa-angle-left" style="height:150px;"/> </q-btn>
                </div>
                    
                    <q-separator vertical inset />
                    <q-card flat style="cursor:pointer; height: 150px; width: 210px">
                    
                      <q-card-section  class="column items-center">
                        <div class="row inline">
                            <q-avatar  size="100px" >
                              <img class="my-fb-logo"/> 
                            </q-avatar>
                          <div>
                          <q-icon :name="store.logo" class="my-fb-logo" size="80px"/>
                          </div>
                        </div>
                      
                        
                      </q-card-section>
                      <q-card-section class="column items-center">
                        
                        <div class="text-h6" v-if="'store_name' in store">
                          {{ store.store_name }}
                        </div>
                      </q-card-section>
                
                  </q-card>
                  <q-separator vertical inset />
                  
                    
          
                

              </div>
         
              
              <div class="q-ma-md" v-for="store in data" :key="store._id" style="width: 200px">
                
                <q-icon name="img:/../assets/facebook_logo.png" color="primary" size="150px"/>
              
                <div class="text-bold" >{{store.store_name}}
                  
                </div>  
                
                 <q-separator vertical />

                <q-card-section style="height:55px;width:200px" align="right">
                  <q-btn color="primary" label="View >" unelevated @click="$router.push('/store/'+store.unique_link)" />
                </q-card-section>  
              </div>
              
             </div>
            <div class="float-right"  style="cursor:pointer; height: 100px"  >
              <q-btn @click="moveCurrentIndex(2)" flat v-show="currentIndex+6 <= data.length"> <q-icon  name="fas fa-angle-right" style="height:150px;"  /> </q-btn>
            </div>
            
          </q-scroll-area>
        </div>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      slide: "1",
      autoplay: true,
      currentIndex: 0,
      data:[
        {
          _id: "1",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 1"
        },
        {
          _id: "2",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 2"
        },
        {
          _id: "3",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 3"
        },
        {
          _id: "4",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 4"
        },
        {
          _id: "5",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 5"
        },
        {
          _id: "6",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 6"
        },
        {
          _id: "7",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 7"
        },
        {
          _id: "8",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 8"
        },
        {
          _id: "9",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 9"
        },
        {
          _id: "10",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 10"
        },
        {
          _id: "11",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 11"
        },
        {
          _id: "12",
          logo: "../assets/facebook_logo.png",
          store_name: "store name 12"
        }


      ]
    };
  },
  computed: {
    // readonly
    selectedData() {
      let selArr = this.data.slice(this.currentIndex,this.currentIndex+6)
      return selArr
    },
  },
  methods: {
    moveCurrentIndex(mode) {
      if (mode == 1){
        if(this.data.length > this.currentIndex  ){
          this.currentIndex -= 6
        }
      }else{
        if(this.data.length > this.currentIndex  )
          this.currentIndex += 6
      }
    }
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
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3)
} 
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
.vl {
  border-left: 1.5px solid #d8a957;
  height: 220px;
}
.my-fb-logo {
  background-image: url(../../../assets/anturaz_logo.png);
	background-size: 50px;
  
}


</style>