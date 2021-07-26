<template>
  <div>
    <div class="q-pb-sm">
      <b
        class="text-orange"
      >{{paymentDetails.type == "Product"? 'Order': 'Reservation'}}#{{transaction.order_number}}</b>
      <br />
      <b>Shopper:</b>
      {{shopper.fname+' '+shopper.lname}}
      <br />
      <b>Total:</b>
      {{$prettyMoney(paymentDetails.total)}}
    </div>
    <div align="right">
    <q-btn label="evaluate" unelevated color="primary" @click="opened=true" />
    </div>
    <q-dialog v-model="opened">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Evaluate Uploaded Bank Deposit</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div>
            <div class="text-h6">Shopper Details</div>
            <q-separator />
            <b>Name:</b>
            {{shopper.fname+' '+shopper.lname}}
            <br />
            <b>Mobile Number:</b>
            {{shopper.mobile_number}}
            <br />
            <b>Email Address:</b>
            {{shopper.email}}
            <br />
          </div>
          <br />
          <div>
            <div
              class="text-h6"
            >{{paymentDetails.type == "Product"? 'Order': 'Reservation'}} Details</div>
            <q-separator />
            <ProductDetails
              :order="transaction"
              :buttonVisible="false"
              v-if="paymentDetails.type == 'Product'"
            />
            <ServiceDetails :order="transaction" :buttonVisible="false" v-else />
          </div>
          <div class="q-pa-sm">
            <div class="text-h6">Deposit Slip</div>
            <q-separator />
            <br />
            <div v-if="paymentDetails.payment_type!='Full Payment'" align="right">
              <PaymentSchedules :schedules="paymentDetails.recurring_payments" />
            </div>
            <q-list padding bordered class="rounded-borders">
              <q-expansion-item
                group="somegroup"
                v-for="(orderDetail, index) in paymentDetails.deposit_details"
                :key="index"
                dense
                :default-opened="index==0"
                dense-toggle
                expand-separator
                :label="$formatDate_DateOnly(orderDetail.date_uploaded)"
              >
                <q-card>
                  <q-card-section>
                    <q-img :ratio="16/9" :src="orderDetail.path" />
                    <div align="right">
                      <a :href="orderDetail.path" target="_blank">
                        <q-btn
                          unelevated
                          color="primary"
                          icon="remove_red_eye"
                          label="view"
                          outline
                          dense
                          size="sm"
                        />
                      </a> &nbsp;
                      <a :href="orderDetail.path" target="_blank">
                        <q-btn
                          unelevated
                          color="primary"
                          icon="get_app"
                          label="download"
                          outline
                          dense
                          size="sm"
                        />
                      </a>
                    </div>
                     <div>  
                        <b>Reference Number:</b>
                        {{orderDetail.reference_number}}
                      </div>
                       <div>
                        <b>Total Amount:</b>
                        {{$prettyMoney(orderDetail.total_amount)}}
                      </div>
                       <div>
                        <b>Date Deposited:</b>
                        {{orderDetail.date_deposited}}
                      </div>
                    <div>
                      <b>Shopper Remarks:</b>
                      {{orderDetail.remarks}}
                    </div>
                    <div v-if="index!=0">
                      <b>Comments:</b>
                      {{orderDetail.comments}}
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Disapprove" color="grey" @click="disapprove" />
          <q-btn flat label="Approve" color="primary" @click="approve" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import PaymentSchedules from "components/paymentSchedules.vue";
import ProductDetails from "components/ItemDetails/productDetails.vue";
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
export default {
  props: ["paymentDetails"],
  components: {
    PaymentSchedules,
    ProductDetails,
    ServiceDetails
  },
  data() {
    return {
      opened: false,
      transaction: {},
      shopper: {},
      reference_number: "",
      total_amount: 0,
      date_deposited: ""
    };
  },
  methods: {
    approve: function() {
      this.$q
        .dialog({
          title: "Payment Approval",
          message: "Are you sure you want to approve this payment?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].status = "Approved";
          this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].reference_number=this.reference_number
           this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].total_amount=this.total_amount
          this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].date_deposited=this.date_deposited
          this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].date_reviewed = new Date();
          this.$dbCon
            .service("shopper-payments")
            .patch(this.paymentDetails._id, this.paymentDetails)
            .then(() => {
              this.updateProductTransaction();
              this.opened = false;
            });
        });
    },
    updateProductTransaction: async function() {
      if (this.paymentDetails.payment_type == "Full Payment") {
        this.transaction.status = "For Acknowledgement";
        if (this.paymentDetails.type == "Product") {
          await this.$dbCon
            .service("product-transactions")
            .patch(this.transaction._id, this.transaction);
        } else if (this.paymentDetails.type == "Service") {
          await this.$dbCon
            .service("service-transactions")
            .patch(this.transaction._id, this.transaction);
        }
      }
      //20% Downpayment OR LAYAWAY
      else if (
        this.paymentDetails.payment_type == "20% Downpayment" ||
        this.paymentDetails.payment_type == "Layaway"
      ) {
        for (
          var x = 0;
          x < this.paymentDetails.recurring_payments.length;
          x++
        ) {
          var RP = this.paymentDetails.recurring_payments[x];
          if (RP.status == "Pending") {
            RP.status = "Done";
            if (x == this.paymentDetails.recurring_payments.length - 1) {
              this.transaction.status = "For Acknowledgement";
              this.paymentDetails.status = "Done";
              if (this.paymentDetails.type == "Product") {
                await this.$dbCon
                  .service("product-transactions")
                  .patch(this.transaction._id, this.transaction);
              } else if (this.paymentDetails.type == "Service") {
                await this.$dbCon
                  .service("service-transactions")
                  .patch(this.transaction._id, this.transaction);
              }
            }
            this.paymentDetails.recurring_payments[x] = RP;
            await this.$dbCon
              .service("shopper-payments")
              .patch(this.paymentDetails._id, this.paymentDetails);
            break;
          }
        }
      }
    },
    disapprove: function() {
      this.$q
        .dialog({
          title: "Payment Disapproval",
          message: "Are you sure you want to disapprove this payment?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].status = "Disapprove";
          this.paymentDetails.deposit_details[
            this.paymentDetails.deposit_details.length - 1
          ].date_reviewed = new Date();
          this.$dbCon
            .service("shopper-payments")
            .patch(this.paymentDetails._id, this.paymentDetails)
            .then(() => {
              this.opened = false;
            });
        });
    }
  },
  async mounted() {
    this.shopper = await this.$dbCon
      .service("users")
      .get(this.paymentDetails.shopper_id);
    if (this.paymentDetails.type == "Product") {
      this.$dbCon
        .service("product-transactions")
        .get(this.paymentDetails.related_id)
        .then(result => {
          this.transaction = result;
        });
    } else if (this.paymentDetails.type == "Service") {
      this.$dbCon
        .service("service-transactions")
        .get(this.paymentDetails.related_id)
        .then(result => {
          this.transaction = result;
        });
    }
  }
};
</script>

<style>
</style>