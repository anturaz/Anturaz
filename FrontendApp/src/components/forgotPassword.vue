<template>
  <div
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section class="col-12" style="height:40%" align="center">
          <img
            :src="$appLink + '/uploads/admin/logo.png'"
            style="width:80px"
            class="q-pb-md"
          />

          <div class="text-h6 text-left">Password Reset</div>
          <div class="text-body1 text-left">
            Provide the email address associated with your account <br />
            to recover your password.
          </div>

          <!-- Error Banner -->
          <q-banner
            v-if="error.length"
            class="bg-red text-white q-pt-lg q-pb-lg"
          >
            <ul class="text-caption text-left">
              <li v-for="(err, index) in error" :key="index">
                {{ err }}
              </li>
            </ul>
          </q-banner>

          <div class="q-gutter-sm q-pt-md">
            <q-input
              v-model="email"
              class="q-pb-md"
              label="Email Address"
              outlined
              dense
            />
            <q-btn
              class="full-width"
              @click="onSubmit"
              label="Verify account"
              color="primary"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  findUser,
  forgotPasswordEmailBody,
  emailSender
} from "../api/services/authenticationService";

export default {
  data() {
    return {
      email: "",
      error: []
    };
  },
  methods: {
    onSubmit() {
      this.error = [];

      // Validate input
      if (!this.email.trim()) {
        this.error.push("Email is required.");
      }

      // Proceed only if there are no errors
      if (this.error.length === 0) {
        this.verify();
      }
    },

    async verify() {
      this.$q.loading.show(); // Show loading indicator

      try {
        await this.$StartTemporaryAuthentication();
        const response = await findUser(this.email);

        if (!response || response.code === 404 || response.length === 0) {
          this.$q.notify({
            message: "Email not found",
            color: "red",
            position: "top"
          });
        } else {
          const user = response[0];
          const emailMessage = forgotPasswordEmailBody(user);
          const subject = "Anturaz - Request to Reset Password";
          await emailSender(user, emailMessage, subject);

          this.$q.notify({
            message: "Email sent successfully!",
            color: "green",
            position: "top"
          });
        }
      } catch (error) {
        console.error("Error in password reset:", error);
        this.$q.notify({
          message: "An error occurred. Please try again later.",
          color: "red",
          position: "top"
        });
      } finally {
        await this.$EndTemporaryAuthentication();
        this.$q.loading.hide();
      }
    }
  }
};
</script>
