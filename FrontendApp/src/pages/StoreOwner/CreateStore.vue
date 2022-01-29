<template>
  <div
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
           <q-btn icon="arrow_left" label="home" color="primary" flat @click="$router.push('/')" />
          <q-card-section class="column items-center">
            <img
              :src="$appLink + '/uploads/admin/sample_logo.png'"
              style="width: 80px"
            />

            <div class="text-h5 text-black col-12">Anturaz Store Owner</div>
            <div class="text-subtitle2 text-black col-12">
              Create your store
            </div>
          </q-card-section>
          <q-card-section v-if="error.length != 0">
            <q-banner rounded class="bg-red text-white">
              <template v-slot:avatar>
                <q-icon name="error" color="white" />
              </template>
              <ul>
                <li v-for="(err, index) in error" v-bind:key="index">
                  {{ err }}
                </li>
              </ul>
            </q-banner>
          </q-card-section>
          <q-card-section class="text-black">
            <q-input label="Email Address" v-model="email" />
            <q-input label="Password" type="password" v-model="password" />
            <q-input label="Store Name" v-model="store_name" />
            <q-select
              v-model="categories"
              use-chips
              use-input
              multiple
              fill-input
              input-debounce="0"
              @filter="filterCategories"
              :options="categories_option"
              label="Categories"
              @focus="
                () => {
                  categories_done = true;
                }
              "
              @blur="
                () => {
                  categories_done = false;
                }
              "
              ref="categories"
              hint="You may select one or multiple"
              :placeholder="!categories_done ? '' : 'search..'"
            >
              <template v-slot:append>
                <q-item>
                  <q-item-section class="text-grey">
                    <q-btn
                      label="done"
                      unelevated
                      color="primary"
                      v-show="$q.screen.lt.md && categories_done"
                      @click="$refs.categories.blur"
                      v-close-popup
                    />
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select
              v-model="market_areas"
              use-chips
              use-input
              multiple
              fill-input
              input-debounce="0"
              :options="market_areas_option"
              @filter="filterMarketPlace"
              label="Market Areas"
              @focus="
                () => {
                  market_areas_done = true;
                }
              "
              @blur="
                () => {
                  market_areas_done = false;
                }
              "
              :placeholder="!market_areas_done ? '' : 'search..'"
              hint="You may select one or multiple"
            >
              <template v-slot:append>
                <q-item>
                  <q-item-section class="text-grey">
                    <q-btn
                      label="done"
                      unelevated
                      color="primary"
                      ref="market_areas_done"
                      v-show="$q.screen.lt.md && market_areas_done"
                      v-close-popup
                    />
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>

          <q-card-section class="text-grey text-italic q-mt-md">
            <q-checkbox dense v-model="agree" />&nbsp;&nbsp;I agree to the terms
            and conditions
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Create Store" @click="validate" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="creatingStoreDialog" :persistent="true">
      <q-card>
        <q-card-section align="center">
          <div>
            <q-spinner-facebook color="primary" size="6em" />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <div class="text-h6">Please wait..</div>
        </q-card-section>

        <q-card-section class="q-pt-none"
          >We are creating your store.</q-card-section
        >
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { provinceList } from "../../data-set/province.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      store_name: "",
      categories: [],
      categories_option: [],
      categories_list: [],
      market_areas: [],
      market_areas_option: [],
      agree: false,
      error: [],
      creatingStoreDialog: false,
      market_areas_done: false,
      categories_done: false,
    };
  },
  methods: {
    filterMarketPlace: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.market_areas_option = provinceList.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCategories: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.categories_option = this.categories_list.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    validate: async function () {
      this.error = [];
      if (this.email.trim() == "") {
        this.error.push("Email field is required.");
      } else {
        this.$q.loading.show();
        await this.$StartTemporaryAuthentication();
        await this.$dbCon
          .service("users")
          .find({
            query: {
              email: this.email,
            },
          })
          .then((result) => {
            console.log(result);
            if (result.data.length != 0) {
              this.error.push("Email Address has already taken.");
            }
          });
        await this.$EndTemporaryAuthentication();
      }
      if (this.password.trim() == "") {
        this.error.push("Password field is required.");
      }
      if (this.store_name.trim() == "") {
        this.error.push("Store Name field is required.");
      } else {
        await this.$dbCon
          .service("store")
          .find({
            query: {
              store_name: this.store_name,
            },
          })
          .then((result) => {
            if (result.data.length != 0) {
              this.error.push("Store Name has already taken.");
            }
          });
      }
      if (this.categories.length == 0) {
        this.error.push("Categories field is required");
      }
      if (this.market_areas.length == 0) {
        this.error.push("Market Areas field is required");
      }
      if (this.agree == false) {
        if (this.error.length == 0) {
          this.error.push(
            "To proceed, you must agree to the terms and conditions."
          );
        }
      }
      this.$q.loading.hide();
      if (this.error.length == 0) {
        this.submit();
      }
    },
    submit: async function () {
      this.creatingStoreDialog = true;
      await this.$StartTemporaryAuthentication();
      //Creating Store Record
      var store = await this.$dbCon.service("store").create({
        store_name: this.store_name,
        store_details: "",
        logo: "",
        categories: this.categories,
        market_areas: this.market_areas,
        maximum_products: 5,
        maximum_services: 5,
        published: false,
        current_step: 1,
        business_type: "Self-Employed",
        mobile_number: "",
        landline_number: "",
        house_bldg_st: "",
        barangay_district: "",
        city_municipality: "",
        state_province: "",
        zip_code: "",
        country: "Philippines",
        bank_name: "",
        account_name: "",
        account_number: "",
        government_id: "",
        dti_sec_registration_number: "",
        dti_sec_registration_certificate: "",
        show_owners_details: true,
        giftwrapping: {
          colors: ["#3333ff", "#ff33ff", "#cdcdcd", "#ff0000"],
          charges: {
            small: 0,
            medium: 0,
            large: 0,
            extra_large: 0,
          },
        },
        links: {
          facebook: "",
          instagram: "",
          pinterest: "",
          youtube: "",
          vimeo: "",
        },
        gallery: [],
        access: true,
        unique_link: this.store_name.toLowerCase().split(" ").join("-"),
      });

      //Creating Fuel Delivery Record
      var fuel_delivery = [];
      await provinceList.map((province) => {
        if (province == "Nationwide") {
          return;
        }
        fuel_delivery.push({
          location: province,
          fuel_transpo: 0,
          delivery: 0,
        });
      });
      await this.$dbCon.service("store-fuel-delivery").create({
        store_id: store._id,
        fuel_delivery: fuel_delivery,
      });
      //Creating Store Inventory 5 Free Items
      await this.$dbCon.service("item-subscriptions").create({
        store_id: store._id,
        items: 5,
        status: "Free",
      });

      await this.$dbCon.service("gallery-subscription").create({
        store_id: store._id,
        mb: 5,
        status: "Free",
      });
      //Creating Store Owner System user account
      await this.$dbCon.service("users").create({
        store_id: store._id,
        email: this.email,
        password: this.password,
        fname: "",
        lname: "",
        position_in_the_company: "",
        store_account_type: "Owner",
        permission: [
          "Store Owner Management",
          "Giftwrapping Services Management",
          "Delivery Management",
          "Fuel/Transpo Management",
          "Booking Services Management",
          "Portfolio Management",
          "Add products/services",
          "Delete products/services",
          "Add/Subract Inventory",
          "Advertise products/services",
          "Store Management",
          "User Management",
          "Reports",
          "Ratings and Reviews",
          "Security and Privacy Setting",
        ],
        system_user_type: "Store Owner",
        user_type: "Owner",
        position: "Owner",
        access: true,
      });

      //Creating Store Advertisment Record
      await this.$dbCon.service("store-advertisment").create({
        store_id: store._id,
        subscriptions: [],
      });

      //Creating Store Schedule Record
      await this.$dbCon.service("store-schedule").create({
        store_id: store._id,
        schedules: [],
      });

      // Sending Confirmation Email (MAY PROBLEM)
      // await this.$axios({
      //   method: "GET",
      //   url: this.$appLink + "/CreateStoreConfirmation?id=" + result._id
      // });
      await this.$EndTemporaryAuthentication();
      this.$StoreUserLogin(this.email, this.password);
    },
  },
  mounted() {
    this.market_areas_option = provinceList;
    this.$dbCon
      .service("categories")
      .find({
        query: {
          $select: ["category_name", "classification"],
        },
      })
      .then((results) => {
        results.data.map((category) => {
          this.categories_option.push(category.category_name);
          this.categories_list.push(category.category_name);
        });
      });
  },
};
</script>

<style scoped>
.q-card {
  width: 360px;
}
</style>