<template>
  <div class="q-pa-sm row">
    <div class="col-12 row q-pa-sm justify-end">
      <div
        class="self-center text-grey-7"
        :class="$q.screen.lt.md ? 'col-4' : 'col-2'"
      >
        Store Rating
        <q-badge color="primary">3.0</q-badge>
      </div>
      <div :class="$q.screen.lt.md ? 'col-8' : 'col-3'">
        <q-input filled v-model="search" label="Search" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="q-pt-md col-12">
        <q-separator />
        <!-- <div
          v-for="n in items"
          :key="n"
          class="q-ma-sm"
          :style="
            $q.screen.lt.md ? 'width: 45%;' : 'width: 250px ; height: 280px'
          "
        >
          <q-card square bordered flat>
            <div class="q-pa-xs row justify-between">
              <span>Comments </span>
              <div class="text-primary">
                <q-btn
                  flat
                  icon="message"
                  color="primary"
                  @click="commentsDialogButton(n.comments)"
                  size="sm"
                  style="padding: 0px;"
                />
                {{ n.comments.length }}
              </div>
            </div>
            <q-separator />
          
            <q-img :src="n.photo" :ratio="16 / 9" />
            <div class="q-pa-xs">
              <div class="text-right">SKU:{{ n.sku }}</div>
              <div>{{ n.label }}</div>
              <div>
                {{ $prettyMoney(n.regular_price) }}
                <small class="text-primary q-pl-sm">
                  <strike>{{ $prettyMoney(n.sale_price) }}</strike>
                </small>
              </div>
            </div>
            <q-separator />
            <div class="row justify-between q-pa-xs">
              <q-rating
                :value="n.averageRating"
                size="1em"
                :max="5"
                color="primary"
              />{{ n.averageRating }}
            </div>
          </q-card>
        </div> -->
      </div>

      <div>
        <div
          class="col-md-12 col-xs-12 q-pt-md q-pb-md"
          :class="$q.screen.lt.md ? '' : 'q-pl-md'"
        >
          <div class="row ">
            <q-card
              flat
              bordered
              class="q-ma-xs"
              v-for="n in items"
              :key="n"
              :style="
                $q.screen.lt.md ? 'width: 45%;' : 'width: 250px ; height: 280px'
              "
            >
              <q-card square bordered flat>
                <div class="q-pa-xs row justify-between">
                  <span>Comments </span>
                  <div class="text-primary">
                    <q-btn
                      flat
                      icon="message"
                      color="primary"
                      @click="commentsDialogButton(n.comments)"
                      size="sm"
                      style="padding: 0px;"
                    />
                    {{ n.comments.length }}
                  </div>
                </div>
                <q-separator />

                <q-img :src="n.photo" :ratio="16 / 9" />
                <div class="q-pa-xs">
                  <div class="text-right">SKU:{{ n.sku }}</div>
                  <div>{{ n.label }}</div>
                  <div>
                    {{ $prettyMoney(n.regular_price) }}
                    <small class="text-primary q-pl-sm">
                      <strike>{{ $prettyMoney(n.sale_price) }}</strike>
                    </small>
                  </div>
                </div>
                <q-separator />
                <div class="row justify-between q-pa-xs">
                  <q-rating
                    :value="n.averageRating"
                    size="1em"
                    :max="5"
                    color="primary"
                  />{{ n.averageRating }}
                </div>
              </q-card></q-card
            >
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="commentsDialog">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Comments</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <p v-for="n in viewComments" :key="n"></p> -->

          <q-item
            v-for="n in viewComments"
            :key="n._id + '-comments'"
            clickable
            v-ripple
          >
            <q-item-section side>
              <q-avatar rounded>
                <q-icon
                  v-if="!n.profile || n.shopper_image === ''"
                  color="black"
                  name="far fa-user"
                  size="25px"
                  style="padding-top: 20%; position: relative; top: -3px;"
                  alt="Default Avatar"
                />
                <img v-else :src="n.profile" alt="Default Avatar" />
                <!-- <img src="https://cdn.quasar.dev/img/avatar.png" /> -->
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ n.fullname }} </q-item-label>
              <q-item-label caption>
                {{ n.remarks ? n.remarks : "NA" }}</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-rating
                :value="n.rate"
                max="5"
                size="1em"
                color="primary"
                no-dimming
              />
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      commentsDialog: false,
      itemDetails: {},
      selectedItem: {},
      data: [],
      contacts: [],
      averageRating: 0,
      viewComments: [],
      search: ""
    };
  },

  watch: {
    selectedItem: async function() {
      //GET ITEM DETAILS
      this.$dbCon
        .service(this.selectedItem.type)
        .find({
          query: {
            _id: this.selectedItem.value
          }
        })
        .then(results => {
          this.itemDetails = results.data[0];
        });

      //EMPTY FIRST THE DATA VARIABLE
      this.data = [];
      await this.$dbCon
        .service(
          this.selectedItem.type == "products"
            ? "product-transactions"
            : "service-transactions"
        )
        .find({
          query: {
            item_id: this.selectedItem.value
          }
        })
        .then(async results => {
          var transactionCtr = 0;
          this.averageRating = 0;
          if (results.total != 0) {
            this.data = results.data;

            this.data.map(async (transaction, index) => {
              transactionCtr++;
              this.averageRating += transaction.rate;
            });
            this.averageRating = this.averageRating / transactionCtr;
          }
          this.$forceUpdate();
        });
    },

    search: async function() {
      if (this.search.trim() != "") {
        this.getItemBySearch();
      } else {
        this.getProdcts();
      }
    }
  },
  methods: {
    getItemBySearch: async function() {
      try {
        const products = await this.$dbCon.service("products").find({
          query: {
            $search: this.search,
            store_id: this.$local.getItem("store_token")
          }
        });

        const comments = await this.$dbCon
          .service("product-transactions")
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              status: "Done",
              $select: ["remarks", "item_id", "rate", "shopper_id", "_id"]
            }
          });

        await Promise.all(
          comments.data.map(async comment => {
            const user = await this.$dbCon.service("users").find({
              query: {
                _id: comment.shopper_id
              }
            });
            console.log(user.data[0].profile);
            comment.img = user.data[0].profile;
            comment.fullname = `${user.data[0].fname} ${user.data[0].lname}`;
          })
        ); // soon to remove
        const newItemArr = [];

        products.data.map(product => {
          const productComments = comments.data.filter(
            comment => comment.item_id == product._id
          );

          const totalRating = productComments.reduce(
            (acc, comment) => acc + comment.rate,
            0
          );
          const averageRating = productComments.length
            ? totalRating / productComments.length
            : 0;

          this.selectedItem = this.items[0];

          newItemArr.push({
            label: product.product_name,
            value: product._id,
            type: "products",
            sku: product.SKU,
            regular_price: product.regular_price,
            sale_price: product.sale_price,
            comments: productComments,
            photo: product.photos[0],
            averageRating: averageRating.toFixed(2)
          });
        });

        this.items = newItemArr;
      } catch (e) {
        console.log(e);
      }
    },
    commentsDialogButton(comments) {
      this.commentsDialog = true;
      this.viewComments = comments;
    },

    getProdcts: async function() {
      try {
        const products = await this.$dbCon.service("products").find({
          query: {
            store_id: this.$local.getItem("store_token")
          }
        });

        const comments = await this.$dbCon
          .service("product-transactions")
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              status: "Done",
              $select: ["remarks", "item_id", "rate", "shopper_id", "_id"]
            }
          });
        await Promise.all(
          comments.data.map(async comment => {
            const user = await this.$dbCon.service("users").find({
              query: {
                _id: comment.shopper_id
              }
            });
            comment.profile = user.data[0].profile || null;
            comment.fullname = `${user.data[0].fname} ${user.data[0].lname}`;
          })
        ); // soon to remove
        const newItemArr = [];

        products.data.map(product => {
          const productComments = comments.data.filter(
            comment => comment.item_id == product._id
          );

          // Calculate average rating
          const totalRating = productComments.reduce(
            (acc, comment) => acc + comment.rate,
            0
          );
          const averageRating = productComments.length
            ? totalRating / productComments.length
            : 0;

          this.selectedItem = this.items[0];
          newItemArr.push({
            label: product.product_name,
            value: product._id,
            type: "products",
            sku: product.SKU,
            regular_price: product.regular_price,
            sale_price: product.sale_price,
            comments: productComments,
            photo: product.photos[0],
            averageRating: averageRating.toFixed(2) // Add average rating to product object
          });
        });
        // console.log(newItemArr);
        this.items = newItemArr;
      } catch (error) {
        console.error(error);
      }
    },

    // getProdcts: async function() {
    //   try {
    //     const products = await this.$dbCon.service("products").find({
    //       query: {
    //         store_id: this.$local.getItem("store_token")
    //       }
    //     });

    //     const comments = await this.$dbCon
    //       .service("product-transactions")
    //       .find({
    //         query: {
    //           store_id: this.$local.getItem("store_token"),
    //           status: "Done",
    //           $select: ["remarks", "item_id", "rate", "shopper_id", "_id"]
    //         }
    //       });
    //     await Promise.all(
    //       comments.data.map(async comment => {
    //         const user = await this.$dbCon.service("users").find({
    //           query: {
    //             _id: comment.shopper_id
    //           }
    //         });
    //         comment.fullname = `${user.data[0].fname} ${user.data[0].lname}`;
    //       })
    //     ); // soon to remove
    //     const newItemArr = [];

    //     products.data.map(product => {
    //       const productComments = comments.data.filter(
    //         comment => comment.item_id == product._id
    //       );
    //       this.selectedItem = this.items[0];
    //       newItemArr.push({
    //         label: product.product_name,
    //         value: product._id,
    //         type: "products",
    //         sku: product.SKU,
    //         regular_price: product.regular_price,
    //         sale_price: product.sale_price,
    //         comments: productComments,
    //         photo: product.photos[0]
    //       });
    //     });
    //     this.items = newItemArr;
    //   } catch (e) {}
    // },

    getServices: async function(e) {
      try {
        const services = this.$dbCon.service("services").find({
          query: {
            store_id: this.$local.getItem("store_token")
          }
        });
        const comments = await this.$dbCon
          .service("service-transactions")
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              status: "Done",
              $select: ["remarks", "item_id", "rate", "shopper_id"]
            }
          });
        comments.data.map(async comment => {
          const user = await this.$dbCon.service("users").find({
            query: {
              _id: comment.shopper_id
            }
          });
          comment.fullname = `${user.data[0].fname} ${user.data[0].lname}`;
        });
        services.data.map(service => {
          const productComments = comments.data.filter(
            comment => comment.item_id == service._id
          );
          this.selectedItem = this.items[0];
          this.items.push({
            label: service.product_name,
            value: service._id,
            type: "services",
            sku: service.SKU,
            regular_price: service.regular_price,
            sale_price: service.sale_price,
            comments: productComments,
            photo: service.photos[0]
          });
        });
      } catch (e) {}
    }

    // setDatas(datas, comments) {
    //   datas.data.map(data => {
    //     const reviews = comments.data.filter(
    //       comment => comment.item_id == datas._id
    //     );

    //     this.selectedItem = this.items[0];
    //     this.items.push({
    //       label: datas.product_name,
    //       value: datas._id,
    //       type: "products",
    //       sku: datas.SKU,
    //       regular_price: datas.regular_price,
    //       sale_price: datas.sale_price,
    //       comments: reviews,
    //       photo: datas.photos[0]
    //     });
    //   });
    // }
  },
  mounted() {
    this.getProdcts();
    this.getServices();

    // this.$dbCon
    //   .service("services")
    //   .find({
    //     query: {
    //       store_id: this.$local.getItem("store_token")
    //     }
    //   })
    //   .then(services => {
    //     services.data.map(service => {
    //       this.selectedItem = this.items[0];
    //       this.items.push({
    //         label: service.service_name,
    //         value: service._id,
    //         type: "services",
    //         sku: service.SKU
    //       });
    //     });
    //   });
  }
};
</script>

<style></style>
