<template>
  <div
    class=" row"
    :class="!$q.screen.lt.md ? ' q-pa-lg' : 'q-pt-lg q-pl-sm q-pr-sm'"
  >
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="My Orders" icon="list" />
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
            <q-tab name="For Packaging" label="For Packaging">
              <q-badge color="primary" :label="forPackaging.length" />
            </q-tab>
            <q-tab name="To Ship" label="To Ship">
              <q-badge color="primary" :label="toShip.length" />
            </q-tab>
            <q-tab name="To Pickup" label="To Pickup">
              <q-badge color="primary" :label="toPickup.length" />
            </q-tab>
            <q-tab name="To Receive" label="To Receive">
              <q-badge color="primary" :label="toReceive.length" />
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
                <ProductDetails
                  :order="order"
                  :buttonVisible="false"
                  v-if="!$q.screen.lt.md"
                />
                <productDetailsMobile
                  v-else
                  :order="order"
                  :buttonVisible="false"
                />
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
              <q-list>
                <q-list v-for="order in forAcknowledgement" :key="order._id">
                  <ProductDetails
                    v-if="!$q.screen.lt.md"
                    :order="order"
                    :buttonVisible="false"
                  />
                  <productDetailsMobile
                    v-else
                    :order="order"
                    :buttonVisible="false"
                  />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="For Packaging"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list>
                <q-list v-for="order in forPackaging" :key="order._id">
                  <ProductDetails
                    v-if="!$q.screen.lt.md"
                    :order="order"
                    :buttonVisible="false"
                  />
                  <productDetailsMobile
                    v-else
                    :order="order"
                    :buttonVisible="false"
                  />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="To Ship"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list>
                <q-list v-for="order in toShip" :key="order._id">
                  <ProductDetails
                    v-if="!$q.screen.lt.md"
                    :order="order"
                    :buttonVisible="false"
                  />
                  <productDetailsMobile
                    v-else
                    :order="order"
                    :buttonVisible="false"
                  />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="To Pickup"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list>
                <q-list v-for="order in toPickup" :key="order._id">
                  <ProductDetails
                    v-if="!$q.screen.lt.md"
                    :order="order"
                    :buttonVisible="false"
                  />
                  <productDetailsMobile
                    v-else
                    :order="order"
                    :buttonVisible="false"
                  />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="To Receive"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list v-for="order in toReceive" :key="order._id" bordered>
                <ToReceive :order="order" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel
              name="To Rate"
              :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
            >
              <q-list v-for="order in toRate" :key="order._id">
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
import ToPay from "./toPay.vue";
import ToReceive from "./toReceive.vue";
import ToRate from "./toRate.vue";
import {
  syncShopperPayments,
  getPaymentOptions
} from "../../../api/services/paymentService";
import ProductDetails from "components/ItemDetails/productDetails.vue";
import productDetailsMobile from "../../../components/ItemDetails/productDetailsMobile.vue";

export default {
  components: {
    ToPay,
    ToReceive,
    ToRate,
    ProductDetails,
    productDetailsMobile
  },
  data() {
    return {
      tab: "To Pay",
      toPay: [],
      forAcknowledgement: [],
      forPackaging: [],
      toShip: [],
      toPickup: [],
      toReceive: [],
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
  watch: {},
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
      var orders = await this.$dbCon.service("product-transactions").find({
        query: {
          shopper_id: this.user._id,
          status: status,
          $sort: {
            date_needed: 1
          }
        }
      });

      if (status === "Pending Payment") {
        // console.log(`Syncing payment: ${payment.transaction_id}`);
        const orderIds = orders.data.map(order => order._id);
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
          const order = orders.data.find(
            order => order._id === payment.related_id
          );

          order.transaction_id = payment.transaction_id;
          //   console.log(payment.transaction_id);
          // await syncShopperPayments(payment.transaction_id);
          // await this.delay(2000);
          // await syncShopperPayments(payment.transaction_id);
          // await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      return orders.data;
    }
  },
  async mounted() {
    this.user = await this.$getUser();
    this.$dbCon.service("product-transactions").onDataChange(async () => {
      this.toPay = await this.getOrder("Pending Payment");
      this.forAcknowledgement = await this.getOrder("For Acknowledgement");
      this.forPackaging = await this.getOrder("For Packaging");
      this.toShip = await this.getOrder("For Shipping");
      this.toPickup = await this.getOrder("For Pickup");
      this.toReceive = await this.getOrder("For Receiving");
      this.toRate = await this.getOrder("For Rating");
    });
    this.getPayments();
  }
};
</script>

<style></style>
