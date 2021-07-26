<template>
  <div>
    <q-btn
      color="grey"
      label="Advertise"
      v-if="status=='For Advertisment'"
      @click="forAdvertisment=true"
      flat
    />
    <q-btn
      color="primary"
      label="Pending"
      v-if="status=='For Approval'"
      @click="pendingPaid=true"
       flat
    />
    <q-btn
      color="primary"
      label="Upload Deposit Slip"
      v-if="status=='Pending'"
      @click="pendingPaid=true"
       flat
    />
    <q-btn
      color="primary"
      label="Advertised"
      v-if="status=='Paid'"
      @click="pendingPaid=true"
       flat
    />
    <!-- FOR ADVERTISMENT -->
    <q-dialog class="full-width" v-model="forAdvertisment" persistent>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">ADVERTISE YOUR {{item_type.toUpperCase()}} NOW!</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" align="center">
          <q-stepper v-model="step" flat bordered header-nav ref="stepper" color="primary" animated>
            <q-step :name="1" title="View Plan" icon="remove_red_eye" :done="step> 1">
              <q-icon name="verified_user" color="primary" size="100px" />
              <div class="text-h4 text-bold text-primary">&#8369;499.00/month</div>
              <div
                class="text-h5"
              >{{item_type[0].toUpperCase()+item_type.substring(1,item_type.length)}} Advertisment</div>
              <div style="width:500px" class="q-pt-lg" align="left">
                <div class="text-h6">
                  <q-icon name="check" color="primary" />
                  {{item_type[0].toUpperCase()+item_type.substring(1,item_type.length)}} will be featured
                </div>
                <div class="text-h6">
                  <q-icon name="check" color="primary" />
                  {{item_type[0].toUpperCase()+item_type.substring(1,item_type.length)}} will be recommended on search results
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="Number of Months" icon="calendar_today" :done="step> 2">
              <table width="100%">
                <tr>
                  <td>Monthly Fee</td>
                  <td align="right">{{price}}</td>
                </tr>
                <tr>
                  <td>No. of Months</td>
                  <td align="right" style="width:30px;">
                    <q-input
                      v-model="months"
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
                  <td align="right">{{price*months}}</td>
                </tr>
              </table>

              <q-stepper-navigation>
                <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="Payment Option" icon="payment" :done="step> 3">
             <div align="left">
                <q-btn
                  :color="tab=='BankDeposit'?'primary':'grey'"
                  @click="tab='BankDeposit'"
                  unelevated
                  :outline="tab!='BankDeposit'"
                  size="20px"
                  label="bank deposit"
                  icon="account_balance"
                />
                <q-btn
                  class="q-ml-sm"
                  :color="tab=='OnlinePayment'?'primary':'grey'"
                  @click="tab='OnlinePayment'"
                  unelevated
                  :outline="tab!='OnlinePayment'"
                  size="20px"
                  label="Online Payment"
                  icon="payment"
                />
              </div>
              <q-separator class="q-mt-sm q-mb-sm" />
              <div v-show="tab=='BankDeposit'">
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
                    {{$prettyMoney( months * price)}}
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>2. Upload deposit slip/screenshot of your payment</b>
                  <br />
                  <div class="q-pl-md q-pt-xs">
                    <b>A. Over-the-counter payments:</b> Write you full name onto the deposit slip. Scan or take a photograph of the deposit slip
                    <br />
                    <b>B. Online Banking:</b>
                    Take a screenshot of the successful transaction made
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>3. Wait until your payment is verified by the Anturaz Admin.</b>
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

              <div v-show="tab=='OnlinePayment'">
                <div class="q-pa-sm" align="left">
                  <b>1. Select Account Type from dropdown list. These are the following</b>
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
                        :item="{ price: price * months, description: months+' Month/s of Advertisment ('+price+'/month)'}"
                      />
                </div>
              </div>
                     
                    

                     
                
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- PENDING AND PAID -->
    <q-dialog class="full-width" v-model="pendingPaid" v-if="status!='For Advertisment'" persistent>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">ADVERTISMENT DETAILS</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" align="center">
          <div align="right" class="q-ma-sm">
            <DepositSlipUpload
              v-if="data[0].status=='Pending'"
              :submitFunction="uploadDepositSlipResult"
            />

            <q-btn
              label="FOR APPROVAL"
              v-if="data[0].status=='For Approval'"
              color="grey"
              icon-right="help_outline"
              flat
            />
            <q-btn
              label="ONGOING ADS"
              v-if="data[0].status=='Paid'"
              color="green"
              icon-right="help_outline"
              flat
            />
          </div>
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
              <tr v-for="(subscription,index) in data" v-bind:key="index">
                <td class="text-left">{{index+1}}</td>
                <td
                  class="text-center"
                >{{subscription.months}} Month{{subscription.months==1?'':'s'}}</td>
                <td class="text-center">{{subscription.total_amount}}PHP</td>
                <td class="text-center">{{$formatDate(subscription.date_ordered)}}</td>
                <td
                  class="text-center"
                >{{subscription.date_started==""? "-": $formatDate(subscription.date_started)}}</td>
                <td
                  class="text-center"
                >{{subscription.date_started==""? "-": $formatDate(subscription.date_end)}}</td>
                <td class="text-center text-primary" v-if="subscription.status=='Pending'">PENDING</td>
                <td
                  class="text-center text-primary"
                  v-if="subscription.status=='For Approval'"
                >FOR APPROVAL</td>
                <td
                  class="text-center text-green"
                  v-if="subscription.status=='Paid' &&  $compareToCurrentDate(subscription.date_end) == 'upcoming'"
                >ACTIVE</td>
                <td
                  class="text-center text-grey"
                  v-if="subscription.status=='Paid' &&  $compareToCurrentDate(subscription.date_end) == 'past'"
                >EXPIRED</td>
                <td class="text-center text-red" v-if="subscription.status=='Rejected' ">REJECTED</td>
                <td class="text-center text-red" v-if="subscription.status=='Cancelled'">CANCELLED</td>

                <td class="text-center text-primary">
                  <q-btn
                    v-if="subscription.status=='Pending'"
                    label="edit"
                    color="primary"
                    @click="edit_advertise=true"
                    size="sm"
                    outline
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- EDIT -->
    <q-dialog v-if="data.length!=0" v-model="edit_advertise">
      <q-card>
        <q-card-section>
          <div class="text-h6">ADVERTISE {{item_type.toUpperCase()}}</div>
        </q-card-section>

        <q-card-section>
          <table width="100%">
            <tr>
              <td>Monthly Fee</td>
              <td align="right">{{price}}</td>
            </tr>
            <tr>
              <td>No. of Months</td>
              <td align="right" style="width:30px;">
                <q-input
                  v-model="data[0].months"
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
              <td align="right">{{data[0].months*price}}</td>
            </tr>
          </table>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-btn class="full-width" color="red" label="Cancel" @click="cancel" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_storeOwner.vue";
