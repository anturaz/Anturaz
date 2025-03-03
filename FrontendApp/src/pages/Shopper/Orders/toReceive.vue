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

import {
  emailSender,
  shopperManualRecievedOrder,
  vendorManualRecievedOrder
} from "../../../api/services/authenticationService";
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
          // Send Email if needed
        });
    },

    async markAsReceived() {
      this.order.status = "For Rating";
      this.order.logs.push({
        event: "Received",
        date: new Date().toISOString()
      });

      this.order.recieved_date = new Date().toISOString();

      const order = await this.$dbCon
        .service("product-transactions")
        .patch(this.order._id, this.order);

      const shopperData = {
        email: order.checkout_data.data.customer.contact.email
      };
      const shopperSubject = "Anturaz - Transaction was marked as received";
      const shopperMessage = shopperManualRecievedOrder(order);
      await emailSender(shopperData, shopperMessage, shopperSubject);

      const vendorData = {
        email: order.store_data.email
      };
      const vendorSubject = "Anturaz - Transaction was marked as received";
      const vendorMessage = vendorManualRecievedOrder(order);
      await emailSender(vendorData, vendorMessage, vendorSubject);
      console.log("test");
      console.log(this.order);
      this.opened = false;
      this.$createSalesRecord(this.order, "Product");
    },

    // Check if the order should be auto-accepted
    async checkAutoAccept() {
      // if (!this.order.date_needed) return;
      // this.order.logs.push({
      //   event: "Auto Accepted by system",
      //   date: new Date().toISOString()
      // });
      // const dateNeeded = new Date(this.order.date_needed);
      // const now = new Date();
      // const hoursPassed = (now - dateNeeded) / (1000 * 60 * 60); // Convert ms to hours
      // console.log(hoursPassed);
      // if (hoursPassed >= 48 && this.order.status !== "For Rating") {
      //   console.log("Auto-accepting order:", this.order._id);
      //   await this.markAsReceived();
      // }
    }
  },

  async mounted() {
    await this.checkAutoAccept();
  }
};
</script>

<style scoped></style>
