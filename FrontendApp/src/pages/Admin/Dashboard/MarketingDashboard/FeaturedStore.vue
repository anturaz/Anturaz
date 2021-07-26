<template>
  <div class="q-pt-md">
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
          label: "Store Name",
          align: "left",
          field: "store_name"
        },
        {
          label: "Month/s",
          field: "months"
        },
        {
          label: "Date Ordered",
          field: "date_ordered"
        },
        {
          label: "Date Paid",
          field: "date_paid"
        },
        {
          label: "Date End",
          field: "date_end"
        },
        {
          label: "Amount",
          field: "amount"
        }
      ],
      data: [],
      start_date: "2019/11/15",
      end_date: "2019/11/30"
    };
  },
  async mounted() {
    this.$dbCon
      .service("store-advertisment")
      .find({
        query: {}
      })
      .then(results => {
        results.data.map(store_advertisment => {
          store_advertisment.subscriptions.map(ads => {
            if (ads.status == "Paid") {
              this.$dbCon
                .service("store")
                .find({
                  query: {
                    _id: store_advertisment.store_id
                  }
                })
                .then(store_details => {
                  this.data.push({
                    store_name: store_details.data[0].store_name || "",
                    months: ads.months || "",
                    date_ordered: ads.date_ordered || "",
                    date_paid: ads.date_paid || "",
                    date_end: ads.date_end || "",
                    amount: ads.total_amount || ""
                  });
                });
            }
          });
        });
      });
  }
};
</script>

<style>
</style>