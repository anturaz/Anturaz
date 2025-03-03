<template>
  <div>
    <q-btn
      color="primary"
      label="Create Gift Registry"
      @click="opened = true"
    />

    <q-dialog v-model="opened">
      <q-card style="min-width:50vw">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Create Gift Registry</div>
        </q-card-section>
        <q-separator />

        <q-separator />

        <q-card-section style="max-height: 80vh" class="scroll">
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <ul class="text-caption text-left">
              <li v-for="(err, index) in error" v-bind:key="index">
                {{ err }}
              </li>
            </ul>
          </q-banner>
          <q-input
            outlined
            v-model="event_name"
            label="Event Name"
            dense
            class="q-pa-sm "
            :rules="[val => !!val || 'Event Name is required']"
          />

          <q-input
            outlined
            v-model="celebrant_name"
            label="Celebrant's Name"
            dense
            class="q-pa-sm"
            :rules="[val => !!val || 'Celebrant Name is required']"
          />

          <q-input
            outlined
            v-model="grooms_name"
            label="Groom's Name (if wedding)"
            dense
            class="q-pa-sm"
          />
          <div class="q-pa-sm">
            <q-input
              outlined
              dense
              label="Event Date"
              @click="() => $refs.qDateProxy.show()"
              v-model="event_date"
              mask="date"
              :rules="[val => !!val || 'Event Date is required']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="event_date"
                      @input="() => $refs.qDateProxy.hide()"
                      :options="availableDates"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="text-title text-bold">Coordinator / Contact Person</div>
          <div class="row q-pb-md">
            <q-input
              outlined
              v-model="coordinator_name"
              label="Coordinator Name"
              dense
              class="col q-pa-sm"
              :rules="[val => !!val || 'Coordinator Name is required']"
            />
            <q-input
              outlined
              v-model="coordinator_contact"
              label="Contact Number"
              dense
              class="col q-pa-sm"
              :rules="[
                val => !!val || 'Coordinator Contact number is required',
                val => /^\d+$/.test(val) || 'Must be a valid number'
              ]"
            />
          </div>

          <div class="text-title text-bold">Venue Shipping Address</div>

          <div class="row q-pb-sm">
            <q-select
              label="Region"
              v-model="region"
              :options="$regions"
              option-value="designation"
              option-label="designation"
              class="col-sm-12 q-pa-xs"
              :class="$q.screen.lt.md ? '' : 'col-md-6'"
              lazy-rules
              input-debounce="0"
              use-input
              fill-input
              dense
              outlined
              :rules="[val => !!val || 'Region is required']"
            />

            <q-select
              label="State/Province"
              v-model="state_province"
              option-value="name"
              option-label="name"
              :options="provinces"
              class="col-sm-12 q-pa-xs"
              :class="$q.screen.lt.md ? '' : 'col-md-6'"
              lazy-rules
              input-debounce="0"
              @filter="filterStateProvince"
              use-input
              fill-input
              dense
              outlined
              :rules="[val => !!val || 'State/Province is required']"
            />
          </div>

          <div class="row q-pb-sm">
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-6 q-pa-xs"
              v-model="house_bldg_st"
              label="House/ Building No./ Street"
              :rules="[val => !!val || 'House/Building No./Street is required']"
            />
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-6 q-pa-xs"
              v-model="barangay_district"
              label="Barangay/ District"
              :rules="[val => !!val || 'Barangay/District is required']"
            />

            <!-- <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="city_municipality"
              label="City/Municipality"
            /> -->
          </div>
          <div class="row">
            <q-select
              label="City/Municipality"
              v-model="city_municipality"
              :options="municipalities"
              option-value="name"
              option-label="name"
              class="col-sm-12 q-pa-xs"
              :class="$q.screen.lt.md ? '' : 'col-md-4'"
              lazy-rules
              input-debounce="0"
              @filter="filterCityMunicipality"
              use-input
              fill-input
              dense
              outlined
              :rules="[val => !!val || 'City/Municipality is required']"
            />
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="zip_code"
              label="Zip Code"
              :rules="[val => !!val || 'Zip Code is required']"
            />
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="country"
              readonly
              label="Country"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Submit" color="primary" @click="validateForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { emailSender } from "../../../api/services/authenticationService";
import {
  findGiftReg,
  createGiftReg,
  createGiftEmail
} from "../../../api/services/giftRegistryServices";
export default {
  data() {
    return {
      opened: false,
      region: "",
      event_name: "",
      grooms_name: "",
      celebrant_name: "",
      event_date: "",
      house_bldg_st: "",
      barangay_district: "",
      city_municipality: "",
      state_province: "",
      zip_code: "",
      country: "Philippines",
      coordinator_name: "",
      coordinator_contact: "",
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      error: [],
      shopper: {}
    };
  },
  watch: {
    region: {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );

        this.provinces = listProvince;
        this.city_municipality = [];
        this.municipalities = [];
        this.listMunicipalities = [];
      },
      deep: true
    },

    state_province: {
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
    availableDates(date) {
      const today = new Date();
      const minDate = new Date();
      minDate.setDate(today.getDate() + 15); // Set minimum date to 15 days from today

      return date >= this.$formatDateForPicker(minDate);
    },
    getDateOptions(date) {
      const maxDeliveryDate = this.$addToDate(
        new Date(),
        this.data.delivery_period.max,
        0
      );
      return date >= this.$formatDateForPicker(maxDeliveryDate);
    },

    validateForm() {
      this.error = [];

      if (
        !this.event_name ||
        !this.celebrant_name ||
        !this.event_date ||
        !this.house_bldg_st ||
        !this.barangay_district ||
        !this.city_municipality ||
        !this.state_province ||
        !this.zip_code ||
        !this.coordinator_name ||
        !this.coordinator_contact
      ) {
        this.error.push("All fields are required.");
        return;
      }

      this.submit();
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
    filterStateProvince: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    submit: function() {
      this.$q
        .dialog({
          title: "Create New Gift Registry",
          message: "Are you sure you want to create a new gift registry?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          this.$q.loading.show();
          try {
            // find gift registry to get the total
            const { data: giftData, total } = await findGiftReg();

            // create a object array
            const data = {
              reference_number: "GIFTREGISTRY-" + (total + 1),
              shopper_id: this.$local.getItem("user_token"),
              event_name: this.event_name,
              celebrant_name: this.celebrant_name,
              grooms_name: this.grooms_name,
              event_date: this.event_date,
              house_bldg_st: this.house_bldg_st,
              barangay_district: this.barangay_district,
              city_municipality: this.city_municipality,
              state_province: this.state_province,
              zip_code: this.zip_code,
              country: this.country,
              coordinator_name: this.coordinator_name,
              coordinator_contact: this.coordinator_contact,
              creator_email: this.shopper.email,
              creator_lname: this.shopper.lname,
              items: [],
              buyed_items: [],
              published: true,
              deleted: false,
              createdAt: new Date()
            };

            const createRes = await createGiftReg(data);

            await createGiftEmail(createRes, this.shopper);
          } catch (error) {
            console.log("There is problem Gift registry service");
          }
          this.$q.loading.hide();
          this.opened = false;
        });
    }
  },

  async mounted() {
    this.shopper = await this.$getUser();
  }
};
</script>

<style>
.q-field--error .q-field__bottom {
  padding-top: 3px;
}
</style>
