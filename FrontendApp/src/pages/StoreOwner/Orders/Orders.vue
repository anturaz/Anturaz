<template>
  <div class="row">
      <div v-if="_data && _data[current_count]   "  class="col-9 text-right self-center q-pr-md" >{{_data[current_count].length}}</div>
   <div class="col-3">
      <q-btn icon="pageview" @click="opened=true" size="lg" dense flat color="grey" />
    </div>
    <q-dialog v-model="opened" full-height full-width :maximized="$q.screen.lt.md" class="column">
      <q-card style="width: 800px; max-width: 80vw;" class="col-12">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" @click="opened=false" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-breadcrumbs class="text-grey">
            <q-breadcrumbs-el label="Store" icon="store" />
            <q-breadcrumbs-el label="Orders" icon="list" />
          </q-breadcrumbs>
          <br />
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
                  <q-tab name="Pending Payment" label="Pending Payment">
                    <q-badge v-if="pendingPayment" color="primary" :label="pendingPayment.length" />
                  </q-tab>
                  <q-tab name="For Acknowledgement" label="For Acknowledgement">
                    <q-badge v-if="forAcknowledgement" color="primary" :label="forAcknowledgement.length" />
                  </q-tab>
                  <q-tab name="For Packaging" label="For Packaging">
                    <q-badge v-if="forPackaging" color="primary" :label="forPackaging.length" />
                  </q-tab>
                  <q-tab name="For Shipping" label="For Shipping">
                    <q-badge v-if="forShipping" color="primary" :label="forShipping.length" />
                  </q-tab>
                  <q-tab name="For Pickup" label="For Pickup">
                    <q-badge v-if="forPickup" color="primary" :label="forPickup.length" />
                  </q-tab>
                     <q-tab name="Completed" label="Completed">
                    <q-badge v-if="completed" color="primary" :label="completed.length" />
                  </q-tab>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="Pending Payment">
                    <q-list v-for="order in pendingPayment" :key="order._id" bordered>
                      <PendingPayment :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="For Acknowledgement">
                    <q-list v-for="order in forAcknowledgement" :key="order._id" bordered>
                      <ForAcknowledgement :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="For Packaging">
                    <q-list v-for="order in forPackaging" :key="order._id" bordered>
                      <ForPackaging :order="order" />
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel name="For Shipping">
                    <q-list v-for="order in forShipping" :key="order._id" bordered>
                      <ForShipping :order="order" />
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel name="For Pickup">
                    <q-list v-for="order in forPickup" :key="order._id" bordered>
                      <ForPickup :order="order" />
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel name="Completed">
                    <q-list v-for="order in completed" :key="order._id" bordered>
                      <ForPickup :order="order" />
                    </q-list>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import PendingPayment from "./pendingPayments.vue";
import ForAcknowledgement from "./forAcknowledgement.vue";
import ForPackaging from "./forPackaging.vue";
import ForShipping from "./forShipping.vue";
import ForPickup from "./forPickup.vue";
import Completed from "./completed.vue";
export default {
  props: ["tab"],
  components: {
    PendingPayment,
    ForAcknowledgement,
    ForPackaging,
    ForShipping,
    ForPickup,
    Completed
  },
  data() {
    return {
      pendingPayment: [],
      forAcknowledgement: [],
      forPackaging: [],
      forShipping: [],
      forPickup: [],
      completed: [],
      opened: false,
      current_count: ""
    };
  },
  methods: {
    getOrder: async function(status) {
      var results = await this.$dbCon.service("product-transactions").find({
        query: {
          store_id: this.$local.getItem("store_token"),
          status: status
        }
      });
      return results.data;
    }
  },
  async mounted() {
    this.current_count = this.tab.split(" ").join("");
    this.current_count =
      this.current_count.charAt(0).toLowerCase() +
      this.current_count.substring(1);
    await this.$dbCon.service("product-transactions").onDataChange(async () => {
      this.pendingPayment = await this.getOrder("Pending Payment");
      this.forAcknowledgement = await this.getOrder("For Acknowledgement");
      this.forPackaging = await this.getOrder("For Packaging");
      this.forShipping = await this.getOrder("For Shipping");
      this.forPickup = await this.getOrder("For Pickup");
      this.completed = await this.getOrder("Completed");
    });
  }
};
</script>

<style>
</style>