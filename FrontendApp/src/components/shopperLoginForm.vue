<template>
  <div>
    <!-- style="min-width:300px;max-width:500px" -->

    <q-card-section class="column items-center">
      <img :src="$appLink + '/uploads/admin/logo.png'" style="width: 80px" />

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
        v-model="password"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
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

    <q-card-section
      class="text-center q-pa-none"
      @click="$router.push('/ForgotPassword')"
      style="cursor: pointer"
    >
      <p class="text-grey-6">
        Forgot Password?
      </p>
    </q-card-section>
  </div>
</template>

<script>
export default {
  props: {
    afterLogin: { type: Function }
  },
  data() {
    return {
      email: "",
      password: "",
      isPwd: true
    };
  },
  methods: {
    validate: function() {
      if (this.email == "" || this.password == "") {
        // console.log("validate method");
        this.$q.dialog({
          title: "Invalid Credentials",
          message:
            "The Email and Password you've entered doesn't match any account."
        });
      } else {
        this.login();
      }
    },

    normalizeEmail(email) {
      const [localPart, domain] = email.split("@");
      const normalizedLocalPart = localPart.toLowerCase();
      const normalizedDomain = domain.toLowerCase();

      return `${normalizedLocalPart}@${normalizedDomain}`;
    },

    login: function() {
      this.$q.loading.show();
      const normalizedEmail = this.normalizeEmail(this.email);

      this.$dbCon
        .authenticate({
          email: normalizedEmail,
          password: this.password,
          strategy: "local"
        })
        .then(async response => {
          let payLoad = await this.$dbCon.passport.verifyJWT(
            this.$local.getItem(this.$appLink + "-jwt")
          );
          var logged_in_user = await this.$dbCon.services.users.get(
            payLoad.userId
          );

          if (logged_in_user.system_user_type !== "Shopper") {
            this.$q.loading.hide();
            this.$q.dialog({
              title: "Invalid Credentials",
              message: "The credentials belong to a Shopper."
            });
          } else if (logged_in_user.access === false) {
            this.$q.loading.hide();
            this.$q.dialog({
              title: "Access Turned Off",
              message:
                "Your access to the app is turned off. Kindly contact Anturaz Team for assistance."
            });
            this.$dbCon.logout();
          } else {
            this.$q.loading.hide();

            // Store user details in local storage
            this.$local.set(
              "mun",
              logged_in_user.address.city_municipality.name
            );
            this.$local.set("user_token", logged_in_user._id);
            this.$EventBus.$emit("logged-in", logged_in_user);

            // Retrieve stored attempted route
            const redirectPath =
              localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin"); // Remove stored path

            this.$router.push(redirectPath); // Redirect user back to the page they tried to access
          }
        })
        .catch(e => {
          console.log("catch", e);
          this.$q.loading.hide();
          this.$q.dialog({
            title: "Invalid Credentials",
            message:
              "The Email and Password you've entered doesn't match any account."
          });
        });
    }
  }
};
</script>
