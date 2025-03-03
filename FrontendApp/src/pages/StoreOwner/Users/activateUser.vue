<template>
  <div>
    <q-btn
      label="Activate User"
      @click="StoreAdvertismentPlan = true"
      unelevated
      :color="color"
      :disabled="disabled"
      size="sm"
    />
    <q-dialog class="full-width" v-model="StoreAdvertismentPlan" persistent>
      <q-card style="height:600px;width: 800px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">ADVERTISE YOUR STORE NOW!</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll" align="center">
          <q-stepper
            v-model="step"
            flat
            bordered
            header-nav
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              :name="1"
              title="View Plan"
              icon="remove_red_eye"
              :done="step > 1"
            >
              <q-icon name="verified_user" color="primary" size="100px" />
              <div class="text-h4 text-bold text-primary">
                &#8369;499.00/month
              </div>
              <div class="text-h5">Store Advertisment</div>
              <div style="width:500px" class="q-pt-lg" align="left">
                <div class="text-h6">
                  <q-icon name="check" color="primary" />Store will be featured
                </div>
                <div class="text-h6">
                  <q-icon name="check" color="primary" />Store will be
                  recommended on search results
                </div>

                <div class="text-h6">
                  <q-icon name="check" color="primary" />Store Products and
                  Services will be featured
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      done1 = true;
                      step = 2;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Number of Months"
              icon="calendar_today"
              :done="step > 2"
            >
              <table width="100%">
                <tr>
                  <td>Monthly Fee</td>
                  <td align="right">{{ active_per_month }}</td>
                </tr>
                <tr>
                  <td>No. of Months</td>
                  <td align="right" style="width:30px;">
                    <q-input
                      v-model="months_of_active"
                      ref="input_months_of_active"
                      type="number"
                      min="1"
                      @blur="months_of_active_change()"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <q-separator />
                  </td>
                </tr>
                <tr>
                  <td class="text-bold">TOTAL</td>
                  <td align="right">
                    {{ active_per_month * months_of_active }}
                  </td>
                </tr>
              </table>

              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      done2 = true;
                      step = 3;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
                <q-btn
                  flat
                  @click="step = 1"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Payment Option"
              icon="payment"
              :done="step > 3"
            >
              <div align="left">
                <q-btn
                  class="q-ml-sm"
                  :color="tab == 'OnlinePayment' ? 'primary' : 'grey'"
                  @click="tab = 'OnlinePayment'"
                  unelevated
                  :outline="tab != 'OnlinePayment'"
                  size="20px"
                  label="Online Payment"
                  icon="payment"
                />
                <q-btn
                  :color="tab == 'BankDeposit' ? 'primary' : 'grey'"
                  @click="tab = 'BankDeposit'"
                  unelevated
                  :outline="tab != 'BankDeposit'"
                  size="20px"
                  label="bank deposit"
                  icon="account_balance"
                />
              </div>
              <q-separator class="q-mt-sm q-mb-sm" />
              <div v-show="tab == 'BankDeposit'">
                <div class="q-pa-sm" align="left">
                  <b>1. Deposit amount to the following BDO bank account:</b>
                  <br />
                  <div class="q-pl-md q-pt-xs">
                    <b>Account Name:</b> Anturaz, Inc.
                    <br />
                    <b>Account Number:</b> 1802 394 837
                    <br />
                    <b>Bank Name:</b> Banco De Oro
                    <br />
                    <b>Amount:</b>
                    {{ $prettyMoney(active_per_month * months_of_active) }}
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>2. Upload deposit slip/screenshot of your payment</b>
                  <br />
                  <div class="q-pl-md q-pt-xs">
                    <b>A. Over-the-counter payments:</b> Write you full name
                    onto the deposit slip. Scan or take a photograph of the
                    deposit slip
                    <br />
                    <b>B. Online Banking:</b>
                    Take a screenshot of the successful transaction made
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b
                    >3. Wait until your payment is verified by the Anturaz
                    Admin.</b
                  >
                </div>
                <div class="q-pa-sm items-right" align="right">
                  <q-btn
                    color="primary"
                    unelevated
                    label="Pay via Bank Deposit"
                    @click="payViaBankDeposit"
                  />
                </div>
              </div>

              <div v-show="tab == 'OnlinePayment'">
                <div class="q-pa-sm" align="left">
                  <b
                    >1. Select Account Type from dropdown list. These are the
                    following</b
                  >
                  <div>
                    <ul>
                      <li>Visa</li>
                      <li>Mastercard</li>
                      <li>American Express</li>
                    </ul>
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>2. Enter Account Information</b>
                  <div>
                    <ul>
                      <li>Card Number</li>
                      <li>Card Holder</li>
                      <li>Expiry Date</li>
                      <li>CVV</li>
                    </ul>
                  </div>
                </div>
                <div class="q-pa-sm items-right" align="right">
                  <AltPayNet
                    :onlinePaymentResult="onlinePaymentResult"
                    :item="{
                      price: active_per_month * months_of_active,
                      description:
                        months_of_active +
                        ' Month/s of Advertisment (' +
                        active_per_month +
                        '/month)'
                    }"
                  />
                </div>
              </div>
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_storeOwner.vue";
import DepositSlipUpload from "components/depositSlipUpload.vue";

