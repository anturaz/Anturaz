<template>
  <div class="q-mx-xl q-pt-md" style="min-height: 100vh;">
    <div class="flex flex-center column">
      <div class="text-h4">Contact us</div>
      <div class="row" style="min-height: 400px; width: 90%;">
        <div
          id="parent"
          class="fit row wrap justify-center items-start content-start"
          style="overflow: hidden;"
        >
          <div
            class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            style="overflow: auto;"
          >
            <q-card class="no-border-radius">
              <q-card-section>
                <q-input
                  v-model="form_data.name"
                  standout
                  label="Name"
                  :dense="dense"
                />
                <q-input
                  v-model="form_data.email"
                  label="Email"
                  :dense="dense"
                  class="q-mt-md"
                  standout
                />
                <q-input
                  v-model="form_data.subject"
                  label="Subject"
                  :dense="dense"
                  class="q-mt-md"
                  standout
                />

                <q-input
                  v-model="form_data.message"
                  label="Message"
                  :dense="dense"
                  class="q-mt-md"
                  filled
                  standout
                  type="textarea"
                />

                <div class="row justify-end q-mt-md">
                  <q-btn
                    color="primary"
                    class="row"
                    icon="mail"
                    label="Send"
                    align="right"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            style="overflow: auto;"
          >
            <q-card class="no-border-radius">
              <q-card-section>
                <p style=" letter-spacing: 1px;">
                  <span class="text-weight-bold">Address :</span>
                  {{ data.house_bldg_st + ", " + data.city_municipality }}
                </p>
                <p style=" letter-spacing: 1px;">
                  <span class="text-weight-bold">Landline :</span>
                  {{ data.landline_number }}
                </p>
                <p style=" letter-spacing: 1px;">
                  <span class="text-weight-bold">Mobile :</span> 0{{
                    data.mobile_number
                  }}
                </p>
                <p style=" letter-spacing: 1px;">
                  <span class="text-weight-bold">Email : </span
                  >{{ store_data.email }}
                </p>

                <p style=" letter-spacing: 1px; margin-bottom: 0px;">
                  <span class="text-weight-bold">Links :</span>
                </p>

                <div class=" example-row-equal-width">
                  <div class="row">
                    <div
                      class="col col-xs-2 col-sm-12 col-md-2 col-lg-1 col-xl-1 q-mr-sm"
                      v-if="data.links.facebook"
                    >
                      <a
                        :href="'https://' + data.links.facebook"
                        target="_blank"
                        style="color:black;"
                      >
                        <i class="fab fa-facebook fa-3x"></i>
                      </a>
                    </div>

                    <div
                      class="col col-xs-2 col-sm-12 col-md-2 col-lg-1 col-xl-1  q-mr-sm"
                      v-if="data.links.instagram"
                    >
                      <a
                        :href="'https://' + data.links.instagram"
                        target="_blank"
                        style="color:black;"
                      >
                        <i class="fab fa-instagram fa-3x"></i>
                      </a>
                    </div>

                    <div
                      class="col col-xs-2 col-sm-12 col-md-2 col-lg-2 col-xl-1 q-mr-1"
                      v-if="data.links.pinterest"
                    >
                      <a
                        :href="'https://' + data.links.pinterest"
                        target="_blank"
                        style="color:black;"
                      >
                        <i class="fab fa-pinterest fa-3x"></i>
                      </a>
                    </div>

                    <div
                      class="col col-xs-2 col-sm-12 col-md-2 col-lg-1 col-xl-1 q-mr-1"
                      v-if="data.links.youtube"
                    >
                      <a
                        :href="'https://' + data.links.youtube"
                        target="_blank"
                        style="color:black;"
                      >
                        <i class="fab fa-youtube fa-3x"></i>
                      </a>
                    </div>

                    <div
                      class="col col-xs-2 col-sm-12 col-md-2 col-lg-1 col-xl-1 q-mr-1"
                      v-if="data.links.vimeo"
                    >
                      <a
                        :href="'https://' + data.links.vimeo"
                        target="_blank"
                        style="color:black;"
                      >
                        <i class="fab fa-vimeo fa-3x"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form_data: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      dense: false,
      data: [],
      store_data: []
    };
  },

  methods: {
    getStoreData: async function() {
      try {
        const res = await this.$dbCon.service("store").find({
          query: {
            _id: this.$route.query.store
          }
        });

        this.data = res.data[0];
      } catch (e) {}
    },

    getUserData: async function() {
      try {
        await this.$dbCon.authenticate();
        const res = await this.$dbCon.service("users").find({
          query: {
            store_id: this.$route.query.store
          }
        });

        this.store_data = res.data[0];
      } catch (e) {}
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getStoreData();
    });
    this.$dbCon.service("users").onDataChange(() => {
      this.getUserData();
    });
  }
};
</script>
