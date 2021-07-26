<template>
  <div>
    <q-btn icon="delete" color="primary" dense @click="deleteSystemUser" flat round/>
  </div>
</template>

<script>
export default {
  props: ["systemUser"],
  methods: {
    deleteSystemUser: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to delete this user permanently?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
            this.$dbCon.service("users").remove(this.systemUser._id)
        });
    }
  }
};
</script>

<style>
</style>
