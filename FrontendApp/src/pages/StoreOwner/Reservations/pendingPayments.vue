<template>
  <div>
    <ServiceDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      :buttonVisible="false"
    />
    <ServiceDetailsMobile :order="order" :buttonVisible="false" v-else />
  </div>
</template>

<script>
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
import ServiceDetailsMobile from "components/ItemDetails/serviceDetailsMobile.vue";

export default {
  props: ["order"],
  components: {
    ServiceDetails,
    ServiceDetailsMobile
  }
};
</script>

<style></style>
