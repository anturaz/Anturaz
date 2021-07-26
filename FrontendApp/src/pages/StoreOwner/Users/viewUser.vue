<template>
  <div>
    <q-btn icon="remove_red_eye" color="primary" @click="opened=true" flat />
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">View User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-sm">
          <q-input outlined v-model="data.fname" readonly label="First Name" />
          <q-input outlined v-model="data.lname" readonly label="Last Name" />
          <q-input outlined v-model="data.email" readonly label="Email Address" />
          <q-input outlined v-model="data.position" readonly label="Position" />
          <q-select v-model="data.user_type" outlined :options="['Admin','Employee']" readonly label="User Type" />
          <q-select outlined v-model="data.permission" readonly :options="permission_options" multiple use-chips label="User Permission" />

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="close" @click="opened=false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      opened: false,
      permission_options: [
        "Store Owner Management",
        "Giftwrapping Services Management",
        "Delivery Management",
        "Fuel/Transpo Management",
        "Booking Services Management",
        "Portfolio Management",
        "Add products/services",
        "Delete products/services",
        "Add/Subract Inventory",
        "Advertise products/services",
        "Store Management",
        "User Management",
        "Reports",
        "Ratings and Reviews",
        "Security and Privacy Setting"
      ],
    };
  }
};
</script>

<style>
</style>
