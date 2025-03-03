<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Maintenance" icon="widgets" />
        <q-breadcrumbs-el label="Utilities" icon="settings" />
      </q-breadcrumbs>
    </div>
    <div class>
      <!-- <div class="q-pt-sm q-pb-sm" align="right">
        <q-btn label="SAVE ALL" color="primary" @click="save('save_all')" />
        <q-btn class="q-ml-sm" label="RESET ALL" color="grey" @click="resetAll" />
      </div>-->
      <q-card flat bordered>
        <q-card-section class="row">
          <div class="col-md-8 col-sm-12">Transaction Fee</div>
          <div class="q-pb-sm col-md-2 col-sm-12" align="right">
            <q-input
              square
              outlined
              dense
              type="number"
              v-model="temporaryData.transaction_fee"
            />
          </div>
          <div class="col-md-2 col-sm-12" align="right">
            <q-btn
              label="SAVE"
              color="primary"
              @click="save('transaction_fee')"
              :disable="temporaryData.transaction_fee == data.transaction_fee"
            />
            <q-btn
              class="q-ml-sm"
              label="RESET"
              color="grey"
              :disable="temporaryData.transaction_fee == data.transaction_fee"
              @click="temporaryData.transaction_fee = data.transaction_fee"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row">
          <div class="col-md-8 col-sm-12">MDR</div>
          <div class="q-pb-sm col-md-2 col-sm-12" align="right">
            <q-input
              square
              outlined
              dense
              type="number"
              v-model="temporaryData.MDR"
            />
          </div>
          <div class="col-md-2 col-sm-12" align="right">
            <q-btn
              label="SAVE"
              color="primary"
              @click="save('MDR')"
              :disable="temporaryData.MDR == data.MDR"
            />
            <q-btn
              class="q-ml-sm"
              label="RESET"
              color="grey"
              :disable="temporaryData.MDR == data.MDR"
              @click="temporaryData.MDR = data.MDR"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row">
          <div class="col-md-8 col-sm-12">Web Service Fee</div>
          <div class="q-pb-sm col-md-2 col-sm-12" align="right">
            <q-input
              square
              outlined
              dense
              type="number"
              v-model="temporaryData.web_service_fee"
            />
          </div>
          <div class="col-md-2 col-sm-12" align="right">
            <q-btn
              label="SAVE"
              color="primary"
              @click="save('web_service_fee')"
              :disable="temporaryData.web_service_fee == data.web_service_fee"
            />
            <q-btn
              class="q-ml-sm"
              label="RESET"
              color="grey"
              :disable="temporaryData.web_service_fee == data.web_service_fee"
              @click="temporaryData.web_service_fee = data.web_service_fee"
            />
          </div>
        </q-card-section>
        <q-separator />

        <q-card-section class="row">
          <div class="col-md-8 col-sm-12">Withholding Tax</div>
          <div class="q-pb-sm col-md-2 col-sm-12" align="right">
            <q-input
              square
              outlined
              dense
              type="number"
              v-model="temporaryData.tax"
            />
          </div>
          <div class="col-md-2 col-sm-12" align="right">
            <q-btn
              label="SAVE"
              color="primary"
              @click="save('tax')"
              :disable="temporaryData.tax == data.tax"
            />
            <q-btn
              class="q-ml-sm"
              label="RESET"
              color="grey"
              :disable="temporaryData.tax == data.tax"
              @click="temporaryData.tax = data.tax"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row">
          <div class="col-md-8 col-sm-12">Sales Commission</div>
          <div class="q-pb-sm col-md-2 col-sm-12" align="right">
            <q-input
              square
              outlined
              dense
              type="number"
              v-model="temporaryData.sales_commission"
            />
          </div>
          <div class="col-md-2 col-sm-12" align="right">
            <q-btn
              label="SAVE"
              color="primary"
              @click="save('sales_commission')"
              :disable="temporaryData.sales_commission == data.sales_commission"
            />
            <q-btn
              class="q-ml-sm"
              label="RESET"
              color="grey"
              :disable="temporaryData.sales_commission == data.sales_commission"
              @click="temporaryData.sales_commission = data.sales_commission"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      temporaryData: {}
    };
  },
  methods: {
    getData: function() {
      this.$dbCon
        .service("payment-utilities")
        .find({})
        .then(results => {
          this.data = _.cloneDeep(results.data[0]);
          this.temporaryData = _.cloneDeep(results.data[0]);
        });
    },
    save: function(saveType) {
      if (saveType == "save_all") {
        this.$q
          .dialog({
            title: "Proceed?",
            message: "Are you sure you want update all Payment Utilities?",
            cancel: {
              push: true,
              color: "grey",
              flat: true
            }
          })
          .onOk(() => {
            this.data = this.temporaryData;
            this.$dbCon
              .service("payment-utilities")
              .patch(this.data._id, this.data)
              .then(() => {
                this.$q.notify({
                  message: "Successfully Updated!",
                  position: "top-right",
                  color: "green",
                  timeout: 700,
                  icon: "check"
                });
              });
          });
      } else {
        this.$q
          .dialog({
            title: "Proceed?",
            message: "Are you sure you want update this Payment Utilities?",
            cancel: {
              push: true,
              color: "grey",
              flat: true
            }
          })
          .onOk(() => {
            this.data[saveType] = this.temporaryData[saveType];
            this.$dbCon
              .service("payment-utilities")
              .patch(this.data._id, this.data)
              .then(() => {
                this.$q.notify({
                  message: "Successfully Updated!",
                  position: "top-right",
                  color: "green",
                  timeout: 700,
                  icon: "check"
                });
              });
          });
      }
    },
    resetAll: function() {
      this.temporaryData = _.cloneDeep(this.data);
    }
  },
  mounted() {
    this.$dbCon.service("payment-utilities").onDataChange(() => {
      this.getData();
    });
  }
};
</script>
