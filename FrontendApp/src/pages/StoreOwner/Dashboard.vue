<template>
  <div class="row">
    <div class="fixed-bottom-left" style="z-index: 2">
      <q-btn
        unelevated
        label="Advertise"
        @click="(currentMenu = 'Store Profile'), (opened = true)"
        color="primary"
        no-caps
        :style="$q.screen.lt.md ? 'width:50vw' : 'width: 150px'"
      />
      <a :href="$appLink + '/#/store/' + store.unique_link" target="_blank">
        <q-btn
          class="bg-white"
          color="primary"
          outline
          unelevated
          no-caps
          :style="$q.screen.lt.md ? 'width:50vw' : 'width: 150px'"
        >
          <div class="text-center">Visit Store</div>
          <q-icon right name="store" />
        </q-btn>
      </a>
    </div>
    <!-- STORE DASHBOARD HEADER -->
    <q-card
      class="col-12 col-auto"
      flat
      :class="$q.screen.lt.md ? 'q-pl-xl' : ''"
    >
      <q-card-section class="row justify-right">
        <div class="col-md-8 col-xs-12 row">
          <q-img
            class="q-mr-md self-center"
            style="height: 60px; width: 60px"
            :src="store.logo"
            ratio="1"
          />
          <div class="col self-center row">
            <span class="text-h4 text-grey-7 col-12">{{
              store.store_name.toUpperCase()
            }}</span>
            <span class="text-subtitle2 text-grey-7">
              <span class="text-primary">12.5k</span> Followers |
              <span class="text-primary">5.0</span> Store Rating
            </span>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="col-md-9 col-xs-12">
      <div class="q-pt-md row">
        <q-tabs
          v-model="tab"
          dense
          align="left"
          inline-label
          no-caps
          class="bg-white text-white"
          :breakpoint="0"
          flat
          v-if="!$q.screen.lt.md"
        >
          <q-tab
            name="sales"
            :class="tab == 'sales' ? 'bg-primary text-white' : 'text-grey-7'"
          >
            <q-icon name="fa fa-handshake" class="q-mr-sm" />Sales </q-tab
          >&nbsp;
          <q-tab
            name="settings"
            :class="tab == 'settings' ? 'bg-primary text-white' : 'text-grey-7'"
          >
            <q-icon name="settings" class="q-mr-sm" />Settings </q-tab
          >&nbsp;
          <q-tab
            name="inventory"
            :class="
              tab == 'inventory' ? 'bg-primary text-white' : 'text-grey-7'
            "
          >
            <q-icon name="fas fa-box" class="q-mr-sm" />Inventory </q-tab
          >&nbsp;
          <q-tab
            name="reviews"
            :class="tab == 'reviews' ? 'bg-primary text-white' : 'text-grey-7'"
          >
            <q-icon name="fa fa-star" class="q-mr-sm" />Reviews
          </q-tab>
        </q-tabs>
        <q-tabs
          v-model="tab"
          dense
          inline-label
          no-caps
          style="width: 100%; max-height: 40px"
          class="bg-white text-white"
          :breakpoint="0"
          flat
          v-else
        >
          <q-tab
            name="sales"
            label="Sales"
            style="overflow: hidden"
            :class="
              tab == 'sales' ? 'bg-grey-4 text-primary' : 'bg-white text-black'
            "
          />
          <q-tab
            name="settings"
            label="Settings"
            :class="
              tab == 'settings'
                ? 'bg-grey-4 text-primary'
                : 'bg-white text-black'
            "
          />
          <q-tab
            name="inventory"
            label="Inventory"
            :class="
              tab == 'inventory'
                ? 'bg-grey-4 text-primary'
                : 'bg-white text-black'
            "
          />
          <q-tab
            name="reviews"
            label="Reviews"
            :class="
              tab == 'reviews'
                ? 'bg-grey-4 text-primary'
                : 'bg-white text-black'
            "
          />
          <q-tab
            name="announcements"
            icon="fas fa-bullhorn"
            :class="
              tab == 'announcements'
                ? 'bg-grey-4 text-primary'
                : 'bg-white text-black'
            "
          />
        </q-tabs>
        <!-- SALES -->
        <q-card
          class="col-12 row"
          v-if="tab == 'sales'"
          flat
          :style="
            $q.screen.lt.md
              ? 'border-top:solid orange 1px'
              : 'border: solid orange 1px'
          "
        >
          <q-scroll-area class="col-12 row q-pa-md" style="height: 63vh">
            <div class="q-ma-xs" align="right">
              <q-btn label="Sales Report" color="primary" no-caps unelevated />
            </div>
            <div class="col-12 row">
              <q-card
                class="q-pa-lg col-md-6 col-xs-12"
                :class="$q.screen.lt.sm ? 'q-mb-md' : 'q-pr-sm'"
                flat
              >
                <div class="text-primary text-h6 q-pb-sm">Products</div>
                <q-separator />
                <div class="row" v-for="(order, index) in orders" :key="index">
                  <div class="col-6 self-center">{{ order }}</div>

                  <div class="col-6 self-center">
                    <Orders :tab="order" />
                  </div>
                  <q-separator class="col-12" />
                </div>
              </q-card>
              <q-card
                class="q-pa-lg col-md-6 col-xs-12"
                :class="$q.screen.lt.sm ? 'q-mb-md' : null"
                flat
              >
                <div class="text-primary text-h6 q-pb-sm">Services</div>
                <q-separator />
                <div
                  class="row"
                  v-for="(reservation, index) in reservations"
                  :key="index"
                >
                  <div class="col-6 self-center">{{ reservation }}</div>
                  <div class="col-6 self-center">
                    <Reservations :tab="reservation" />
                  </div>
                  <q-separator class="col-12" />
                </div>
              </q-card>
            </div>
          </q-scroll-area>
        </q-card>
        <!-- SETTINGS -->
        <q-card
          class="col-12 row"
          v-if="tab == 'settings'"
          flat
          :style="
            $q.screen.lt.md
              ? 'border-top:solid orange 1px'
              : 'border: solid orange 1px'
          "
        >
          <q-scroll-area class="col-12 row" style="height: 63vh">
            <div class="col-12 row">
              <MainMenu :class="!$q.screen.lt.md ? 'q-pl-md' : ''" />
            </div>
          </q-scroll-area>
        </q-card>
        <!-- INVENTORY -->
        <q-card
          class="col-12"
          v-if="tab == 'inventory'"
          flat
          :style="
            $q.screen.lt.md
              ? 'border-top:solid orange 1px'
              : 'border: solid orange 1px'
          "
        >
          <q-scroll-area class="col-12 row" style="height: 63vh">
            <div class="col-12 row">
              <ManageItems
                class="col-12"
                :class="!$q.screen.lt.md ? 'q-pl-md' : ''"
              />
            </div>
          </q-scroll-area>
        </q-card>
        <!-- REVIEWS -->
        <q-card
          class="col-12"
          v-if="tab == 'reviews'"
          flat
          :style="
            $q.screen.lt.md
              ? 'border-top:solid orange 1px'
              : 'border: solid orange 1px'
          "
        >
          <q-scroll-area class="col-12 row" style="height: 63vh">
            <div class="col-12 row">
              <Ratings :class="!$q.screen.lt.md ? 'q-pl-md' : ''" />
            </div>
          </q-scroll-area>
        </q-card>
        <WidgetAnnouncement
          v-if="tab == 'announcements'"
          fromTypeUser="Store Owner"
        />
      </div>
    </div>
    <div
      class="col-md-3 col-xs-12 q-pt-md q-pl-sm column"
      v-if="!$q.screen.lt.md"
    >
      <WidgetAnnouncement class="col" fromTypeUser="Store Owner" />
    </div>

    <q-dialog
      v-model="opened"
      full-height
      full-width
      :maximized="$q.screen.lt.md"
      class="column"
    >
      <q-card style="width: 800px; max-width: 80vw" class="col-12">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="opened = false" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="column">
          <div class="col-12">
            <StoreProfile v-if="currentMenu == 'Store Profile'" current="3" />
            <!-- <div v-if="currentMenu=='Manage Inventory'">
              <q-btn-group spread>
                <q-btn
                  :color="currentInventoryMenu=='products'?'primary': 'grey'"
                  label="Products"
                  @click="currentInventoryMenu='products'"
                />
                <q-btn
                  :color="currentInventoryMenu=='services'?'primary': 'grey'"
                  label="Services"
                  @click="currentInventoryMenu='services'"
                />
              </q-btn-group>
              <ManageProducts v-show="currentInventoryMenu=='products'" />
              <ManageServices v-show="currentInventoryMenu=='services'" />
            </div>-->
            <Reports v-if="currentMenu == 'Reports'" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import WidgetAnnouncement from "../../widgets/announcements.vue";
