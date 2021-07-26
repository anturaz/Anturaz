<template>
  <div class="q-mx-xl q-pt-md row">
    <div class="col-8 row">
      <div class="col-2" v-for="(gallery, index) in data.gallery" :key="index">
        <q-img style="cursor:pointer" v-if="gallery.type=='image'" :src="gallery.name" :ratio="1" />
      </div>
    </div>
    <div class="col-4">
      <div class="q-video" v-for="(gallery, index) in data.gallery" :key="index">
        <iframe v-if="gallery.type=='video'" :src="gallery.name" frameborder="0" allowfullscreen />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.$dbCon
      .service("store")
      .find({})
      .then(results => {
        this.data = results.data[0];
      });
  }
};
</script>