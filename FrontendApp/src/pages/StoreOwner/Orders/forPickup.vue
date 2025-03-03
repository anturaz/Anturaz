<template>
  <div>
    <ProductDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      buttonLabel="Pickup"
      :buttonVisible="true"
      :updateFunction="update"
    />
    <productDetailsMobile
      v-else
      buttonLabel="Pickup"
      :buttonVisible="true"
      :updateFunction="update"
      :order="order"
    />
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
import productDetailsMobile from "../../../components/ItemDetails/productDetailsMobile.vue";

export default {
  props: ["order"],
  components: {
    ProductDetails,
    productDetailsMobile
  },
  methods: {
    update: function() {
      this.$q
        .dialog({
          title: "Mark as Picked Up",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.order.status = "For Rating";
          this.order.logs.push({
            event: "Picked up",
            date: new Date()
          });
          this.order.logs.push({
            event: "Received",
            date: new Date()
          });
          this.order.recieved_date = new Date().toISOString();
          this.$dbCon
            .service("product-transactions")
            .patch(this.order._id, this.order)
            .then(() => {
              this.$createSalesRecord(this.order, "Product");
              this.opened = false;
            });
          //EMAIL
        });
    }
  }
};
</script>

<style></style>
