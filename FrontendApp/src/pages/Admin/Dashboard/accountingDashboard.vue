<template>
  <div class="q-pt-md">
    <q-select
      filled
      class="q-pr-xl q-pl-xl"
      v-model="type_of_report"
      :options="['Store Statement of Account', 'Sales Report']"
      label="Type of Report"
    />
    <SalesReport v-if="type_of_report == 'Sales Report'" />
    <StoreStatementOfAccount
      v-else-if="type_of_report == 'Store Statement of Account'"
    />
  </div>
</template>

<script>
import SalesReport from "pages/Admin/Dashboard/AccountingDashboard/SalesReport.vue";
import StoreStatementOfAccount from "pages/Admin/Dashboard/AccountingDashboard/StoreStatementOfAccount.vue";

export default {
  components: {
    SalesReport,
    StoreStatementOfAccount
  },
  data() {
    return {
      type_of_report: "Store Statement of Account"
    };
  }
};
</script>

<style></style>
