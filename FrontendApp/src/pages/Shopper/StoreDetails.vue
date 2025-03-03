<template>
  <div>
    <div class="row justify-center q-pa-lg">
      <div style="width: 100%; max-width: 1200px" class="row items-center">
        <div
          v-if="!$q.screen.lt.md"
          class="storeImage col-6  row col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xs-12 q-pb-sm"
        >
          <div class="col-2 col-lg-2 col-xl-2 col-md-2 col-sm-12 col-xs-12">
            <q-img
              :src="data.logo"
              sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
              style="height: 100px; max-width: 300px"
              class="rounded-borders"
            />
          </div>
          <div
            class="storeName  text-left col-2 q-pl-md q-ml-xm text-black text-h6 col-sm-12 col-lg-8 col-xl-8 col-md-8"
          >
            {{
              data.store_name
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            }}
          </div>
        </div>

        <div v-else>
          <div class="column">
            <div class="row ">
              <div class="col-6">
                <q-img
                  :src="data.logo"
                  style="height: 60px; max-width: 50px"
                  class="rounded-borders"
                />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="col-6 text-right text-h6 q-pt-sm">
              {{ data.store_name }}
            </div>
          </div>
        </div>

        <!-- followers unfollow and review button show when mobile screen -->
        <div
          class="col-6 row col-md-6 col-sm-12 col-xs-12 q-pt-sm"
          v-if="$q.screen.lt.md"
        >
          <div class="col-4 col-xs-4 row-btn-class text-center">
            <q-btn
              size="11px"
              flat
              icon="groups"
              :label="
                this.storeFollowers.length
                  ? `${this.storeFollowers.length} Followers`
                  : `0 Followers`
              "
              style="padding: 0"
            />
          </div>

          <div class="col-4 col-xs-4 row-btn-class text-center">
            <q-btn
              size="11px"
              flat
              icon="store"
              :label="following ? 'Unfollow' : 'Follow'"
              style="padding: 0"
              @click="toggleFollow()"
            />
          </div>

          <div class="col-4 col-xs-4 row-btn-class text-center">
            <q-btn
              flat
              size="11px"
              icon="star"
              label="49 Reviews"
              :label="
                this.product_reviews.length != 0
                  ? `${this.product_reviews} Reviews`
                  : `0 Reviews`
              "
              style="padding: 0"
            />
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
              <q-tab class="" name="store" label="store" />
              <q-tab class="" name="about" label="about" />
              <q-tab class="" name="reviews" label="reviews" />
              <q-tab class="" name="portfolio" label="portfolio" />
              <q-tab class="" name="contact" label="contact" />
            </q-tabs>
          </div>
        </div>

        <div class="col-12">
          <q-separator />
          <StoreTab :storeData="data" v-if="tab == 'store'" />
          <AboutTab v-if="tab == 'about'" />
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
import AboutTab from "pages/Shopper/StoreDetails/About.vue";

import ReviewsTab from "pages/Shopper/StoreDetails/Reviews.vue";

import PortfolioTab from "pages/Shopper/StoreDetails/Portfolio.vue";
import ContactTab from "pages/Shopper/StoreDetails/Contact.vue";
export default {
  components: {
    StoreTab,
    AboutTab,
    ReviewsTab,
    PortfolioTab,
    ContactTab
  },

  data() {
    return {
      tab: "store",
      data: [],
      storeFollowers: [],
      isFollowed: false,
      following: false,
      product_reviews: "",
      store: {}
    };
  },
  watch: {},
  methods: {
    getData: function() {
      this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$route.query.store
          }
        })
        .then(results => {
          this.data = results.data[0];
        });
    },

    getFollowers: async function() {
      try {
        const { data } = await this.$dbCon.service("store-following").find({
          query: {
            store_id: this.$route.query.store
          }
        });
        this.store.follower_id = data._id;
        this.storeFollowers = data;
      } catch (e) {}
    },
    checkIfFollowed: async function() {
      try {
        var user = await this.$getUser();
        this.user = user;
        const storeFollowing = await this.$dbCon
          .service("store-following")
          .find({
            query: {
              store_id: this.$route.query.store,
              user_id: user._id
            }
          });
        this.following = storeFollowing.data.length > 0;
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    },

    toggleFollow: async function() {
      const originalState = this.following;
      if (!this.$local.has(this.$appLink + "-jwt")) {
        this.$q.loading.show();
        this.$local.clear();
        setTimeout(() => {
          this.$router.push("/ShopperLogin");
          this.$q.loading.hide();
        }, 500);
      } else {
        this.following = !this.following;
        const query = {
          store_id: this.data._id,
          user_id: this.user._id
        };

        if (originalState) {
          const response = await this.removeFollowing(query);
          this.following = response;
        } else {
          const response = await this.saveFollowing(query);
          this.following = response;
        }
      }
    },

    removeFollowing: async function(query) {
      this.$q.loading.show();
      try {
        const { data } = await this.$dbCon
          .service("store-following")
          .find({ query: query });

        await this.$dbCon.service("store-following").remove(data[0]._id);
        await this.getFollowers();

        return false;
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully unfollowed",
            color: "primary"
          });
        }, 500);
      }
    },

    saveFollowing: async function(query) {
      this.$q.loading.show();
      try {
        const { data } = await this.$dbCon
          .service("store-following")
          .create(query);
        this.storeFollowers = [...this.storeFollowers, data];
        return true;
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully followed",
            color: "primary"
          });
        }, 500);
      }
    }
  },
  async mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
    this.getFollowers();
    this.checkIfFollowed();
    await this.$dbCon.service("store-following").onDataChange(() => {
      this.getFollowers();
      this.checkIfFollowed();
    });
  }
};
</script>

<style scoped>
.example-column-row-wrapping .column {
  background: rgba(170, 170, 0, 0.1);
}
.example-column-row-wrapping .column > div {
  padding: 10px 15px;
  background: rgba(153, 153, 153, 0.15);
  border: 1px solid rgba(153, 153, 153, 0.2);
}
.example-column-row-wrapping .column + .column {
  margin-top: 1rem;
}

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
  }
}
</style>
