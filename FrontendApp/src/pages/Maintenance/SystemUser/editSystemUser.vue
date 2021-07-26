<template>
  <div>
    <q-btn color="grey-7" round flat size="sm" dense icon="edit" @click="opened=true"/>
    <q-dialog v-model="opened" persistent transition-show="scale" transition-hide="scale">
      <q-card flat class="bg-primary text-white" style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="text-h6 col-11">Edit System User</div>
            <div class="col-1">
              <q-btn flat icon="close" @click="opened = false" size="xs"/>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="bg-white text-black">
          <div class="q-pa-md">
            <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
              <template v-slot:avatar>
                <q-icon name="error" color="white"/>
              </template>
              <ul>
                <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
              </ul>
            </q-banner>
            <div v-if="user.status=='Pending'">
              <q-input class="q-pa-sm" v-model="user.fname" label="First Name*"/>
              <q-input class="q-pa-sm" v-model="user.lname" label="Last Name*"/>
              <q-input class="q-pa-sm" v-model="user.email" label="Email Address*"/>
              <q-input class="q-pa-sm" v-model="user.position" label="Position*"/>
            </div>
            <q-select
              class="q-pa-sm"
              v-model="user.user_classification"
              :options="user_classification_options"
              label="User Classification*"
            />
            <q-select
              class="q-pa-sm"
              v-model="user.permissions"
              multiple
              use-chips
              :options="permissions_options"
              label="Permissions*"
            />
          </div>
          <div class="q-pa-md" align="right">
            <q-btn label="submit" @click="validate" outline color="primary"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["systemUser"],
  data() {
    return {
      opened: false,
      user_classification_options: ["Admin", "Accounting", "Marketing"],
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
      user: {},
      error: []
    };
  },
  methods: {
    validate: async function() {
         this.error = [];
      if (this.user.fname.trim() == 0) {
        this.error.push("First Name field is required.");
      }
      if (this.user.lname.trim() == 0) {
        this.error.push("Last Name field is required");
      }
      if (this.user.email.trim() == 0) {
        this.error.push("Email Address field is required.");
      } else {
        await this.$dbCon
          .service("users")
          .find({
            query: {
              email: this.user.email,
              "_id": {
                  $ne: this.user._id
              }
            }
          })
          .then(result => {
            if (result.data.length != 0) {
              this.error.push("Email Address has been taken.");
            }
          });
      }
      if (this.user.position.trim() == 0) {
        this.error.push("Position field is required.");
      }
      if (this.user.permissions.length == 0) {
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
          message: "Update this System User?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon
            .service("users")
            .update(this.user._id, this.user)
            .then(results => {
              this.opened = false;
            });
        });
    }
  },
  mounted() {
    this.user = this.systemUser;
  }
};
</script>
