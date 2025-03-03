<template>
  <q-dialog v-model="addModal" persistent>
    <q-card style="min-width: 550px">
      <q-card-section>
        <div class="text-h6">Add {{ type }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2">Location</div>
        <q-separator />
        <div class="row col-12">
          <q-select
            label="Region"
            v-model="region"
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
            v-model="state_province"
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
          <!-- 
          <q-select
            label="City/Municipality"
            v-model="city_municipality"
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
          /> -->

          <q-select
            use-input
            use-chips
            multiple
            fill-input
            dense
            option-value="name"
            option-label="name"
            class="col-md-12 col-xs-12"
            :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
            :rules="[
              () => store.market_areas.length != 0 || 'This Field is required'
            ]"
            lazy-rules
            input-debounce="0"
            v-model="city_municipality"
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
        </div>
      </q-card-section>

      <!-- <q-card-section v-if="type === 'Fuel/Transportation'">
        <div class="text-subtitle2">Fuel Information</div>
        <q-separator />
        <div class="row col-12">
          <q-input
            dense
            v-model="current_formatted_fee"
            ref="inp_fee"
            class="col-md-6 col-xs-12"
            :class="$q.screen.lt.md ? '' : 'q-pa-sm'"
            @focus="toInputFee"
            @blur="toChangeFee"
          />
        </div>
      </q-card-section> -->
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="closeModal" />
        <q-btn flat label="Submit" @click="addLocation" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      addModal: this.isVisible,
      region: "",
      state_province: "",
      city_municipality: [],
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      new_delivery_location: "",
      market_areas_option: [],
      market_areas_done: false,
      current_formatted_fee: 0,
      current_fee: 0
    };
  },

  watch: {
    isVisible(newVal) {
      this.addModal = newVal;
    },
    addModal(newVal) {
      this.$emit("update:isVisible", newVal);
    },
    region: {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );
        const listMunicipalities = this.$municipalities.filter(municipality => {
          return listProvince.some(
            province => municipality.province == province.name
          );
        });

        this.provinces = listProvince;
        this.city_municipality = [];
        this.market_areas_option = [];
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
        this.market_areas_option = municipalitiesNewLists;
      },
      deep: true
    }

    // city_municipality: {
    //   handler: function(newVal, oldVal) {
    //     this.new_delivery_location = newVal;
    //   },
    //   deep: true
    // }
  },

  methods: {
    closeModal: function() {
      this.addModal = false;
    },

    filterMarketPlace: function(val, update, abort) {
      if (val === "") {
        update(() => {
          this.market_areas_option = this.listMunicipalities;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.market_areas_option = this.listMunicipalities.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
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
    filterStateProvince: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    addLocation: async function() {
      if (this.city_municipality.length === 0) {
        this.$q.notify({
          message: "Please select a location",
          position: "top-right",
          color: "negative",
          timeout: 700,
          icon: "warning"
        });
        return;
      }
      this.city_municipality.map(municipality => {
        const ifExist = this.data.fuel_delivery.some(
          x => x.location == municipality.name
        );

        if (!ifExist) {
          const newLocation = {
            location: municipality.name,
            province: municipality.province,
            fuel_transpo: this.current_fee,
            delivery: 0
          };
          this.data.fuel_delivery.push(newLocation);
        }
      });
      this.$dbCon
        .service("store-fuel-delivery")
        .patch(this.data._id, {
          fuel_delivery: this.data.fuel_delivery
        })
        .then(() => {
          this.addModal = false;
          this.$q.notify({
            message: "Successfully Added!",
            position: "top-right",
            color: "primary",
            timeout: 700,
            icon: "check"
          });
        });
    },

    toInputFee: function() {
      this.current_formatted_fee = this.current_fee;
    },
    toChangeFee: function() {
      if (isNaN(this.current_formatted_fee)) {
        this.current_formatted_fee = this.current_fee = this.data.fuel_delivery[
          this.current_delivery
        ].delivery;
      }
      this.current_fee = this.current_formatted_fee;
      this.current_formatted_fee = this.$prettyMoney(
        this.current_formatted_fee
      );
    }
  }
};
</script>
