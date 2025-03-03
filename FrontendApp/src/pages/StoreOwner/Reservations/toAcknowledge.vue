<template>
  <div>
    <ServiceDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      :updateFunction="update"
      buttonLabel="ACKNOWLEDGE"
      :buttonVisible="true"
    />
    <ServiceDetailsMobile
      v-else
      :order="order"
      :updateFunction="update"
      buttonLabel="ACKNOWLEDGE"
      :buttonVisible="true"
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
          title: "Mark as Reviewed",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.order.status = "To Acknowledge";
          this.order.logs.push({
            event: "Reviewed",
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
