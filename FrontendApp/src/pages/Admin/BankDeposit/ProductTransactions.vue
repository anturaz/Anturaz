<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Bank Deposit" icon="account_balance" />
        <q-breadcrumbs-el label="Product Transactions" icon="list" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md row">
      <q-card class="col-xs-12 col-md-3 q-ma-sm" v-for="BD in data" :key="BD._id">
        <q-card-section>
          <ShopperEvaluation :paymentDetails="BD" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import ShopperEvaluation from "./Components/ShopperEvaluation.vue";
export default {
  components: {
    ShopperEvaluation
  },
  data() {
    return {
      data: []
    };
  },
  async mounted() {
    await this.$dbCon.authenticate();
    this.$dbCon.service("shopper-payments").onDataChange(() => {
      this.$dbCon
        .service("shopper-payments")
        .find({
          query: {
            payment_option: "Bank Deposit",
            "deposit_details.status": "For Approval",
            type: "Product"
          }
        })
        .then(results => {
          this.data = results.data;
        });
    });
  }
};
</script>

<style>
</style>