<template>
  <div>
    <q-form @submit="save" @reset="back">
      <div class="row">
        <div class="col-12">
          <q-card-section class="text-black row">
            <div
              class="q-pb-md col row"
              :class="!$q.screen.lt.md ? 'q-mr-lg q-ml-lg' : ''"
            >
              <!-- UPLOAD STORE LOGO -->
              <div class="col-md-2 col-sm-12 col-xs-12 flex flex-center">
                <q-card
                  flat
                  bordered
                  style="width: 160px; height: 160px"
                  :style="photoError ? 'border:1px solid red' : ''"
                >
                  <q-btn
                    v-if="store.logo == ''"
                    flat
                    style="width: 100%; height: 100%"
                    @click="$refs.uploader.click()"
                  >
                    <q-card-section>
                      <q-icon name="add" size="50px" />
                      <div class="text-grey text-caption">
                        Upload Store Logo
                      </div>
                    </q-card-section>
                  </q-btn>
                  <q-btn
                    v-if="store.logo != ''"
                    @click="$refs.uploader.click()"
                    round
                    color="primary"
                    icon="edit"
                    class="absolute"
                    size="12px"
                    style="
                      top: 1;
                      right: 7px;
                      transform: translateY(20%);
                      z-index: 1;
                    "
                  />

                  <img
                    :src="store.logo"
                    style="width: 100%; border: 1px solid grey"
                    v-if="store.logo != ''"
                    @mouseover="photoFocus = true"
                    @mouseleave="photoFocus = false"
                    width="100%"
                    height="100%"
                  />
                </q-card>
              </div>
              <!-- STORE DETAILS -->
              <div
                class="col-md-10 col-sm-12 col-xs-12 q-pt-md"
                :class="!$q.screen.lt.md ? 'q-pl-md' : 'q-pt-md'"
              >
                <div
                  class="text-black text-subtitle1"
                  :align="!$q.screen.lt.md ? '' : 'center'"
                >
                  Tell us about your store
                </div>
                <q-editor
                  class="q-mt-sm"
                  v-model="store.store_details"
                  @input="() => validateStoreDetails()"
                  min-height="6rem"
                  :style="store_details_error ? 'border: solid red 1px' : ''"
                />
                <div v-if="!store_details_error" align="right">
                  <small class="text-grey"
                    >{{ store_details_counter }} / 1000 words</small
                  >
                </div>
                <small class="text-red" v-if="store_details_error">{{
                  store_details_error_message
                }}</small>
              </div>
            </div>
            <input
              type="file"
              class="hidden"
              ref="uploader"
              @change="fileSelected"
            />
            <!-- STORE NAME -->

            <div class="row" :class="!$q.screen.lt.md ? 'q-ma-lg' : ''">
              <q-input
                label="Store Name"
                v-model="store.store_name"
                :rules="[
                  (value) => value.trim() != '' || 'This Field is required',
                ]"
                class="col-xs-12"
                lazy-rules
                dense
              />
              <q-input
                label="Store Unique Link"
                v-model="store.unique_link"
                :rules="[
                  (value) => value.trim() != '' || 'This Field is required',
                ]"
                class="col-xs-12 q-mb-lg"
                prefix="www.anturaz.com/store/"
                :hint="
                  'suggestion: www.anturaz.com/store/' +
                  store.store_name.toLowerCase().split(' ').join('-')
                "
                lazy-rules
                dense
              />

              <q-select
                v-model="store.categories"
                :rules="[
                  () =>
                    store.categories.length != 0 || 'This Field is required',
                ]"
                class="col-xs-12 q-mb-md"
                lazy-rules
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
                dense
              >
                <template v-slot:append>
                  <q-item>
                    <q-item-section class="text-grey">
                      <q-btn
                        label="done"
                        unelevated
                        color="primary"
                        v-show="$q.screen.lt.md && categories_done"
                        v-close-popup
                      />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >No results</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
              <q-select
                v-model="store.market_areas"
                use-chips
                use-input
                multiple
                fill-input
                class="col-xs-12 q-mb-md"
                :rules="[
                  () =>
                    store.market_areas.length != 0 || 'This Field is required',
                ]"
                lazy-rules
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
                dense
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
                    <q-item-section class="text-grey"
                      >No results</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
              <q-input
                label="Owner/Representative's Email Address"
                v-model="user.email"
                class="col-xs-12"
                :rules="[
                  (value) => value.trim() != '' || 'This Field is required',
                ]"
                lazy-rules
                dense
              />
              <q-input
                label="Owner/Representative's First Name"
                v-model="user.fname"
                class="col-xs-12"
                :rules="[
                  (value) => value.trim() != '' || 'This Field is required',
                ]"
                lazy-rules
                dense
              />
              <q-input
                label="Owner/Representative's Last Name"
                v-model="user.lname"
                class="col-xs-12"
                :rules="[
                  (value) => value.trim() != '' || 'This Field is required',
                ]"
                lazy-rules
                dense
              />
            </div>
          </q-card-section>
        </div>
      </div>
      <div v-if="$route.fullPath != '/StoreOwner'" align="right">
        <q-btn
          label="Back"
          color="grey"
          type="reset"
          class="q-mr-sm"
          no-caps
          ref="btn_back"
          @mouseover="
            ($refs.btn_back.unelevated = true), ($refs.btn_back.flat = false)
          "
          @mouseleave="
            ($refs.btn_back.flat = true), ($refs.btn_back.unelevated = false)
          "
          flat
        />
        <q-btn
          label="Save & Next"
          color="primary"
          type="submit"
          no-caps
          ref="btn_save_next"
          @mouseover="
            ($refs.btn_save_next.unelevated = true),
              ($refs.btn_save_next.outline = false)
          "
          @mouseleave="
            ($refs.btn_save_next.outline = true),
              ($refs.btn_save_next.unelevated = false)
          "
          outline
        />
      </div>
      <!-- <div else align="right">
        <q-btn
          label="Save"
          color="primary"
          type="submit"
          no-caps
          ref="btn_save_next"
          @mouseover="
            ($refs.btn_save_next.unelevated = true),
              ($refs.btn_save_next.outline = false)
          "
          @mouseleave="
            ($refs.btn_save_next.outline = true),
              ($refs.btn_save_next.unelevated = false)
          "
          outline
        />
      </div> -->
    </q-form>
  </div>
