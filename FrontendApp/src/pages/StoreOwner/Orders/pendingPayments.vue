<template>
  <div>
    <ProductDetails
      :order="order"
      :buttonVisible="false"
    />
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
export default {
  props: ["order"],
  components: {
    ProductDetails
  }
};
</script>

<style>
</style>