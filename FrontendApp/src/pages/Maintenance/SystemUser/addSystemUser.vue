<template>
  <div>
    <q-btn icon="add" color="primary" size="lg" @click="opened = true" round />
    <q-dialog
      v-model="opened"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card
        flat
        class="bg-primary text-white"
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section>
          <div class="row">
            <div class="text-h6 col-11">Add System User</div>
            <div class="col-1">
              <q-btn flat icon="close" @click="close()" size="xs" />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="bg-white">
          <div class="q-pa-md">
            <q-banner
              v-if="error.length != 0"
              rounded
              class="bg-red text-white"
            >
              <template v-slot:avatar>
                <q-icon name="error" color="white" />
              </template>
              <ul>
                <li v-for="(err, index) in error" v-bind:key="index">
                  {{ err }}
                </li>
              </ul>
            </q-banner>
            <q-input class="q-pa-sm" v-model="fname" label="First Name*" />
            <q-input class="q-pa-sm" v-model="lname" label="Last Name*" />
            <q-input class="q-pa-sm" v-model="email" label="Email Address*" />
            <q-input class="q-pa-sm" v-model="position" label="Position*" />
            <q-select
              class="q-pa-sm"
              v-model="user_classification"
              :options="user_classification_options"
              label="User Classification*"
            />
            <q-select
              class="q-pa-sm"
              v-model="permissions"
              multiple
              use-chips
              :options="permissions_options"
              label="Permissions*"
            />
          </div>
          <div class="q-pa-md" align="right">
            <q-btn label="submit" @click="validate" outline color="primary" />
          </div>
        </q-card-section>
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
      email: "",
      position: "",
      user_classification_options: ["Admin", "Accounting", "Marketing"],
      user_classification: "Admin",
      permissions_options: [
        "Category Management",
        "Payment Management",
        "Accounting Dashboard",
        "Social Media Management",
        "Rating & Review Management",
        "Store Management",
        "Shopper Management",
        "Blogs Management",
        "Page Management",
        "Layout Management",
        "System User Management"
      ],
      permissions: [
        "Category Management",
        "Payment Management",
        "Accounting Dashboard",
        "Social Media Management",
        "Rating & Review Management",
        "Store Management",
        "Shopper Management",
        "Blogs Management",
        "Page Management",
        "Layout Management",
        "System User Management"
      ],
      error: []
    };
  },
  methods: {
    validate: async function() {
      this.error = [];
      if (this.fname.trim() == 0) {
        this.error.push("First Name field is required.");
      }
      if (this.lname.trim() == 0) {
        this.error.push("Last Name field is required");
      }
      if (this.email.trim() == 0) {
        this.error.push("Email Address field is required.");
      } else {
        await this.$dbCon
          .service("users")
          .find({
            query: {
              email: this.email
            }
          })
          .then(result => {
            if (result.data.length != 0) {
              this.error.push("Email Address has been taken.");
            }
          });
      }
      if (this.position.trim() == 0) {
        this.error.push("Position field is required.");
      }
      if (this.permissions.length == 0) {
        this.error.push("Choose atleast one(1) permission.");
      }
      if (this.error.length == 0) {
        this.submit();
      }
    },
    submit: function() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Add this System User?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon
            .service("users")
            .create({
              fname: this.fname,
              lname: this.lname,
              email: this.email,
              password: this.password_generator(),
              position: this.position,
              user_classification: this.user_classification,
              permissions: this.permissions,
              status: "Pending"
            })
            .then(result => {
              this.$q.loading.show();
              this.$axios({
                method: "GET",
                url: this.$appLink + "/SystemUserVerification?id=" + result._id
              }).then(result => {
                this.$q.loading.hide();
                this.close();
              });
            });
        });
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
    },

    close: function() {
      this.fname = "";
      this.lname = "";
      this.email = "";
      this.position = "";
      this.user_classification = "";
      this.permissions = "";
      this.opened = false;
    }
  },
  watch: {
    user_classification: function() {
      if (this.user_classification == "Admin") {
        this.permissions = [
          "Category Management",
          "Payment Management",
          "Accounting Dashboard",
          "Social Media Management",
          "Rating & Review Management",
          "Store Management",
          "Shopper Management",
          "Blogs Management",
          "Page Management",
          "Layout Management",
          "System User Management"
        ];
      } else if (this.user_classification == "Accounting") {
        this.permissions = ["Accounting Dashboard"];
      } else if (this.user_classification == "Marketing") {
        this.permissions = [
          "Social Media Management",
          "Rating & Review Management",
          "Blogs Management"
        ];
      }
    }
  }
};
</script>