export default {
  components: {
    AltPayNet,
    DepositSlipUpload
  },
  props: {
    color: { type: Boolean },
    data: { type: Object },
    disabled: { type: Boolean }
  },
  data() {
    return {
      opened: false,
      tab: "OnlinePayment",
      active_per_month: 0,
      months_of_active: 0,
      StoreAdvertismentPlan: false,
      step: 1
    };
  },

  methods: {
    getGlobalPayments: async function() {
      try {
        const response = await this.$dbCon.service("global-payments").find();
        let activeUserPayment = response.data.filter(
          x => x.type == "Active_user"
        );
        this.active_per_month = activeUserPayment[0].cost;
        this.months_of_active = activeUserPayment[0].months;
      } catch (e) {
        console.log(e);
      }
    },
    months_of_active_change: function() {
      if (this.months_of_active < 1) {
        this.months_of_active = 1;
      }
      this.months_of_active = Math.round(this.months_of_active);
    },
    payViaBankDeposit: async function() {},
    onlinePaymentResult: async function(result, info) {
      // console.log("INFO", info);
      // console.log(result);
      if (result == "success") {
        console.log("Payment Success");
        // console.log(this.data._id);
        this.data.subscriptions = {
          months: this.months_of_active,
          total_amount: this.active_per_month,
          date_ordered: new Date(),
          date_started: new Date(),
          date_end: this.$addToDate(new Date(), 0, this.months_of_active),
          status: "Paid",
          payment_details: info
        };
        this.data.access = true;
        await this.$dbCon
          .service("users")
          .update(this.data._id, this.data)
          .then(() => {
            // this.StoreAdvertismentPlan = false;
          });

        await this.$dbCon.service("store-payments").create({
          related_id: this.data.subscriptions.length - 1,
          store_id: this.$local.getItem("store_token"),
          amount: this.active_per_month * this.months_of_active,
          date_paid: new Date(),
          payment_for: "Active User",
          payment_type: "Online Payment",
          payment_details: info
        });
        this.$q.dialog({
          title: "Payment Accepted!",
          message: `Your Employee is now Active. Employee account will expire on ${this.$addToDate(
            new Date(),
            0,
            this.months_of_active
          )}`
        });
      } else {
        this.$q.dialog({
          title: "Payment Error!",
          message: "Please try again."
        });
      }
    }
  },

  mounted() {
    this.$dbCon.service("global-payments").onDataChange(() => {
      this.getGlobalPayments();
    });

    // Promise.all([this.getGlobalPayments()]);
  }
};
</script>

<style></style>
