<template>
  <div class="q-pa-lg row justify-center">
    <div class="col-md-9 col-sm-12 row">
      <!-- HEADER -->
      <div class="col-12">
        <q-breadcrumbs class="q-pb-md text-grey">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="grey" />
          </template>
          <q-breadcrumbs-el class="text-grey" label="Anturaz" />
          <q-breadcrumbs-el class="text-grey" label="Products" />
          <q-breadcrumbs-el class="text-grey" :label="data.category" />
          <q-breadcrumbs-el class="text-grey" :label="data.product_name" />
        </q-breadcrumbs>
        <q-separator />
      </div>

      <!-- IMAGES -->
      <div class="col-md-5 col-sm-12 q-pt-md">
        <div style="overflow: hidden; height: 400px">
          <q-img :src="currentPicture" :ratio="1" />
        </div>
        <div class="q-pt-sm row" v-if="data.photos && data.photos.length">
          <q-card
            v-for="(photo, index) in data.photos"
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 0 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="(currentPicture = photo), (currentIndexPicture = index)"
            :key="index"
          >
            <q-img :src="photo" :ratio="1" />
          </q-card>

          <!-- <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 0 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[0]), (currentIndexPicture = 0)
            "
          >
            <q-img :src="data.photos[0]" :ratio="1" />
          </q-card>
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 1 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[1]), (currentIndexPicture = 1)
            "
          >
            <q-img :src="data.photos[1]" :ratio="1" />
          </q-card>
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 2 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[2]), (currentIndexPicture = 2)
            "
          >
            <q-img :src="data.photos[2]" :ratio="1" />
          </q-card>
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 3 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[3]), (currentIndexPicture = 3)
            "
          >
            <q-img :src="data.photos[3]" :ratio="1" />
          </q-card> -->
        </div>
      </div>
      <div class="col-1 "></div>
      <!-- DESCRIPTION 1 -->
      <div class="col-6 q-pt-md q-pl-md">
        <div class="bg-white">
          <div class="text-h5 text-primary">{{ data.product_name }}</div>
          <q-rating :value="2" size="1em" :max="5" color="primary" />100 Rating
          asd

          <!-- PRICE -->
          <div class="row">
            <div class="q-pr-sm text-title self-center">
              <strike class="text-grey">&#8369;{{ data.regular_price }}</strike
              >&nbsp;
            </div>
            <div class="q-pr-sm text-primary text-bold text-h4 self-center">
              &#8369;{{ data.sale_price }}
            </div>
            <q-chip
              color="primary"
              dense
              text-color="white"
              class="self-center"
            >
              {{
                Math.round(100 - (data.sale_price / data.regular_price) * 100)
              }}% OFF
            </q-chip>
          </div>
          <!-- STORE BUTTON -->
          <q-list class="q-mt-sm q-mb-sm full-width">
            <q-item
              clickable
              v-ripple
              @click="$router.push('/StoreDetails?store=' + store._id)"
            >
              <q-item-section avatar>
                <q-icon v-if="store.logo == ''" name="store" color="grey" />
                <q-img
                  v-if="store.logo != ''"
                  :src="data.photos[3]"
                  :ratio="1"
                />
              </q-item-section>
              <q-item-section class="text-grey">{{
                store.store_name
              }}</q-item-section>
            </q-item>
          </q-list>
          <!-- ORDERING FORM -->
          <q-card flat bordered square>
            <q-card-section class="row justify-center">
              <!-- SIZE -->
              <div class="col-8" v-if="data.size.length != 0">
                <span class="text-bold">Size:</span>
                <q-space />
                <q-chip
                  :disable="data.stock == 0"
                  :class="size == s ? 'bg-primary text-white' : 'grey'"
                  clickable
                  square
                  @click="size = s"
                  v-for="s in data.size"
                  :key="s"
                  >{{ s }}</q-chip
                >
              </div>
              <!-- COLOR -->
              <div class="col-8" v-if="data.color.length != 0">
                <span class="text-bold">Color:</span>
                <q-space />
                <q-chip
                  :disable="data.stock == 0"
                  :class="color == c ? 'bg-primary text-white' : 'grey'"
                  clickable
                  square
                  @click="color = c"
                  v-for="c in data.color"
                  :key="c"
                  >{{ c }}</q-chip
                >
              </div>
              <!-- MATERIAL -->
              <div class="col-8" v-if="data.material.length != 0">
                <span class="text-bold">Material:</span>
                <q-space />
                <q-chip
                  :disable="data.stock == 0"
                  :class="material == m ? 'bg-primary text-white' : 'grey'"
                  clickable
                  square
                  @click="material = m"
                  v-for="m in data.material"
                  :key="m"
                  >{{ m }}</q-chip
                >
              </div>
              <!-- QUANTITY -->
              <div class="col-8">
                <span class="text-title text-bold">Quantity:</span>
                <q-input
                  type="number"
                  class="col-1"
                  :disable="data.stock == 0"
                  v-model="quantity"
                  debounce="200"
                  outlined
                  squared
                  dense
                />
                <div align="right">
                  <span class="text-grey"
                    >Only {{ data.stock }} items left!</span
                  >
                </div>
              </div>
              <!-- GIFTWRAPPING -->
              <div class="col-8">
                <span class="text-bold">Gift wrapping:</span>
                <div>
                  <q-checkbox
                    v-model="giftwrapping"
                    label="Gift wrap the item"
                  />
                </div>
                <div class="q-pl-md" v-if="giftwrapping">
                  <div class="text-grey">Gift wrap color:</div>
                  <div>
                    <q-btn
                      v-for="color in store.giftwrapping.colors"
                      :key="color"
                      rounded
                      unelevated
                      @click="giftwrapping_color = color"
                      class="q-mr-sm"
                      :color="
                        giftwrapping_color == color ? 'primary' : 'grey-4'
                      "
                    >
                      <span
                        v-bind:style="{ 'background-color': color }"
                        style="
                        height: 25px;
                        width: 25px;
                        border-radius: 50%;
                        display: inline-block;
                      "
                      />
                    </q-btn>
                  </div>
                </div>
              </div>
              <!-- DATE NEEDED -->
              <div class="col-8">
                <span class="text-title text-bold">Date Needed:</span>
                <br />
                <div class="q-pl-sm">
                  <span class="text-grey text-subtitle2"
                    >*Should be at least 5 days prior to the date of
                    purchase</span
                  >
                  <span
                    class="text-red text-subtitle2 q-pt-xs"
                    v-if="
                      $getDateDiff(
                        date_needed,
                        this.$addToDate(new Date(), 5, 0),
                        'months'
                      ) < 3
                    "
                  >
                    <br />*Only <b>Full Payment</b> is applicable with the
                    selected date needed
                  </span>
                </div>
                <br />
                <div align="center">
                  <!-- DATE NEEDED -->
                  <q-input
                    outlined
                    class="col-12 q-pt-sm"
                    :disable="data.stock == 0"
                    :value="$formatDate_DateOnly(date_needed)"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" />
                    </template>
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        :disable="data.stock == 0"
                        v-model="date_needed"
                        :options="
                          date =>
                            date >=
                            this.$formatDateForPicker(
                              this.$addToDate(new Date(), 5, 0)
                            )
                        "
                      />
                    </q-popup-proxy>
                  </q-input>
                </div>
              </div>
              <!-- CHECKOUT / ADD TO CART -->
              <div class="q-pt-sm row justify-center">
                <q-btn
                  unelevated
                  color="primary"
                  class="col-10"
                  size="md"
                  label="Proceed to checkout"
                  @click="checkLogin"
                />
                <q-btn
                  flat
                  color="grey"
                  class="col-10"
                  size="md"
                  label="Add to cart"
                  icon="add_shopping_cart"
                  @click="addToCart"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 q-pt-md">
        <!-- DESCRIPTION AND REVIEW -->
        <q-card flat bordered>
          <q-tabs v-model="tab" inline-label class="shadow-2">
            <q-tab name="description" icon="description" label="Description" />
            <!-- <q-tab name="payment" icon="payment" label="Payment Options" /> -->
            <q-tab name="reviews" icon="star" label="Reviews" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="description">
              <div v-html="data.description" />
            </q-tab-panel>
            <q-tab-panel name="payment"></q-tab-panel>
            <q-tab-panel name="reviews">
              <q-card
                flat
                bordered
                v-for="st in service_transactions"
                :key="st._id"
              >
                <q-card-section>
                  <q-icon name="schedule" />
                  {{ $formatDate(st.logs[st.logs.length - 1].date) }}
                  <div>
                    <font class="text-grey">{{ st.remarks }}</font>
                  </div>
                  <q-rating
                    :value="st.rate"
                    size="1em"
                    :max="5"
                    color="primary"
                  />
                </q-card-section>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <div class="col-12">
      <RecommendedProducts />
    </div>
    <!-- LOGIN FORM -->
    <q-dialog v-model="loginForm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense size="xs" v-close-popup />
        </q-card-section>
        <q-card-section>
          <ShopperLoginForm :afterLogin="afterLogin" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- PAYMENT -->
    <q-dialog v-model="checkout">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center">
          <div class="text-h6">Checkout</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section></q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import ShopperLoginForm from "components/shopperLoginForm.vue";
