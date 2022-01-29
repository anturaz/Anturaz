<template>
  <div>
    <div>
      <FeaturedPhotosSection v-if="!$q.screen.lt.md" />
      <CategoriesSection :style="!$q.screen.lt.md? 'position: absolute; left:100px; top: 280px; max-width:510px': '' " />
      <FeaturedStoresSection />
      <RecommendedServices />
      <RecommendedProducts />
    </div>
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
  }
};
</script>
<style lang="sss" scoped>


</style>