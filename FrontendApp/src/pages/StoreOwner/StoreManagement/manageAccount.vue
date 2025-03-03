<template>
  <div>
    <q-list bordered separator>
      <q-item>
        <q-item-section>Store Status</q-item-section>
        <q-item-section avatar>
          <q-toggle
            :value="data.published"
            dense
            color="primary"
            @input="unpublish_status()"
          />
          <span class="text-primary-8">{{
            data.published ? "PUBLISHED" : "UNPUBLISHED"
          }}</span>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>Store Account</q-item-section>
        <q-item-section avatar class="row">
          <span class="text-primary-8">
            <q-btn
              flat
              icon="info"
              label="DEACTIVATE"
              @click="deactivate"
              color="red"
            />
          </span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    unpublish_status: async function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Do you really want to unpublished the store? if yes Enter your password",
          prompt: {
            model: "",
            type: "password" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(async password => {
          try {
            this.$q.loading.show();
            const loggedUser = await this.$dbCon.services.users.get(
              this.$local.getItem("user_token")
            );

            const user = await this.$axios.post(
              this.$appLink + "/authentication",
              {
                email: loggedUser.email,
                password: password,
                strategy: "local"
              }
            );
            this.data.published = !this.data.published;
            this.$dbCon
              .service("store")
              .update(this.data._id, this.data)
              .then(() => {
                this.$q.dialog({
                  title: "Success",
                  message: "Store details updated!"
                });
              });
          } catch (e) {
            this.$q.dialog({
              title: "Alert",
              message: "Wrong Password"
            });
          }
          this.$q.loading.hide();
        });
    },
    deactivate: async function() {
      // this.$q
      //   .dialog({
      //     title: "Confirmation",
      //     message:
      //       "Are you sure you want to Deactivate your Store? if yes Enter your password",
      //     prompt: {
      //       model: "",
      //       type: "password" // optional
      //     },
      //     cancel: true,
      //     persistent: true

      //     //  After deactivating, you have 30 days to reactive your Store.
      //   })
      //   .onOk(async password => {
      //     try {
      //       this.$q.loading.show();
      //       const loggedUser = await this.$dbCon.services.users.get(
      //         this.$local.getItem("user_token")
      //       );

      //       const user = await this.$axios.post(
      //         this.$appLink + "/authentication",
      //         {
      //           email: loggedUser.email,
      //           password: password,
      //           strategy: "local"
      //         }
      //       );

      //     } catch (e) {
      //       this.$q.dialog({
      //         title: "Alert",
      //         message: "Wrong Password"
      //       });
      //     }
      //   });

      // old
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to Deactivate your Store? After deactivating, you have 30 days to reactive your Store.",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$q
            .dialog({
              title: "Verification",
              message: "Enter your Account Password",
              prompt: {
                type: "password" // optional
              },
              cancel: true,
              persistent: true
            })
            .onOk(data => {
              this.$dbCon
                .service("shop")
                .find({
                  query: {
                    _id: this.$local.getItem("store_token"),
                    password: data
                  }
                })
                .then(result => {
                  if (result.total != 0) {
                    this.$q
                      .dialog({
                        title: "Store Deactivated",
                        message:
                          "You may Reactivate your store by logging within 30 Days Period",
                        persistent: true
                      })
                      .onOk(() => {
                        this.$dbCon
                          .service("store")
                          .update(this.data._id, this.data);
                        this.$session.destroy();
                        this.$router.push("/StoreOwner/Login");
                      });
                  } else {
                    this.$q.dialog({
                      title: "Wrong password",
                      message: "You have entered wrong password"
                    });
                  }
                });
            });
        });
    }
  },
  mounted() {
    this.$dbCon
      .service("store")
      .find({
        _id: this.$local.getItem("store_token")
      })
      .then(result => {
        this.data = result.data[0];
      });
  }
};
</script>

<style></style>
