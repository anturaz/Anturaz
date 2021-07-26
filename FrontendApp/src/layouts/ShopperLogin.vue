<template>
  <div
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <q-card square bordered class="q-pa-lg shadow-1">
        <ShopperLoginForm :afterLogin="afterLogin" />
      </q-card>
    </div>
  </div>
</template>

<script>
import ShopperLoginForm from "components/shopperLoginForm.vue";
export default {
  components: {
    ShopperLoginForm,
  },
  methods: {
    afterLogin: function () {
      this.$router.push("/");
    },
  },
};
</script>


<style>
.q-card {
  width: 360px;
}
</style>