<template>
  <div class="q-gutter-md">
    <q-card bordered flat>
      <q-card-section>Change Password</q-card-section>
      <q-card-section>
        <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          <ul>
            <li v-for="(err, index) in error" v-bind:key="index">{{ err }}</li>
          </ul>
        </q-banner>
        <q-input
          outlined
          square
          v-model="old_pw"
          type="password"
          label="Old Password"
          class="q-pt-sm"
        />
        <q-input
          outlined
          class="q-pt-sm"
          square
          v-model="new_pw"
          type="password"
          label="New Password"
        />
        <div align="right" class="q-pt-sm">
          <q-btn label="submit" @click="validate" color="primary" />
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
      error: [],
    };
  },
  methods: {
    validate: function () {
      this.error = [];
      if (!this.old_pw.trim()) {
        this.error.push("Old Password field is required");
      }
      if (!this.new_pw.trim()) {
        this.error.push("New Password field is required");
      }
      if (this.error.length == 0) {
        this.$dbCon
          .service("users")
          .find({
            query: {
              _id: this.$local.getItem("user_token"),
            },
          })
          .then((result) => {
            this.$dbCon
              .authenticate({
                strategy: "local",
                email: result.data[0].email,
                password: this.old_pw,
              })
              .then((results) => {
                this.save();
              })
              .catch(() => {
                this.error.push("You have entered wrong Old Password");
              });
          });
      }
    },
    save: function () {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to change your password?",
          cancel: {
            push: true,
            color: "grey",
            flat: true,
          },
        })
        .onOk(() => {
          this.$dbCon
            .service("users")
            .patch(this.$local.getItem("user_token"), { password: this.new_pw })
            .then(() => {
              this.$dbCon
                .service("users")
                .find({
                  query: {
                    _id: this.$local.getItem("user_token"),
                  },
                })
                .then((result) => {
                  // this.$axios.post(this.$appLink + "/customizableEmail", {
                  //   receiver: result.data[0].email,
                  //   subject: "Security Setting Update",
                  //   message: `<h3>Password Change</h3>
                  // <p>Your security setting has been updated!</p>
                  // `
                  // });
                  this.$q.dialog({
                    title: "Success",
                    message: "New password saved!",
                  });
                });
            });
        });
    },
  },
};
</script>

<style>
</style>
