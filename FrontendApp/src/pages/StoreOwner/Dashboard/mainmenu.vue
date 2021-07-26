<template >
  <div class="column">
    <q-card
      flat
      class="col justify-center row text-grey text-caption "
      :class="$q.screen.lt.sm ? 'q-ma-md' : 'q-pa-xl'"
      
     
    >
      <div
        v-for="menu in menus"
        :key="menu.label"
        class="col-md-5 col-xs-12 col-sm-12 row justify-center"
        :class="$q.screen.lt.sm ? 'q-mb-md' : 'q-mb-lg'"
      >
        <q-btn
          dense
          class="col-9"
          :class="$q.screen.lt.md ? 'full-width' : ''"
          no-caps
          @click="openModal(menu.label)"
          unelevated
          size="20px"
        >
          <div class="col-3 text-right" >
            <q-icon :name="menu.icon" size="56px" class="q-pr-md"  />
          </div>
          <div class="col-9 text-left text-h6">
            {{ menu.label }}
            <div class="text-left text-caption">{{ menu.desc }}</div>
          </div>
        </q-btn>
      </div>
    </q-card>
    <q-dialog
      v-model="opened"
      full-height
      :maximized="$q.screen.lt.md"
      class="column"
    >
      <q-card
        :style="$q.screen.lt.md ? '' : 'width: 75vw; max-width: 80vw;'"
        class="col-12"
      >
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" @click="opened = false" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="column">
          <div class="col-12">
            <StoreProfile v-if="currentMenu == 'STORE PROFILE'" current="0" />
            <!-- <ManageItems v-if="currentMenu=='Manage Inventory'" /> -->
            <Users v-if="currentMenu == 'EMPLOYEES'" />
            <!-- <Portfolio v-if="currentMenu=='Portfolio'" /> -->
            <StoreProfile v-if="currentMenu == 'SUBSCRIPTIONS'" current="3" />
            <StoreProfile v-if="currentMenu == 'ACCOUNT AND SECURITY'" current="1" />
            <!-- <RatingsAndReviews v-if="currentMenu=='Ratings and Reviews'" /> -->
            <BookingSystem v-if="currentMenu == 'BOOKING CALENDAR'" />
            <GiftWrappingServices v-if="currentMenu == 'GIFT WRAPPING'" />
            <Delivery v-if="currentMenu == 'DELIVERY'" />
            <FuelTranspo v-if="currentMenu == 'FUEL AND TRANSPO'" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import StoreProfile from "pages/StoreOwner/StoreProfile.vue";
import ManageItems from "pages/StoreOwner/ManageItems.vue";
import Users from "pages/StoreOwner/Users.vue";
import Portfolio from "pages/StoreOwner/Portfolio/Portfolio.vue";
import RatingsAndReviews from "pages/StoreOwner/RatingsAndReviews/RatingsAndReviews.vue";
import BookingSystem from "pages/StoreOwner/BookingSystem.vue";
import GiftWrappingServices from "pages/StoreOwner/GiftWrappingServices.vue";
import Delivery from "pages/StoreOwner/Delivery.vue";
import FuelTranspo from "pages/StoreOwner/FuelTranspo.vue";
export default {
  components: {
    StoreProfile,
    ManageItems,
    Users,
    Portfolio,
    RatingsAndReviews,
    BookingSystem,
    GiftWrappingServices,
    Delivery,
    FuelTranspo,
  },
  data() {
    return {
      menus: [
        {
          label: "STORE PROFILE",
          icon: "store",
          desc: "Business Details | Bio | Logo | Portfolio",
        },
        {
          label: "BOOKING CALENDAR",
          icon: "calendar_today",
          desc: "Available | Booked",
        },
        {
          label: "GIFT WRAPPING",
          icon: "card_giftcard",
          desc: "Charges | Size Classification",
        },
        {
          label: "SUBSCRIPTIONS",
          icon: "fa fa-retweet",
          desc: "Advertisements | Add-ons",
        },
        {
          label: "DELIVERY",
          icon: "motorcycle",
          desc: "Charges | Destinations",
        },
        {
          label: "ACCOUNT AND SECURITY",
          icon: "security",
          desc: "Delete | Unpublish | Password | OTP",
        },
        {
          label: "FUEL AND TRANSPO",
          icon: "drive_eta",
          desc: "Charges | Destinations",
        },

        {
          label: "EMPLOYEES",
          icon: "people",
          desc: "Add | Delete | Edit",
        },
      ],
      opened: false,
      currentMenu: "",
      currentInventoryMenu: "products",
    };
  },
  methods: {
    openModal: function (tab) {
      this.opened = false;
      this.currentMenu = tab;
      this.opened = true;
    },
  },
};
</script>

<style>
</style>