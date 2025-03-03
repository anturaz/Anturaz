<template>
  <div class="row" :class="!$q.screen.lt.md ? ' ' : ' q-pl-sm q-pr-sm'">
    <div
      v-if="_data && _data[current_count]"
      class="col-9 text-right self-center q-pr-md"
    >
      {{ _data[current_count].length }}
    </div>
    <div class="col-3">
      <q-btn
        icon="pageview"
        @click="opened = true"
        size="lg"
        dense
        flat
        color="grey"
      />
    </div>
    <q-dialog
      v-model="opened"
      full-height
      full-width
      :maximized="$q.screen.lt.md"
      class="column"
    >
      <q-card style="width: 800px; max-width: 80vw;" class="col-12">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" @click="opened = false" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section :class="!$q.screen.lt.md ? ' ' : 'q-pl-none q-pr-none'">
          <q-breadcrumbs class="text-grey">
            <q-breadcrumbs-el label="Store" icon="store" />
            <q-breadcrumbs-el label="Orders" icon="list" />
          </q-breadcrumbs>
          <br />
          <q-card class="col-12" flat>
            <q-card-section :class="!isMobile ? '' : 'q-pa-xs'">
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
                  <q-tab
                    name="Pending Payment"
                    label="Pending Payment"
                    :class="!isMobile ? '' : 'q-pa-xs'"
                  >
                    <q-badge
                      v-if="pendingPayment"
                      color="primary"
                      :label="pendingPayment.length"
                    />
                  </q-tab>
                  <q-tab
                    name="For Acknowledgement"
                    label="For Acknowledgement"
                    :class="!isMobile ? '' : 'q-pa-xs'"
                  >
                    <q-badge
                      v-if="forAcknowledgement"
                      color="primary"
                      :label="forAcknowledgement.length"
                    />
                  </q-tab>
                  <q-tab name="For Packaging" label="For Packaging">
                    <q-badge
                      v-if="forPackaging"
                      color="primary"
                      :label="forPackaging.length"
                    />
                  </q-tab>
                  <q-tab name="For Shipping" label="For Shipping">
                    <q-badge
                      v-if="forShipping"
                      color="primary"
                      :label="forShipping.length"
                    />
                  </q-tab>

                  <q-tab name="For Pickup" label="For Pickup">
                    <q-badge
                      v-if="forPickup"
                      color="primary"
                      :label="forPickup.length"
                    />
                  </q-tab>
                  <q-tab name="To Received" label="Shipped Out">
                    <q-badge
                      v-if="forReceiving"
                      color="primary"
                      :label="forReceiving.length"
                    />
                  </q-tab>
                  <q-tab name="Completed" label="Completed">
                    <q-badge
                      v-if="completed"
                      color="primary"
                      :label="completed.length"
                    />
                  </q-tab>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel
                    name="Pending Payment"
                    :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
                  >
                    <q-list
                      v-for="order in pendingPayment"
                      :key="order._id"
                      :bordered="!isMobile ? true : false"
                      class="q-pb-sm"
                    >
                      <PendingPayment :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel
                    name="For Acknowledgement"
                    :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
                  >
                    <q-list
                      v-for="order in forAcknowledgement"
                      :key="order._id"
                      :bordered="!isMobile ? true : false"
                      class="q-pb-sm"
                    >
                      <ForAcknowledgement :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel
                    name="For Packaging"
                    :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
                  >
                    <q-list
                      v-for="order in forPackaging"
                      :key="order._id"
                      :bordered="!isMobile ? true : false"
                      class="q-pb-sm"
                    >
                      <ForPackaging :order="order" />
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel
                    name="For Shipping"
                    :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
                  >
                    <q-list
                      v-for="order in forShipping"
                      :key="order._id"
                      :bordered="!isMobile ? true : false"
                      class="q-pb-sm"
                    >
                      <ForShipping :order="order" />
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel
                    name="For Pickup"
                    :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
                  >
                    <q-list
                      v-for="order in forPickup"
                      :key="order._id"
                      :bordered="!isMobile ? true : false"
                      class="q-pb-sm"
                    >
                      <ForPickup :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel
                    name="To Received"
                    :class="!isMobile ? 'q-pa-md' : 'q-pa-xs'"
                  >
                    <q-list
                      v-for="order in forReceiving"
                      :key="order._id"
                      :bordered="!isMobile ? true : false"
                      class="q-pb-sm"
                    >
                      <ForReceiving :order="order" />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="Completed">
                    <q-list
                      v-for="order in sortedCompletedOrders"
                      :key="order._id"
                      bordered
                    >
                      <ForReceiving :order="order" />
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
import ForReceiving from "./forReceiving.vue";
import { status } from "../../../types/status";
export default {
  props: ["tab"],
  components: {
    PendingPayment,
    ForAcknowledgement,
    ForPackaging,
    ForShipping,
    ForReceiving,
    ForPickup,
    Completed
  },
  computed: {
    isMobile() {
      return this.$q.screen.lt.md;
    },
    sortedCompletedOrders() {
      return this.completed.sort((a, b) => {
        // Ensure logs exist before accessing
        const dateA = a.logs.length
          ? new Date(a.logs[a.logs.length - 1].date)
          : new Date(0);
        const dateB = b.logs.length
          ? new Date(b.logs[b.logs.length - 1].date)
          : new Date(0);

        return dateB - dateA; // Sort by most recent first
      });
    }
  },
  data() {
    return {
      pendingPayment: [],
      forAcknowledgement: [],
      forPackaging: [],
      forShipping: [],
      forReceiving: [],
      forPickup: [],
      completed: [],
      opened: false,
      current_count: ""
    };
  },
  methods: {
    getOrder: async function(status) {
      let queryStatus = status === "Done" ? ["Done", "For Rating"] : [status];
      var results = await this.$dbCon.service("product-transactions").find({
        query: {
          store_id: this.$local.getItem("store_token"),
          status: {
            $in: queryStatus
          },
          $sort: {
            date_needed: 1
          }
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
      this.pendingPayment = await this.getOrder(status.PendingPayment);
      this.forAcknowledgement = await this.getOrder("For Acknowledgement");
      this.forPackaging = await this.getOrder(status.ForPackaging);
      this.forShipping = await this.getOrder(status.ForShipping);
      this.forReceiving = await this.getOrder(status.ForReceiving);
      this.forPickup = await this.getOrder(status.ForPickup);
      this.completed = await this.getOrder(status.Done);
    });
  }
};
</script>

<style></style>
