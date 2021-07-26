<template>
  <div>
    <q-btn color="primary" label="Create Gift Registry" @click="opened=true" />

    <q-dialog v-model="opened">
      <q-card style="min-width:50vw">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Create Gift Registry</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 80vh" class="scroll">
          <q-input outlined v-model="event_name" label="Event Name" dense class="q-pa-sm" />
          <q-input outlined v-model="brides_name" label="Bride's Name" dense class="q-pa-sm" />
          <q-input outlined v-model="grooms_name" label="Groom's Name" dense class="q-pa-sm" />
          <div class="q-pa-sm">
            <q-input
              outlined
              dense
              label="Wedding Date"
              @click="() => $refs.qDateProxy.show()"
              v-model="wedding_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="wedding_date" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="text-title text-bold">Shipping Address</div>
          <div class="row">
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="house_bldg_st"
              label="House/ Building No./ Street"
            />
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="barangay_district"
              label="Barangay/ District"
            />
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="city_municipality"
              label="City/Municipality"
            />
          </div>
          <div class="row">
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="state_province"
              label="State/Province"
            />
            <q-input
              outlined
              square
              dense
              class="col-sm-12 col-md-4 q-pa-xs"
              v-model="zip_code"
              label="Zip Code"
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
          <q-btn flat label="Submit" color="primary" @click="submit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      event_name: "",
      grooms_name: "",
      brides_name: "",
      wedding_date: "",
      house_bldg_st: "",
      barangay_district: "",
      city_municipality: "",
      state_province: "",
      zip_code: "",
      country: "Philippines"
    };
  },
  methods: {
    submit: function() {
      this.$q
        .dialog({
          title: "Create New Gift Registry",
          message: "Are you sure you want to create a new gift registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$dbCon
            .service("gift-registry")
            .find({})
            .then(results => {
              this.$dbCon
                .service("gift-registry")
                .create({
                  reference_number: "GIFTREGISTRY-"+(results.total+1),
                  shopper_id: this.$local.getItem("user_token"),
                  event_name: this.event_name,
                  brides_name: this.brides_name,
                  grooms_name: this.grooms_name,
                  wedding_date: this.wedding_date,
                  house_bldg_st: this.house_bldg_st,
                  barangay_district: this.barangay_district,
                  city_municipality: this.city_municipality,
                  state_province: this.state_province,
                  zip_code: this.zip_code,
                  country: this.country,
                  items: [],
                  published: true,
                  deleted: false
                })
                .then(() => {
                  this.opened = false;
                });
            });
        });
    }
  }
};
</script>

<style>
</style>