import RecommendedProducts from "pages/Shopper/Home/RecommendedProducts.vue";
import CheckoutProduct from "components/CheckOut/CheckoutProduct.vue";
export default {
  components: {
    ShopperLoginForm,
    RecommendedProducts,
    CheckoutProduct
  },
  data() {
    return {
      tab: "description",
      data: {},
      store: {},
      product_transactions: [],
      currentPicture: "",
      currentIndexPicture: 0,
      size: null,
      color: null,
      material: null,
      giftwrapping: false,
      giftwrapping_color: "",
      giftwrapping_size: "small",
      date_needed: this.$formatDateForPicker(this.$addToDate(new Date(), 5, 0)),
      payment_option: "",
      quantity: "1",
      loginForm: false,
      checkout: false,
      service_transactions: []
    };
  },
  methods: {
    // get all service transaction
    getAllServiceTrans: async function() {
      try {
        const response = await this.$dbCon
          .service("service-transactions")
          .find({
            query: {
              _id: this.data.store_id
            }
          });
        // console.log("service transaction", response);
      } catch (e) {}
    },

    afterLogin: function() {
      this.loginForm = false;
      this.checkLogin();
    },
    checkIfLoggedIn: async function() {
      var checker = true;
      await this.$dbCon
        .authenticate()
        .then(response => {
          if (this.$local.has("user_token")) {
            this.$dbCon
              .service("users")
              .find({ query: { _id: this.$local.getItem("user_token") } })
              .then(results => {
                if (results.data[0].system_user_type == "Shopper") {
                  checker = true;
                } else {
                  checker = false;
                }
              });
          } else {
            checker = false;
          }
        })
        .catch(e => {
          checker = false;
        });
      return checker;
    },
    addToCart: async function() {
      //VALIDATE FIRST
      if (await this.checkIfLoggedIn()) {
        this.addToCartSignedIn();
      } else {
        this.addToCartNotSignedIn();
      }
    },
    addToCartSignedIn: async function() {
      this.$dbCon
        .service("cart")
        .create({
          item_id: this.data._id,
          store_id: this.data.store_id,
          shopper_id: this.$local.getItem("user_token"),
          type: "products",
          quantity: this.quantity,
          size: this.size,
          color: this.color,
          material: this.material,
          date_needed: this.date_needed,
          giftwrapping: this.giftwrapping,
          giftwrapping_details: {
            color: this.giftwrapping_color,
            size: this.giftwrapping_size,
            price: this.store.giftwrapping.charges[this.giftwrapping_size]
          }
        })
        .then(() => {
          this.$q.notify({
            message: "Item Added To Cart!",
            position: "top-right",
            color: "green",
            timeout: 700,
            icon: "shopping_cart"
          });
        });
    },
    addToCartNotSignedIn: function() {
      var cart = [];
      if (this.$session.has("cart")) {
        cart = this.$session.get("cart");
      } else {
        this.$session.set("cart", []);
      }
      cart.push({
        item_id: this.data._id,
        store_id: this.data.store_id,
        type: "products",
        quantity: this.quantity,
        size: this.size,
        color: this.color,
        material: this.material,
        date_needed: this.date_needed,
        giftwrapping: this.giftwrapping,
        giftwrapping_details: {
          color: this.giftwrapping_color,
          size: this.giftwrapping_size,
          price: this.store.giftwrapping.charges[this.giftwrapping_size]
        }
      });
      this.$session.set("cart", cart);
      this.$q.notify({
        message: "Item Added To Cart!",
        position: "top-right",
        color: "green",
        timeout: 700,
        icon: "shopping_cart"
      });
      this.$EventBus.$emit("modify-cart", null);
    },
    checkoutSignedIn: async function() {
      this.$dbCon
        .service("cart")
        .create({
          item_id: this.data._id,
          store_id: this.data.store_id,
          shopper_id: this.$local.getItem("user_token"),
          type: "products",
          quantity: this.quantity,
          size: this.size,
          color: this.color,
          material: this.material,
          date_needed: this.date_needed,
          giftwrapping: this.giftwrapping,
          giftwrapping_details: {
            color: this.giftwrapping_color,
            size: this.giftwrapping_size,
            price: this.store.giftwrapping.charges[this.giftwrapping_size]
          }
        })
        .then(response => {
          this.$router.push("/CheckoutProduct/" + response._id);
        });
    },
    checkLogin: async function() {
      this.$dbCon
        .authenticate()
        .then(() => {
          this.checkoutSignedIn();
        })
        .catch(() => {
          this.loginForm = true;
        });
    }
  },
  watch: {
    quantity: function() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
      if (this.quantity % 2 == 0) {
        this.quantity = this.quantity - (this.quantity % 2);
      }
      if (this.quantity > this.data.stock) {
        this.quantity = this.data.stock;
      }
    }
  },
  async mounted() {
    //GET ALL PRODUCT TRANSACTIONS
    this.$dbCon
      .service("product-transactions")
      .find({
        query: {
          item_id: this.$route.params.product,
          status: "Done"
        }
      })
      .then(results => {
        this.product_transactions = results.data;
      });
    await this.$dbCon
      .service("products")
      .find({
        query: {
          _id: this.$route.params.product
        }
      })
      .then(results => {
        this.data = results.data[0];
        this.currentPicture = this.data.photos[0];
      });
    await this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.data.store_id
        }
      })
      .then(results => {
        this.store = results.data[0];
        this.giftwrapping_color = this.store.giftwrapping.colors[0];
      });
    this.getAllServiceTrans();
    this.$router.push(this.$route.path);
  }
};
</script>
