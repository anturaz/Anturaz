<template>
  <div>
    <div class="row justify-center q-mt-xl q-pa-lg">
      <div style="width: 100%; max-width: 1200px" class="row items-center">
        <div
          class="storeImage col-6 q-mt-xl row col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xs-12 q-pb-sm"
        >
          <div class="col-2 col-lg-2 col-xl-2 col-md-2 col-sm-12 col-xs-12">
            <q-img
              :src="data.logo"
              style="height: 60px; max-width: 130px"
              class="rounded-borders"
            />
          </div>
          <div
            class="storeName col-2 q-mt-md q-ml-xm text-black text-h4 col-sm-12 col-lg-2 col-xl-2 col-md-2"
          >
            {{ data.store_name }}
          </div>
        </div>

        <div
          class="storeDetails col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xs-12 q-pb-sm"
        >
          <div class="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xs-12">
            <q-tabs
              v-model="tab"
              dense
              inline-label
              align="right"
              class="tabsDetails text-black q-mt-lg"
            >
              <q-tab class="q-mt-md" name="store" label="store" />
              <q-tab class="q-mt-md" name="reviews" label="reviews" />
              <q-tab class="q-mt-md" name="portfolio" label="portfolio" />
              <q-tab class="q-mt-md" name="contact" label="contact" />
            </q-tabs>
          </div>
        </div>

        <div class="col-12">
          <q-separator />
          <StoreTab v-if="tab == 'store'" />
          <ReviewsTab v-if="tab == 'reviews'" />
          <PortfolioTab v-if="tab == 'portfolio'" />
          <ContactTab v-if="tab == 'contact'" />
        </div>
      </div>
    </div>

    <div class="q-pa-lg row q-mt-xl q-pb-md">
      <!-- <div
        class="col-6 row col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xs-12 q-pb-sm"
      >
        <div
          class="col-2 col-lg-2 col-xl-2 col-md-2 col-sm-12 col-xs-12 q-ml-xl"
        >
          <q-img
            :src="data.logo"
            style="height: 80px; max-width: 130px"
            class="rounded-borders"
          />
        </div>
        <div
          class="col-2 q-mt-md q-ml-xm text-black text-h4 col-sm-12 col-lg-2 col-xl-2 col-md-2"
        >
          {{ data.store_name }}
        </div>
      </div> -->

      <!-- <div class="col-6  col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xs-12 ">
        <q-tabs
          v-model="tab"
          dense
          inline-label
          align="right"
          class=" text-black q-mt-lg"
        >
          <q-tab class="q-mt-md" name="store" label="store" />
          <q-tab class="q-mt-md" name="reviews" label="reviews" />
          <q-tab class="q-mt-md" name="portfolio" label="portfolio" />
          <q-tab class="q-mt-md" name="contact" label="contact" />
        </q-tabs>
      </div> -->

      <!-- <q-list class="q-mt-sm full-width">
        <q-item>
          <q-item-section thumbnail top>
            <img :src="data.logo" style="height: 100px; max-width: 150px" />
          </q-item-section>

          <q-item-section class="col-2  text-black text-h5 gt-sm">{{
            data.store_name
          }}</q-item-section>
        </q-item>
      </q-list> -->
      <!-- 
      <div class="col-6 q-ml-xl q-pb-xs">
        <q-tab-panel class="q-pb-none ">
          <div class="row  block-wrapper text-center q-col-gutter-md">
            <q-img
              :src="data.logo"
              style="height: 80px; max-width: 130px"
              class="rounded-borders"
            />
            <label class="q-ml-xm text-black text-h3">{{
              data.store_name
            }}</label>
          </div>
        </q-tab-panel>
      </div> -->
      <!-- <div class="col-5">
        <q-tabs
          v-model="tab"
          dense
          inline-label
          align="right"
          class=" text-black q-mt-lg"
        >
          <q-tab class="q-mt-md" name="store" label="store" />
          <q-tab class="q-mt-md" name="reviews" label="reviews" />
          <q-tab class="q-mt-md" name="portfolio" label="portfolio" />
          <q-tab class="q-mt-md" name="contact" label="contact" />
        </q-tabs>
      </div> -->
    </div>
  </div>
</template>
<script>
import StoreTab from "pages/Shopper/StoreDetails/Store.vue";
import ReviewsTab from "pages/Shopper/StoreDetails/Reviews.vue";
import PortfolioTab from "pages/Shopper/StoreDetails/Portfolio.vue";
import ContactTab from "pages/Shopper/StoreDetails/Contact.vue";
export default {
  components: {
    StoreTab,
    ReviewsTab,
    PortfolioTab,
    ContactTab,
  },

  data() {
    return {
      tab: "store",
      data: [],
    };
  },
  watch: {},
  methods: {
    getData: function () {
      this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$route.query.store,
          },
        })
        .then((results) => {
          this.data = results.data[0];
        });
    },
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
  },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .storeImage {
    text-align: center;
  }
  .storeName {
    width: 100%;
  }
  .storeDetails {
    margin-top: none;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .storeImage {
    text-align: center;
  }
  .storeName {
  }
  .storeDetails {
    /* width: 100%; */
    text-align: center;
    justify-content: center;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .storeImage {
  }
  .storeDetails {
    /* width: 100%; */
    text-align: center;
    justify-content: center;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .storeImage {
  }
  .storeName {
    margin-top: 5.1%;
  }
  .storeDetails {
    margin-top: 3.6%;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .storeImage {
  }
  .storeName {
    margin-top: auto;
  }
  .followers {
    margin-top: auto;
  }
  .reviews {
    margin-top: auto;
  }
  .storeDetails {
    margin-top: 3.5%;
  }
}
</style>
