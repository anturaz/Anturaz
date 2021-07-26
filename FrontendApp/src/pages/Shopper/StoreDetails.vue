<template>
  <div class="q-pa-lg row">
    <div class="col-6">
      <q-list class="q-mt-sm full-width">
        <q-item>
          <q-item-section avatar>
            <!-- <q-img :src="data.photos[3]" /> -->
          </q-item-section>
          <q-item-section class="text-black text-h5">{{data.store_name}}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-6">
      <q-tabs v-model="tab" dense align="right" class="text-primary">
        <q-tab name="store" icon="store" label="store" />
        <q-tab name="reviews" icon="star" label="reviews" />
        <q-tab name="portfolio" icon="dashboard" label="portfolio" />
        <q-tab name="contact" icon="message" label="contact" />
      </q-tabs>
    </div>
    <div class="col-12">
      <q-separator />
      <StoreTab v-if="tab == 'store'" />
      <ReviewsTab v-if="tab == 'reviews'" />
      <PortfolioTab v-if="tab == 'portfolio'" />
      <ContactTab v-if="tab == 'contact'" />
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
    ContactTab
  },
  data() {
    return {
      tab: "store",
      data: []
    };
  },
  methods: {
    getData: function() {
      this.$dbCon
        .service("store")
        .find({
          query: {
            unique_link: this.$route.params.store_name.toLowerCase()
          }
        })
        .then(results => {
          this.data = results.data[0];
        });
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
  }
};
</script>