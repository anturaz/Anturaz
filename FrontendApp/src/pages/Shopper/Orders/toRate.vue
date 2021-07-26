<template>
  <div>
    <ProductDetails
      :order="order"
      buttonLabel="Rate now"
      :buttonVisible="true"
      :updateFunction="updateFunc"
    />
    <q-dialog v-model="opened">
      <q-card style="width:600px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div>RATE YOUR ORDER</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <div class="q-pt-sm q-pl-xl q-pr-xl">
            <ProductDetails :order="order" :buttonVisible="false" />
            <div align="center" class="q-pt-md">
              <q-rating v-model="rate" size="3.5em" color="primary" icon-selected="star" />
              ({{rate}})
            </div>
            <q-input outlined v-model="remarks" type="textarea" dense placeholder="Tell us more!" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="opened=false" />
          <q-btn flat label="Rate" color="primary" @click="update" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
export default {
  props: ["order"],
  components: {
    ProductDetails
  },
  data() {
    return {
      opened: false,
      rate: 3,
      remarks: ""
    };
  },
  methods: {
    updateFunc: function() {
      this.opened = true;
    },
    update: function() {
      this.$q
        .dialog({
          title: "Rate this order",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.order.status = "Done";
          this.order.rate = this.rate;
          this.order.remarks = this.remarks;
          this.order.logs.push({
            event: "Rated",
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