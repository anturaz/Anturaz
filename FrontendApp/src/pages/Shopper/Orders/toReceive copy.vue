<template>
  <div>
    <ProductDetails
      :order="order"
      buttonLabel="Receive"
      :buttonVisible="true"
      :updateFunction="update"
    />
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
export default {
  props: ["order"],
  components: {
    ProductDetails
  },
  methods: {
    update: function() {
      this.$q
        .dialog({
          title: "Mark as Received",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.markAsReceived();
          //EMAIL
        });
    },

    async markAsReceived() {
      this.order.status = "For Rating";

      this.order.logs.push({
        event: "Received",
        date: new Date().toISOString()
      });

      await this.$dbCon
        .service("product-transactions")
        .patch(this.order._id, this.order);

      this.opened = false;
      this.$createSalesRecord(this.order, "Product");
    },
    checkAutoAccept() {
      const now = new Date();
      const autoAcceptTime = new Date();
      autoAcceptTime.setHours(23, 20, 0, 0); // Set to 11:20 PM today

      const timeUntilAutoAccept = autoAcceptTime - now; // Time difference in milliseconds
      console.log;
      if (timeUntilAutoAccept > 0) {
        setTimeout(() => {
          if (this.order.status !== "For Rating") {
            this.order.status = "For Rating";
            this.order.logs.push({
              event: "Auto-Accepted",
              date: new Date()
            });

            this.$dbCon
              .service("product-transactions")
              .patch(this.order._id, {
                status: this.order.status,
                logs: this.order.logs
              })
              .then(() => {
                console.log("Order auto-accepted at 11:20 PM.");
              });
          }
        }, timeUntilAutoAccept);
      }
    }
  },

  async mounted() {
    await this.checkAutoAccept();
  }
};
</script>

<style></style>
