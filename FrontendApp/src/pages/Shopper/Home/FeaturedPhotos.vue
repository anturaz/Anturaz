<template>
  <div class="q-pa-lg">
    <q-carousel height="600px" animated v-model="slide" arrows navigation infinite>
      <q-carousel-slide v-for="(photo,index) in data" :key="index" :name="index+1" :img-src="photo.path" />
     
    </q-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 1,
      data: []
    };
  },
  mounted() {
    this.$dbCon
      .service("featured-photos")
      .find({})
      .then(results => {
        this.data = results.data;
      });
  }
};
</script>