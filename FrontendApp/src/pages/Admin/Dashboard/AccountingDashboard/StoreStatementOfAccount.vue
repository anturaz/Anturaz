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
          label: "Date Recieved",
          field: "recieved_date"
        },
        {
          label: "Store name",
          field: "store_name"
        },
        {
          label: "Store ID",
          field: "store_id"
        },
        {
          label: "SKU",
          field: "sku"
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
          label: "With Holding Tax",
          field: "with_holding_tax"
        },
        {
          label: "Sales Commission",
          field: "sales_commission"
        },
        {
          label: "Net Sales",
          field: "net_sales"
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
          query: { store_id: this.selectedStore.value }
        })
        .then(results => {
          let totalGrossSales = 0,
            totalMdr = 0,
            totalServiceFee = 0,
            totalNetSales = 0;

          this.data = results.data.map((record, index) => {
            totalGrossSales += parseFloat(record.gross_sales);
            totalMdr += parseFloat(record.mdr);
            totalServiceFee += parseFloat(record.service_fee);
            totalNetSales += parseFloat(record.net_sales);

            return {
              ...record,
              transaction_date: this.$formatDate(record.transaction_date),
              recieved_date: this.$formatDate(record.recieved_date),

              regular_price: this.$prettyMoney(record.regular_price),
              sale_price: this.$prettyMoney(record.sale_price),
              gross_sales: this.$prettyMoney(record.gross_sales),
              net_sale: this.$prettyMoney(record.net_sale),
              mdr: this.$prettyMoney(record.mdr),
              service_fee: this.$prettyMoney(record.service_fee),
              net_sales: this.$prettyMoney(record.net_sales)
            };
          });

          // Remove duplicates based on `_id`
          this.data = [
            ...new Map(this.data.map(item => [item._id, item])).values()
          ];
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

<style></style>
