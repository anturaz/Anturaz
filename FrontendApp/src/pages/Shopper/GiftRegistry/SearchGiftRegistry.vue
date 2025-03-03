<template>
  <div>
    <q-btn
      color="primary"
      label="Search Gift Registry"
      @click="opened = true"
    />

    <q-dialog v-model="opened">
      <q-card style="min-width:50vw">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Search Gift Registry</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-sm col-12">
          <q-input
            v-model="search"
            bottom-slots
            label="Search Gift Registry"
            stack-label
            counter
            :dense="dense"
          >
            <template v-slot:append>
              <q-btn
                @click="getSearchGiftRegistry"
                round
                dense
                flat
                icon="search"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="col-12">
          <q-list bordered separator v-if="data.length > 0">
            <q-item v-for="giftregistry in data" :key="giftregistry._id">
              <q-item-section>
                <div class="text-bold text-h5">
                  {{ giftregistry.event_name }}
                </div>
                <div>
                  <b>Groom:</b>
                  {{ giftregistry.grooms_name }}
                </div>
                <div>
                  <b>Bride:</b>
                  {{ giftregistry.brides_name }}
                </div>
                <div>
                  <b>Wedding Date:</b>
                  {{ giftregistry.wedding_date }}
                </div>
                <div>
                  <b>Shipping Address:</b>
                  {{
                    giftregistry.house_bldg_st +
                      " " +
                      giftregistry.barangay_district +
                      ", " +
                      giftregistry.city_municipality.name +
                      ", " +
                      giftregistry.state_province.name +
                      ", " +
                      giftregistry.country +
                      ` (${giftregistry.zip_code})`
                  }}
                </div>
              </q-item-section>
              <q-item-section class="column" side>
                <div class="col self-start">
                  <b>Reference Number:</b>
                  {{ giftregistry.reference_number }}
                </div>
                <q-btn
                  class="col-3 self-end"
                  label="VIEW >"
                  @click="
                    $router.push(
                      '/GiftRegistry/Event/Manage/' +
                        giftregistry.reference_number
                    )
                  "
                  flat
                  unelevated
                  color="primary"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-list separator v-else>
            <q-item>
              <q-item-section class="no-result-section">
                <h3>No Result <q-icon name="local_cafe" /></h3>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      search: "",
      data: [],
      value: 71
    };
  },

  watch: {
    search(newVal) {
      //   this.debouncedSearch();
      this.checkSearchStr(newVal);
    }
  },

  methods: {
    debouncedSearch() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.getSearchGiftRegistry();
      }, 500);
    },

    searchButton: async function() {
      try {
      } catch (error) {
        console.log(error);
      } finally {
        // this.opened = false;
      }
    },

    checkSearchStr: _.debounce(function(string) {
      this.getSearchGiftRegistry();
    }, 500),

    getSearchGiftRegistry: async function() {
      this.$q.loading.show();
      try {
        const query = {
          deleted: false,
          shopper_id: {
            $ne: this.$local.getItem("user_token")
          }
        };
        if (this.search == "") {
          setTimeout(() => {
            this.data = [];
            this.$q.loading.hide();
          }, 500);
        } else {
          query["$search"] = this.search;
          const { data } = await this.$dbCon.service("gift-registry").find({
            query: query
          });
          setTimeout(() => {
            this.$q.loading.hide();
            this.data = data;
          }, 500);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // this.opened = false;
      }
    }
  }
};
</script>

<style scoped>
.no-result-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}

.no-result-icon {
  margin-bottom: 10px;
}
</style>
