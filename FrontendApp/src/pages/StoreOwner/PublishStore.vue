<template>
  <div :class="!$q.screen.lt.md ? 'q-pr-md q-pl-md q-mr-xl q-ml-xl' : ''">
    <q-stepper
      v-model="store.current_step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
      :contracted="$q.screen.lt.md"
      flat
      :bordered="!$q.screen.lt.md"
    >
      <q-step
        :name="1"
        title="Business Info"
        icon="info"
        :done="store.current_step > 1"
      >
        <BusinessInformation v-if="!$q.screen.lt.md" />
      </q-step>

      <q-step
        :name="2"
        title="Store Profile"
        icon="store"
        :done="store.current_step > 2"
      >
        <StoreDetails v-if="!$q.screen.lt.md" />
      </q-step>
      <q-step
        :name="3"
        title="Portfolio"
        icon="dashboard"
        :done="store.current_step > 3"
      >
        <div>
          <Portfolio />
        </div>
        <div class="q-pt-md" align="right">
          <q-btn
            label="Back"
            @click="updateStep(2)"
            color="grey"
            class="q-mr-sm"
            ref="btn_back"
            no-caps
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
            @click="updateStep(4)"
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
      </q-step>

      <q-step
        :name="4"
        title="Services Activation"
        icon="settings"
        :done="store.current_step > 4"
      >
        <div>
          <Settings />
        </div>
        <div align="right">
          <q-btn
            label="Back"
            @click="updateStep(3)"
            color="grey"
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
            @click="updateStep(5)"
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
      </q-step>
      <q-step
        :name="5"
        title="Add Items"
        icon="list"
        :done="store.current_step > 5"
      >
        <div>
          <AddItems />
        </div>
        <div align="right">
          <q-btn
            label="Back"
            @click="updateStep(4)"
            color="grey"
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
            @click="updateStep(6)"
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
      </q-step>

      <q-step
        :name="6"
        title="Publish Store"
        icon="card_membership"
        :done="store.current_step > 6"
      >
        <div>
          <Summary />
        </div>
      </q-step>
      <template v-if="$q.screen.lt.md" v-slot:message>
        <q-banner v-if="store.current_step === 1" class="bg-primary text-white">
          <div class="text-h6">Business Information</div>
        </q-banner>
        <q-banner
          v-else-if="store.current_step === 2"
          class="bg-primary text-white"
        >
          <div class="text-h6">Store Profile</div>
        </q-banner>
        <q-banner
          v-else-if="store.current_step === 3"
          class="bg-primary text-white"
        >
          <div class="text-h6">Portfolio</div>
        </q-banner>
        <q-banner
          v-else-if="store.current_step === 4"
          class="bg-primary text-white"
        >
          <div class="text-h6">Services Activation</div>
        </q-banner>
        <q-banner
          v-else-if="store.current_step === 5"
          class="bg-primary text-white"
        >
          <div class="text-h6">Add Items</div>
        </q-banner>
        <q-banner
          v-else-if="store.current_step === 7"
          class="bg-primary text-white"
        >
          <div class="text-h6">Publish Store</div>
        </q-banner>
      </template>
    </q-stepper>
    <!-- FOR MOBILE PHONE -->
    <div v-if="$q.screen.lt.md">
      <BusinessInformation v-if="store.current_step === 1" class="q-pa-sm" />
      <StoreDetails v-if="store.current_step === 2" class="q-pa-sm" />
    </div>
  </div>
</template>
<script>
import BusinessInformation from "./PublishStore/BusinessInformation.vue";
import StoreDetails from "./PublishStore/StoreDetails.vue";
import AvailPremiumAccount from "./PublishStore/AvailPremiumAccount.vue";
import Portfolio from "./../StoreOwner/Portfolio/Portfolio.vue";
import Settings from "./PublishStore/Settings.vue";
import AddItems from "./PublishStore/AddItems.vue";
import Summary from "./PublishStore/Summary.vue";
export default {
  components: {
    BusinessInformation,
    StoreDetails,
    AvailPremiumAccount,
    Portfolio,
    Settings,
    AddItems,
    Summary
  },
  data() {
    return {
      store: {}
    };
  },
  methods: {
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
          if (this.store.current_step == -1) {
            this.$router.push("/StoreOwner");
          }
        });
      this.$forceUpdate();
    },
    updateStep: async function(x) {
      if (x == 4) {
        //MINIMUM OF 2 UPLOADED PIC
        if (this.store.gallery.length < 2) {
          this.$q.dialog({
            title: "Please upload at least 2 photos to proceed."
          });
          return;
        }
      }
      if (x == 6) {
        //MINIMUM OF 1 ITEM TO PROCEED
        var totProducts = await this.$dbCon
          .service("products")
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              deleted: {
                $ne: true
              }
            }
          })
          .then(results => {
            return results.total;
          });
        var totServices = await this.$dbCon
          .service("services")
          .find({
            query: {
              store_id: this.$local.getItem("store_token"),
              deleted: {
                $ne: true
              }
            }
          })
          .then(results => {
            return results.total;
          });
        if (totProducts + totServices < 1) {
          this.$q.dialog({
            title: "Must add 1 Item",
            message: "Add at least one (1) item to proceed"
          });
          return;
        }
      }
      this.store.current_step = x;
      await this.$dbCon.service("store").patch(this.store._id, this.store);
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });

    //kapag napublish na
  }
};
</script>
