<template>
  <div>
    <!-- style="min-width:300px;max-width:500px" -->

    <q-card-section class="column items-center">
      <img
        :src="$appLink + '/uploads/admin/sample_logo.png'"
        style="width: 80px"
      />

      <div class="text-h5 text-black col-12">Anturaz Shopper</div>
      <div class="text-subtitle2 text-black col-12">Login</div>
    </q-card-section>

    <q-card-section>
      <q-input color="primary" v-model="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
      <q-input
        color="primary"
        type="password"
        v-model="password"
        label="Password"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn
        unelevated
        color="primary"
        size="lg"
        class="full-width"
        label="Login"
        @click="validate"
      />
    </q-card-actions>
    <q-card-section
      class="text-center q-pa-none"
      style="cursor: pointer"
      @click="$router.push('/ShopperSignUp')"
    >
      <p class="text-grey-6">Don't have an account? Sign up here!</p>
    </q-card-section>
  </div>
</template>

<script>
export default {
  props: {
    afterLogin: { type: Function },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    validate: function () {
      if (this.email == "" || this.password == "") {
        this.$q.dialog({
          title: "Invalid Credentials",
          message:
            "The Email and Password you've entered doesn't match any account.",
        });
      } else {
        this.login();
      }
    },
    login: function () {
      this.$q.loading.show();
      this.$dbCon
        .authenticate({
          email: this.email,
          password: this.password,
          strategy: "local",
        })
        .then(async (response) => {
          let payLoad = await this.$dbCon.passport.verifyJWT(
            this.$local.getItem("jwt")
          );
          var logged_in_user = await this.$dbCon.services.users.get(
            payLoad.userId
          );
          if (logged_in_user.system_user_type != "Shopper") {
            this.$q.loading.hide();
            this.$q.dialog({
              title: "Invalid Credentials",
              message:
                "The Email and Password you've entered doesn't match any account.",
            });
            this.$dbCon.logout();
          } else {
            if (logged_in_user.access == false) {
              this.$q.loading.hide();
              this.$q.dialog({
                title: "Access Turned Off",
                message:
                  "Your access to the app is turned off. Kindly contact Anturaz Team for this issue.",
              });
              this.$dbCon.logout();
            } else {
              this.$q.loading.hide();
              this.$local.set("user_token", logged_in_user._id);
              this.$EventBus.$emit("logged-in", null);
              this.afterLogin();
            }
          }
        })
        .catch((e) => {
          this.$q.loading.hide();
          this.$q.dialog({
            title: "Invalid Credentials",
            message:
              "The Email and Password you've entered doesn't match any account.",
          });
        });
    },
  },
};
</script>

