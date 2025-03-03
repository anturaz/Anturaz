<template>
  <div>
    <ProductDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      :buttonVisible="false"
    />
    <productDetailsMobile v-else :order="order" :buttonVisible="false" />
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
import productDetailsMobile from "../../../components/ItemDetails/productDetailsMobile.vue";
export default {
  props: ["order"],
  components: {
    ProductDetails,
    productDetailsMobile
  }
};
</script>

<style></style>
