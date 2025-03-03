<template>
  <div>
    <Reports
      :start_date="start_date"
      :end_date="end_date"
      :header="header"
      :data="data"
      generateExcel
      generatePDF
      :total="total"
    />
  </div>
</template>

<script>
import Reports from "components/reports.vue";
export default {
  components: {
    Reports
  },

  // transaction_date
  // date_received
  // store_name
  // store_id
  // SKU
  // description
  // regular_price
  // sale_price
  // type
  // quantity
  // gross_sales
  // with_holding_tax
  // sales_commission
  // net_sales

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
      data: [],
      start_date: "2019/11/15",
      end_date: "2020/03/31",
      total: {
        totalGrossSales: 0,
        totalMdr: 0,
        totalServiceFee: 0,
        totalNetSales: 0
      }
    };
  },
  methods: {
    getData: async function() {
      console.log();
      this.data = [];
      this.$dbCon
        .service("report-sales")
        .find({
          query: {
            store_id: this.$local.getItem("store_token"),
            $sort: {
              transaction_date: -1 // Sort by date in descending order
            }
          }
        })

        .then(results => {
          this.data = results.data;
          console.log("transactions data", results.data);
          let totalGrossSales = 0;
          let totalMdr = 0;
          let totalServiceFee = 0;
          let totalNetSales = 0;

          this.data.map((record, index) => {
            totalGrossSales += parseFloat(+this.data[index].gross_sales);
            totalMdr += parseFloat(this.data[index].mdr);
            totalServiceFee += parseFloat(this.data[index].service_fee);
            totalNetSales += parseFloat(this.data[index].net_sales);

            this.data[index].transaction_date = this.$formatDate(
              this.data[index].transaction_date
            );

            this.data[index].recieved_date = this.$formatDate(
              this.data[index].recieved_date
            );
            this.data[index].regular_price = this.$prettyMoney(
              this.data[index].regular_price
            );
            this.data[index].sale_price = this.$prettyMoney(
              this.data[index].sale_price
            );
            this.data[index].gross_sales = this.$prettyMoney(
              this.data[index].gross_sales
            );
            this.data[index].net_sale = this.$prettyMoney(
              this.data[index].net_sale
            );
            this.data[index].mdr = this.$prettyMoney(this.data[index].mdr);
            this.data[index].service_fee = this.$prettyMoney(
              this.data[index].service_fee
            );
            this.data[index].net_sales = this.$prettyMoney(
              this.data[index].net_sales
            );
            // Accumulate totals

            // delete this.data[0].store_id;
            delete this.data[index]._id;
            delete this.data[index].convenience_fee;
            delete this.data[index].revenue;
          });
          // console.log(totalGrossSales);
          this.total.totalGrossSales = this.$prettyMoney(totalGrossSales);
          this.total.totalMdr = this.$prettyMoney(totalMdr);
          this.total.totalServiceFee = this.$prettyMoney(totalServiceFee);
          this.total.totalNetSales = this.$prettyMoney(totalNetSales);
        });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    start_date: function() {
      this.getData();
    },
    end_date: function() {
      this.getData();
    }
  }
};
</script>

<style></style>
