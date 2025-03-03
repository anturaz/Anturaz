<template>
  <div>
    <q-btn color="grey-7" round flat size="sm" dense icon="more_vert">
      <q-menu cover auto-close>
        <q-list>
          <q-item clickable @click="confirmation">
            <q-item-section>Account Confirmation</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  methods: {
    confirmation: function() {
      this.$q.loading.show();
      this.$axios({
        method: "GET",
        url: this.$appLink + "/SystemUserVerification?id=" + this.userId
      }).then(result => {
        this.$q.loading.hide();
        // console.log(result.data)
        if (result.data == "SUCCESSFUL") {
          this.$q.dialog({
            title: "Success!",
            message: "Verification Email has been sent."
          });
        } else {
          this.$q.dialog({
            title: "Error!",
            message: "Verification Email hasn't been sent."
          });
        }
      });
    }
  }
};
</script>
