<template>
  <div class="row flex-center q-gutter-md">
    <div class="col-11" style="height:70px" />
    <div class="q-pa-md" style="width:400px">
      <q-card class="row">
        <q-card-section class="col-12" style="height:40%" align="center">
          <img :src="$appLink + '/uploads/admin/logo.png'" style="width:80px" />
          <div class="text-h4">Anturaz Admin</div>
          <div class="text-subtitle1">
            A One-stop-shop Online Event Marketplace
          </div>
          <br />
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <ul class="text-caption text-left">
              <li v-for="(err, index) in error" v-bind:key="index">
                {{ err }}
              </li>
            </ul>
          </q-banner>

          <div class="q-gutter-sm" style="width:80%">
            <q-input v-model="email" label="Email Address" />
            <q-input
              v-model="system_pw"
              type="password"
              label="System Generated Password"
            />
            <q-input v-model="new_pw" type="password" label="New Password" />
            <q-input
              v-model="confirm_pw"
              type="password"
              label="Confirm Password"
            />
            <br />
            <q-btn
              class="full-width"
              @click="validate"
              label="Verify account"
              color="primary"
            />
            <br />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  findUser,
  patchUser,
  passwordResetEmail,
  emailSender
} from "../api/services/authenticationService";

export default {
  data() {
    return {
      email: this.$route.query.email,
      system_pw: "",
      new_pw: "",
      confirm_pw: "",
      error: [],
      data: {}
    };
  },
  methods: {
    validate: async function() {
      this.error = [];

      if (!this.email || !this.system_pw || !this.new_pw || !this.confirm_pw) {
        this.error.push("All fields are required.");
        return;
      }
      if (this.new_pw !== this.confirm_pw) {
        this.error.push("New Password and Confirm Password don't match.");
        return;
      }

      try {
        this.$q.loading.show();
        await this.$StartTemporaryAuthentication();
        const resUser = await findUser(this.email);
        const currentUser = resUser[0];

        if (currentUser.system_generated_password !== this.system_pw) {
          this.error.push("Incorrect System Generated Password.");
          return;
        }

        currentUser.password = this.new_pw;
        currentUser.system_generated_password = null;

        await patchUser(currentUser);
        // await this.$dbCon.service("users").patch(currentUser);
        await this.$EndTemporaryAuthentication();

        // this.$axios({
        //   method: "GET",
        //   url:
        //     this.$appLink +
        //     "/ConfirmationSystemUserVerification?id=" +
        //     currentUser._id
        // });

        const emailMessage = await passwordResetEmail(currentUser);
        const subject = "Anturaz - Successful Password Reset";

        const data = {
          email: this.email
        };
        await emailSender(data, emailMessage, subject);
        this.$q.loading.hide();
        this.$q
          .dialog({
            title: "Password Changed Successfully",
            message: "You can now log in with your new password."
          })
          .onOk(() => {
            this.$router.push("/ShopperLogin");
          });
      } catch (err) {
        this.error.push("An error occurred. Please try again.");
        console.error(err);
      }
    },
    verify: async function() {
      try {
      } catch (error) {
        console.error("Error while finding user:", error);
      }

      //   await this.$dbCon
      //     .authenticate({
      //       strategy: "local",
      //       email: this.email,
      //       password: this.system_pw
      //     })
      //     .then(async result => {
      //       let payLoad = await this.$dbCon.passport.verifyJWT(
      //         this.$local.getItem(this.$appLink + "-jwt")
      //       );
      //       var logged_in_user = await this.$dbCon.services.users.get(
      //         payLoad.userId
      //       );
      //       this.data = logged_in_user;
      //       console.log(logged_in_user);
      //       if (logged_in_user) {
      //         if (this.new_pw != this.confirm_pw) {
      //           this.error.push(
      //             "New Password and Confirm Password doesn't match."
      //           );
      //         } else {
      //           if (!logged_in_user.verified) {
      //             logged_in_user.password = this.new_pw;
      //             logged_in_user.verified = true;
      //             this.$dbCon
      //               .service("users")
      //               .update(logged_in_user._id, logged_in_user)
      //               .then(() => {
      //                 this.$q.loading.show();
      //                 this.$axios({
      //                   method: "GET",
      //                   url:
      //                     this.$appLink +
      //                     "/ConfirmationSystemUserVerification?id=" +
      //                     logged_in_user._id
      //                 }).then(() => {
      //                   this.$q.loading.hide();
      //                   this.$q
      //                     .dialog({
      //                       title: "Account Verified!",
      //                       message: "Login to continue."
      //                     })
      //                     .onOk(() => {
      //                       this.$router.push("/StoreOwner/Login");
      //                     });
      //                 });
      //               });
      //           } else {
      //             this.$q
      //               .dialog({
      //                 title: "Account has already verified!",
      //                 message: "Login to continue."
      //               })
      //               .onOk(() => {
      //                 this.$router.push("/StoreOwner/Login");
      //               });
      //           }
      //         }
      //       } else {
      //         this.error.push("Credentials doesn't match any account.");
      //       }
      //     });
    }
  },
  mounted() {}
};
</script>

<style></style>
