<template>
  <div>
    <!-- <ProductDetails
      :order="order"
      :buttonVisible="false"
      v-if="!$q.screen.lt.md"
    />
    <productDetailsMobile v-else :order="order" :buttonVisible="false" /> -->
    <div align="right">
      <PaymentSchedules
        v-if="payment.payment_type != 'Full Payment'"
        :schedules="payment.recurring_payments"
      />
      <div v-if="payment.payment_option == 'Bank Deposit'">
        <UploadDepositSlip
          :submitFunction="bankDeposit"
          v-if="
            payment.deposit_details.length == 0 ||
              payment.deposit_details[payment.deposit_details.length - 1]
                .status != 'For Approval'
          "
        />
        <div v-else class="text-grey text-italic">
          <b>Pending Payment Status:</b> For Approval
        </div>
      </div>
      <div
        v-if="payment.payment_option == 'Online Payment'"
        class="text-grey text-italic text-bold"
      >
        <q-btn label="cancel" @click="deleteOrder" flat />
        <q-btn label="PAY" color="primary" @click="toPay = true" />
      </div>
    </div>

    <q-dialog v-model="toPay" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">PAYMENT INFORMATION</div>
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
            :options="paymentOptions"
            option-value="value"
            option-label="value"
            label="Payment Method"
            outlined
          />
        </q-card-section>

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
import PaymentSchedules from "components/paymentSchedules.vue";
import UploadDepositSlip from "components/depositSlipUpload.vue";
import {
  getPaymentOptions,
  checkoutOldOrder
} from "../../../api/services/paymentService";
// import { getShopperPayments } from "../../../api/services/shopperPaymentsServices";
import { syncShopperPayments } from "../../../api/services/paymentService";
import ProductDetails from "components/ItemDetails/productDetails.vue";
import productDetailsMobile from "../../../components/ItemDetails/productDetailsMobile.vue";

export default {
  components: {
    PaymentSchedules,
    UploadDepositSlip,
    ProductDetails,
    productDetailsMobile
  },
  props: ["order", "paymentOptions"],
  data() {
    return {
      payment: {},
      order_data: {},
      payment_options: [],
      toPay: false
    };
  },
  watch: {
    payment: async function(payment) {
      if (payment.transaction_id && this.order.status == "Pending Payment") {
        await syncShopperPayments(payment.transaction_id);
        await this.delay(2000);
        // const res = await syncShopperPayments(payment.transaction_id);
        // console.log("sync");
      }
    }
  },
  methods: {
    // getPayments: async function() {
    //   try {
    //     const { data } = await getPaymentOptions();
    //     this.payment_options = data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // getAvailablePayments: async function() {
    //   try {
    //     const response = await this.$dbCon.service("shopper-payments").find({});
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // await syncShopperPayments(payment.transaction_id);
    // await this.delay(2000);

    deleteOrder: async function() {
      try {
        this.$q
          .dialog({
            title: "Confirmation",
            message:
              "Do you really want to delete this product? if yes Enter your password",

            cancel: true,
            persistent: true
          })
          .onOk(async () => {
            try {
              // delete shopper-payments first
              await this.$dbCon
                .service("shopper-payments")
                .remove(this.payment._id);

              // delete product-transaction second
              await this.$dbCon
                .service("product-transactions")
                .remove(this.order_data._id);

              // Refresh the page
              window.location.reload();
            } catch (e) {
              console.error("Error deleting order:", e);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    getDateWithOffset: function(offsetDays) {
      const today = new Date();
      today.setDate(today.getDate() + offsetDays);

      // Format the date to YYYY/MM/DD
      const formattedDate =
        today.getFullYear() +
        "/" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(today.getDate()).padStart(2, "0");

      return formattedDate;
    },

    submitPayment: async function() {
      // this.$q.loading.show();
      try {
        const checkoutData = this.order_data.checkout_data;
        checkoutData.data.payment.option = this.payment.payment_method.code;

        const productTransaction = this.order_data;

        productTransaction.date_needed = this.getDateWithOffset(15); // 15 days from now

        const data = {
          checkout_data: checkoutData,
          transaction_data: productTransaction
        };

        // let oldCheckoutData = this.order_data.checkout_data;
        // oldCheckoutData.data.payment.option = this.payment.payment_method.code;

        const response = await checkoutOldOrder(data);
        console.log(response);
        const paymentUrl = response.data.url;

        window.location.replace(paymentUrl);
      } catch (error) {
        console.log(error);
      }
    },
    bankDeposit: function(
      photo,
      remarks,
      reference_number,
      total_amount,
      date_deposited
    ) {
      var deposit_details = {
        path: photo,
        remarks: remarks,
        comments: "",
        date_uploaded: new Date(),
        date_reviewed: "",
        reference_number: reference_number,
        total_amount: total_amount,
        date_deposited: date_deposited,
        status: "For Approval"
      };

      this.payment.deposit_details.push(deposit_details);
      this.$dbCon
        .service("shopper-payments")
        .patch(this.payment._id, this.payment);
    }
  },
  mounted() {
    this.order_data = this.order;
    // this.getPayments();
    // this.getAvailablePayments();
    this.$dbCon
      .service("shopper-payments")
      .find({
        query: { related_id: this.order._id }
      })
      .then(result => {
        this.payment = result.data[0];
      });
  }
};
</script>

<style></style>
