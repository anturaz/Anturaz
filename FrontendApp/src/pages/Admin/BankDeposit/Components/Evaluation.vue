<template>
  <div>
    <q-btn unelevated color="primary" @click="opened=true">Evaluate</q-btn>
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">Evaluate Bank Deposit</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row">
          <div class="col-md-5 col-sm-12 q-pa-sm">
            <div class="text-h6">Store Details</div>
            <q-separator />
            <div class="q-pa-sm">
              <div>
                <b>Store:</b>
                {{store.store_name}}
              </div>
              <div>
                <b>Mobile Number:</b>
                {{store.mobile_number}}
              </div>
              <div>
                <b>Landline Number:</b>
                {{store.landline_number}}
              </div>
            </div>
            <div class="text-h6">Order Details</div>
            <q-separator />
            <div class="q-pa-sm">
              <div>
                <b>Type:</b>
                {{type}}
              </div>
              <div>
                <b>Date Ordered:</b>
                {{orderDetails.date_ordered}}
              </div>
              <div>
                <b>Month/s:</b>
                {{orderDetails.months}}
              </div>
              <div>
                <b>Total Amount:</b>
                {{orderDetails.months * orderDetails.total_amount}}
              </div>
            </div>
          </div>
          <div class="col-md-7 col-sm-12 q-pa-sm">
            <div class="text-h6">Deposit Slip</div>

            <q-separator />

            <div class="q-pa-sm">
              <q-list padding bordered class="rounded-borders">
                <q-expansion-item
                  group="somegroup"
                  v-for="(orderDetail, index) in deposits"
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
                        <b>Store Owner Remarks:</b>
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
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn unelevated color="grey" label="Disapprove" @click="disapprove" />
          <q-btn unelevated color="primary" label="Approve" @click="approve" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    storeId: String,
    type: String,
    orderDetails: Object,
    depositDetails: Array
  },
  data() {
    return {
      opened: false,
      store: {},
      deposits: []
    };
  },
  methods: {
    successPrompt: function() {
      this.$q
        .dialog({
          title: "Order Approved!",
          message: "You have successfully approve an order."
        })
        .onOk(() => {
          this.opened = false;
        });
    },
    disapprovePrompt: function() {
      this.$q
        .dialog({
          title: "Order Disapproved!",
          message: "You have successfully disapprove an order."
        })
        .onOk(() => {
          this.opened = false;
        });
    },
    approve: function() {
      this.$q
        .dialog({
          title: "Order Approval",
          message: "Are you sure you want to approve this order?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          if (this.type == "Store Advertisment") {
            this.storeAdvertismentApproval();
          } else if (this.type == "Product Advertisment") {
            this.productAdvertismentApproval();
          } else if (this.type == "Service Advertisment") {
            this.serviceAdvertismentApproval();
          } else if (this.type == "Product Subscriptions") {
            this.productSubscriptionsApproval();
          } else if (this.type == "Service Subscriptions") {
            this.serviceSubscriptionsApproval();
          }
        });
    },
    disapprove: function() {
      this.$q
        .dialog({
          title: "Order Disapproval",
          message: "Are you sure you want to disapprove this order?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$q
            .dialog({
              title: "Comments for Dissapproval",
              message:
                "To inform the Store Owner regarding this disapproved order",
              prompt: {
                model: "",
                type: "text" // optional
              },
              cancel: true,
              persistent: true
            })
            .onOk(data => {
              if (this.type == "Store Advertisment") {
                this.storeAdvertismentDisapproval(data);
              } else if (this.type == "Product Advertisment") {
                this.productAdvertismentDisapproval(data);
              } else if (this.type == "Service Advertisment") {
                this.serviceAdvertismentDisapproval(data);
              } else if (this.type == "Product Subscriptions") {
                this.productSubscriptionsDisapproval(data);
              } else if (this.type == "Service Subscriptions") {
                this.serviceSubscriptionsDisapproval(data);
              }
            });
        });
    },
    storeAdvertismentApproval: async function() {
      var relatedId = null; //For Store Payments
      await this.$dbCon
        .service("store-advertisment")
        .find({
          query: { store_id: this.storeId }
        })
        .then(results => {
          var storeAdvertisment = results.data[0];
          var order =
            storeAdvertisment.subscriptions[
              results.data[0].subscriptions.length - 1
            ];
          order.date_paid = new Date();
          order.status = "Paid";
          order.date_started = new Date();
          order.date_end = this.$addToDate(new Date(), 0, order.months);
          order.deposit_details[
            order.deposit_details.length - 1
          ].date_reviewed = new Date();
          order.deposit_details[order.deposit_details.length - 1].status =
            "Approved";
          storeAdvertisment.subscriptions[
            results.data[0].subscriptions.length - 1
          ] = order;
          relatedId = results.data[0].subscriptions.length - 1;
          this.$dbCon
            .service("store-advertisment")
            .patch(storeAdvertisment._id, storeAdvertisment);
        });

      await this.$dbCon.service("store-payments").create({
        related_id: relatedId,
        store_id: this.storeId,
        amount: this.orderDetails.months * this.orderDetails.total_amount,
        date_paid: new Date(),
        payment_for: "Store Advertisment",
        payment_type: "Bank Deposit",
        payment_details: []
      });
      this.successPrompt();
    },
    storeAdvertismentDisapproval: async function(comments) {
      await this.$dbCon
        .service("store-advertisment")
        .find({
          query: { store_id: this.storeId }
        })
        .then(results => {
          var storeAdvertisment = results.data[0];
          var order =
            storeAdvertisment.subscriptions[
              results.data[0].subscriptions.length - 1
            ];
          order.status = "Pending";
          order.deposit_details[
            order.deposit_details.length - 1
          ].date_reviewed = new Date();
          order.deposit_details[order.deposit_details.length - 1].status =
            "Disapproved";
          order.deposit_details[
            order.deposit_details.length - 1
          ].comments = comments;
          storeAdvertisment.subscriptions[
            results.data[0].subscriptions.length - 1
          ] = order;
          this.$dbCon
            .service("store-advertisment")
            .patch(storeAdvertisment._id, storeAdvertisment);
        });
      this.disapprovePrompt();
    },
    productAdvertismentApproval: async function() {
      var relatedId = null; //For Store Payments
      await this.$dbCon
        .service("product-advertisment")
        .find({
          query: { _id: this.orderDetails._id }
        })
        .then(results => {
          var productAdvertisment = results.data[0];
          var order = productAdvertisment;
          order.date_paid = new Date();
          order.status = "Paid";
          order.date_started = new Date();
          order.date_end = this.$addToDate(new Date(), 0, order.months);
          order.deposit_details[
            order.deposit_details.length - 1
          ].date_reviewed = new Date();
          order.deposit_details[order.deposit_details.length - 1].status =
            "Approved";
          productAdvertisment = order;
          relatedId = productAdvertisment._id;
          this.$dbCon
            .service("product-advertisment")
            .patch(productAdvertisment._id, productAdvertisment);
        });

      await this.$dbCon.service("store-payments").create({
        related_id: relatedId,
        store_id: this.storeId,
        amount: this.orderDetails.months * this.orderDetails.total_amount,
        date_paid: new Date(),
        payment_for: "Product Advertisment",
        payment_type: "Bank Deposit",
        payment_details: []
      });
      this.successPrompt();
    },
    productSubscriptionsApproval: async function() {
      var relatedId = null; //For Store Payments
      await this.$dbCon
        .service("product-subscriptions")
        .find({
          query: { _id: this.orderDetails._id }
        })
        .then(results => {
          var productSubscriptions = results.data[0];
          var order = productSubscriptions;
          order.date_paid = new Date();
          order.status = "Paid";
          order.date_started = new Date();
          order.date_end = this.$addToDate(new Date(), 0, order.months);
          order.deposit_details[
            order.deposit_details.length - 1
          ].date_reviewed = new Date();
          order.deposit_details[order.deposit_details.length - 1].status =
            "Approved";
          productSubscriptions = order;
          relatedId = productSubscriptions._id;
          this.$dbCon
            .service("product-subscriptions")
            .patch(productSubscriptions._id, productSubscriptions);
        });

      await this.$dbCon.service("store-payments").create({
        related_id: relatedId,
        store_id: this.storeId,
        amount: this.orderDetails.months * this.orderDetails.total_amount,
        date_paid: new Date(),
        payment_for: "Product Subscriptions",
        payment_type: "Bank Deposit",
        payment_details: []
      });
      this.successPrompt();
    },
    productSubscriptionsDisapproval: async function(comments) {},
    serviceSubscriptionsApproval: async function() {
      var relatedId = null; //For Store Payments
      await this.$dbCon
        .service("service-subscriptions")
        .find({
          query: { _id: this.orderDetails._id }
        })
        .then(results => {
          var serviceAdvertisment = results.data[0];
          var order = serviceAdvertisment;
          order.date_paid = new Date();
          order.status = "Paid";
          order.date_started = new Date();
          order.date_end = this.$addToDate(new Date(), 0, order.months);
          order.deposit_details[
            order.deposit_details.length - 1
          ].date_reviewed = new Date();
          order.deposit_details[order.deposit_details.length - 1].status =
            "Approved";
          serviceAdvertisment = order;
          relatedId = serviceAdvertisment._id;
          this.$dbCon
            .service("service-subscriptions")
            .patch(serviceAdvertisment._id, serviceAdvertisment);
        });

      await this.$dbCon.service("store-payments").create({
        related_id: relatedId,
        store_id: this.storeId,
        amount: this.orderDetails.months * this.orderDetails.total_amount,
        date_paid: new Date(),
        payment_for: "Service Subscriptions",
        payment_type: "Bank Deposit",
        payment_details: []
      });
      this.successPrompt();
    },
    serviceSubscriptionsDisapproval: async function(comments) {},
    // TODOOOOOOOOOOO!
    productAdvertismentDisapproval: async function(comments) {},
    serviceAdvertismentApproval: async function() {
      var relatedId = null; //For Store Payments
      await this.$dbCon
        .service("service-advertisment")
        .find({
          query: { _id: this.orderDetails._id }
        })
        .then(results => {
          var serviceAdvertisment = results.data[0];
          var order = serviceAdvertisment;
          order.date_paid = new Date();
          order.status = "Paid";
          order.date_started = new Date();
          order.date_end = this.$addToDate(new Date(), 0, order.months);
          order.deposit_details[
            order.deposit_details.length - 1
          ].date_reviewed = new Date();
          order.deposit_details[order.deposit_details.length - 1].status =
            "Approved";
          serviceAdvertisment = order;
          relatedId = serviceAdvertisment._id;
          this.$dbCon
            .service("service-advertisment")
            .patch(serviceAdvertisment._id, serviceAdvertisment);
        });

      await this.$dbCon.service("store-payments").create({
        related_id: relatedId,
        store_id: this.storeId,
        amount: this.orderDetails.months * this.orderDetails.total_amount,
        date_paid: new Date(),
        payment_for: "Product Advertisment",
        payment_type: "Bank Deposit",
        payment_details: []
      });
      this.successPrompt();
    }
  },
  mounted() {
    this.deposits = this.orderDetails.deposit_details;
    this.deposits.reverse();
    this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.storeId
        }
      })
      .then(results => {
        this.store = results.data[0];
      });
  }
};
</script>

<style>
</style>