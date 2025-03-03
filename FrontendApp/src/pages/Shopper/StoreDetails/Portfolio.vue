<template>
  <div class=" ">
    <!-- <div class="col-8 row col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
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
    </div> -->
    <div class="col-4 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <div class="q-video" v-for="(video, index) in videos" :key="index">
        <iframe
          frameborder="1"
          allowfullscreen
          :src="'https://www.youtube.com/embed/' + video.link"
        />
      </div>
    </div>
    <div class="carousel-container">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        navigation
        padding
        arrows
        infinite
        class="carousel"
      >
        <q-carousel-slide
          v-for="(image, index) in images"
          :key="index"
          :name="index"
          class="column no-wrap"
        >
          <q-card-section style="padding: 0; height: 100%; position: relative;">
            <img :src="image.name" class="carousel-image" />
            <q-btn
              flat
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
              @click="viewImage(image, index)"
            >
              <q-checkbox
                v-if="isDeletingMultiple"
                :value="toDelete.includes(image)"
                @click.native="viewImage(image, index)"
                class="absolute bg-white"
                style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
              />
              <q-icon
                v-if="!isDeletingMultiple"
                size="30px"
                color="grey"
                class="absolute bg-white round-border"
                style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
              />
            </q-btn>
          </q-card-section>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-dialog v-model="viewImg">
      <q-card style="width:300px">
        <q-img :src="current_image.name" />
        <q-btn
          flat
          icon="close"
          class="absolute"
          style="top: -19; right: 0px; transform: translateY(-1%);"
          v-close-popup
        />
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h7 ellipsis q-pt-md">
              {{ $formatDate(current_image.createdAt) }}
            </div>
          </div>
          <q-btn
            dense
            outline
            label="close"
            class="col-12 full-width q-mt-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewVid">
      <q-card>
        <q-video
          v-if="viewVid"
          :src="'https://www.youtube.com/embed/' + getYTID(current_video.link)"
        />

        <q-card-section>
          <q-btn
            fab
            color="red"
            icon="delete"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />
          <div class="row no-wrap items-center">
            <div class="col text-h7 ellipsis q-pt-md">
              {{ $formatDate(current_video.createdAt) }}
            </div>
          </div>
          <q-btn
            dense
            outline
            label="close"
            class="col-12 full-width q-mt-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      images: [],
      videos: [],
      viewImg: false,
      viewVid: false,
      current_image: {},
      current_video: {},
      slide: 1
    };
  },

  methods: {
    viewImage: function(x, y) {
      this.current_image = x;
      this.current_index = y;
      this.viewImg = true;
    },
    viewVideo: function(x, y) {
      this.current_video = x;
      this.current_index = y;
      this.viewVid = true;
    }
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

.carousel-container {
  justify-content: center;
  align-items: center;
  height: 50vh; /* Full viewport height */
}

.carousel {
  width: 100%; /* Adjust the width as needed */
  max-width: 100%; /* Maximum width */
  height: 800px; /* Adjust the height as needed */
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media screen and (max-width: 600px) {
  .carousel-container {
    height: 20vh;
  }

  .carousel {
    height: 400px;
    width: 100%;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
