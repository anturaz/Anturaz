<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-header reveal elevated>
      <q-toolbar>
        <img :src="$appLink+'/uploads/admin/logo.png'" width="40px" />
        <q-toolbar-title>ANTURAZ</q-toolbar-title>
        <div>Admin</div>
        <q-btn flat round dense icon="logout" @click="logout" />
      </q-toolbar>

      <q-bar>
        <div
          class="cursor-pointer non-selectable"
          @click="$router.push('/Admin/Dashboard')"
        >Dashboard</div>&nbsp;
        <div class="q-ml-md cursor-pointer non-selectable">
          Maintenance
          <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list dense style="min-width: 100px">
              <q-item clickable @click="$router.push('/Admin/Maintenance/Categories')">
                <q-item-section>Categories</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/Maintenance/Payment')">
                <q-item-section>Payment</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/Maintenance/SocialMedia')">
                <q-item-section>Social Media</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/Maintenance/Layout/Logo')">
                <q-item-section>Layout</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="$router.push('/Admin/Maintenance/SystemUser')">
                <q-item-section>System User</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/Maintenance/Store')">
                <q-item-section>Store</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/Maintenance/Shopper')">
                <q-item-section>Shopper</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="$router.push('/Admin/Maintenance/Utilities')">
                <q-item-section>Utilities</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="q-ml-md cursor-pointer non-selectable">
          Bank Deposit
          <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list dense style="min-width: 100px">
              <q-item clickable @click="$router.push('/Admin/BankDeposit/ProductTransactions')">
                <q-item-section>Product Transactions</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/BankDeposit/ServiceTransactions')">
                <q-item-section>Service Transactions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="$router.push('/Admin/BankDeposit/ProductSubscriptions')">
                <q-item-section>Product Subscriptions</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/BankDeposit/ServiceSubscriptions')">
                <q-item-section>Service Subscriptions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="$router.push('/Admin/BankDeposit/StoreAdvertisment')">
                <q-item-section>Store Advertisment</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/BankDeposit/ProductAdvertisment')">
                <q-item-section>Product Advertisment</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/Admin/BankDeposit/ServiceAdvertisment')">
                <q-item-section>Service Advertisment</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <q-space />
      </q-bar>
    </q-header>
    <q-page-container class>
      <q-page class="q-pa-lg">
        <div :class="$q.screen.lt.md? '': 'row'">
          <div class="col-2"></div>
          <router-view class="col-8" />
          <div class="col-2"></div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    logout: async function() {
      await this.$dbCon.logout();
      this.$local.clear();
      this.$router.push("/Admin/Login");
    }
  },
  mounted() {
    if (!this.$local.has(this.$appLink+"-jwt")) {
      this.$local.clear();
      this.$router.push("/Admin/Login");
    } else {
      this.$dbCon.authenticate();
    }
  }
};
</script>
