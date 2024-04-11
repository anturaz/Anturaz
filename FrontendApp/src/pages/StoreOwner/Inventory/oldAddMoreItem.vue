<template>
  <div>
    <q-btn
      unelevated
      v-if="addMoreItems"
      @click="opened = true"
      :label="$q.screen.lt.sm ? '' : 'Add More ' + itemType"
      color="primary"
      icon="info"
      size="md"
    />
    <q-btn
      unelevated
      v-else
      @click="pendingSubscription = true"
      :label="
        $q.screen.lt.sm
          ? ''
          : 'Pending ' +
            (itemType == 'Products' ? 'product' : 'service') +
            ' Subscription'
      "
      color="primary"
      icon="info"
      size="md"
    />
    <q-dialog
      v-if="subscriptions.length != 0"
      class="full-width"
      v-model="pendingSubscription"
      persistent
    >
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{
              (itemType == "Products" ? "Product" : "Service") +
                " Subscriptions"
            }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />
        <q-card-section>
          <div align="right">
            <DepositSlipUpload
              v-if="subscriptions[0].status == 'Pending'"
              :submitFunction="uploadDepositSlipResult"
            />
            <q-btn
              color="grey"
              disable
              icon="info"
              v-else
              label="Pending Payment"
            />
          </div>
          <q-markup-table flat>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-center">Subscription</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Products</th>
                <th class="text-center">Date Ordered</th>
                <th class="text-center">Date Started</th>
                <th class="text-center">Date End</th>
                <th class="text-center">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(subscription, index) in subscriptions"
                v-bind:key="index"
              >
                <td class="text-left">{{ subscriptions.length - index }}</td>
                <td class="text-center">
                  {{ subscription.months }} Month{{
                    subscription.months == 1 ? "" : "s"
                  }}
                </td>
                <td class="text-center">
                  {{
                    $prettyMoney(
                      subscription.total_amount * subscription.months
                    )
                  }}
                </td>
                <td class="text-center">{{ subscription.items + " items" }}</td>
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
                <td
                  class="text-center text-grey"
                  v-if="subscription.status == 'Free'"
                >
                  FREE
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
    </q-dialog>

    <q-dialog class="full-width" v-model="opened" persistent>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">ADD MORE {{ itemType.toUpperCase() }} NOW!</div>
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
              title="Choose your Plan"
              icon="remove_red_eye"
              :done="step > 1"
            >
              <q-stepper-navigation>
                <q-card flat bordered>
                  <q-card-section
                    clickable
                    @click="(items = 10), (price = 99)"
                    class="row"
                    :class="items == 10 ? 'text-primary' : 'text-grey'"
                  >
                    <div class="col-6">
                      <div class="text-h6">10 {{ itemType }}</div>
                      <div>{{ $prettyMoney(99) }}/month</div>
                    </div>
                    <div class="col-6">
                      <q-icon
                        class="q-pt-md"
                        name="check"
                        size="30px"
                        v-if="items == 10"
                      />
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section
                    clickable
                    @click="(items = 20), (price = 159)"
                    class="row"
                    :class="items == 20 ? 'text-primary' : 'text-grey'"
                  >
                    <div class="col-6">
                      <div class="text-h6">20 {{ itemType }}</div>
                      <div>{{ $prettyMoney(159) }}/month</div>
                    </div>
                    <div class="col-6">
                      <q-icon
                        class="q-pt-md"
                        name="check"
                        size="30px"
                        v-if="items == 20"
                      />
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section
                    clickable
                    @click="(items = 30), (price = 209)"
                    class="row"
                    :class="items == 30 ? 'text-primary' : 'text-grey'"
                  >
                    <div class="col-6">
                      <div class="text-h6">30 {{ itemType }}</div>
                      <div>{{ $prettyMoney(209) }}/month</div>
                    </div>
                    <div class="col-6">
                      <q-icon
                        class="q-pt-md"
                        name="check"
                        size="30px"
                        v-if="items == 30"
                      />
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section
                    clickable
                    @click="(items = 40), (price = 239)"
                    class="row"
                    :class="items == 40 ? 'text-primary' : 'text-grey'"
                  >
                    <div class="col-6">
                      <div class="text-h6">40 {{ itemType }}</div>
                      <div>{{ $prettyMoney(239) }}/month</div>
                    </div>
                    <div class="col-6">
                      <q-icon
                        class="q-pt-md"
                        name="check"
                        size="30px"
                        v-if="items == 40"
                      />
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section
                    clickable
                    @click="(items = 50), (price = 249)"
                    class="row"
                    :class="items == 50 ? 'text-primary' : 'text-grey'"
                  >
                    <div class="col-6">
                      <div class="text-h6">50 {{ itemType }}</div>
                      <div>{{ $prettyMoney(249) }}/month</div>
                    </div>
                    <div class="col-6">
                      <q-icon
                        class="q-pt-md"
                        name="check"
                        size="30px"
                        v-if="items == 50"
                      />
                    </div>
                  </q-card-section>
                </q-card>
                <div align="right" class="q-pa-sm">
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
                </div>
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
                  <td class="q-pr-md" align="right">
                    {{ $prettyMoney(price) }}
                  </td>
                </tr>
                <tr>
                  <td>No. of {{ itemType }}</td>
                  <td class="q-pr-md" align="right">{{ items }}</td>
                </tr>
                <tr>
                  <td>No. of Months</td>
                  <td align="right" style="width:20px;">
                    <q-input
                      v-model="months"
                      input-class="text-right"
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
                  <td class="q-pr-md" align="right">
                    {{ $prettyMoney(price * months) }}
                  </td>
                </tr>
              </table>

              <q-stepper-navigation align="right">
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
                  :color="tab == 'BankDeposit' ? 'primary' : 'grey'"
                  @click="tab = 'BankDeposit'"
                  unelevated
                  :outline="tab != 'BankDeposit'"
                  size="20px"
                  label="bank deposit"
                  icon="account_balance"
                />
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
                    {{ $prettyMoney(months * price) }}
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
                      price: price * months,
                      description:
                        months +
                        ' Month/s of Subscription (' +
                        price +
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
  props: ["itemType"],
  data() {
    return {
      opened: false,
      step: 1,
      months: 1,
      items: 10,
      price: 99,
      tab: "BankDeposit",
      addMoreItems: false,
      subscriptions: [],
      pendingSubscription: false
    };
  },
  methods: {
    onlinePaymentResult: async function(result, info) {
      var relatedId = null; //For Store Payments
      this.$dbCon
        .service(
          (this.itemType == "Products" ? "product" : "service") +
            "-subscriptions"
        )
        .create({
          store_id: this.$local.getItem("store_token"),
          months: this.months,
          items: this.items,
          total_amount: this.price,
          date_ordered: new Date(),
          date_started: new Date(),
          date_paid: new Date(),
          date_end: this.$addToDate(new Date(), 0, this.months),
          status: "Paid",
          deposit_details: info
        })
        .then(async result => {
          await this.$dbCon
            .service("store-payments")
            .create({
              related_id: result._id,
              store_id: this.$local.getItem("store_token"),
              amount: this.months * this.price,
              date_paid: new Date(),
              payment_for:
                (this.itemType == "Products" ? "Product" : "Service") +
                " Subscription",
              payment_type: "Online Payment",
              payment_details: info
            })
            .then(() => {
              this.$router.go();
            });
          this.opened = false;
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
      this.subscriptions[0].status = "For Approval";
      this.subscriptions[0].deposit_details.push(deposit_details);

      await this.$dbCon
        .service(
          (this.itemType == "Products" ? "product" : "service") +
            "-subscriptions"
        )
        .patch(this.subscriptions[0]._id, this.subscriptions[0]);
      this.$q.dialog({
        title: "Success!",
        message: "Deposit slip is uploaded. Your payment will be reviewed."
      });
    },
    payViaBankDeposit: function() {
      this.$dbCon
        .service(
          (this.itemType == "Products" ? "product" : "service") +
            "-subscriptions"
        )
        .create({
          store_id: this.$local.getItem("store_token"),
          months: this.months,
          items: this.items,
          total_amount: this.price,
          date_ordered: new Date(),
          date_started: "",
          date_paid: "",
          date_end: "",
          status: "Pending",
          deposit_details: []
        })
        .then(() => {
          this.opened = false;
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
    this.$dbCon
      .service(
        (this.itemType == "Products" ? "product" : "service") + "-subscriptions"
      )
      .onDataChange(() => {
        this.$dbCon
          .service(
            (this.itemType == "Products" ? "product" : "service") +
              "-subscriptions"
          )
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              $sort: { date_ordered: -1 }
            }
          })
          .then(results => {
            this.subscriptions = results.data;
          });
        this.$dbCon
          .service(
            (this.itemType == "Products" ? "product" : "service") +
              "-subscriptions"
          )
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              status: { $nin: ["Free", "Cancelled", "Paid"] }
            }
          })
          .then(results => {
            if (results.data.length == 0) {
              this.addMoreItems = true;
            } else {
              this.addMoreItems = false;
            }
          });
      });
  }
};
</script>

<style></style>
