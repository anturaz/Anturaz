<template>
  <div>
    <ServiceDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      :updateFunction="update"
      :buttonVisible="false"
    />
    <ServiceDetailsMobile
      :order="order"
      :updateFunction="update"
      :buttonVisible="false"
      v-else
    />
  </div>
</template>

<script>
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
import ServiceDetailsMobile from "components/ItemDetails/serviceDetailsMobile.vue";

export default {
  props: ["order"],
  components: {
    ServiceDetails,
    ServiceDetailsMobile
  },
  methods: {
    update: function() {
      this.$q
        .dialog({
          title: "Mark as Prepared",
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

<style></style>
