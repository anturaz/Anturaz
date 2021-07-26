<template>
  <div>
    <ProductDetails
      :order="order"
      buttonLabel="Package"
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
          title: "Mark as Packaged",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          if (this.order.mode_of_delivery == "Shipping") {
            this.order.status = "For Shipping";
          } else if (this.order.mode_of_delivery == "Pickup") {
            this.order.status = "For Pickup";
          }
          this.order.logs.push({
            event: "Packaged",
            date: new Date()
          });
          this.$dbCon
            .service("product-transactions")
            .patch(this.order._id, this.order)
            .then(() => {
              this.opened = false;
            });
          //EMAIL
        });
    }
  }
};
</script>

<style>
</style>