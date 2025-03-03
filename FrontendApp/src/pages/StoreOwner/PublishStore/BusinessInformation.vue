<template>
  <div>
    <q-form ref="myForm" @submit="save">
      <div class="row">
        <div class="col-12">
          <br v-if="error.length != 0" />
          <p class="text-subtitle1 text-black">Business Type</p>
          <!-- <q-separator /> -->
          <div :class="$q.screen.lt.md ? '' : 'q-gutter-xl q-pa-sm'">
            <q-radio
              v-model="store.business_type"
              val="Self-Employed"
              label="Self-Employed"
            />
            <q-radio
              v-model="store.business_type"
              aria-readonly
              val="Sole Proprietorship"
              label="Sole Proprietorship"
            />
            <q-radio
              v-model="store.business_type"
              val="Partnership"
              label="Partnership"
            />
            <q-radio
              v-model="store.business_type"
              val="Corporation"
              label="Corporation"
            />
          </div>
        </div>
        <div class="col-12 row" v-if="store.business_type == 'Self-Employed'">
          <p class="text-subtitle1 text-black q-pt-md  col-12">
            Owner's Information
          </p>
          <!-- <q-separator class="col-12" /> -->
          <div class="col-12 row">
            <q-input
              label="First Name"
              v-model="user.fname"
              class="col-md-5 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              dense
            />

            <q-input
              label="Middle Name "
              v-model="user.mname"
              class="col-md-2 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              lazy-rules
              dense
            />

            <q-input
              label="Last Name"
              v-model="user.lname"
              class="col-md-5 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              dense
            />
          </div>
        </div>
        <div class="col-12 row" v-else>
          <p class="text-subtitle1 text-black  q-pt-md col-12">
            Owner/Representative's Information
          </p>
          <!-- <q-separator class="col-12" /> -->
          <div class="col-12 row">
            <q-input
              label="First Name"
              v-model="user.fname"
              class="col-md-3 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              dense
            />
            <q-input
              label="Middle Name"
              v-model="user.mname"
              class="col-md-2 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              lazy-rules
              dense
            />
            <q-input
              label="Last Name"
              v-model="user.lname"
              class="col-md-3 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              dense
            />

            <q-input
              label="Position in the Company"
              v-model="user.position_in_the_company"
              class=" col-md-4 col-xs-12"
              :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              dense
            />
          </div>
        </div>

        <p class="text-subtitle1 text-black  q-pt-md col-12">
          Contact Information
        </p>
        <!-- <q-separator class="col-12" /> -->
        <div class="col-12 row">
          <q-input
            label="Mobile Number"
            v-model="store.mobile_number"
            class="col-md-6 col-xs-12"
            :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
            :rules="[value => value.trim() != '' || 'This Field is required']"
            lazy-rules
            dense
            mask="9## ### ####"
            unmasked-value
            prefix="(+63)"
          >
            <template v-slot:before>
              <q-avatar>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/world-flags-circular/1000/Flag_of_The_Philippines_-_Circle-512.png"
                />
              </q-avatar>
            </template>
          </q-input>
          <q-input
            label="Landline Number"
            v-model="store.landline_number"
            class="col-md-6 col-xs-12"
            :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
            dense
            mask="(##) #### ####"
            unmasked-value
          />
        </div>
        <p class="text-subtitle1 text-black q-pt-md col-12">Address</p>

        <!-- <q-separator class="col-12" /> -->
        <q-select
          label="Region"
          v-model="store.region"
          :options="$regions"
          option-value="designation"
          option-label="designation"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          lazy-rules
          input-debounce="0"
          use-input
          fill-input
          dense
        />

        <q-select
          label="State/Province"
          v-model="store.state_province"
          option-value="name"
          option-label="name"
          :options="provinces"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          lazy-rules
          input-debounce="0"
          @filter="filterStateProvince"
          use-input
          fill-input
          dense
        />

        <q-input
          label="House/ Building No./ Street"
          v-model="store.house_bldg_st"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
          lazy-rules
          dense
        />
        <q-input
          label="Barangay/ District"
          v-model="store.barangay_district"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
          lazy-rules
          dense
        />
        <q-select
          label="City/Municipality"
          v-model="store.city_municipality"
          :options="municipalities"
          option-value="name"
          option-label="name"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          lazy-rules
          input-debounce="0"
          @filter="filterCityMunicipality"
          use-input
          fill-input
          dense
        />

        <q-input
          label="Zip Code"
          v-model="store.zip_code"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
          lazy-rules
          dense
        />
        <q-select
          label="Country"
          v-model="store.country"
          :options="country_options"
          class="col-md-6 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
          lazy-rules
          dense
          disable
        />

        <p class="text-subtitle1 text-black q-pt-lg col-12">
          Nominate bank account where sales will be deposited
        </p>
        <!-- <q-separator class="col-12" /> -->
        <q-select
          label="Bank Name"
          v-model="store.bank_name"
          :options="bank_options"
          class="col-md-4 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
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
          class="col-md-4 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
          lazy-rules
          dense
        />
        <q-input
          label="Account Number"
          v-model="store.account_number"
          class="col-md-4 col-xs-12"
          :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
          :rules="[value => value.trim() != '' || 'This Field is required']"
          lazy-rules
          dense
        />
        <br class="col-12" />
        <div class="col-12 row" v-if="store.business_type == 'Self-Employed'">
          <p class="text-subtitle1 text-black q-pt-lg col-12">
            Upload front side photo of government ID
          </p>
          <!-- <q-separator class="col-12" /> -->
          <div class="col-12 row" :class="$q.screen.lt.md ? '' : 'q-pa-sm'">
            <q-input
              @change="onFileSelected"
              class="col-12"
              :rules="[
                value =>
                  !(
                    Object.keys(fileSelected).length === 0 &&
                    fileSelected.constructor === Object
                  ) || 'This Field is required'
              ]"
              lazy-rules
              ref="fileUploader"
              dense
              type="file"
              accept="image/*"
            />
          </div>
        </div>

        <div class="col-12 row" v-else>
          <p class="text-subtitle1 text-black q-pt-sm col-12">
            DTI/SEC Registration Details
          </p>
          <!-- <q-separator class="col-12" /> -->

          <q-input
            class="col-md-6 col-xs-12"
            :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
            :rules="[value => value.trim() != '' || 'This Field is required']"
            lazy-rules
            v-model="store.dti_sec_registration_number"
            label="DTI/SEC Registration Number"
          />
          <q-input
            @change="onFileSelected"
            class="col-md-6 col-xs-12"
            :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
            :rules="[
              value =>
                !(
                  Object.keys(fileSelected).length === 0 &&
                  fileSelected.constructor === Object
                ) || 'This Field is required'
            ]"
            lazy-rules
            ref="fileUploader"
            type="file"
            stack-label
            label="Upload photo of DTI/SEC Registration Certificate"
          />
        </div>
      </div>
      <div class="q-pt-md" align="right">
        <q-btn
          label="Save & Next"
          color="primary"
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
          type="submit"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import {
  storeOwnerSignupEmail,
  emailSender
} from "../../../api/services/authenticationService";
export default {
  data() {
    return {
      business_type: "Self-Employed",
      state_province_options: this.$provinceList,
      city_municipality_options: this.$municipalities,
      country_options: this.$countryList,
      bank_options: this.$bankList,
      fileSelected: {},
      store: {},
      user: {},
      error: [],
      provinces: [],
      municipalities: [],
      listMunicipalities: []
    };
  },
  watch: {
    "store.region": {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );
        // const listMunicipalities = this.$municipalities.filter(municipality => {
        //   return listProvince.some(
        //     province => municipality.province == province.name
        //   );
        // });

        this.provinces = listProvince;
        this.city_municipality = [];
        this.municipalities = [];
        this.listMunicipalities = [];
      },
      deep: true
    },

    "store.state_province": {
      handler: function(newVal, oldVal) {
        const municipalitiesNewLists = this.$municipalities.filter(
          municipality => municipality.province == newVal.name
        );
        this.municipalities = municipalitiesNewLists;
        this.listMunicipalities = municipalitiesNewLists;
      },
      deep: true
    }
  },
  methods: {
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
    filterStateProvince: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterBank: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.bank_options = this.$bankList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    onFileSelected: function(event) {
      if (event.target.files[0] != undefined) {
        this.fileSelected = event.target.files[0];
        this.$refs.fileUploader.resetValidation();
      } else {
        this.$refs.fileUploader.validate();
      }
    },
    save: async function() {
      this.$q.loading.show();
      try {
        // Start loading
        this.store.current_step = 2;

        // Email preparation
        const data = {
          store_name: this.store.store_name,
          bussiness_address: `${this.store.house_bldg_st}, ${
            this.store.barangay_district
          }, ${this.store.city_municipality.name} ${
            this.store.city_municipality.city ? "City" : ""
          }`,
          email: this.user.original_email,
          lname: this.user.lname,
          mobile_num: this.store.mobile_number
        };

        const emailMessage = storeOwnerSignupEmail(data);
        const subject = "Anturaz - Successful Vendor Registration";

        await emailSender(data, emailMessage, subject);

        // Update store and user data
        await this.$dbCon.service("store").patch(this.store._id, this.store);
        await this.$dbCon.service("users").patch(this.user._id, this.user);

        console.log("✅ Store and user data updated successfully!");

        this.$forceUpdate();
      } catch (error) {
        console.error("❌ Error in saving process:", error);
      } finally {
        this.$q.loading.hide();
        // Stop loading
      }
    },

    getData: async function() {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token")
          }
        })
        .then(results => {
          this.store = results.data[0];
          // console.log(this.store);
        });
      this.user = await this.$getUser();
    }
  },
  async mounted() {
    // console.log(this.$municipalities);
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
    this.$dbCon.service("users").onDataChange(() => {
      this.getData();
    });
  }
};
</script>
