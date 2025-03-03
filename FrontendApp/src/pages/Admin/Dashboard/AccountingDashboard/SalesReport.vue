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
          label: "Store Name",
          align: "left",
          field: "store_name"
        },
        {
          label: "Gross Sales",
          field: "gross_sales"
        },
        {
          label: "Account Name",
          field: "account_name"
        },
        {
          label: "Bank Name",
          field: "bank_name"
        },
        {
          label: "Account Number",
          field: "account_number"
        }
      ],
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
        return results.data;
      });

    stores.map(async (store, index) => {
      // console.log("STORE", store);
      var gross_sales = 0;
      //GET ALL PRODUCT TRANSACTION OF THE CURRENT STORE
      var product_transactions = await this.$dbCon
        .service("product-transactions")
        .find({
          query: {
            store_id: store._id
          }
        })
        .then(results => {
          return results.data;
        });

      //GET ALL SERVICE TRANSACTION OF THE CURRENT STORE
      var service_transactions = await this.$dbCon
        .service("service-transactions")
        .find({
          query: {
            store_id: store._id
          }
        })
        .then(results => {
          return results.data;
        });
      //MERGE PRODUCT AND SERVICE TRANSACTIONS
      var transactions = product_transactions.concat(service_transactions);

      //GETTING ALL GROSS PAYMENTS
      transactions.map(async (transaction, i) => {
        await this.$dbCon
          .service("shopper-payments")
          .find({
            query: {
              related_id: transaction._id
            }
          })
          .then(result => {
            gross_sales += result.data[0].total;
            // console.log(gross_sales);
          });
        if (i == transactions.length - 1) {
          stores[index].gross_sales = gross_sales;
          delete stores[index]._id;
          // console.log("HIIII", stores[index]);
          this.data = stores;
        }
      });
    });
    t;
  }
};
</script>

<style></style>
