<template>
  <div>
    <ServiceDetails
      :order="order"
      buttonLabel="Receive"
      :updateFunction="update"
      :buttonVisible="true"
    />
  </div>
</template>

<script>
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
export default {
  props: ["order"],
  components: {
    ServiceDetails
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
          this.order.status = "For Rating";

          this.order.logs.push({
            event: "Received",
            date: new Date()
          });
          this.$dbCon
            .service("service-transactions")
            .patch(this.order._id, this.order)
            .then(() => {
              this.opened = false;
              this.$createSalesRecord(this.order, "Service");
            });
          //EMAIL
        });
    }
  }
};
</script>

<style>
</style>