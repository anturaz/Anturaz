<template>
  <div>
    <div class="row">
      <!-- Shoppers -->
      <q-card flat bordered class="col-xs-6 col-md-3">
        <q-card-section>
          <q-icon name="shopping_cart" color="primary" size="50px" class="q-mr-md" />
          <span class="text-h5 text-bold">Shoppers</span>
        </q-card-section>
        <q-card-section class="q-pt-none text-h4" align="right">{{shoppers}}</q-card-section>
      </q-card>
      <!-- Store Owner -->
      <q-card flat bordered class="col-xs-6 col-md-3">
        <q-card-section>
          <q-icon name="store" color="primary" size="50px" class="q-mr-md" />
          <span class="text-h5 text-bold">Store</span>
        </q-card-section>
        <q-card-section class="q-pt-none text-h4" align="right">{{store}}</q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered class="col-xs-6 col-md-3">
        <q-card-section>
          <q-icon name="assessment" color="primary" size="50px" class="q-mr-md" />
          <span class="text-h5 text-bold">Transactions</span>
        </q-card-section>
        <q-card-section class="q-pt-none text-h4" align="right">{{transactions}}</q-card-section>
      </q-card>
      <!--  -->
      <q-card flat bordered class="col-xs-6 col-md-3">
        <q-card-section>
          <q-icon name="find_in_page" color="primary" size="50px" class="q-mr-md" />
          <span class="text-h5 text-bold">Page Views</span>
        </q-card-section>
        <q-card-section class="q-pt-none text-h4" align="right">0</q-card-section>
      </q-card>
    </div>
    <!-- DASHBOARD -->
    <div class="q-pt-md">
      <q-tabs v-model="dashboard_tab" inline-label class="bg-primary text-white shadow-2">
        <q-tab name="accounting" icon="payment" label="Accounting Dashboard" />
        <q-tab name="marketing" icon="insert_chart_outlined" label="Marketing Dashboard" />
      </q-tabs>
      <AccountingDashboard v-if="dashboard_tab=='accounting'" />
      <MarketingDashboard v-if="dashboard_tab=='marketing'" />
    </div>
  </div>
</template>

<script>
import AccountingDashboard from "./accountingDashboard.vue";
import MarketingDashboard from "./marketingDashboard.vue";
export default {
  components: {
    AccountingDashboard,
    MarketingDashboard
  },
  data() {
    return {
      shoppers: 0,
      store: 0,
      transactions: 0,
      dashboard_tab: "accounting"
    };
  },
  async mounted() {
    this.shoppers = await this.$dbCon
      .service("users")
      .find({
        query: {
          system_user_type: "Shopper"
        }
      })
      .then(results => {
        return results.total;
      });
    this.store = await this.$dbCon
      .service("store")
      .find({})
      .then(results => {
        return results.total;
      });
    this.transactions += await this.$dbCon
      .service("product-transactions")
      .find({})
      .then(results => {
        return results.total;
      });
      this.transactions += await this.$dbCon
      .service("service-transactions")
      .find({})
      .then(results => {
        return results.total;
      });
  }
};
</script>

