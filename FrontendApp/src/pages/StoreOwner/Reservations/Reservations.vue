<template>
  <div class="row">
    <div v-if="_data && _data[current_count] " class="col-9 text-right self-center q-pr-md" >{{_data[current_count].length}}</div>
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
            <q-breadcrumbs-el label="Reservations" icon="menu_book" />
          </q-breadcrumbs>
          <br />
          <q-card class="col-12" flat>
            <q-card-section>
              <q-card flat bordered>
                <q-tabs
                  v-model="tabData"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="left"
                  narrow-indicator
                >
                  <q-tab name="Pending Payment" label="Pending Payment">
                    <q-badge color="primary" :label="pendingPayment.length" />
                  </q-tab>
                  <q-tab name="To Acknowledge" label="To Acknowledge">
                    <q-badge color="primary" :label="toAcknowledge.length" />
                  </q-tab>
                  <q-tab name="Status" label="Status">
                    <q-badge color="primary" :label="status.length" />
                  </q-tab>
                   <q-tab name="Completed" label="Completed">
                    <q-badge color="primary" :label="completed.length" />
                  </q-tab>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tabData" animated>
                  <q-tab-panel name="Pending Payment">
                    <q-list v-for="order in pendingPayment" :key="order._id" bordered>
                      <PendingPayment :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="To Acknowledge">
                    <q-list v-for="order in toAcknowledge" :key="order._id" bordered>
                      <ToAcknowledge :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="Status">
                    <q-list v-for="order in status" :key="order._id" bordered>
                      <Status :order="order" />
                    </q-list>
                  </q-tab-panel>
                       <q-tab-panel name="Completed">
                    <q-list v-for="order in completed" :key="order._id" bordered>
                      <Status :order="order" />
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
import ToAcknowledge from "./toAcknowledge.vue";
import Status from "./status.vue";
import Completed from "./completed.vue";
export default {
  props: ["tab"],
  components: {
    PendingPayment,
    ToAcknowledge,
    Status,
    Completed
  },
  data() {
    return {
      pendingPayment: [],
      toAcknowledge: [],
      status: [],
      completed: [],
      tabData: "To Acknowledge",
      opened: false,
      current_count: ""
    };
  },
  methods: {
    getData: async function(status) {
      var results = await this.$dbCon.service("service-transactions").find({
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
    //ORDER THAT IS FOR REVIEW
    this.$dbCon.service("service-transactions").onDataChange(async () => {
      this.pendingPayment = await this.getData("Pending Payment");
      this.toAcknowledge = await this.getData("For Acknowledgement");
      this.status = await this.getData("To Acknowledge");
      this.completed = await this.getData("Completed");
    });
  }
};
</script>

<style>
</style>