<template>
  <div>
    <div v-for="pay in payment">
      {{pay}}
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payment: []
    };
  },
  mounted() {
    var date_purchased = "2019-11-27T05:48:21.571Z";
    var date_needed = "2020-03-30T05:48:21.571Z";
    var price = 1241;
    //1. Get the difference of DP and DN
    var difference = Math.ceil(
      this.$getDateDiff(date_needed, date_purchased, "days") / 30
    );
    //FIRST PAYMENT
    this.payment.push({
      schedule: "",
      amount: price / difference,
      payment_details: {},
      status: "Pending"
    });
    //FOLLOWING BEFORE THE LAST PAYMENT
    for (var x = 1; x < difference - 1; x++) {
      this.payment.push({
        schedule: this.$addToDate(date_purchased, 30 * x, 0),
        amount: price / difference,
        payment_details: {},
        status: "Pending"
      });
    }
    //LAST PAYMENT
    this.payment.push({
      schedule: this.$subtractFromDate(date_needed, 14, 0),
      amount: price / difference,
      payment_details: {},
      status: "Pending"
    });
  }
};
</script>

<style>
</style>