<template>
  <div>
    <div class="q-pa-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin"/>
        <q-breadcrumbs-el label="Maintenance" icon="widgets"/>
        <q-breadcrumbs-el label="Payment" icon="payment"/>
      </q-breadcrumbs>
      <br>

      <div>
        <div class="text-h5 col-12">Payment Terms</div>
        <br>
        <q-list bordered separator>
          <q-item>
            <q-item-section>{{full_payment.payment}}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="full_payment.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_full_payment([full_payment._id,full_payment.status])"
              />
              <span class="text-primary-8">{{full_payment.status}}</span>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>{{layaway.payment}}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="layaway.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_layaway([layaway._id,layaway.status])"
              />
              <span class="text-primary-8">{{layaway.status}}</span>
            </q-item-section>
          </q-item>

          <q-item >
            <q-item-section>{{twenty_percent_reservation.payment}}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="twenty_percent_reservation.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_twenty_percent_reservation([twenty_percent_reservation._id,twenty_percent_reservation.status])"
              />
              <span class="text-primary-8">{{twenty_percent_reservation.status}}</span>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="text-h5">
          <br>Payment Options
        </div>
        <br>

        <q-list bordered separator>
          <q-item>
            <q-item-section>{{online.payment}}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="online.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_online([online._id,online.status])"
              />
              <span class="text-primary-8">{{online.status}}</span>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>{{bank_deposit.payment}}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="bank_deposit.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_bank_deposit([bank_deposit._id,bank_deposit.status])"
              />
              <span class="text-primary-8">{{bank_deposit.status}}</span>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      full_payment: {},
      layaway: {},
      twenty_percent_reservation: {},
      online: {},
      bank_deposit: {}
    };
  },
  methods: {
    update_full_payment: function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable this Payment Term?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          if (x[1] == "Active") {
            this.full_payment.status = "Inactive";
          } else {
            this.full_payment.status = "Active";
          }
          this.$dbCon
            .service("payment-management")
            .update(x[0], this.full_payment);
        });
    },
    update_layaway: function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable this Payment Term?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          if (x[1] == "Active") {
            this.layaway.status = "Inactive";
          } else {
            this.layaway.status = "Active";
          }
          this.$dbCon.service("payment-management").update(x[0], this.layaway);
        });
    },
    update_twenty_percent_reservation: function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable this Payment Term?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          if (x[1] == "Active") {
            this.twenty_percent_reservation.status = "Inactive";
          } else {
            this.twenty_percent_reservation.status = "Active";
          }
          this.$dbCon
            .service("payment-management")
            .update(x[0], this.twenty_percent_reservation);
        });
    },
    update_online: function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable this Payment Option?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          if (x[1] == "Active") {
            this.online.status = "Inactive";
          } else {
            this.online.status = "Active";
          }
          this.$dbCon.service("payment-management").update(x[0], this.online);
        });
    },
    update_bank_deposit: function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable this Payment Option?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          if (x[1] == "Active") {
            this.bank_deposit.status = "Inactive";
          } else {
            this.bank_deposit.status = "Active";
          }
          this.$dbCon
            .service("payment-management")
            .update(x[0], this.bank_deposit);
        });
    },
    getData: function() {
      this.$dbCon
        .service("payment-management")
        .find({
          query: {
            payment: "Full Payment"
          }
        })
        .then(result => {
          this.full_payment = result.data[0];
        });

      this.$dbCon
        .service("payment-management")
        .find({
          query: {
            payment: "Layaway"
          }
        })
        .then(result => {
          this.layaway = result.data[0];
        });

      this.$dbCon
        .service("payment-management")
        .find({
          query: {
            payment: "20% Reservation"
          }
        })
        .then(result => {
          this.twenty_percent_reservation = result.data[0];
        });

      this.$dbCon
        .service("payment-management")
        .find({
          query: {
            payment: "Online"
          }
        })
        .then(result => {
          this.online = result.data[0];
        });

      this.$dbCon
        .service("payment-management")
        .find({
          query: {
            payment: "Bank Deposit"
          }
        })
        .then(result => {
          this.bank_deposit = result.data[0];
        });
    },
    confirm: async function() {
      await this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable this Payment Term?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          return true;
        })
        .onCancel(() => {
          return false;
        });
    }
  },
  mounted() {
    this.$dbCon.service("payment-management").onDataChange(() => {
      this.getData();
    });
  }
};
</script>

