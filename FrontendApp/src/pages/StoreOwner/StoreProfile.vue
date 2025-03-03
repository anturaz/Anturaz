<template>
  <div class="row">
    <q-breadcrumbs v-if="current == 0" class="text-grey col-12">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Store Profile" icon="store" />
    </q-breadcrumbs>
    <q-breadcrumbs v-if="current == 3" class="text-grey col-12">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Subscriptions" icon="fa fa-retweet" />
    </q-breadcrumbs>
    <q-breadcrumbs v-if="current == 1" class="text-grey col-12">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Account and Security" icon="security" />
    </q-breadcrumbs>
    <br />
    <!-- <div class="col-md-2 col-xs-12">
      <div class="q-pa-md">
      <q-list bordered separator>
        <q-item clickable :active="current==0" @click="current=0" v-ripple>
          <q-item-section>Edit Store</q-item-section>
          <q-item-section side>></q-item-section>
        </q-item>
        <q-item clickable :active="current==1" @click="current=1" v-ripple>
          <q-item-section>Security Setting</q-item-section>
          <q-item-section side>></q-item-section>
        </q-item>
        <q-item clickable :active="current==2" @click="current=2" v-ripple>
          <q-item-section>Privacy Setting</q-item-section>
          <q-item-section side>></q-item-section>
        </q-item>
        <q-item
          clickable
          :active="current==3"
          @click="current=3"
          v-ripple
          active-class="text-primary"
        >
          <q-item-section>Advertise Store</q-item-section>
          <q-item-section side>></q-item-section>
        </q-item>
        <q-item
          clickable
          :active="current==4"
          @click="current=4"
          v-ripple
          active-class="bg-teal-1 text-grey-8"
        >
          <q-item-section>Manage Account</q-item-section>
          <q-item-section side>></q-item-section>
        </q-item>
      </q-list>
      </div>
    </div> -->
    <div class="col-12">
      <div class="q-pa-md">
        <EditStore v-if="current == 0" />
        <PrivacySetting v-if="current == 1" />
        <AdvertiseStore v-if="current == 3" />
        <ManageAccount v-if="current == 1" />
        <SecuritySetting class="q-pt-sm" v-if="current == 1" />
      </div>
    </div>
  </div>
</template>

<script>
import EditStore from "./StoreManagement/editStore.vue";
import SecuritySetting from "./StoreManagement/securitySettings.vue";
import PrivacySetting from "./StoreManagement/privacySettings.vue";
import AdvertiseStore from "./StoreManagement/advertiseStore.vue";
import ManageAccount from "./StoreManagement/manageAccount.vue";
export default {
  props: ["current"],
  components: {
    EditStore,
    SecuritySetting,
    PrivacySetting,
    AdvertiseStore,
    ManageAccount
  },
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$local.getItem("store_token")
        }
      })
      .then(result => {
        this.data = result.data[0];
      });
  }
};
</script>
