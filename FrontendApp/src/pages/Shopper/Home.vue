<template>
  <!-- <div>
    <div >
      <FeaturedPhotosSection v-if="!$q.screen.lt.md" />
      
      <FeaturedStoresSection />
      <RecommendedServices />
      <RecommendedProducts />
    </div>
  </div> -->
  <div>
    <!-- <q-img src="../../assets/bg2.png" class="fullscreen" /> -->
    <q-layout class="vertical-center">
      <CategoriesSection :style="!$q.screen.lt.md? 'position: absolute; left:100px; top: 80px; max-width:300px': '' " />
        
    </q-layout>
    <FeaturedStoresSection  />
    <!-- remote recommended services -->
    <!-- <RecommendedServices /> -->
    <RecommendedProducts />
  </div>

</template>
<script>
import FeaturedPhotosSection from "pages/Shopper/Home/FeaturedPhotos.vue";
import CategoriesSection from "pages/Shopper/Home/Categories.vue";
import FeaturedStoresSection from "pages/Shopper/Home/FeaturedStores.vue";
import RecommendedServices from "pages/Shopper/Home/RecommendedServices.vue";
import RecommendedProducts from "pages/Shopper/Home/RecommendedProducts.vue";
export default {
  components: {
    FeaturedPhotosSection,
    CategoriesSection,
    FeaturedStoresSection,
    RecommendedServices,
    RecommendedProducts
  },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.$dbCon
      .service("categories")
      .find({})
      .then(results => {
        this.data = results.data;
      });
  }
};
</script>

<style scoped>
.bg-image {
	background-image: url(../../assets/anturaz_home.jpg);
	background-repeat: no-repeat;
	background-size: contain;
}

div.scroll {
  width: auto;
  overflow-y: auto;
  text-align: center;
}


</style>