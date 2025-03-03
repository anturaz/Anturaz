<template>
  <div>
    <q-btn
      icon="delete"
      @click="deleteFeaturedPhoto"
      color="primary"
      flat
      dense
    />
  </div>
</template>

<script>
export default {
  props: ["featuredPhoto"],
  methods: {
    deleteFeaturedPhoto: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to delete this Featured Photo?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon
            .service("featured-photos")
            .remove(this.featuredPhoto._id)
            .then(() => {
              fs.unlink(this.featuredPhoto.path, err => {
                if (err) throw err;
                // console.log(this.featuredPhoto.path+" was deleted");
              });
              this.$q.dialog({
                title: "Deleted",
                message: "Featured Photo is deleted.",
                cancel: {
                  push: true,
                  color: "grey",
                  flat: true
                }
              });
            });
        });
    }
  }
};
</script>

<style></style>
