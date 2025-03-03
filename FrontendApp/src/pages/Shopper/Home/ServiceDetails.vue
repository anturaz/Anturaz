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
      <div class="col-md-6 col-sm-12 q-pt-md col-xs-12">
        <div
          style="overflow: hidden;"
          :style="!$q.screen.lt.md ? 'height: 400px' : ''"
        >
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

      <div
        class="col-6 q-pt-md q-pl-md"
        v-if="!$q.screen.lt.md"
        style="padding-left: 50px;"
      >
        <q-list class="q-mt-sm q-mb-sm full-width">
          <q-item
            clickable
            v-ripple
            @click="$router.push('/StoreDetails?store=' + store._id)"
            style="padding: 0px;"
          >
            <q-item-section avatar>
              <q-icon v-if="store.logo == ''" name="store" color="grey" />
              <q-img
                v-if="store.logo != ''"
                :src="store.logo"
                :ratio="1"
                style="height: 70px; width: 70px;"
              />
            </q-item-section>
            <q-item-section class="text-h5">{{
              store.store_name
            }}</q-item-section>
          </q-item>
        </q-list>

        <div class="row">
          <div class="col-12 q-mt-xs">
            <div class="text-h5 ">{{ data.service_name }}</div>
          </div>

          <div class="col-12 q-mt-xs text-h6">
            <!-- <q-rating :value="2" size="1em" :max="5" color="primary" /> -->
            <q-rating
              :value="data.average_rating ? data.average_rating : 0"
              size="1em"
              :max="5"
              :color="data['average_rating'] != null ? 'primary' : 'grey'"
            />
            <span v-if="data['average_rating'] != null" class="text-primary">
              {{ data.average_rating.toFixed(2) }}
            </span>
            <span class="text-grey" v-else>
              No reviews yet
            </span>
          </div>

          <div class="col-12 q-mt-xs">
            <div class="text-body1 ">SKU: {{ data.SKU }}</div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="row">
              <div class="q-pr-sm text-primary text-bold text-h4 self-center">
                {{
                  data.sale_price != 0
                    ? $prettyMoney(data.sale_price)
                    : $prettyMoney(data.regular_price)
                }}
              </div>
              <q-chip
                v-if="data.sale_price != 0"
                color="primary"
                dense
                text-color="white"
                class="self-center"
              >
                {{
                  Math.round(
                    100 - (data.sale_price / data.regular_price) * 100
                  )
                }}% OFF
              </q-chip>
              <div
                v-if="data.sale_price != 0"
                class="q-pr-sm text-title self-center"
              >
                <strike class="text-grey text-h6"
                  >&#8369;{{ data.regular_price }}</strike
                >&nbsp;
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <!-- <span class="text-subtitle1">
              Select Payment Option
            </span>

            <div class="q-gutter-sm">
              <q-radio
                v-model="payment_option"
                val="fullpayment"
                label="Pay in full"
                class="custom-radio"
              />
            </div> -->

            <!-- <div class="q-gutter-sm">
              <q-radio
                v-model="payment_option"
                val="downpayment"
                label="Pay 20% downpayment"
                class="custom-radio"
              />
            </div> -->
            <!-- uncomment downpayment option  -->
            <!-- <div class="q-gutter-sm q-pl-md q-mt-xs text-grey">
              Downpayment option is available only using credit card. Remaining
              balance will be automatically charged 24 hours prior to the date
              of fulfillment
            </div> -->
          </div>

          <div class="col-12 q-mt-sm">
            <div class="">
              <span class="col-10 text-subtitle1"
                >Date and Time of Fulfillment</span
              >
              <div class="">
                <div class="q-pt-sm  q-pr-md" style="max-width: 300px">
                  <q-input
                    outlined
                    class="col-8 q-pt-sm"
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
                        v-model="date_needed"
                        :options="
                          date => {
                            const minDate = this.$formatDateForPicker(
                              this.$addToDate(new Date(), 5, 0)
                            );
                            return (
                              date >= minDate && !availedDate.includes(date)
                            );
                          }
                        "
                      />

                      <!-- date >=
                              this.$formatDateForPicker(
                                this.$addToDate(new Date(), 5, 0)
                              ) && !schedules.includes(date) -->
                    </q-popup-proxy>
                  </q-input>
                </div>
              </div>

              <div class="">
                <div class="q-pt-sm q-pr-md" style="max-width: 300px">
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
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="time_needed" />
                    </q-popup-proxy>
                  </q-input>
                </div>
              </div>

              <div class="text-grey">
                <div class="">
                  This item requires 5 days lead prior to fulfillment date
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-xl q-mb-lg">
            <div class="row justify-around">
              <q-btn
                rounded
                unelevated
                color="primary"
                class="col-5"
                size="md"
                @click="checkLogin"
                :disabled="isDisabled"
              >
                <span class="text-black">
                  CHECKOUT
                </span>
              </q-btn>
              <div class="col-1"></div>
              <q-btn
                outline
                rounded
                color="primary"
                class="col-5"
                size="md"
                @click="addToCart"
              >
                <span class="text-black">
                  ADD TO CART
                </span>
              </q-btn>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <q-list class="q-mt-sm q-mb-sm full-width">
          <q-item
            clickable
            v-ripple
            @click="$router.push('/StoreDetails?store=' + store._id)"
            style="padding: 0px;"
          >
            <q-item-section avatar>
              <q-icon v-if="store.logo == ''" name="store" color="grey" />
              <q-img
                v-if="store.logo != ''"
                :src="store.logo"
                :ratio="1"
                style="height: 70px; width: 70px;"
              />
            </q-item-section>
            <q-item-section class="text-grey  text-h6">{{
              store.store_name
            }}</q-item-section>
          </q-item>
        </q-list>

        <div class="row">
          <div class="col-12 q-mt-xs">
            <div class="text-h5 ">{{ data.service_name }}</div>
          </div>

          <div class="col-12 q-mt-xs text-h6">
            <!-- <q-rating :value="2" size="1em" :max="5" color="primary" /> -->
            <q-rating
              :value="data.average_rating ? data.average_rating : 0"
              size="1em"
              :max="5"
              :color="data['average_rating'] != null ? 'primary' : 'grey'"
            />
            <span v-if="data['average_rating'] != null" class="text-primary">
              {{ data.average_rating.toFixed(2) }}
            </span>
            <span class="text-grey" v-else>
              No reviews yet
            </span>
          </div>
          <div class="col-12 q-mt-xs">
            <div class="text-body1 ">SKU: {{ data.SKU }}</div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="row">
              <div class="q-pr-sm text-primary text-bold text-h4 self-center">
                {{
                  data.sale_price != 0
                    ? $prettyMoney(data.sale_price)
                    : $prettyMoney(data.regular_price)
                }}
              </div>
              <q-chip
                v-if="data.sale_price != 0"
                color="primary"
                dense
                text-color="white"
                class="self-center"
              >
                {{
                  Math.round(
                    100 - (data.sale_price / data.regular_price) * 100
                  )
                }}% OFF
              </q-chip>
              <div
                v-if="data.sale_price != 0"
                class="q-pr-sm text-title self-center"
              >
                <strike class="text-grey text-h6"
                  >&#8369;{{ data.regular_price }}</strike
                >&nbsp;
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <!-- <span class="text-subtitle1">
              Select Payment Option
            </span>

            <div class="q-gutter-sm">
              <q-radio
                v-model="payment_option"
                val="fullpayment"
                label="Pay in full"
                class="custom-radio"
              />
            </div> -->

            <!-- <div class="q-gutter-sm">
              <q-radio
                v-model="payment_option"
                val="downpayment"
                label="Pay 20% downpayment"
                class="custom-radio"
              />
            </div> -->

            <div class="q-gutter-sm q-pl-md q-mt-xs text-grey">
              Downpayment option is available only using credit card. Remaining
              balance will be automatically charged 24 hours prior to the date
              of fulfillment
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="">
              <span class="col-10 text-subtitle1"
                >Date and Time of Fulfillment</span
              >
              <div class="">
                <div class="q-pt-sm  q-pr-md">
                  <q-input
                    outlined
                    class="col-8 q-pt-sm"
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
                        v-model="date_needed"
                        :options="
                          date => {
                            const minDate = this.$formatDateForPicker(
                              this.$addToDate(new Date(), 5, 0)
                            );
                            return (
                              date >= minDate && !availedDate.includes(date)
                            );
                          }
                        "
                      />
                    </q-popup-proxy>
                  </q-input>
                </div>
              </div>

              <div class="">
                <div class="q-pt-sm q-pr-md">
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
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="time_needed" />
                    </q-popup-proxy>
                  </q-input>
                </div>
              </div>

              <div class="text-grey">
                <div class="">
                  This item requires 5 days lead prior to fulfillment date
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-xl q-mb-lg">
            <div class="row justify-around">
              <q-btn
                rounded
                unelevated
                color="primary"
                class="col-5"
                size="md"
                @click="checkLogin"
                :disabled="isDisabled"
              >
                <span class="text-black">
                  CHECKOUT
                </span>
              </q-btn>
              <div class="col-1"></div>
              <q-btn
                outline
                rounded
                color="primary"
                class="col-5"
                size="md"
                @click="addToCart"
              >
                <span class="text-black">
                  ADD TO CART
                </span>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 q-pt-lg">
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
              <div v-if="service_transactions.length != 0">
                <!-- <q-card flat v-for="st in service_transactions" :key="st._id">
                  <q-avatar rounded size="40px" class="q-mr-sm">
                    <img
                      src="https://cdn.quasar.dev/img/avatar.png"
                      alt="Default Avatar"
                    />
                  </q-avatar>
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
                </q-card> -->

                <q-item
                  v-for="st in service_transactions"
                  :key="st._id + '-transaction'"
                  clickable
                  v-ripple
                >
                  <q-item-section side>
                    <!-- Shopper Image (Rounded) -->
                    <q-avatar rounded>
                      <q-icon
                        v-if="!st.shopper_image || st.shopper_image === ''"
                        color="black"
                        name="far fa-user"
                        size="25px"
                        style="padding-top: 20%; position: relative; top: -3px;"
                        alt="Default Avatar"
                      />
                      <img
                        v-else
                        :src="st.shopper_image"
                        alt="Default Avatar"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ st.full_name }}</q-item-label>
                    <q-item-label>{{
                      st.logs[st.logs.length - 1].date
                        ? $formatDate(st.logs[st.logs.length - 1].date)
                        : "N/A"
                    }}</q-item-label>
                    <q-item-label caption>
                      {{ st.remarks ? st.remarks : "No Remarks" }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-rating
                      :value="st.rate"
                      max="5"
                      size="1em"
                      color="primary"
                      no-dimming
                    />
                  </q-item-section>
                </q-item>
              </div>
              <div v-else>
                No Reviews yet
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="q-pt-xl col-12 " v-if="!$q.screen.lt.md">
        <RecommendedServices />
      </div>
    </div>

    <div class="q-pt-lg col-12 " v-if="$q.screen.lt.md">
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
import {
  getServiceDateNotAvailable,
  findSerTranWithShopper
} from "../../../api/services/serviceTransactionsServices";
import { getStoreScheduleDateNotAvailable } from "../../../api/services/storeScheduleServices";

export default {
  components: {
    ShopperLoginForm,
    RecommendedServices,
    CheckoutProduct
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
      // date_needed: this.$formatDateForPicker(this.$addToDate(new Date(), 5, 0)),
      date_needed: null,
      time_needed: "08:00",
      payment_option: "fullpayment",
      quantity: "1",
      loginForm: false,
      checkout: false,
      datePicker: false,
      fulfillmentDate: "",
      availedDate: [],
      storeNotAvailabeDates: []
    };
  },
  computed: {
    isDisabled() {
      return this.payment_option == ""; // Button disabled if either is null
    }
  },
  methods: {
    afterLogin: function() {
      this.loginForm = false;
      this.checkLogin();
    },

    // storeSchedules: async function() {
    //   const res = await getStoreScheduleDateNotAvailable(
    //     this.$route.params.service
    //   );
    //   this.storeNotAvailabeDates = res;
    //   console.log(res);
    // },

    serviceDateNotAvailable: async function() {
      const res = await getServiceDateNotAvailable(this.data.store_id);
      this.availedDate = res;

      let startDate = this.$formatDateForPicker(
        this.$addToDate(new Date(), 5, 0)
      );

      while (res.includes(startDate)) {
        startDate = this.$formatDateForPicker(
          this.$addToDate(new Date(startDate), 1, 0)
        ); // Move to the next day
      }
      this.date_needed = startDate;
    },

    setAvailableDate() {
      let startDate = this.$formatDateForPicker(
        this.$addToDate(new Date(), 5, 0)
      );
      console.log(startDate);

      console.log(this.availedDate.includes(startDate));

      while (this.availedDate.includes(startDate)) {
        startDate = this.$formatDateForPicker(
          this.$addToDate(new Date(startDate), 1, 0)
        ); // Move to the next day
      }

      // Set to the next available date
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
    addToCartSignedIn: function() {
      this.$dbCon
        .service("cart")
        .create({
          item_id: this.data._id,
          store_id: this.data.store_id,
          shopper_id: this.$local.getItem("user_token"),
          type: "services",
          quantity: this.quantity,
          date_needed: this.date_needed,
          time_needed: this.time_needed
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
        type: "services",
        quantity: this.quantity,
        date_needed: this.date_needed,
        time_needed: this.time_needed
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
          type: "service",
          quantity: this.quantity,
          date_needed: this.date_needed,
          time_needed: this.time_needed
        })
        .then(response => {
          this.$router.push("/CheckoutService/" + response._id);
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
    },

    // get service
    getService: async function() {
      this.$q.loading.show();

      try {
        const response = await this.$dbCon.service("services").find({
          query: {
            _id: this.$route.params.service
          }
        });

        this.data = response.data[0];
        this.currentPicture = this.data.photos[0];
        //GET STORE DETAILS
        await this.$dbCon
          .service("store")
          .find({
            query: {
              _id: this.data.store_id
            }
          })
          .then(results => {
            this.store = results.data[0];
          });
        //GET STORE SCHEDULES
        await this.$dbCon
          .service("store-schedule")
          .find({
            query: {
              store_id: this.data.store_id
            }
          })
          .then(results => {
            results.data[0].schedules.map(x => {
              this.schedules.push(this.$formatDateForPicker(x.date));
            });
          });
      } catch (e) {}
      // await this.$dbCon
      //   .service("services")
      //   .find({
      //     query: {
      //       _id: this.$route.params.service
      //     }
      //   })
      // .then(results => {
      //   this.data = results.data[0];
      //   this.currentPicture = this.data.photos[0];
      // });
      this.$q.loading.hide();
    }
  },

  async mounted() {
    //GET ALL SERVICE TRANSACTIONS
    // this.$dbCon
    //   .service("service-transactions")
    //   .find({
    //     query: {
    //       item_id: this.$route.params.service,
    //       status: "Done"
    //     }
    //   })
    //   .then(results => {
    //     this.service_transactions = results.data;
    //   });

    await findSerTranWithShopper(this.$route.params.service).then(results => {
      this.service_transactions = results;
    });
    //GET SERVICE DETAILS
    await this.getService();
    await this.$dbCon.service("services").onDataChange(() => {
      this.getService();
    });

    this.$router.push(this.$route.path);

    this.serviceDateNotAvailable();
    // this.storeSchedules();
  }
};
</script>

<style scoped>
.custom-radio input[type="radio"] + div {
  border-radius: 4px; /* Makes the shape square */
  border: 2px solid var(--q-primary); /* Adjust border color */
  width: 20px; /* Adjust size */
  height: 20px;
}

.custom-radio input[type="radio"]:checked + div {
  background-color: var(--q-primary); /* Color for selected state */
  border-color: var(--q-primary-dark);
}
</style>
