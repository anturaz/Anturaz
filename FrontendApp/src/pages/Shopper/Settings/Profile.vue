<template>
  <div>
    <br v-if="$q.screen.lt.sm" />
    <q-card flat bordered>
      <q-card-section>
        <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          <ul>
            <li v-for="(err, index) in error" v-bind:key="index">{{ err }}</li>
          </ul>
        </q-banner>
        <div :class="!$q.screen.lt.sm ? 'row q-gutter-sm' : ''">
          <q-input class="col" v-model="updated.fname" label="First Name" />

          <q-input class="col" v-model="updated.lname" label="Last Name" />
        </div>
        <q-input v-model="updated.mobile_number" label="Mobile Number" />
        <q-input
          :value="updated.original_email"
          disable
          label="Email Address"
        />
        <div @click="$refs.qDateProxy.show()">
          <q-input
            v-model="updated.birthday"
            readonly
            mask="date"
            label="Birthday"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="updated.birthday"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <p class="text-subtitle1 text-black q-pt-lg col-12">
          Profile Picture
        </p>
        <!-- <q-separator class="col-12" /> -->
        <div class="col-md-2 col-sm-12 col-xs-12 flex flex-center">
          <q-card
            flat
            bordered
            style="width: 160px; height: 160px"
            :style="photoError ? 'border:1px solid red' : ''"
          >
            <q-btn
              v-if="updated.profile == ''"
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
              v-if="updated.profile != ''"
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
              :src="updated.profile"
              style="width: 100%; border: 1px solid grey"
              v-if="updated.profile != ''"
              @mouseover="photoFocus = true"
              @mouseleave="photoFocus = false"
              width="100%"
              height="100%"
            />
          </q-card>
        </div>
        <input
          type="file"
          class="hidden"
          ref="uploader"
          accept="image/*"
          @change="fileSelected"
        />
        <br />
        <p class="caption">
          Address<i>(Default for Delivery/Service Address)</i>
        </p>

        <div class="q-gutter-md q-pb-sm" :class="$q.screen.lt.sm ? '' : 'row'">
          <q-select
            label="Region"
            v-model="updated.address.region"
            :options="$regions"
            option-value="designation"
            option-label="designation"
            :class="$q.screen.lt.sm ? '' : 'col'"
            lazy-rules
            input-debounce="0"
            use-input
            fill-input
            dense
            outlined
          />

          <q-select
            label="State/Province"
            v-model="updated.address.state_province"
            option-value="name"
            option-label="name"
            :options="provinces"
            :class="$q.screen.lt.sm ? '' : 'col'"
            lazy-rules
            input-debounce="0"
            @filter="filterStateProvince"
            use-input
            fill-input
            dense
            outlined
          />
        </div>

        <div class="q-gutter-md q-pb-sm" :class="$q.screen.lt.sm ? '' : 'row'">
          <q-input
            outlined
            square
            dense
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.house_bldg_st"
            label="House/ Building No./ Street"
          />
          <q-input
            outlined
            square
            dense
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.barangay_district"
            label="Barangay/ District"
          />
        </div>

        <div class="q-gutter-md q-pb-sm" :class="$q.screen.lt.sm ? '' : 'row'">
          <q-select
            label="City/Municipality"
            v-model="updated.address.city_municipality"
            :options="municipalities"
            option-value="name"
            option-label="name"
            :class="$q.screen.lt.sm ? '' : 'col'"
            lazy-rules
            input-debounce="0"
            @filter="filterCityMunicipality"
            use-input
            fill-input
            dense
            outlined
          />

          <q-input
            outlined
            square
            dense
            class="col-sm-12 col-md-4 q-pa-xs"
            v-model="updated.address.zip_code"
            label="Zip Code"
          />
          <q-input
            outlined
            square
            dense
            class="col-sm-12 col-md-4 q-pa-xs"
            v-model="updated.address.country"
            readonly
            label="Country"
          />
        </div>

        <!-- old -->

        <!-- <p class="caption">
          Address<i>(Default for Delivery/Service Address)</i>
        </p>

        <div class="q-gutter-md" :class="$q.screen.lt.sm ? '' : 'row'">
          <q-input
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.house_bldg_st"
            label="House/ Building No./ Street"
          />
          <q-input
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.barangay_district"
            label="Barangay/ District"
          />
          <q-input
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.city_municipality"
            label="City/Municipality"
          />
        </div>
        <div class="q-gutter-md" :class="$q.screen.lt.sm ? '' : 'row'">
          <q-input
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.state_province"
            label="State/Province"
          />
          <q-input
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.zip_code"
            label="Zip Code"
          />
          <q-input
            :class="$q.screen.lt.sm ? '' : 'col'"
            v-model="updated.address.country"
            label="Country"
          />
        </div> -->
        <br />
        <p class="caption">Gender</p>
        <div class="row q-px-md">
          <q-radio
            class="col"
            dense
            v-model="updated.gender"
            val="Male"
            label="Male"
          />
          <q-radio
            class="col"
            dense
            v-model="updated.gender"
            val="Female"
            label="Female"
          />
        </div>
      </q-card-section>

      <q-card-section align="right">
        <br />
        <q-btn color="primary" @click="validate" label="Save changes" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import imageCompression from "browser-image-compression";
