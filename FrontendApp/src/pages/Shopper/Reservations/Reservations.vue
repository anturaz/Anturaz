<template>
  <div
    class="row"
    :class="!$q.screen.lt.md ? 'q-pa-lg' : 'q-pt-lg q-pl-sm q-pr-sm'"
  >
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="My Reservations" icon="menu_book" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <q-card class="col-12" flat :class="!$q.screen.lt.md ? '' : 'col-12 '">
      <q-card-section class="q-pl-none q-pr-none">
        <q-card flat bordered>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="To Pay" label="To Pay">
              <q-badge color="primary" :label="toPay.length" />
            </q-tab>
            <q-tab name="For Acknowledgement" label="For Acknowledgement">
              <q-badge color="primary" :label="forAcknowledgement.length" />
            </q-tab>
            <q-tab name="To Acknowledge" label="Service Confirmation">
              <q-badge color="primary" :label="toAcknowledge.length" />
            </q-tab>
            <q-tab name="To Rate" label="To Rate">
              <q-badge color="primary" :label="toRate.length" />
            </q-tab>
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel
              name="To Pay"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list
                v-for="order in toPay"
                :key="order._id"
                :bordered="isMobile ? bordered : ''"
              >
                <ToPay
                  :class="!isMobile ? 'q-pa-md' : ''"
                  :order="order"
                  :paymentOptions="payment_options"
                />
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="For Acknowledgement"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list
                v-for="order in forAcknowledgement"
                :key="order._id"
                :bordered="isMobile ? bordered : ''"
              >
                <ServiceDetails
                  v-if="!$q.screen.lt.md"
                  :order="order"
                  :buttonVisible="false"
                />
                <serviceDetailsMobile
                  v-else
                  :order="order"
                  :buttonVisible="false"
                />
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="To Acknowledge"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list
                v-for="order in toAcknowledge"
                :key="order._id"
                :bordered="isMobile ? bordered : ''"
              >
                <ToReceive :order="order" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="To Rate"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list
                v-for="order in toRate"
                :key="order._id"
                :bordered="isMobile ? bordered : ''"
              >
                <ToRate :order="order" />
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
import serviceDetailsMobile from "../../../components/ItemDetails/serviceDetailsMobile.vue";
import ToPay from "./toPay.vue";
import ToReceive from "./toReceive.vue";
import ToRate from "./toRate.vue";
import { getPaymentOptions } from "../../../api/services/paymentService";
export default {
  components: {
    ToPay,
    ToReceive,
    ServiceDetails,
    ToRate,
    serviceDetailsMobile
  },
  data() {
    return {
      tab: "To Pay",
      toPay: [],
      forAcknowledgement: [],
      toAcknowledge: [],
      toRate: [],
      user: {},
      marker: 1,
      payment_options: []
    };
  },
  computed: {
    isMobile() {
      return this.$q.screen.lt.md;
    }
  },
  methods: {
    getPayments: async function() {
      try {
        const { data } = await getPaymentOptions();
        this.payment_options = data;
      } catch (error) {
        console.log(error);
      }
    },
    getOrder: async function(status) {
      var reservations = await this.$dbCon
        .service("service-transactions")
        .find({
          query: {
            shopper_id: this.user._id,
            status: status,
            $sort: {
              date_needed: 1
            }
          }
        });
      console.log(reservations);

      if (status === "Pending Payment") {
        // console.log(`Syncing payment: ${payment.transaction_id}`);
        const orderIds = reservations.data.map(order => order._id);
        console.log(orderIds);
        const { data: shopperPayments } = await this.$dbCon
          .service("shopper-payments")
          .find({
            query: {
              related_id: { $in: orderIds }
            }
          });
        for (const payment of shopperPayments.filter(
          shopperPayment => shopperPayment.transaction_id
        )) {
          const order = reservations.data.find(
            order => order._id === payment.related_id
          );
          console.log(order);
          order.transaction_id = payment.transaction_id;
        }
      }

      return reservations.data;
    }
  },
  async mounted() {
    this.user = await this.$getUser();
    this.$dbCon.service("service-transactions").onDataChange(async () => {
      this.toPay = await this.getOrder("Pending Payment");
      this.forAcknowledgement = await this.getOrder("For Acknowledgement");
      this.toAcknowledge = await this.getOrder("To Acknowledge");
      this.toRate = await this.getOrder("For Rating");
    });
    this.getPayments();
  }
};
</script>

<style></style>
