<template>
  <div class="q-pa-lg row justify-center">
    <div class="col-md-8 col-sm-12 row">
      <!-- HEADER -->
      <div class="col-12">
        <q-breadcrumbs class="q-pb-md text-grey">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="grey" />
          </template>
          <q-breadcrumbs-el class="text-grey" label="Anturaz" />
          <q-breadcrumbs-el class="text-grey" label="Services" />
          <q-breadcrumbs-el class="text-grey" :label="data.category" />
          <q-breadcrumbs-el class="text-grey" :label="data.service_name" />
        </q-breadcrumbs>
        <q-separator />
      </div>
      <!-- IMAGES -->
      <div class="col-md-6 col-sm-12 q-pt-md">
        <div style="overflow: hidden; height: 400px">
          <q-img :src="currentPicture" :ratio="1" />
        </div>
        <div class="q-pt-sm row">
          <q-card
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
          </q-card>
        </div>
      </div>
      <!-- DESCRIPTION 1 -->
      <div class="col-6 q-pt-md q-pl-md">
        <div class="text-h5 text-primary">{{ data.service_name }}</div>
        <q-rating :value="2" size="1em" :max="5" color="primary" />100 Rating

        <!-- PRICE -->
        <div class="row">
          <div class="q-pr-sm text-title self-center">
            <strike class="text-grey">&#8369;{{ data.regular_price }}</strike
            >&nbsp;
          </div>
          <div class="q-pr-sm text-primary text-bold text-h4 self-center">
            &#8369;{{ data.sale_price }}
          </div>
          <q-chip color="primary" dense text-color="white" class="self-center">
            {{
              Math.round(100 - (data.sale_price / data.regular_price) * 100)
            }}% OFF
          </q-chip>
        </div>
        <!-- STORE BUTTON -->
        <q-list bordered class="q-mt-sm q-mb-sm full-width">
          <q-item
            clickable
            v-ripple
            @click="$router.push('/StoreDetails?store=' + store._id)"
          >
            <q-item-section avatar>
              <q-icon v-if="store.logo == ''" name="store" color="grey" />
              <q-img v-if="store.logo != ''" :src="data.photos[3]" :ratio="1" />
            </q-item-section>
            <q-item-section class="text-grey">{{
              store.store_name
            }}</q-item-section>
          </q-item>
        </q-list>
        <!-- BOOKING FORM -->
        <q-card flat bordered square>
          <q-card-section>
            <div class="row justify-center">
              <span class="col-10 text-title text-bold"
                >Date and Time of Fulfillment:</span
              >
              <div class="q-pt-sm col-8">
           
                <span class="text-grey text-subtitle2"
                  >*Should be at least 5 days prior to the date of
                  reservation</span
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
            </div>
            <div class="row justify-center">
              <!-- DATE OF FULLFILMENT -->
              <q-input
                outlined
                class="col-8 q-pt-sm"
                :value="$formatDate_DateOnly(date_needed)"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" />
                </template>
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="date_needed"
                    :options="
                      (date) =>
                        date >=
                          this.$formatDateForPicker(
                            this.$addToDate(new Date(), 5, 0)
                          ) && !schedules.includes(date)
                    "
                  />
                </q-popup-proxy>
              </q-input>

              <!-- TIME OF FULLFILMENT -->
              <q-input
                outlined
                class="col-8 q-pt-sm"
                :value="time_needed"
                mask="time"
                :rules="['time']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer" />
                </template>
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="time_needed" />
                </q-popup-proxy>
              </q-input>
            </div>
            <!-- CHECKOUT / ADD TO CART -->
            <div class="row justify-center">
              <q-btn
                unelevated
                color="primary"
                class="col-8"
                size="md"
                label="Proceed to checkout"
                @click="checkLogin"
              />
              <q-btn
                flat
                color="grey"
                class="col-8"
                size="md"
                label="Add to cart"
                icon="add_shopping_cart"
                @click="addToCart"
              />
            </div>
          </q-card-section>
        </q-card>
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
    <div class="q-pt-lg col-12">
      <RecommendedServices />
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
import RecommendedServices from "pages/Shopper/Home/RecommendedServices.vue";
import CheckoutProduct from "components/CheckOut/CheckoutService.vue";
export default {
  components: {
    ShopperLoginForm,
    RecommendedServices,
    CheckoutProduct,
  },
  data() {
    return {
      tab: "description",
      data: {},
      store: {},
      service_transactions: [],
      schedules: [],
      currentPicture: "",
      currentIndexPicture: 0,
      date_needed: this.$formatDateForPicker(this.$addToDate(new Date(), 5, 0)),
      time_needed: "08:00",
      payment_option: "",
      quantity: "1",
      loginForm: false,
      checkout: false,
      datePicker: false,
    };
  },
  methods: {
    afterLogin: function () {
      this.loginForm = false;
      this.checkLogin();
    },
    checkIfLoggedIn: async function () {
      var checker = true;
      await this.$dbCon
        .authenticate()
        .then((response) => {
          if (this.$local.has("user_token")) {
            this.$dbCon
              .service("users")
              .find({ query: { _id: this.$local.getItem("user_token") } })
              .then((results) => {
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
        .catch((e) => {
          checker = false;
        });
      return checker;
    },
    addToCart: async function () {
      //VALIDATE FIRST
      if (await this.checkIfLoggedIn()) {
        this.addToCartSignedIn();
      } else {
        this.addToCartNotSignedIn();
      }
    },
    addToCartSignedIn: function () {
      this.$dbCon
        .service("cart")
        .create({
          item_id: this.data._id,
          store_id: this.data.store_id,
          shopper_id: this.$local.getItem("user_token"),
          type: "services",
          quantity: this.quantity,
          date_needed: this.date_needed,
          time_needed: this.time_needed,
        })
        .then(() => {
          this.$q.notify({
            message: "Item Added To Cart!",
            position: "top-right",
            color: "green",
            timeout: 700,
            icon: "shopping_cart",
          });
        });
    },
    addToCartNotSignedIn: function () {
      var cart = [];
      if (this.$session.has("cart")) {
        cart = this.$session.get("cart");
      } else {
        this.$session.set("cart", []);
      }
      cart.push({
        item_id: this.data._id,
        store_id: this.data.store_id,
        type: "services",
        quantity: this.quantity,
        date_needed: this.date_needed,
        time_needed: this.time_needed,
      });
      this.$session.set("cart", cart);
      this.$q.notify({
        message: "Item Added To Cart!",
        position: "top-right",
        color: "green",
        timeout: 700,
        icon: "shopping_cart",
      });
      this.$EventBus.$emit("modify-cart", null);
    },
    checkoutSignedIn: async function () {
      this.$dbCon
        .service("cart")
        .create({
          item_id: this.data._id,
          store_id: this.data.store_id,
          shopper_id: this.$local.getItem("user_token"),
          type: "service",
          quantity: this.quantity,
          date_needed: this.date_needed,
          time_needed: this.time_needed,
        })
        .then((response) => {
          this.$router.push("/CheckoutService/" + response._id);
        });
    },
    checkLogin: async function () {
      this.$dbCon
        .authenticate()
        .then(() => {
          this.checkoutSignedIn();
        })
        .catch(() => {
          this.loginForm = true;
        });
    },
  },

  async mounted() {
    //GET ALL SERVICE TRANSACTIONS
    this.$dbCon
      .service("service-transactions")
      .find({
        query: {
          item_id: this.$route.params.service,
          status: "Done",
        },
      })
      .then((results) => {
        this.service_transactions = results.data;
      });
    //GET SERVICE DETAILS
    await this.$dbCon
      .service("services")
      .find({
        query: {
          _id: this.$route.params.service,
        },
      })
      .then((results) => {
        this.data = results.data[0];
        this.currentPicture = this.data.photos[0];
      });
    //GET STORE DETAILS
    await this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.data.store_id,
        },
      })
      .then((results) => {
        this.store = results.data[0];
      });
    //GET STORE SCHEDULES
    await this.$dbCon
      .service("store-schedule")
      .find({
        query: {
          store_id: this.data.store_id,
        },
      })
      .then((results) => {
        results.data[0].schedules.map((x) => {
          this.schedules.push(this.$formatDateForPicker(x.date));
        });
      });
    this.$router.push(this.$route.path);
  },
};
</script>
