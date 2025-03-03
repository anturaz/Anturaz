<template>
  <div class="q-mx-xl q-pt-xl row">
    <div class="col-8 row col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
      <div
        class="col-4 q-mb-sm col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
        v-for="(image, index) in images"
        :key="index"
      >
        <div
          class="image-style"
          :style="`background-image: url('${image.name}')`"
        ></div>
      </div>
    </div>
    <div class="col-4 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <div class="q-video" v-for="(video, index) in videos" :key="index">
        <iframe
          frameborder="1"
          allowfullscreen
          :src="'https://www.youtube.com/embed/' + video.link"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      images: [],
      videos: []
    };
  },

  mounted() {
    this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$route.query.store
        }
      })
      .then(results => {
        this.data = results.data[0];

        this.data.gallery.map((data, index) => {
          if (data.type == "image") {
            this.images.push(data);
          }
          if (data.type == "video link") {
            const url = data.link.split(
              /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
            );

            this.videos.push({
              type: data.type,
              link: url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0],
              size: data.size,
              createdAt: data.createdAt
            });
          }
        });
      });
  }
};
</script>

<style scoped>
.image-style {
  max-width: 240px;
  height: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
