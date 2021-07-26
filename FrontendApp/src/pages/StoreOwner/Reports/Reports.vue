<template>
  <div>
    <q-select
      filled
      v-model="type_of_report"
      :options="['Transactions']"
      label="Type of Report"
    />
    <!-- ,'Inventory','Sales' -->
    <TransactionsReport v-if="type_of_report=='Transactions'" />
    <InventoryReport v-if="type_of_report=='Inventory'" />
    <SalesReport v-if="type_of_report=='Sales'" />
  </div>
</template>

<script>
import TransactionsReport from './transactions.vue'
import InventoryReport from './inventory.vue'
import SalesReport from './sales.vue'
export default {
    components: {
        TransactionsReport,
        InventoryReport,
        SalesReport
    },
  data() {
    return {
      type_of_report: "Transactions"
    };
  }
};
</script>

<style>
</style>