<template>
  <div>
    <q-btn
      icon="add"
      label="ADD USER"
      @click="opened=true"
      unelevated
      color="primary"
    />

    <q-dialog v-model="opened" persistent>
      <q-card :style="$q.screen.lt.sm? '': 'min-width: 700px; max-width: 40vw;'">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Add New Store User</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll q-gutter-sm">
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white" />
            </template>
            <ul>
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>
          <div>
            <div>
              <q-input v-model="fname" label="First Name" />
              <q-input v-model="lname" label="Last Name" />
              <q-input v-model="position" label="Position" />
              <q-input v-model="email" label="Email Address" />
              <q-select v-model="user_type" :options="['Admin','Employee']" label="User Type" />
              <q-select
                v-model="permission"
                :options="permission_options"
                multiple
                use-chips
                label="Permission"
              />
            </div>
            <!-- 
          <q-input v-model="title" label="Title"/>
          <q-select v-model="user" :options="['Shop Owner','Shopper','All']" label="User"/>
          <q-input outlined v-model="content" type="textarea" label="Content"/>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="col-5 items-center">
            <p class="text-h7 text-grey-6">Posted Until:</p>
          <q-date v-model="until" :options="date => date >= $formatDateForPicker(new Date())" minimal/>
            -->
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Submit" @click="validate" color="primary" />
          <q-btn flat label="Cancel" @click="close" color="grey" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      fname: "",
      lname: "",
      position: "",
      email: "",
      password: this.password_generator(),  
      user_type: "Admin",
      permission: [
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
      if (this.fname.trim() == "") {
        this.error.push("First Name field is required");
      }
      if (this.lname.trim() == "") {
        this.error.push("Last Name field is required");
      }
      if (this.email.trim() == "") {
        this.error.push("Email Address field is required");
      }
      if (this.permission.length == 0) {
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
          message: "Do you want to add this user?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(async () => {
           await this.$dbCon.authenticate();
          this.$dbCon
            .service("users")
            .create({
              store_id: this.$local.getItem("store_token"),
              fname: this.fname,
              lname: this.lname,
              position: this.position,
              email: this.email,
              password: this.password,
              user_type: this.user_type,
              permission: this.permission,
              access: false,
              verified: false,
              expiration: "",
              store_account_type: this.user_type,
              system_user_type: "Store Owner"
            })
            .then(() => {
              this.$axios.post(this.$appLink + "/customizableEmail", {
                receiver: this.email,
                subject: "New Registered Employee",
                message: `<h3>Welcome to Anturaz!</h3>
                  <p>Congratulation! You are now part of Anturaz as Store Employee. To continue, kindly click the link below and verify your account using the credential below.</p>
                  <br><a href="`+this.$appLink+`/VerifyAccount/StoreEmployee">`+this.$appLink+`/VerifyAccount/StoreEmployee</a>
                  <br><br>
                  <b>Email Address: </b>`+this.email+`<br>
                  <b>Password: </b> `+this.password+`
                  `
              });
              this.close();
              this.$q.dialog({
                title: "Success!",
                message: "The user is successfully added.",
                cancel: {
                  push: true,
                  color: "grey",
                  flat: true
                }
              });
            });
        });
    },
    close: function() {
      this.fname = "";
      this.lname = "";
      this.position = "";
      this.email = "";
      this.user_type = "Admin";
      this.permission = [
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
      this.opened = false;
    },
    password_generator: function() {
      var length = 8,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }
  },
  watch: {
    user_type: function() {
      if (this.user_type == "Admin") {
        this.permission = [
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
        this.permission = [
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
