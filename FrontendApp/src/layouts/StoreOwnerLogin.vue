<template>
  <div
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section class="column items-center">
            <img
              :src="$appLink + '/uploads/admin/sample_logo.png'"
              style="width: 80px"
            />

            <div class="text-h5 text-black col-12">Anturaz Store Owner</div>
            <div class="text-subtitle2 text-black col-12">
              A One-stop-shop Online Event Marketplace
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
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
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              label="Login"
              @click="login"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none" style="cursor:pointer" @click="$router.push('/StoreOwner/CreateStore')">
            <p class="text-grey-6">Not registered? Create an account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      this.$StoreUserLogin(this.email, this.password);
    },
  },
};
</script>

<style scoped>
.q-card {
  width: 360px;
}
</style>