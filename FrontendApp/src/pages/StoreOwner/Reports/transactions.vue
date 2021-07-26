<template>
  <div>
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
          field: "regular_price",
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
        }
      ],
      data: [],
      start_date: "2019/11/15",
      end_date: "2020/03/31"
    };
  },
  methods: {
    getData: async function() {
      this.data = [];
      this.$dbCon
        .service("report-sales")
        .find({
          query: {
            store_id: this.$local.store_token
          }
        })
        .then(results => {
          this.data = results.data;

          this.data.map((record, index) => {
            this.data[index].transaction_date = this.$formatDate(
              this.data[index].transaction_date
            );
             this.data[index].regular_price= this.$prettyMoney(this.data[index].regular_price)
              this.data[index].sale_price= this.$prettyMoney(this.data[index].sale_price)
               this.data[index].gross_sales= this.$prettyMoney(this.data[index].gross_sales)
                this.data[index].mdr= this.$prettyMoney(this.data[index].mdr)
                 this.data[index].service_fee= this.$prettyMoney(this.data[index].service_fee)
                  this.data[index].net_sales= this.$prettyMoney(this.data[index].net_sales)
            delete this.data[0].store_id;
            delete this.data[index]._id;
            delete this.data[index].convenience_fee;
            delete this.data[index].revenue;
          });
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

<style>
</style>