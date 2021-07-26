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
          label: "Item",
          field: "item"
        },
        {
          label: "Item Type",
          field: "item_type"
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
    //ALL PRODUCT TRANSACTIONS
    var product_transactions = await this.$dbCon
      .service("product-advertisment")
      .find({
        query: {
          status: "Paid",
          $select: [
            "store_id",
            "related_id",
            "date_ordered",
            "date_paid",
            "date_end",
            "months",
            "total_amount"
          ]
        }
      })
      .then(results => {
        return results.data;
      });

    product_transactions.map((product_transaction, index) => {
      this.$dbCon
        .service("store")
        .find({
          query: {
            _id: product_transaction.store_id
          }
        })
        .then(async results => {
          product_transactions[index].store_name =
            results.data[0].store_name || "";
        });
      this.$dbCon
        .service("products")
        .find({
          query: {
            _id: product_transaction.related_id
          }
        })
        .then(results => {
          product_transactions[index].item = results.data[0].product_name || "";
          product_transactions[index].item_type = "Product" || "";
          product_transactions[index].amount =
            product_transactions[index].total_amount || "";
          delete product_transactions[index].store_id;
          delete product_transactions[index].related_id;
        });
    });
    //ALL SERVICE TRANSACTIONS
    var service_transactions = await this.$dbCon
      .service("service-advertisment")
      .find({
        query: {
          status: "Paid",
          $select: [
            "store_id",
            "related_id",
            "date_ordered",
            "date_paid",
            "date_end",
            "months",
            "total_amount"
          ]
        }
      })
      .then(results => {
        return results.data;
      });
    service_transactions.map(async (service_transaction, index) => {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: service_transaction.store_id
          }
        })
        .then(async results => {
          service_transactions[index].store_name =
            results.data[0].store_name || "";
        });
      await this.$dbCon
        .service("services")
        .find({
          query: {
            _id: service_transaction.related_id
          }
        })
        .then(results => {
          service_transactions[index].item = results.data[0].service_name || "";
          service_transactions[index].item_type = "Service" || "";
          service_transactions[index].amount =
            service_transactions[index].total_amount || "";
          delete service_transactions[index].store_id;
          delete service_transactions[index].related_id;
        });
      if (index == service_transactions.length - 1) {
        this.data = product_transactions.concat(service_transactions);
      }
    });
  }
};
</script>

<style>
</style>