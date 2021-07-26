<template>
  <div class="q-pt-md">
    <q-select
      filled
      class="q-pr-xl q-pl-xl"
      v-model="type_of_report"
      :options="['Store Ads Subscription','Item Subscription','Storage Subscription','User Access Subscription']"
      label="Type of Report"
    />
  
    <FeaturedStore v-if="type_of_report=='Store Ads Subscription'" />
    <RecommendedItems v-else-if="type_of_report!='Store Ads Subscription'" />
  </div>
</template>

<script>
import FeaturedStore from "pages/Admin/Dashboard/MarketingDashboard/FeaturedStore.vue";
import RecommendedItems from "pages/Admin/Dashboard/MarketingDashboard/RecommendedItems.vue";
export default {
  components: {
    FeaturedStore,
    RecommendedItems
  },
  data() {
    return {
      type_of_report: "Store Ads Subscription"
    };
  }
};
</script>

<style>
</style>