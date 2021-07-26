<template>
  <div class="row flex-center q-gutter-md">
    <div class="col-11" style="height:70px"/>
    <div class="q-pa-md" style="width:400px">
      <q-card class="row">
        <q-card-section class="col-12" style="height:40%" align="center">
          <img :src="$appLink+'/uploads/admin/logo.png'" style="width:80px">
          <div class="text-h4">Anturaz Admin</div>
          <div class="text-subtitle1">A One-stop-shop Online Event Marketplace</div>
          <br>
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <ul class="text-caption text-left">
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>

          <div class="q-gutter-sm" style="width:80%">
            <q-input v-model="email" label="Email Address"/>
            <q-input v-model="system_pw" type="password" label="System Generated Password"/>
            <q-input v-model="new_pw" type="password" label="New Password"/>
            <q-input v-model="confirm_pw" type="password" label="Confirm Password"/>
            <br>
            <q-btn class="full-width" @click="validate" label="Verify account" color="primary"/>
            <br>
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
      email: this.$route.query.email,
      system_pw: "",
      new_pw: "",
      confirm_pw: "",
      error: []
    };
  },
  methods: {
    validate: function() {
      this.error = [];
      if (this.email.trim() == "") {
        this.error.push("Email Address field is required.");
      }
      if (this.system_pw.trim() == "") {
        this.error.push("System Generated Password field is required.");
      }
      if (this.new_pw.trim() == "") {
        this.error.push("New Password field is required.");
      }
      if (this.confirm_pw.trim() == "") {
        this.error.push("Confirm Password field is required.");
      }
      if (this.error == 0) {
        this.verify();
      }
    },
    verify: async function() {
      await this.$dbCon
        .service("users")
        .find({
          query: {
            email: this.email,
            password: this.system_pw
          }
        })
        .then(result => {
          if (result.total == 1) {
            if (this.new_pw != this.confirm_pw) {
              this.error.push(
                "New Password and Confirm Password doesn't match."
              );
            } else {
              if (result.data[0].status == "Verified") {
                this.$q
                  .dialog({
                    title: "Account has already verified!",
                    message: "Login to continue."
                  })
                  .onOk(() => {
                    this.$router.push("/Admin/Login");
                  });
              } else {
                result.data[0].password = this.new_pw;
                result.data[0].status = "Verified";
                this.$dbCon
                  .service("users")
                  .update(result.data[0]._id, result.data[0])
                  .then(() => {
                    this.$q.loading.show();
                    this.$axios({
                      method: "GET",
                      url:
                        this.$appLink +
                        "/ConfirmationSystemUserVerification?id=" +
                        result.data[0]._id
                    }).then(() => {
                      this.$q.loading.hide();
                      this.$q
                        .dialog({
                          title: "Account Verified!",
                          message: "Login to continue."
                        })
                        .onOk(() => {
                          this.$router.push("/Admin/Login");
                        });
                    });
                  });
              }
            }
          } else {
            this.error.push("Credentials doesn't match any account.");
          }
        });
    }
  },
  mounted() {}
};
</script>

<style>
</style>