</template>
<script>
import { provinceList } from "../../../data-set/province.js";
export default {
  data() {
    return {
      error: [],
      file: {},
      photoUrl: "",
      photoFocus: false,
      photoError: false,
      store_details_error: false,
      store_details_error_message: "",
      store_details_counter: 0,
      market_areas_option: [],
      categories_option: [],
      categories_list: [],
      store: {},
      user: {},
      market_areas_done: false,
      categories_done: false,
    };
  },
  methods: {
    fileSelected: async function (event) {
      this.file = {};
      this.file = event.target.files[0];
      this.$q.loading.show();
      this.store.logo = await this.$uploadFile(this.file);
      this.$q.loading.hide();
      console.log(this.photoUrl);
      this.$forceUpdate();
      if (this.store.logo != "") {
        this.photoError = false;
      }
    },
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
    save: async function () {
      if (this.$route.fullPath != "/StoreOwner") {
        this.store.current_step = 3;
      }
      if (this.store.logo == "") {
        this.photoError = true;
        return;
      }
      this.validateStoreDetails();
      if (this.store_details_error) {
        return;
      }
      this.$dbCon.service("store").patch(this.store._id, this.store);
    },
    back: async function () {
      this.store.current_step = 1;
      await this.$dbCon.service("store").patch(this.store._id, this.store);
      await this.$dbCon.service("users").patch(this.user._id, this.user);
      await this.$forceUpdate();
    },
    getData: async function () {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token"),
          },
        })
        .then((results) => {
          this.store = results.data[0];
          if (
            this.store.unique_link == undefined ||
            this.store.unique_link == ""
          ) {
            this.store.unique_link = this.store.store_name
              .toLowerCase()
              .split(" ")
              .join("-");
          }
          this.photoUrl = this.store.logo;
        });

      this.user = await this.$getUser();
    },
    validateStoreDetails: function () {
      if (this.$sanitize(this.store.store_details).trim() == "") {
        this.store_details_error = true;
        this.store_details_error_message = "This field is required.";
        return;
      } else {
        this.store_details_error = false;
      }
      this.store_details_counter = this.$wordsCount(
        this.$sanitize(this.store.store_details).trim()
      );
      if (this.store_details_counter > 1000) {
        this.store_details_error = true;
        this.store_details_error_message = "Maximum of 1000 words only.";
      } else {
        this.store_details_error = false;
      }
    },
  },
  async mounted() {
    this.market_areas_option = provinceList;
    this.$dbCon
      .service("categories")
      .find({
        query: {
          $select: ["category_name"],
        },
      })
      .then((results) => {
        results.data.map((category) => {
          this.categories_option.push(category.category_name);
          this.categories_list.push(category.category_name);
        });
      });
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
    this.$dbCon.service("users").onDataChange(() => {
      this.getData();
    });
  },
  watch: {
    "store.unique_link": function () {
      this.store.unique_link = this.store.unique_link
        .toLowerCase()
        .split("-")
        .join(" ")
        .trim();
      this.store.unique_link = this.store.unique_link
        .toLowerCase()
        .split(" ")
        .join("-");
    },
  },
};
</script>