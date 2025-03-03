<template>
  <div>
    <q-btn label="PAY NOW" color="primary" @click="toPay = true" />
    <q-dialog v-model="toPay" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">SELECT PAYMENT METHOD</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- <form
            :action="currentLink"
            class="paymentWidgets"
            data-brands="VISA MASTER AMEX"
            ref="paymentWidget"
          /> -->

          <q-select
            v-model="payment.payment_method"
            :options="payment_options"
            option-value="value"
            option-label="value"
            label="Payment Method"
            outlined
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="cancel" @click="toPay = false" flat />
          <q-btn label="PAY" color="primary" @click="submitPayment" flat>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { checkOutPayment } from "../api/services/paymentService";

export default {
  props: {
    onlinePaymentResult: { type: Function },
    preparePayment: { type: Function },
    payment_options: { type: Array },
    shippingAddress: { type: Object },
    cart: { type: Object },
    mode_of_delivery: { type: String },
    shopperPayment: { type: Object },
    mode_of_service: { type: String }
  },
  data() {
    return {
      currentLink: process.env.CLIENT ? window.location.href : "",
      toPay: false,
      payment: {}
    };
  },
  mounted() {
    console.log(this.shippingAddress);
    // console.log("Online payment", this.$route.query);
  },
  methods: {
    setLoaded: function() {
      this.$q.loading.hide();
    },

    submitPayment: async function() {
      this.$q.loading.show();
      try {
        const response = await checkOutPayment(this.payment);

        console.log("response in backend payment", response);

        if (!response.data.url || response.data.url === "") {
          console.log("failed");
          this.$q.dialog({
            title: "Payment Error!",
            message: response.data.message,
            ok: "OK",
            icon: "warning", // Adds a warning icon
            color: "negative" // Makes it red for emphasis
          });
        } else {
          console.log("not failed");
          const paymentUrl = response.data.url;

          window.location.replace(paymentUrl);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();
      }
    }
  },
  watch: {
    // "$route.query": async function() {
    //   // console.log("Online payment route", this.$route.query);
    //   if ("id" in this.$route.query && "resourcePath" in this.$route.query) {
    //     this.$q.loading.show();
    //     const id = this.$route.query.id;
    //     const resourcePath = this.$route.query.resourcePath;
    //     this.toPay = false;
    //     this.$router.push(this.$route.path);
    //     await this.$axios
    //       .get(
    //         this.$appLink +
    //           "/paymentResult?id=" +
    //           id +
    //           "&resourcePath=" +
    //           resourcePath
    //       )
    //       .then(results => {
    //         var checkIfSuccess = /^(000\.000\.|000\.100\.1|000\.[36])/;
    //         var result = results.data.result.code.match(checkIfSuccess);
    //         try {
    //           if (result.length != 0) {
    //             //SUCCESS
    //             this.onlinePaymentResult("success", results.data);
    //             this.$q.loading.hide();
    //           } else {
    //             //ERROR
    //             this.onlinePaymentResult("error", results.data);
    //             this.$q.loading.hide();
    //           }
    //         } catch (e) {
    //           this.onlinePaymentResult("error", results.data);
    //           this.$q.loading.hide();
    //         }
    //       });
    //   }
    // },
    toPay: async function() {
      if (this.toPay == true) {
        this.payment = await this.preparePayment();
        // this.$q.loading.show();
        this.payment = {
          ...this.payment,
          shipping_address: this.shippingAddress,
          cart: this.cart,
          mode_of_delivery: this.mode_of_delivery,
          payment: this.shopperPayment,
          mode_of_service: this.mode_of_service
        };
        if (!process.env.CLIENT) return;

        // const script = document.createElement("script");
        // this.$axios
        //   .post(this.$appLink + "/createCheckOutShopper", {
        //     payment: this.payment
        //   })
        //   .then(async res => {
        //     script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${
        //       res.data.id
        //     }`;
        //     script.addEventListener("load", this.setLoaded);
        //     document.body.appendChild(script);
        //   });
      }
    }
  }
};
</script>

<style></style>
