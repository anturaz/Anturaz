<template>
  <div class="q-pt-md">
    <q-select
      filled
      class="q-pr-xl q-pl-xl"
      v-model="selectedStore"
      use-input
      input-debounce="0"
      label="Stores"
      :options="stores"
      @filter="filterFn"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
    </q-select>
    <Reports
      :start_date="start_date"
      :end_date="end_date"
      :header="header"
      :data="data"
      generateExcel
      generatePDF
    />
  </div>
</template>

<script>
import Reports from "components/reports.vue";
export default {
  components: {
    Reports
  },
  data() {
    return {
      header: [
        {
          label: "Transaction Date",
          align: "left",
          field: "transaction_date"
        },
        {
          label: "SKU",

          field: "SKU"
        },
        {
          label: "Description",
          field: "description"
        },
        {
          label: "Regular Price",
          field: "regular_price"
        },
        {
          label: "Sale Price",
          field: "sale_price"
        },
        {
          label: "Type",
          field: "type"
        },
        {
          label: "Quantity",
          field: "quantity"
        },
        {
          label: "Gross Sales",
          field: "gross_sales"
        },
        {
          label: "MDR",
          field: "mdr"
        },
        {
          label: "Service Fees",
          field: "service_fee"
        },
        {
          label: "Net Sales",
          field: "net_sales"
        },
        {
          label: "Convenience Fee",
          field: "convenience_fee"
        },
        {
          label: "Revenue",
          field: "revenue"
        }
      ],
      stores: [],
      stringOptions: [],
      selectedStore: {},
      data: [],
      start_date: "2019/11/15",
      end_date: "2019/11/30"
    };
  },
  async mounted() {
    var stores = await this.$dbCon
      .service("store")
      .find({
        query: {
          $select: [
            "_id",
            "store_name",
            "account_name",
            "bank_name",
            "account_number"
          ]
        }
      })
      .then(results => {
        results.data.map(store => {
          this.stores.push({
            label: store.store_name,
            value: store._id,
            account_name: store.account_name,
            bank_name: store.bank_name,
            account_number: store.account_number
          });
          this.stringOptions.push({
            label: store.store_name,
            value: store._id,
            account_name: store.account_name,
            bank_name: store.bank_name,
            account_number: store.account_number
          });
        });
        this.selectedStore = this.stores[0];
        return results.data;
      });
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.stores = this.stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.stores = this.stringOptions.filter(
          v =>
            JSON.stringify(v)
              .toLowerCase()
              .indexOf(needle) > -1
        );
      });
    },
    getData: async function() {
      this.data = [];
      this.$dbCon
        .service("report-sales")
        .find({
          query: {
            store_id: this.selectedStore.value
          }
        })
        .then(results => {
          this.data = results.data;

          this.data.map((record, index) => {
            this.data[index].transaction_date = this.$formatDate(
              this.data[index].transaction_date
            );
            delete this.data[0].store_id;
            delete this.data[index]._id;
            
          });
        });
    }
  },
  watch: {
    selectedStore: function() {
      this.getData();
    }
  }
};
</script>

<style>
</style>