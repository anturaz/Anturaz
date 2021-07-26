<template>
  <div>
    <q-btn icon="delete" size="sm" color="primary" flat @click="deleteAnnouncement()"/>
  </div>
</template>

<script>
export default {
  props: ["announcement"],
  methods: {
    deleteAnnouncement: function() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you really want to delete this Announcement?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon.service("announcements").remove(this.announcement._id);
        });
    }
  }
};
</script>

<style>
</style>
