<template>
  <div class="q-pt-xl row flex-center q-gutter-md">
    <div class="col-11" style="height:70px" />
    <div class="q-pa-md" style="width:400px">
      <q-card class="row self-center" style="height:500px;">
        <q-card-section
          class="bg-primary col-12"
          style="height:40%"
          align="center"
        >
          <img :src="$appLink + '/uploads/admin/logo.png'" style="width:80px" />
          <div class="text-h4 text-white">Anturaz Admin</div>
          <div class="text-subtitle1 text-white">
            A One-stop-shop Online Event Marketplace
          </div>
          <br />
          <br />
          <div class="q-gutter-sm" style="width:80%">
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
              hint="Password with toggle"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <br />
            <q-btn
              class="full-width"
              @click="login"
              :label="loading ? 'Logging in...' : 'Login'"
              :loading="loading"
              color="primary"
            />
            <br />
            <br />
            <q-btn flat label="forgot your password?" dense color="grey" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      isPwd: true
    };
  },
  methods: {
    async login() {
      this.$q.loading.show();
      this.loading = true;
      try {
        const response = await this.$dbCon.authenticate({
          email: this.email,
          password: this.password,
          strategy: "local"
        });

        const payLoad = await this.$dbCon.passport.verifyJWT(
          this.$local.getItem(this.$appLink + "-jwt")
        );
        const logged_in_user = await this.$dbCon.services.users.get(
          payLoad.userId
        );

        if (logged_in_user.system_user_type !== "Admin") {
          this.$q.dialog({
            title: "Invalid Credentials",
            message:
              "The Email and Password you've entered doesn't match any account."
          });
          await this.$dbCon.logout();
        } else {
          this.$local.set("user_token", logged_in_user._id);
          this.$router.push("/Admin/Dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        this.$q.dialog({
          title: "Login Failed",
          message: "An error occurred during login. Please try again."
        });
      } finally {
        this.loading = false;
        this.$q.loading.hide();
      }
    }
  }
};
</script>

<style></style>
