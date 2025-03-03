<template>
  <div class="q-gutter-sm">
    <q-tabs
      v-model="tab"
      dense
      no-caps
      align="left"
      inline-label
      class="bg-primary text-white"
    >
      <q-tab name="Store Details" icon="list" label="Store Details" />
      <q-tab name="Portfolio" icon="dashboard" label="Profolio" />
    </q-tabs>

    <StoreProfile v-if="tab == 'Store Details'" />
    <Portfolio class="q-pa-lg" v-else />
  </div>
</template>

<script>
import StoreProfile from "../PublishStore/StoreDetails.vue";
import Portfolio from "../Portfolio/Portfolio.vue";
export default {
  components: {
    StoreProfile,
    Portfolio
  },
  data() {
    return {
      tab: "Store Details"
    };
  }
};
</script>

<style></style>