import DepositSlipUpload from "components/depositSlipUpload.vue";
export default {
  props: ["related_id", "item_type"],
  components: {
    AltPayNet,
    DepositSlipUpload
  },
  data() {
    return {
      step: 1,
      tab: "BankDeposit",
      months: 1,
      price: 499.0,
      status: "For Advertisment",
      data: [],
      //DIALOGS
      forAdvertisment: false,
      pendingPaid: false,
      edit_advertise: false
    };
  },
  methods: {
    onlinePaymentResult: async function(result, info) {
      var relatedId = null; //For Store Payments
      this.$dbCon
        .service(this.item_type + "-advertisment")
        .create({
          store_id: this.$local.getItem("store_token"),
          related_id: this.related_id,
          months: this.months,
          total_amount: this.price,
          date_ordered: new Date(),
          date_started: new Date(),
          date_paid: new Date(),
          date_end: this.$addToDate(new Date(), 0, this.months),
          status: "Paid",
          deposit_details: info
        })
        .then(async result => {
          await this.$dbCon.service("store-payments").create({
            related_id: result._id,
            store_id: this.$local.getItem("store_token"),
            amount: this.months * this.price,
            date_paid: new Date(),
            payment_for: this.item_type + " Advertisment",
            payment_type: "Online Payment",
            payment_details: info
          });
          this.forAdvertisment = false;
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
      this.data[0].status = "For Approval";
      this.data[0].deposit_details.push(deposit_details);

      await this.$dbCon
        .service(this.item_type + "-advertisment")
        .patch(this.data[0]._id, this.data[0]);
      this.$q.dialog({
        title: "Success!",
        message: "Deposit slip is uploaded. Your payment will be reviewed."
      });
    },
    payViaBankDeposit: function() {
      this.$dbCon
        .service(this.item_type + "-advertisment")
        .create({
          store_id: this.$local.getItem("store_token"),
          related_id: this.related_id,
          months: this.months,
          total_amount: this.price,
          date_ordered: new Date(),
          date_started: "",
          date_paid: "",
          date_end: "",
          status: "Pending",
          deposit_details: []
        })
        .then(() => {
          this.forAdvertisment = false;
        });
    },
    cancel: function() {
      this.data[0].status = "Cancelled";
      this.$dbCon
        .service(this.item_type + "-advertisment")
        .patch(this.data[0]._id, this.data[0])
        .then(() => {
          this.edit_advertise = false;
        });
    },
    months_of_advertisment_change: function() {
      if (this.months < 1) {
        this.months = 1;
      }
      this.months = Math.round(this.months);
    }
  },
  mounted() {
    this.$dbCon.service(this.item_type + "-advertisment").onDataChange(() => {
      this.$dbCon
        .service(this.item_type + "-advertisment")
        .find({
          query: {
            $sort: {
              date_ordered: -1
            },
            related_id: this.related_id,
            $or: [
              {
                date_end: {
                  $gte: new Date()
                }
              },
              { date_end: "" }
            ]
          }
        })
        .then(results => {
          if (
            results.data.length == 0 ||
            results.data[0].status == "Cancelled"
          ) {
            this.status = "For Advertisment";
          } else if (results.data[0].status == "Pending") {
            this.status = "Pending";
            this.data = results.data;
          } else if (results.data[0].status == "For Approval") {
            this.status = "For Approval";
            this.data = results.data;
          } else if (results.data[0].status == "Paid") {
            this.status = "Paid";
            this.data = results.data;
          }
        });
    });
  }
};
</script>

<style>
</style>