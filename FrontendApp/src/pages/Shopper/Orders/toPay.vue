<template>
  <div>
    <ProductDetails :order="order" :buttonVisible="false" />
    <div align="right">
      <PaymentSchedules
        v-if="payment.payment_type!='Full Payment'"
        :schedules="payment.recurring_payments"
      />
      <div v-if="payment.payment_option=='Bank Deposit'">
        <UploadDepositSlip
          :submitFunction="bankDeposit"
          v-if="payment.deposit_details.length==0 || payment.deposit_details[payment.deposit_details.length-1].status!='For Approval'"
        />
        <div v-else class="text-grey text-italic">
          <b>Pending Payment Status:</b> For Approval
        </div>
      </div>
      <div
        v-if="payment.payment_option=='Online Payment'"
        class="text-grey text-italic text-bold"
      >Auto Debit/Credit</div>
    </div>
  </div>
</template>

<script>
import PaymentSchedules from "components/paymentSchedules.vue";
import ProductDetails from "components/ItemDetails/productDetails.vue";
import UploadDepositSlip from "components/depositSlipUpload.vue";
export default {
  components: {
    PaymentSchedules,
    UploadDepositSlip,
    ProductDetails
  },
  props: ["order"],
  data() {
    return {
      payment: {}
    };
  },
  methods: {
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

<style>
</style>