<template>
  <div>
    <br v-if="$q.screen.lt.sm" />
    <q-card>
      <q-card-section class="flex items-center">
        <input
          type="file"
          ref="uploader"
          file=".png"
          v-show="false"
          @change="onImageSelected"
        />
        <q-img
          class="col"
          @click="$refs.uploader.click()"
          :src="$appLink + '/uploads/admin/logo.png'"
          style="cursor:pointer;width:300px;height:300px"
          contain
        >
          <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
            Click to update
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  methods: {
    onImageSelected: function(event) {
      this.fileSelected = event.target.files[0];

      this.uploadImage();
    },
    uploadImage: async function() {
      const formData = new FormData();
      formData.append(this.$appLink, this.fileSelected, this.fileSelected.name);
      // console.log(formData);
      await this.$axios
        .post(this.$appLink + "/uploadLogo", formData)
        .then(result => {
          if (result.data == true) {
            this.$q
              .dialog({
                title: "Upload Success",
                message: "Page will now reload",
                persistent: true
              })
              .onOk(() => {
                this.$router.go(this.$router.currentRoute);
              });
          }
        });
    }
  }
};
</script>

<style></style>
