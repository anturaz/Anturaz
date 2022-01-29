<template>
  <div class="q-pa-lg row">
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Gift Registry" icon="card_giftcard" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <div class="q-pt-sm col-12">
      <div align="right">
        <CreateGiftRegistry />
      </div>
    </div>
    <div class="q-pt-md col-12">
      <q-list bordered separator>
        <q-item :active="active" v-for="giftregistry in data" :key="giftregistry._id">
          <q-item-section>
            <div class="text-bold text-h5">{{giftregistry.event_name}}</div>
            <div>
              <b>Groom:</b>
              {{giftregistry.grooms_name}}
            </div>
            <div>
              <b>Bride:</b>
              {{giftregistry.brides_name}}
            </div>
            <div>
              <b>Wedding Date:</b>
              {{giftregistry.wedding_date}}
            </div>
            <div>
              <b>Shipping Address:</b>
              {{giftregistry.house_bldg_st+" "+giftregistry.barangay_district+", "+giftregistry.city_municipality+", "+giftregistry.state_province+", "+giftregistry.country+` (${giftregistry.zip_code})`}}
            </div>
          </q-item-section>
          <q-item-section class="column" side>
            <div class="col self-start">
              <b>Reference Number:</b>
              {{giftregistry.reference_number}}
            </div>
            <q-btn class="col-3 self-end" label="VIEW >" @click="$router.push('/GiftRegistry/Event/Manage/'+giftregistry.reference_number)" flat unelevated color="primary" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import CreateGiftRegistry from "./CreateGiftRegistry";
export default {
  components: {
    CreateGiftRegistry
  },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.$dbCon.authenticate();
    this.$dbCon.service("gift-registry").onDataChange(() => {
      this.$dbCon
        .service("gift-registry")
        .find({
          query: {
            shopper_id: this.$local.getItem("user_token"),
            deleted: false
          }
        })
        .then(results => {
          this.data = results.data;
        });
    });
  }
};
</script>

<style>
</style>