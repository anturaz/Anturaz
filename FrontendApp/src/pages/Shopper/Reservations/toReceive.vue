<template>
  <div>
    <ServiceDetails
      :order="order"
      buttonLabel="Receive"
      :updateFunction="update"
      :buttonVisible="true"
      v-if="!$q.screen.lt.md"
    />

    <ServiceDetailsMobile
      v-else
      buttonLabel="Receive"
      :updateFunction="update"
      :order="order"
      :buttonVisible="true"
    />
  </div>
</template>

<script>
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
import ServiceDetailsMobile from "../../../components/ItemDetails/serviceDetailsMobile.vue";

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
          this.order.recieved_date = new Date().toISOString();
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
              console.log("trigger");
            });
          //EMAIL
        });
    }
  }
};
</script>

<style></style>
