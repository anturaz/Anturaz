<template>
  <div>
    <div class="q-gutter-md q-pb-sm" :class="$q.screen.lt.sm ? '' : 'row'">
      <q-select
        label="Region"
        v-model="region"
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
        v-model="user_data.address.state_province"
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
        v-model="user_data.address.house_bldg_st"
        label="House/ Building No./ Street"
      />

      <q-input
        outlined
        square
        dense
        :class="$q.screen.lt.sm ? '' : 'col'"
        v-model="user_data.address.barangay_district"
        label="Barangay/ District"
      />
    </div>
    <div class="q-gutter-md q-pb-sm" :class="$q.screen.lt.sm ? '' : 'row'">
      <q-select
        label="City/Municipality"
        v-model="user_data.address.city_municipality"
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
        :class="$q.screen.lt.sm ? '' : 'col'"
        v-model="user_data.address.zip_code"
        label="Zip Code"
      />

      <q-input
        outlined
        square
        dense
        :class="$q.screen.lt.sm ? '' : 'col'"
        v-model="user_data.address.country"
        label="Country"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user_data: Object
  },
  data() {
    return {
      region: "",
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      data: {},
      country: "",
      zip_code: ""
    };
  },
  watch: {
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
        this.municipalities = listMunicipalities;
        this.listMunicipalities = listMunicipalities;
      },
      deep: true
    },

    user_data(newVal) {
      this.data = newVal;
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
    }
  },
  mounted() {
    this.data = this.user_data;
    this.country = this.user_data.address.country;
    // this.zip_code = this.user_data.address.zip_code;
  }
};
</script>
