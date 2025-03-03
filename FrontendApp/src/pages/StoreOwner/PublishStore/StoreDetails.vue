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
              accept="image/*"
              @change="fileSelected"
            />
            <!-- STORE NAME -->

            <div class="row" :class="!$q.screen.lt.md ? 'q-ma-lg' : ''">
              <q-input
                label="Store Name"
                v-model="store.store_name"
                :rules="[
                  value => value.trim() != '' || 'This Field is required',
                  value => checkUniqueStoreName(value)
                ]"
                class="col-xs-12"
                lazy-rules
                dense
              />
              <q-input
                label="Store Unique Link"
                v-model="store.unique_link"
                :rules="[
                  value => value.trim() != '' || 'This Field is required',
                  value => checkUniqueLink(value)
                ]"
                class="col-xs-12 q-mb-lg"
                prefix="www.anturaz.com/store/"
                :hint="
                  'suggestion: www.anturaz.com/store/' +
                    store.store_name
                      .toLowerCase()
                      .split(' ')
                      .join('-')
                "
                lazy-rules
                dense
                disable
              />

              <q-select
                v-model="store.categories"
                :rules="[
                  () => store.categories.length != 0 || 'This Field is required'
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
                    store.market_areas.length != 0 || 'This Field is required'
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
                  value => value.trim() != '' || 'This Field is required'
                ]"
                lazy-rules
                dense
              />
              <q-input
                label="Owner/Representative's First Name"
                v-model="user.fname"
                class="col-xs-12"
                :rules="[
                  value => value.trim() != '' || 'This Field is required'
                ]"
                lazy-rules
                dense
              />
              <q-input
                label="Owner/Representative's Middle Name"
                v-model="user.mname"
                class="col-xs-12"
                :rules="[
                  value => value.trim() != '' || 'This Field is required'
                ]"
                lazy-rules
                dense
              />

              <q-input
                label="Owner/Representative's Last Name"
                v-model="user.lname"
                class="col-xs-12"
                :rules="[
                  value => value.trim() != '' || 'This Field is required'
                ]"
                lazy-rules
                dense
              />

              <br />

              <br />
              <br />

              <br />

              <div class="row"></div>
              <q-select
                label="Region"
                v-model="store.region"
                :options="$regions"
                option-value="designation"
                option-label="designation"
                class="col-sm-12  q-pa-xs"
                :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                input-debounce="0"
                lazy-rules
                dense
              />

              <q-select
                label="State/Province"
                v-model="store.state_province"
                option-value="name"
                option-label="name"
                :options="provinces"
                class="col-sm-12 q-pa-xs"
                :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                input-debounce="0"
                @filter="filterStateProvince"
                lazy-rules
                dense
              />

              <q-input
                lazy-rules
                dense
                class="col-sm-12 q-pa-xs"
                :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                v-model="store.house_bldg_st"
                label="House/ Building No./ Street"
              />

              <q-input
                lazy-rules
                dense
                class="col-sm-12 q-pa-xs"
                :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                v-model="store.barangay_district"
                label="Barangay/ District"
              />

              <q-select
                label="City/Municipality"
                v-model="store.city_municipality"
                :options="municipalities"
                option-value="name"
                option-label="name"
                class="col-sm-12 q-pa-xs"
                :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-4'"
                input-debounce="0"
                @filter="filterCityMunicipality"
                lazy-rules
                dense
              />

              <q-select
                label="Bank Name"
                v-model="store.bank_name"
                :options="bank_options"
                class="col-sm-12 q-pa-xs col-12 q-pt-md"
                :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-12'"
                :rules="[
                  value => value.trim() != '' || 'This Field is required'
                ]"
                input-debounce="0"
                @filter="filterBank"
                use-input
                fill-input
                lazy-rules
                dense
              />
              <q-input
                label="Account Name"
                v-model="store.account_name"
                class="col-md-6 col-xs-12 q-pb-md"
                :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
                :rules="[
                  value => value.trim() != '' || 'This Field is required'
                ]"
                lazy-rules
                dense
              />

              <q-input
                label="Account Number"
                v-model="store.account_number"
                class="col-md-6 col-xs-6"
                :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
                :rules="[
                  value => value.trim() != '' || 'This Field is required'
                ]"
                lazy-rules
                dense
              />
            </div>

            <!-- class="row" :class="!$q.screen.lt.md ? 'q-ma-lg' : ''" -->
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
          :unelevated="this.$q.platform.is.mobile ? true : false"
          :outline="this.$q.platform.is.mobile ? false : true"
          @mouseover="
            () => {
              $refs.btn_back.unelevated = true;
              $refs.btn_back.outline = false;
            }
          "
          @mouseleave="
            () => {
              $refs.btn_back.outline = true;
              $refs.btn_back.unelevated = false;
            }
          "
          flat
        />
        <q-btn
          label="Save & Next"
          color="primary"
          type="submit"
          no-caps
          ref="btn_save_next"
          :unelevated="this.$q.platform.is.mobile ? true : false"
          :outline="this.$q.platform.is.mobile ? false : true"
          @mouseover="
            () => {
              $refs.btn_save_next.unelevated = true;
              $refs.btn_save_next.outline = false;
            }
          "
          @mouseleave="
            () => {
              $refs.btn_save_next.outline = true;
              $refs.btn_save_next.unelevated = false;
            }
          "
          outline
        />
      </div>
      <div v-else align="right">
        <q-btn
          label="Save"
          color="primary"
          type="submit"
          no-caps
          ref="btn_save_next"
          :unelevated="this.$q.platform.is.mobile ? true : false"
          :outline="this.$q.platform.is.mobile ? false : true"
          @mouseover="
            () => {
              $refs.btn_save_next.unelevated = true;
              $refs.btn_save_next.outline = false;
            }
          "
          @mouseleave="
            () => {
              $refs.btn_save_next.outline = true;
              $refs.btn_save_next.unelevated = false;
            }
          "
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import imageCompression from "browser-image-compression";
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
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      isFlat: true,
      bank_options: this.$bankList
    };
  },
  methods: {
    filterBank: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.bank_options = this.$bankList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async compressImage(file) {
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Maximum width or height
        useWebWorker: true // Use web worker for compression
      };
      try {
        const compressedFile = await imageCompression(file, options);
        console.log("Original file size:", file.size / 1024 / 1024, "MB");
        console.log(
          "Compressed file size:",
          compressedFile.size / 1024 / 1024,
          "MB"
        );
        return compressedFile;
      } catch (error) {
        console.error("Error compressing image:", error);
        return file; // Return original file if compression fails
      }
    },

    // async uploadImages(files) {
    //   const compressedFiles = await Promise.all(
    //     files.map(file => this.compressImage(file))
    //   );
    //   const uploadPromises = compressedFiles.map(file =>
    //     this.uploadImage(file)
    //   );
    //   return Promise.all(uploadPromises);
    // },

    async uploadImages(file) {
      const compressedFile = await this.compressImage(file);
      return this.uploadImage(compressedFile);
    },

    uploadImage: async function(fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(this.$appLink + "/upload", formData);
      return result.data;
    },

    // const photoPaths = await this.uploadImages(this.fileSelected);
    normalizeStoreName(storeName) {
      return storeName
        .toLowerCase()
        .split(" ")
        .join("-");
    },

    checkUniqueLink: async function(value) {
      try {
        const res = await this.$dbCon.service("store").find({
          query: {
            unique_link: value,
            _id: { $ne: this.store._id }
          }
        });

        return res.total == 0 || "This link is already taken";
      } catch (e) {
        console.log(e);
      }

      // return value == "elli" ? false : true;
    },

    checkUniqueStoreName: async function(value) {
      let normalizeStoreName = this.normalizeStoreName(value);
      try {
        const res = await this.$dbCon.service("store").find({
          query: {
            normalize_store_name: normalizeStoreName,
            _id: { $ne: this.store._id }
          }
        });

        return res.total == 0 || "This store name is already taken";
      } catch (e) {
        console.log(e);
      }
    },
    //     Vue.prototype.$uploadFile = async function(fileSelected) {
    //   const formData = new FormData();
    //   formData.append(this.$appLink, fileSelected, fileSelected.name);
    //   var result = await this.$axios.post(this.$appLink + "/upload", formData);
    //   // console.log("UPLOAD", result);
    //   return result.data;
    // };

    fileSelected: async function(event) {
      this.file = {};
      this.file = event.target.files[0];
      this.$q.loading.show();
      this.store.logo = await this.uploadImages(this.file);
      // this.store.logo = await this.$uploadFile(this.file);
      this.$q.loading.hide();
      // console.log(this.photoUrl);
      this.$forceUpdate();
      if (this.store.logo != "") {
        this.photoError = false;
      }
    },
    filterMarketPlace: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.market_areas_option = provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCategories: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.categories_option = this.categories_list.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async updateProfile(password = null) {
      this.$q.loading.show();

      try {
        if (password) {
          // Re-authenticate the user if password is provided
          const loggedUser = await this.$dbCon.services.users.get(
            this.$local.getItem("user_token")
          );
          await this.$axios.post(this.$appLink + "/authentication", {
            email: loggedUser.email,
            password: password,
            strategy: "local"
          });
        }

        this.store.normalize_store_name = this.normalizeStoreName(
          this.store.store_name
        );

        await this.$dbCon.service("users").patch(this.user._id, this.user);
        await this.$dbCon.service("store").patch(this.store._id, this.store);

        this.$q.loading.hide();
        this.$q.notify({
          message: "Updated Successfully!",
          position: "top-right",
          color: "green",
          timeout: 700,
          icon: "success"
        });

        this.$router.go(0);
      } catch (e) {
        console.error(e);
        this.$q.loading.hide();
      }
    },

    save: async function() {
      const currentRoute = this.$route.fullPath;

      // If not on "/StoreOwner", set current_step = 3
      if (currentRoute !== "/StoreOwner") {
        this.store.current_step = 3;
      }

      // Check if store logo is missing
      if (this.store.logo === "") {
        this.photoError = true;
        return;
      }

      // Validate store details
      this.validateStoreDetails();
      if (this.store_details_error) {
        return;
      }

      // If on "/StoreOwner", require password confirmation
      if (currentRoute === "/StoreOwner") {
        this.$q
          .dialog({
            title: "Confirmation",
            message: "Do you really want to update your Business Profile?",
            prompt: {
              model: "",
              type: "password" // Requires password input
            },
            cancel: true,
            persistent: true
          })
          .onOk(async password => {
            await this.updateProfile(password);
          });
      } else {
        // Directly update without asking for password
        await this.$dbCon.service("store").patch(this.store._id, this.store);
      }
      // this.$q.loading.show();

      // this.$q
      //   .dialog({
      //     title: "Confirmation",
      //     message: "Do you really want to update? Bussiness profile?",
      //     prompt: {
      //       model: "",
      //       type: "password" // optional
      //     },
      //     cancel: true,
      //     persistent: true
      //   })
      //   .onOk(async password => {
      //     this.$q.loading.show();

      // try {
      //   const loggedUser = await this.$dbCon.services.users.get(
      //     this.$local.getItem("user_token")
      //   );
      //   // await this.$axios.post(this.$appLink + "/authentication", {
      //   //   email: loggedUser.email,
      //   //   password: password,
      //   //   strategy: "local"
      //   // });

      //   this.store.normalize_store_name = this.normalizeStoreName(
      //     this.store.store_name
      //   );

      //   await this.$dbCon.service("users").patch(this.user._id, this.user);
      //   await this.$dbCon.service("store").patch(this.store._id, this.store);
      //   this.$q.loading.hide();

      //   this.$q.notify({
      //     message: "Updated Sucessfully!",
      //     position: "top-right",
      //     color: "green",
      //     timeout: 700,
      //     icon: "success"
      //   });
      //   this.$router.go(0);
      // } catch (e) {
      //   console.error(e);
      // }
      // });
    },
    back: async function() {
      this.store.current_step = 1;
      await this.$dbCon.service("store").patch(this.store._id, this.store);
      await this.$dbCon.service("users").patch(this.user._id, this.user);
      await this.$forceUpdate();
    },
    getData: async function() {
      try {
        const storeRes = await this.$dbCon.service("store").find({
          query: {
            _id: this.$local.getItem("store_token")
          }
        });
        this.store = storeRes.data[0];
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

        this.user = await this.$getUser();
      } catch (e) {
        console.log(e);
      }

      // await this.$dbCon
      //   .service("store")
      //   .find({
      //     query: {
      //       _id: this.$local.getItem("store_token")
      //     }
      //   })
      //   .then(results => {
      //     this.store = results.data[0];
      //     if (
      //       this.store.unique_link == undefined ||
      //       this.store.unique_link == ""
      //     ) {
      //       this.store.unique_link = this.store.store_name
      //         .toLowerCase()
      //         .split(" ")
      //         .join("-");
      //     }
      //     this.photoUrl = this.store.logo;
      //   });
    },
    validateStoreDetails: function() {
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

    filterStateProvince: function(val, update, abort) {
      if (this.filterTimeout) {
        clearTimeout(this.filterTimeout); // Clear the previous timeout
      }
      this.filterTimeout = setTimeout(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(v =>
          v.toLowerCase().includes(needle)
        );
        update();
      }, 300); // Adjust the delay as needed
    },

    filterCityMunicipality: function(val, update, abort) {
      if (this.filterTimeout) {
        clearTimeout(this.filterTimeout); // Clear the previous timeout
      }

      this.filterTimeout = setTimeout(() => {
        const needle = val.toLowerCase();
        this.municipalities = this.listMunicipalities.filter(v =>
          v.name.toLowerCase().includes(needle)
        );
        update();
      }, 300); // Adjust the delay as needed
    }
  },
  async mounted() {
    this.market_areas_option = provinceList;
    this.$dbCon
      .service("categories")
      .find({
        query: {
          $select: ["category_name"]
        }
      })
      .then(results => {
        results.data.map(category => {
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
    "store.unique_link": function() {
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

    "store.region": {
      handler: function(newVal, oldVal) {
        if (newVal.designation != this.store.region.designation) {
          this.store.state_province = "";
          this.store.city_municipality = "";
        }
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );

        this.provinces = listProvince;
        this.city_municipality = [];
        this.market_areas_option = [];
        this.municipalities = [];
        this.listMunicipalities = [];
      },
      deep: true
    },

    "store.state_province": {
      handler: function(newVal, oldVal) {
        if (newVal.name != this.store.state_province.name) {
          this.store.city_municipality = "";
        }
        const municipalitiesNewLists = this.$municipalities.filter(
          municipality => municipality.province == newVal.name
        );
        this.municipalities = municipalitiesNewLists;
        this.listMunicipalities = municipalitiesNewLists;
      },
      deep: true
    }
  }
};
</script>
<style scoped></style>
