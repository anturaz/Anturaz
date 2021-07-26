<template>
  <div >
     <br v-if="$q.screen.lt.sm">
    <q-card flat bordered>
      <q-card-section class="q-gutter-sm">
        <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white"/>
          </template>
          <ul>
            <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
          </ul>
        </q-banner>
        <q-input v-model="old_pw" label="Old Password" type="password"/>
        <q-input v-model="new_pw" label="New Password" type="password"/>
        <q-input v-model="confirm_pw" label="Confirm Password" type="password"/>
        <div align="right">
          <q-btn color="primary" label="save" @click="validate"/>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      old_pw: "",
      new_pw: "",
      confirm_pw: "",
      error: []
    };
  },
  methods: {
    validate: async function() {
      var pass1 = true;
      this.error = [];
      if (this.old_pw.trim() == "") {
        this.error.push("Old Password field is required.");
        pass1 = false;
      }
      if (this.new_pw.trim() == "") {
        this.error.push("New Password is required.");
        pass1 = false;
      }
      if (this.confirm_pw.trim() == "") {
        this.error.push("Confirm Password is required");
        pass1 = false;
      }
      if (pass1 == true) {
        await this.$dbCon
          .service("shopper")
          .find({
            query: {
              _id: this.$session.get("shopper_token")
            }
          })
          .then(result => {
            if (this.old_pw != result.data[0].password) {
              this.error.push("Wrong old password.");
            } else {
              if (this.new_pw != this.confirm_pw) {
                this.error.push(
                  "New Password and Confirm Password doesn't match."
                );
              } else {
                this.submit();
              }
            }
          });
      }
    },
    submit: async function() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Continue to change your password?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$q.loading.show();
          this.$dbCon
            .service("shopper")
            .find({
              query: {
                _id: this.$session.get("shopper_token")
              }
            })
            .then(result => {
              result.data[0].password = this.new_pw;
              this.$dbCon
                .service("shopper")
                .update(result.data[0]._id, result.data[0])
                .then(() => {
                  this.$axios({
                    method: "GET",
                    url:
                      this.$appLink +
                      "/ShopperPasswordChangeConfirmation?id=" +
                      result.data[0]._id
                  }).then(result => {
                    this.old_pw = "";
                    this.new_pw = "";
                    this.confirm_pw = "";
                    this.$q.loading.hide();
                    this.$q
                      .dialog({
                        title: "Success",
                        message: "New Password is saved."
                      })
                      .onOk(() => {});
                  });
                });
            });
        });
    }
  },
  mounted() {}
};
</script>

<style>
</style>