import StoreProfile from "pages/StoreOwner/StoreProfile.vue";
import ManageItems from "pages/StoreOwner/ManageItems.vue";
import Reports from "pages/StoreOwner/Reports/Reports.vue";
import Orders from "pages/StoreOwner/Orders/Orders.vue";
import Reservations from "pages/StoreOwner/Reservations/Reservations.vue";
import MainMenu from "pages/StoreOwner/Dashboard/mainmenu.vue";
import Ratings from "pages/StoreOwner/RatingsAndReviews/RatingsAndReviews.vue";
export default {
  components: {
    StoreProfile,
    ManageItems,
    Reports,
    Orders,
    Reservations,
    MainMenu,
    WidgetAnnouncement,
    Ratings,
  },
  data() {
    return {
      opened: false,
      currentMenu: "",
      currentInventoryMenu: "products",
      store: {},
      orders: [
        "Pending Payment",
        "For Acknowledgement",
        "For Packaging",
        "For Shipping",
        "For Pickup",
        "Completed",
      ],
      reservations: [
        "Pending Payment",
        "To Acknowledge",
        "Status",
        "Completed",
      ],
      tab: "sales",
    };
  },

  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token"),
          },
        })
        .then((result) => {
          this.store = result.data[0];
        });
    });
  },
};
</script>

<style scoped>
</style>