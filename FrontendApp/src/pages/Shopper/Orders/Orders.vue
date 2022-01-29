<template>
  <div class="q-pa-lg row">
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
    <q-card class="col-12" flat>
      <q-card-section>
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
            <q-tab-panel name="To Pay">
              <q-list v-for="order in toPay" :key="order._id" bordered>
                <ToPay class="q-ma-md" :order="order" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="For Acknowledgement">
              <q-list bordered>
                <q-list v-for="order in forAcknowledgement" :key="order._id" bordered>
                  <ProductDetails :order="order" :buttonVisible="false" />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="For Packaging">
              <q-list bordered>
                <q-list v-for="order in forPackaging" :key="order._id" bordered>
                  <ProductDetails :order="order" :buttonVisible="false" />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="To Ship">
              <q-list bordered>
                <q-list v-for="order in toShip" :key="order._id" bordered>
                  <ProductDetails :order="order" :buttonVisible="false" />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="To Pickup">
              <q-list bordered>
                <q-list v-for="order in toPickup" :key="order._id" bordered>
                  <ProductDetails :order="order" :buttonVisible="false" />
                </q-list>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="To Receive">
              <q-list v-for="order in toReceive" :key="order._id" bordered>
                <ToReceive :order="order" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="To Rate">
              <q-list v-for="order in toRate" :key="order._id" bordered>
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
import ProductDetails from "components/ItemDetails/productDetails.vue";
export default {
  components: {
    ToPay,
    ToReceive,
    ToRate,
    ProductDetails
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
      marker: 1
    };
  },
  methods: {
    getOrder: async function(status) {
      var orders = await this.$dbCon.service("product-transactions").find({
        query: {
          shopper_id: this.user._id,
          status: status
        }
      });
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
  }
};
</script>

<style>
</style>