export default {
  data() {
    return {
      updated: [],
      error: [],
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      region: "",
      state_province: "",
      profile: "",
      photoFocus: false,
      photoError: false,
      file: {}
    };
  },

  watch: {
    "updated.address.region": {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );
        const listMunicipalities = this.$municipalities.filter(municipality => {
          return listProvince.some(
            province => municipality.province == province.name
          );
        });
        this.updated.address.region = newVal;

        this.provinces = listProvince;
      },
      deep: true
    },

    "updated.address.state_province": {
      handler: function(newVal, oldVal) {
        const municipalitiesNewLists = this.$municipalities.filter(
          ({ province }) => province == newVal.name
        );

        this.municipalities = municipalitiesNewLists;
        this.listMunicipalities = municipalitiesNewLists;
      },
      deep: true
    }
  },

  methods: {
    validate: function() {
      this.error = [];
      if (this.updated.fname.trim() == "") {
        this.error.push("First Name field is required.");
      }
      if (this.updated.lname.trim() == "") {
        this.error.push("Last Name field is required.");
      }
      if (this.updated.mobile_number.trim() == "") {
        this.error.push("Mobile Number field is required.");
      }
      if (this.updated.email.trim() == "") {
        this.error.push("Email field is required.");
      }

      if (this.updated.birthday.trim() == "") {
        this.error.push("Birthday field is required.");
      }
      if (this.updated.address.house_bldg_st.trim() == "") {
        this.error.push("House/ Building/ Street field is required.");
      }
      if (this.updated.address.barangay_district.trim() == "") {
        this.error.push("Barangay/ District field is required.");
      }
      // if (this.updated.address.city_municipality.trim() == "") {
      //   this.error.push("City/ Municipality field is required.");
      // }
      // if (this.updated.address.state_province.trim() == "") {
      //   this.error.push("State/ Province field is required.");
      // }
      if (this.updated.address.zip_code.trim() == "") {
        this.error.push("Zip Code field is required.");
      }
      if (this.updated.address.country.trim() == "") {
        this.error.push("Country field is required.");
      }

      if (this.error.length == 0) {
        this.save();
      }
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
    uploadImage: async function(fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(this.$appLink + "/upload", formData);
      return result.data;
    },
    async uploadImages(file) {
      const compressedFile = await this.compressImage(file);
      return this.uploadImage(compressedFile);
    },

    fileSelected: async function(event) {
      this.file = {};
      this.file = event.target.files[0];
      this.$q.loading.show();
      this.updated.profile = await this.uploadImages(this.file);
      console.log(event.target.files[0]);
      // this.store.logo = await this.$uploadFile(this.file);
      this.$q.loading.hide();
      // console.log(this.photoUrl);
      this.$forceUpdate();
      if (this.updated.profile != "") {
        this.photoError = false;
      }
    },

    // onFileSelected: function(event) {
    //   if (event.target.files[0] != undefined) {
    //     this.fileSelected = event.target.files[0];
    //     this.$refs.fileUploader.resetValidation();
    //   } else {
    //     this.$refs.fileUploader.validate();
    //   }
    // },

    // address function

    filterStateProvince: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCityMunicipality: function(val, update, abort) {
      if (val === "") {
        update(() => {
          this.municipalities = this.listMunicipalities;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.municipalities = this.listMunicipalities.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    save: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to update your profile?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          // console.log(this.updated.address);
          this.updated.profile = this.updated.profile;
          this.$dbCon
            .service("users")
            .patch(this.updated._id, this.updated)
            .then(() => {
              this.$local.set(
                "mun",
                this.updated.address.city_municipality.name
              );
              this.$q.dialog({
                title: "Success!",
                message: "Profile is now updated.",
                cancel: {
                  push: true,
                  color: "grey",
                  flat: true
                }
              });
            });
        });
    }
  },
  async mounted() {
    await this.$getUser().then(results => {
      this.updated = results;
    });
  }
};
</script>

<style></style>
