<template>
  <div>
    <ProductDetails :order="order" buttonLabel="Acknowledge" :buttonVisible="true" :updateFunction="update" />
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
          title: "Mark as Acknowledged",  
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.order.status = "For Packaging";
          this.order.logs.push({
            event: "Acknowledged",
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