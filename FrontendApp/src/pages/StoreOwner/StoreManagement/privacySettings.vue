<template>
  <div>
    <q-list bordered separator>
      <q-item>
        <q-item-section>Show Owner's Details</q-item-section>
        <q-item-section avatar>
          <q-toggle :value="data.show_owners_details" dense color="primary" @input="update()" />
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
    update: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to change Store's Privacy Setting?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          if (this.data.show_owners_details) {
            this.data.show_owners_details = false;
          } else {
            this.data.show_owners_details = true;
          }
          this.$dbCon
            .service("store")
            .update(this.data._id, this.data)
            .then(() => {
              this.$q.dialog({
                title: "Success",
                message: "Store details updated!"
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

<style>
</style>
