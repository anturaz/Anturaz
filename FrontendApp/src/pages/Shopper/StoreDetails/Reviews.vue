<template>
  <div>
    <div class="q-mx-lg q-pt-xl" v-if="$q.screen.width <= $q.screen.sizes.sm">
      <q-card
        class="my-card q-mb-md"
        flat
        bordered
        v-for="(review_product, index) in data"
        :key="index"
      >
        <q-img :src="review_product.photos[0]" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ review_product.product_name }}
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{
              review_product.name.substring(0, 3) +
                "*".repeat(review_product.name.length - 3)
            }}
          </div>
          <div class="text-caption text-grey q-mt-sm">
            {{ review_product.review }}
          </div>
        </q-card-section>

        <q-separator />
      </q-card>
    </div>

    <div
      class="q-mx-lg q-pt-xl"
      v-if="$q.screen.width <= $q.screen.sizes.sm"
    ></div>

    <div v-else class="q-mx-xl q-pt-md" style="min-height: 100vh;">
      <div class="flex flex-center column">
        <div class="text-h6">Reviews</div>

        <div class="row" style="min-height: 400px; width: 80%; padding: 24px;">
          <div
            id="parent"
            class="fit justify-center "
            style="overflow: hidden;"
          >
            <div class="col-12 q-gutter-y-md " style="overflow: auto;">
              <div
                class="q-pa-md example-break-row"
                v-for="(review_product, index) in data"
                :key="index"
              >
                <div class="row items-start example-container">
                  <div
                    class="example-cell rounded-borders "
                    tabindex="0"
                    style="width: 30%; height: 100%;   box-shadow:  1px 2px 3px 1px rgb(153, 153, 153); margin-right: 5px;"
                  >
                    <q-img :src="review_product.photos[0]" />
                    <br />
                    <p class="text-center q-mb-sm q-mt-sm">
                      {{ review_product.product_name }}
                    </p>
                  </div>
                  <div
                    class="example-cell col-6"
                    tabindex="0"
                    style="width: 65%; height: 100%; margin-left: 10px;"
                  >
                    <div class="row">
                      <div class="col">
                        <q-btn
                          size="16px"
                          flat
                          icon="person"
                          :label="
                            review_product.name.substring(0, 3) +
                              '*'.repeat(review_product.name.length - 3)
                          "
                          style="padding: 0"
                        />
                      </div>
                      <div class="col" align="right" style="margin: auto;">
                        <span class="text-grey-7" style="font-size: 1.2em;"
                          >1 days ago</span
                        >
                      </div>
                    </div>

                    <div class="text-body2 q-pl-md text-black q-mt-sm">
                      {{ review_product.review }}
                    </div>
                    <div class="q-gutter-y-md column q-mt-xs">
                      <q-rating
                        v-model="rating"
                        size="2.5em"
                        color="text-primary"
                        icon="star_border"
                        icon-selected="star"
                      />
                    </div>
                  </div>
                  <div class="flex-break"></div>
                </div>
              </div>

              <!-- <q-card class="no-border-radius">
                <q-card-section> </q-card-section>
              </q-card> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 });
  },

  data() {
    return {
      rating: {
        five: true,
        four: true,
        three: true,
        two: false,
        one: false
      },
      data: []
    };
  },

  computed: {
    trueCount() {
      return Object.values(this.rating).filter(value => value === true).length;
    },
    falseCount() {
      return Object.values(this.rating).filter(value => value === false).length;
    },
    totalCount() {
      return this.trueCount + this.falseCount;
    },
    truePercentage() {
      return (this.trueCount / this.totalCount) * 100;
    },
    falsePercentage() {
      return (this.falseCount / this.totalCount) * 100;
    }
  },

  methods: {
    getStore_reviews: async function() {
      const product_reviews = [];
      try {
        const res = await this.$dbCon.service("product-reviews").find({
          query: {
            store_id: this.$route.query.store
          }
        });

        res.data.map(async review => {
          const product_response = await this.$dbCon.service("products").find({
            query: {
              _id: review.product_id
            }
          });
          const product_data = product_response.data[0];
          const data = {
            ...product_data,
            ...review
          };

          product_reviews.push(data);
        });

        // .then(result =>
        //   result.data.map(async review => {
        //     const product_response = await this.$dbCon
        //       .service("products")
        //       .find({
        //         query: {
        //           _id: review.product_id
        //         }
        //       });
        //     const product_data = product_response.data[0];
        //     const data = {
        //       ...product_data,
        //       ...review
        //     };
        //     product_reviews.push(data);
        //     return result;
        //   })
        // );

        this.data = product_reviews;
      } catch (e) {}
    }
  },

  mounted() {
    this.getStore_reviews();
    this.$dbCon.service("product-reviews").onDataChange(() => {
      this.getStore_reviews();
    });
  }
};
</script>

<style scoped>
.example-break-row .flex-break {
  flex: 1 0 100% !important;
  height: 0 !important;
}
.example-break-row .example-container .example-cell {
  margin: 1px;
  /* padding: 4px 3px; */
}
</style>
