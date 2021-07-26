<template>
  <div>
    <ProductDetails
      :order="order"
      buttonLabel="SHIP OUT"
      :buttonVisible="true"
      :updateFunction="()=>{opened=true}"
    />
    <q-dialog v-model="opened">
      <q-card style="width:600px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div >Shipping Information</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <q-input outlined class="q-pa-sm" v-model="tracking_number" label="Tracking Number" />
          <q-input outlined class="q-pa-sm" v-model="courier" label="Courier" />
          <q-input outlined class="q-pa-sm" v-model="eta" label="Estimated Time of Arrival" type="textarea" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="opened=false" />
          <q-btn flat label="Submit" color="primary" @click="update" />
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
  data(){
    return{
      opened: false,
      tracking_number: "",
      courier: "",
      eta:""
    }
  },
  methods: {
    update: function() {
      this.$q
        .dialog({
          title: "Mark as Ship out",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
         this.order.status = "For Receiving";
         this.order.shipping_details={
           tracking_number: this.tracking_number,
           courier: this.courier,
           eta:this.eta
         }
          this.order.logs.push({
            event: "Ship-out",
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