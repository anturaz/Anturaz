<template>
  <div>
    <q-breadcrumbs class="col-12 text-grey">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Delivery" icon="motorcycle" />
      <q-btn
        label="Add"
        icon="add"
        class="bg-primary text-white btn-sm btn-fixed-width"
        dense
        @click="addModal = true"
      />
    </q-breadcrumbs>
    <br />
    <q-table
      :pagination.sync="myPagination"
      flat
      bordered
      :data="data.fuel_delivery"
      :columns="columns"
      :filter="filter"
      row-key="name"
    >
      <template v-slot:top>
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- <q-tr
        slot="body"
        v-if="store.market_areas.includes(props.row.location)"
        slot-scope="props"
        :props="props"
      >  old -->

      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="province" :props="props">{{ props.row.location }}</q-td>
        <q-td key="delivery" :props="props">{{
          props.row.delivery != "" && props.row.delivery != 0
            ? $prettyMoney(props.row.delivery)
            : "FREE"
        }}</q-td>
        <q-td key="action" :props="props">
          <q-btn
            icon="edit"
            flat
            dense
            @click="editFee(props.row.__index, props.row.delivery)"
          />

          <q-btn
            icon="delete"
            flat
            dense
            @click="deleteModal(props.row.__index, props.row.delivery)"
          />
        </q-td>
      </q-tr>
    </q-table>

    <!-- add dialog -->
    <q-dialog v-model="addModal" persistent>
      <q-card style="min-width: 550px">
        <q-card-section>
          <div class="text-h6">Add delivery location</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
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

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="addModal = false" />
          <q-btn flat label="Submit" @click="addLocation" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- edit dialog -->
    <q-dialog v-model="opened" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit delivery charge</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="current_formatted_fee"
            ref="inp_fee"
            @focus="toInputFee"
            @blur="toChangeFee"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="opened = false" />
          <q-btn flat label="Submit" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- delete dialog -->
    <q-dialog v-model="deleteFee" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Are you sure to Delete delivery location "{{
              safeFuelDeliveryLocation
            }}"?
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="deleteFee = false" />
          <q-btn flat label="Yes" @click="deleteDelivery" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { provinceListt } from "../../data-set/province";
export default {
  data() {
    return {
      deleteFee: false,
      addModal: false,
      deleteFeeLocataion: "",
      opened: false,
      region: "",
      state_province: "",
      city_municipality: [],
      municipalities_city: [],
      new_delivery_location: "",
      market_areas_option: [],
      market_areas_done: false,
      myPagination: { rowsPerPage: 10 },
      data: {},
      store: {},
      current_row: 0,
      current_fee: 0,
      current_formatted_fee: 0,
      filter: "",
      columns: [
        {
          name: "province",
          label: "Province",
          field: "location",
          align: "center",
          style: "width:20%"
        },
        {
          name: "delivery",
          label: "Delivery Fee",
          field: "delivery",
          align: "center"
        },
        {
          name: "action",
          label: "Action",
          align: "center",
          style: "width:200px"
        }
      ],
      provinces: [],
      municipalities: [],
      listMunicipalities: []
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
    //     console.log(newVal);
    //     this.new_delivery_location = newVal;
    //   },
    //   deep: true
    // }
  },

  computed: {
    safeFuelDeliveryLocation() {
      const location = this.data.fuel_delivery[this.deleteFeeLocataion];
      return location ? location.location : "";
    }
  },
  methods: {
    // addModal: function() {
    //   this.addModal = true;
    // },
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
            fuel_transpo: 0,
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
    checkMarketArea: function(province) {
      return this.store.market_areas.includes(province);
    },

    editFee: function(x, y) {
      this.current_delivery = x;
      this.current_fee = this.data.fuel_delivery[
        this.current_delivery
      ].delivery;
      this.current_formatted_fee = this.$prettyMoney(this.current_fee);
      this.opened = true;
    },

    deleteModal: function(x, y) {
      this.deleteFeeLocataion = x;
      this.deleteFee = true;
    },

    deleteDelivery: async function() {
      try {
        this.data.fuel_delivery.splice(this.deleteFeeLocataion, 1);

        const response = await this.$dbCon
          .service("store-fuel-delivery")
          .patch(this.data._id, {
            fuel_delivery: this.data.fuel_delivery
          });
        this.deleteFee = false;

        this.$q.notify({
          message: "Deleted Successfully!",
          position: "top-right",
          color: "primary",
          timeout: 700,
          icon: "check"
        });
      } catch (e) {
        console.log(e);
      }
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
    },
    save: async function(x) {
      await this.$refs.inp_fee.blur();
      this.data.fuel_delivery[
        this.current_delivery
      ].delivery = this.current_fee;
      this.$q
        .dialog({
          title: "Do you want to continue?",
          message: "Charges apply to all products.",
          cancel: true
        })
        .onOk(() => {
          this.$dbCon
            .service("store-fuel-delivery")
            .update(this.data._id, this.data)
            .then(() => {
              this.opened = false;
              this.$q.notify({
                message: "Successfully Updated!",
                position: "top-right",
                color: "primary",
                timeout: 700,
                icon: "check"
              });
            });
        });
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
    }
  },
  async mounted() {
    await this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$local.getItem("store_token")
        }
      })
      .then(result => {
        this.store = result.data[0];
      });
    await this.$dbCon
      .service("store-fuel-delivery")
      .find({
        query: {
          store_id: this.$local.getItem("store_token")
        }
      })
      .then(result => {
        this.data = result.data[0];
      });
  }
};
</script>

<style></style>
