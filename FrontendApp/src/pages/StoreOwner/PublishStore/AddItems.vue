<template>
  <div>
    <ManageItems />
    <!-- <ManageProducts />
    <ManageServices /> -->
  </div>
</template>

<script>
import ManageItems from "pages/StoreOwner/ManageItems.vue"
import ManageProducts from "pages/StoreOwner/ManageProducts.vue";
import ManageServices from "pages/StoreOwner/ManageServices.vue";
export default {
  components: {
    ManageItems,
    ManageProducts,
    ManageServices
  }
};
</script>

<style>
</style>