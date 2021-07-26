<template>
  <div>
     <ServiceDetails :order="order" :updateFunction="update" buttonLabel="SHIP OUT" :buttonVisible="true" />
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
          title: "Mark as Ship Out",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
         this.order.status = "For Receiving";
          this.order.logs.push({
            event: "Ship-out",
            date: new Date()
          });
          this.$dbCon
            .service("service-transactions")
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