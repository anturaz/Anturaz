<template>
  <div>
    <ServiceDetails
      :order="order"
      :buttonVisible="false"
    />
  </div>
</template>

<script>
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
export default {
  props: ["order"],
  components: {
    ServiceDetails
  }
};
</script>

<style>
</style>