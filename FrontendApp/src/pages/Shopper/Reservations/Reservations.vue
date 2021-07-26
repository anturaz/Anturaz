<template>
  <div class="q-pa-lg row">
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el label="My Reservations" icon="menu_book" />
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
            <q-tab name="To Acknowledge" label="To Acknowledge">
              <q-badge color="primary" :label="toAcknowledge.length" />
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
              <q-list v-for="order in forAcknowledgement" :key="order._id" bordered>
                <ServiceDetails :order="order" :buttonVisible="false" />
              </q-list> 
            </q-tab-panel>
            <q-tab-panel name="To Acknowledge">
              <q-list v-for="order in toAcknowledge" :key="order._id" bordered>
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
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
import ToPay from "./toPay.vue";
import ToReceive from "./toReceive.vue";
import ToRate from "./toRate.vue";
export default {
  components: {
    ToPay,
    ToReceive,
    ServiceDetails,
    ToRate
  },
  data() {
    return {
      tab: "To Pay",
      toPay: [],
      forAcknowledgement: [],
      toAcknowledge: [],
      toRate: [],
      user: {},
      marker: 1
    };
  },
  methods: {
    getOrder: async function(status) {
      var reservations = await this.$dbCon
        .service("service-transactions")
        .find({
          query: {
            shopper_id: this.user._id,
            status: status
          }
        });
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
  }
};
</script>

<style>
</style>