<template>
  <div>
    <q-card
      flat
      class="q-pb-md"
      align="center"
      v-if="$route.path == '/StoreOwner/PublishStore'"
    >
      <q-card-section class="row">
        <q-icon
          class="col-12"
          name="verified_user"
          color="primary"
          size="100px"
        />
        <div class="col-12 text-h4 text-bold text-primary">
          &#8369;499.00/month
        </div>
        <div class="col-12 text-h5">Store Advertisment</div>
        <div class="col-12 q-pt-lg" align="center">
          <div class="text-h6">
            <q-icon name="check" color="primary" />Store will be featured
          </div>
          <div class="text-h6">
            <q-icon name="check" color="primary" />Store will be recommended on
            search results
          </div>
        </div>
      </q-card-section>
      <q-card-section
        class="q-pl-md-xl q-pr-md-xl row justify-center"
        v-if="ads_status != 'PENDING'"
      >
        <div class="col-md-5 col-xs-12 q-pt-lg q-pb-lg" align="left">
          <q-btn round label="1" unelevated color="grey" />
          <span class="q-pl-md text-grey">Select Number of Months</span>
          <q-separator class="q-mt-sm" />
        </div>
        <div class="col-12" />
        <div class="col-md-5">
          <table width="100%">
            <tr>
              <td>Monthly Fee</td>
              <td align="right">{{ advertise_per_month }}</td>
            </tr>
            <tr>
              <td>No. of Months</td>
              <td align="right" style="width:30px;">
                <q-input
                  v-model="months_of_advertisment"
                  ref="input_months_of_advertisment"
                  type="number"
                  min="1"
                  @blur="months_of_advertisment_change()"
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
                {{ advertise_per_month * months_of_advertisment }}
              </td>
            </tr>
          </table>
        </div>
        <div class="col-12" />
        <div class="col-md-5 col-xs-12 q-pt-lg q-pb-lg" align="left">
          <q-btn round label="2" unelevated color="grey" />
          <span class="q-pl-md text-grey">Payment</span>
          <q-separator class="q-mt-sm" />
        </div>
        <div class="col-12" />
        <div class="col-md-5">
          <q-btn-group rounded>
            <q-btn
              rounded
              :color="tab == 'OnlinePayment' ? 'primary' : 'white'"
              :class="tab == 'OnlinePayment' ? 'text-white' : 'text-grey'"
              @click="tab = 'OnlinePayment'"
              label="Online Payment"
              icon="payment"
            />
            <q-btn
              rounded
              :color="tab == 'BankDeposit' ? 'primary' : 'white'"
              :class="tab == 'BankDeposit' ? 'text-white' : 'text-grey'"
              @click="tab = 'BankDeposit'"
              label="Bank Deposit"
              icon="account_balance"
            />
          </q-btn-group>

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
                {{ $prettyMoney(advertise_per_month * months_of_advertisment) }}
              </div>
            </div>
            <div class="q-pa-sm" align="left">
              <b>2. Upload deposit slip/screenshot of your payment</b>
              <br />
              <div class="q-pl-md q-pt-xs">
                <b>A. Over-the-counter payments:</b> Write you full name onto
                the deposit slip. Scan or take a photograph of the deposit slip
                <br />
                <b>B. Online Banking:</b>
                Take a screenshot of the successful transaction made
              </div>
            </div>
            <div class="q-pa-sm" align="left">
              <b
                >3. Wait until your payment is verified by the Anturaz Admin.</b
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
                  price: advertise_per_month * months_of_advertisment,
                  description:
                    months_of_advertisment +
                    ' Month/s of Advertisment (' +
                    advertise_per_month +
                    '/month)'
                }"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      flat
      bordered
      v-if="
        ($route.path == '/StoreOwner/PublishStore' &&
          ads_status == 'PENDING') ||
          $route.path == '/StoreOwner'
      "
    >
      <q-card-section align="right">
        <div v-if="ads_status == 'NONE'">
          <q-btn
            color="primary"
            label="Advertise Store"
            @click="StoreAdvertismentPlan = true"
          />
        </div>

        <div v-else-if="ads_status == 'PENDING'">
          <DepositSlipUpload :submitFunction="uploadDepositSlipResult" />
        </div>
      </q-card-section>
      <q-card-section
        v-if="data.subscriptions && data.subscriptions.length != 0"
      >
        <q-markup-table flat>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-center">Subscription</th>
              <th class="text-center">Amount</th>
              <th class="text-center">Date Ordered</th>
              <th class="text-center">Date Started</th>
              <th class="text-center">Date End</th>
              <th class="text-center">Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(subscription, index) in data.subscriptions"
              v-bind:key="index"
            >
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-center">
                {{ subscription.months }} Month{{
                  subscription.months == 1 ? "" : "s"
                }}
              </td>
              <td class="text-center">{{ subscription.total_amount }}PHP</td>
              <td class="text-center">
                {{ $formatDate(subscription.date_ordered) }}
              </td>
              <td class="text-center">
                {{
                  subscription.date_started == ""
                    ? "-"
                    : $formatDate(subscription.date_started)
                }}
              </td>
              <td class="text-center">
                {{
                  subscription.date_started == ""
                    ? "-"
                    : $formatDate(subscription.date_end)
                }}
              </td>
              <td
                class="text-center text-primary"
                v-if="subscription.status == 'Pending'"
              >
                PENDING
              </td>
              <td
                class="text-center text-primary"
                v-if="subscription.status == 'For Approval'"
              >
                FOR APPROVAL
              </td>
              <td
                class="text-center text-green"
                v-if="
                  subscription.status == 'Paid' &&
                    $compareToCurrentDate(subscription.date_end) == 'upcoming'
                "
              >
                ACTIVE
              </td>
              <td
                class="text-center text-grey"
                v-if="
                  subscription.status == 'Paid' &&
                    $compareToCurrentDate(subscription.date_end) == 'past'
                "
              >
                EXPIRED
              </td>
              <td
                class="text-center text-red"
                v-if="subscription.status == 'Rejected'"
              >
                REJECTED
              </td>
              <td
                class="text-center text-red"
                v-if="subscription.status == 'Cancelled'"
              >
                CANCELLED
              </td>

              <td class="text-center text-primary">
                <q-btn
                  v-if="subscription.status == 'Pending'"
                  label="edit"
                  color="primary"
                  @click="edit_advertise_store = true"
                  size="sm"
                  outline
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <q-dialog
      v-if="data.subscriptions && data.subscriptions.length != 0"
      v-model="edit_advertise_store"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Advertise Store</div>
        </q-card-section>

        <q-card-section>
          <table width="100%">
            <tr>
              <td>Monthly Fee</td>
              <td align="right">{{ advertise_per_month }}</td>
            </tr>
            <tr>
              <td>No. of Months</td>
              <td align="right" style="width:30px;">
                <q-input
                  v-model="
                    data.subscriptions[data.subscriptions.length - 1].months
                  "
                  ref="input_months_of_advertisment"
                  type="number"
                  @blur="months_of_advertisment_change()"
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
                {{
                  data.subscriptions[data.subscriptions.length - 1].months *
                    advertise_per_month
                }}
              </td>
            </tr>
          </table>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-btn
            class="full-width"
            color="primary"
            label="Pay via Bank Deposit"
            @click="edit"
          />
          <q-btn
            class="full-width"
            color="red"
            label="Cancel"
            @click="cancel"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
                  <td align="right">{{ advertise_per_month }}</td>
                </tr>
                <tr>
                  <td>No. of Months</td>
                  <td align="right" style="width:30px;">
                    <q-input
                      v-model="months_of_advertisment"
                      ref="input_months_of_advertisment"
                      type="number"
                      min="1"
                      @blur="months_of_advertisment_change()"
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
                    {{ advertise_per_month * months_of_advertisment }}
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
                    {{
                      $prettyMoney(advertise_per_month * months_of_advertisment)
                    }}
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
                    :mainMenu="mainMenu"
                    :onlinePaymentResult="onlinePaymentResult"
                    :item="{
                      price: advertise_per_month * months_of_advertisment,
                      description:
                        months_of_advertisment +
                        ' Month/s of Advertisment (' +
                        advertise_per_month +
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
  props: ["mainMenu"],
  components: {
    AltPayNet,
    DepositSlipUpload
  },
  data() {
    return {
      ads_status: "",
      step: 1,
      tab: "OnlinePayment",
      months_of_advertisment: 1,
      data: {},
      StoreAdvertismentPlan: false,
      advertise_store: false,
      advertise_per_month: 499.75,
      edit_advertise_store: false
    };
  },
  methods: {
    edit: function() {
      this.data.subscriptions[this.data.subscriptions.length - 1].total_amount =
        this.data.subscriptions[this.data.subscriptions.length - 1].months *
        this.advertise_per_month;
      this.edit_advertise_store = false;
      this.$dbCon
        .service("store-advertisment")
        .update(this.data._id, this.data);
    },
    cancel: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to cancel this advertisment?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.data.subscriptions[this.data.subscriptions.length - 1].status =
            "Cancelled";
          this.$dbCon
            .service("store-advertisment")
            .update(this.data._id, this.data);
        });
      this.edit_advertise_store = false;
    },
    advertiseStore: function() {
      this.advertise_store = true;
    },
    payViaBankDeposit: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you want to pay fees via Bank Deposit?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.data.subscriptions.push({
            months: this.months_of_advertisment,
            total_amount: this.advertise_per_month,
            date_ordered: new Date(),
            date_started: "",
            date_paid: "",
            status: "Pending",
            deposit_details: []
          });
          this.$dbCon
            .service("store-advertisment")
            .update(this.data._id, this.data)
            .then(() => {
              this.StoreAdvertismentPlan = false;
            });
        });
    },
    uploadDepositSlipResult: async function(
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
      this.data.subscriptions[this.data.subscriptions.length - 1].status =
        "For Approval";
      this.data.subscriptions[
        this.data.subscriptions.length - 1
      ].deposit_details.push(deposit_details);

      await this.$dbCon
        .service("store-advertisment")
        .patch(this.data._id, this.data);
      this.$q.dialog({
        title: "Success!",
        message: "Deposit slip is uploaded. Your payment will be reviewed."
      });
    },
    onlinePaymentResult: async function(result, info) {
      console.log("INFO", info);
      console.log(result);
      // if (result == "success") {
      //   this.data.subscriptions.push({
      //     months: this.months_of_advertisment,
      //     total_amount: this.advertise_per_month,
      //     date_ordered: new Date(),
      //     date_started: new Date(),
      //     date_end: this.$addToDate(new Date(), 0, this.months_of_advertisment),
      //     status: "Paid",
      //     payment_details: info
      //   });
      //   await this.$dbCon
      //     .service("store-advertisment")
      //     .update(this.data._id, this.data)
      //     .then(() => {
      //       this.StoreAdvertismentPlan = false;
      //     });
      //   await this.$dbCon.service("store-payments").create({
      //     related_id: this.data.subscriptions.length - 1,
      //     store_id: this.$local.getItem("store_token"),
      //     amount: this.advertise_per_month * this.months_of_advertisment,
      //     date_paid: new Date(),
      //     payment_for: "Store Advertisment",
      //     payment_type: "Online Payment",
      //     payment_details: info
      //   });
      //   this.$q.dialog({
      //     title: "Payment Accepted!",
      //     message:
      //       "Your store is now Advertised. Advertistment will expire on " +
      //       this.$addToDate(new Date(), 0, this.months_of_advertisment)
      //   });
      // } else {
      //   this.$q.dialog({
      //     title: "Payment Error!",
      //     message: "Please try again."
      //   });
      // }
    },
    months_of_advertisment_change: function() {
      if (this.months_of_advertisment < 1) {
        this.months_of_advertisment = 1;
      }
      this.months_of_advertisment = Math.round(this.months_of_advertisment);
    },

    getdataFromPromise: function() {
      newPromise
        .then(res => {
          console.log(res); // result neto yung laman ng resolve
        })
        .catch(err => {
          console.log(err); // result neto yung laman ng reject
        });
    },

    getData: async function() {
      const result = await this.$dbCon.service("store-advertisment").find({
        query: {
          store_id: this.$local.getItem("store_token")
        }
      });
      this.data = result.data[0];

      // .then(result => {
      //   // console.log(result);
      //   this.data = result.data[0];
      // });
      if (this.data.subscriptions.length == 0) {
        this.ads_status = "NONE";
        this.StoreAdvertismentPlan = Math.floor(Math.random() * 2 + 1) == 2;
      } else if (
        this.data.subscriptions[this.data.subscriptions.length - 1].status ==
        "Pending"
      ) {
        this.ads_status = "PENDING";
      } else if (
        this.data.subscriptions[this.data.subscriptions.length - 1].status ==
        "For Approval"
      ) {
        this.ads_status = "FOR APPROVAL";
      } else if (
        this.data.subscriptions[this.data.subscriptions.length - 1].status ==
        "Cancelled"
      ) {
        this.ads_status = "NONE";
      } else if (
        this.$compareToCurrentDate(
          this.data.subscriptions[this.data.subscriptions.length - 1].date_end
        ) == "upcoming"
      ) {
        this.ads_status = "CURRENT";
      } else if (
        this.$compareToCurrentDate(
          this.data.subscriptions[this.data.subscriptions.length - 1].date_end
        ) == "current"
      ) {
        this.ads_status = "CURRENT";
      } else if (
        this.$compareToCurrentDate(
          this.data.subscriptions[this.data.subscriptions.length - 1].date_end
        ) == "past"
      ) {
        this.ads_status = "NONE";
        this.StoreAdvertismentPlan = Math.floor(Math.random() * 2 + 1) == 2;
      }
    }
  },
  async mounted() {
    this.$dbCon.service("store-advertisment").onDataChange(() => {
      this.getData();
    });
  }
};
</script>

<style></style>
