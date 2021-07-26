<template>
  <div>
    <q-btn icon="edit" color="primary" @click="opened=true" flat />
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">Edit User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-sm scroll"  style="max-height: 70vh" >
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white" />
            </template>
            <ul>
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>
          <br v-if="error.length !=0" />
          <q-input outlined v-model="user.fname" label="First Name" />
          <q-input outlined v-model="user.lname" label="Last Name" />
          <q-input outlined v-model="user.position" label="Position" />
          <q-input outlined v-model="user.email" readonly label="Email Address" />

          <q-select
            v-model="user.user_type"
            outlined
            readonly
            :options="['Admin','Employee']"
            label="User Type"
          />
          <q-select
            outlined
            v-model="user.permission"
            :options="permission_options"
            multiple
            use-chips
            label="User Permission"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="close" @click="opened=false" flat />
          <q-btn label="submit" @click="validate" flat color="primary" />
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
      user: {},
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
      error: []
    };
  },
  methods: {
    validate: function() {
      this.error = [];
      if (this.user.fname.trim() == "") {
        this.error.push("First Name field is required");
      }
      if (this.user.lname.trim() == "") {
        this.error.push("Last Name field is required");
      }
      if (this.user.email.trim() == "") {
        this.error.push("Email Address field is required");
      }
      if (this.user.permission.length == 0) {
        this.error.push("Permission field is required");
      }
      if (this.error.length == 0) {
        this.submit();
      }
    },
    submit: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to update this user?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
            this.$dbCon.service("users").patch(this.data._id,this.user).then(()=>{
                this.opened=false
            })
        });
    }
  },
  mounted() {
    this.user = this.data;
  },
  watch: {
    "user.user_type": function() {
      if (this.user.user_type == "Admin") {
        this.user.permission = [
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
        ];
      } else {
        this.user.permission = [
          "Giftwrapping Services Management",
          "Delivery Management",
          "Fuel/Transpo Management",
          "Booking Services Management",
          "Portfolio Management",
          "Add products/services",
          "Delete products/services",
          "Add/Subract Inventory",
          "Advertise products/services"
        ];
      }
    }
  }
};
</script>

<style>
</style>
