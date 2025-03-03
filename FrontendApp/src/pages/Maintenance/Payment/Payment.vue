<template>
  <div>
    <div class="q-pa-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Maintenance" icon="widgets" />
        <q-breadcrumbs-el label="Payment" icon="payment" />
      </q-breadcrumbs>
      <br />

      <div>
        <div class="text-h5 col-12">Payment Terms</div>
        <br />
        <q-list bordered separator>
          <q-item>
            <q-item-section>{{ full_payment.payment }}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="full_payment.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="
                  update_full_payment([full_payment._id, full_payment.status])
                "
              />
              <span class="text-primary-8">{{ full_payment.status }}</span>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>{{ layaway.payment }}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="layaway.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_layaway([layaway._id, layaway.status])"
              />
              <span class="text-primary-8">{{ layaway.status }}</span>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>{{
              twenty_percent_reservation.payment
            }}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="twenty_percent_reservation.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="
                  update_twenty_percent_reservation([
                    twenty_percent_reservation._id,
                    twenty_percent_reservation.status
                  ])
                "
              />
              <span class="text-primary-8">{{
                twenty_percent_reservation.status
              }}</span>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="text-h5"><br />Payment Options</div>
        <br />

        <q-list bordered separator>
          <q-item>
            <q-item-section>{{ online.payment }}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="online.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="update_online([online._id, online.status])"
              />
              <span class="text-primary-8">{{ online.status }}</span>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>{{ bank_deposit.payment }}</q-item-section>
            <q-item-section avatar class="row">
              <q-toggle
                :value="bank_deposit.status"
                dense
                true-value="Active"
                false-value="Inactive"
                color="primary"
                @input="
                  update_bank_deposit([bank_deposit._id, bank_deposit.status])
                "
              />
              <span class="text-primary-8">{{ bank_deposit.status }}</span>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="text-h5">
          <br />Subscriptions
          <q-btn color="primary" label="Add Payment" @click="addPayment" />
        </div>
        <div class="row q-pa-md">
          <q-table
            :pagination.sync="myPagination"
            flat
            bordered
            :data="global_payments"
            :columns="columns"
            :filter="filter"
            row-key="name"
            class="col-12"
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

            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="cost" :props="props">{{ props.row.cost }}</q-td>
              <q-td key="months" :props="props">{{ props.row.months }}</q-td>

              <q-td key="action" :props="props">
                <q-btn
                  icon="edit"
                  flat
                  dense
                  @click="editFee(props.row.__index, props.row)"
                />

                <q-btn icon="delete" flat dense @click="deleteFee(props.row)" />
              </q-td>
            </q-tr>
          </q-table>
        </div>

        <br />
      </div>
    </div>

    <q-dialog v-model="addModal" persistent>
      <q-card>
        <q-card-section>
          <q-card-title>Add Payment</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-input v-model="payment.name" label="Payment Name" dense outlined />
          <q-input
            type="number"
            v-model="payment.cost"
            label="Cost"
            dense
            outlined
          />

          <q-input
            type="number"
            v-model="payment.months"
            label="months"
            dense
            outlined
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="grey" flat @click="addModal = false" />
          <q-btn
            :label="this.action === 'add' ? 'Add' : 'Edit'"
            color="primary"
            flat
            @click="submit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      addModal: false,
      full_payment: {},
      layaway: {},
      twenty_percent_reservation: {},
      online: {},
      bank_deposit: {},
      global_payments: [],
      myPagination: { rowsPerPage: 10 },
      current_row: 0,
      current_fee: 0,
      filter: "",
      payment: {
        name: "",
        cost: 0,
        months: 0
      },
      editIndex: null,
      action: "",
      columns: [
        {
          name: "name",
          label: "Payment",
          field: "name",
          align: "center"
        },
        {
          name: "cost",
          label: "Cost",
          field: "cost",
          align: "center"
        },
        {
          name: "months",
          label: "Months",
          field: "months",
          align: "center"
        },
        {
          name: "action",
          label: "Action",
          align: "center"
        }
      ]
    };
  },
  methods: {
    editFee: async function(index, x) {
      this.payment = { ...x };
      this.editIndex = index;
      this.addModal = true;
      this.action = "edit";
    },

    addPayment: function() {
      // this.$dbCon.service("global-payments").create(this.payment);
      this.payment = {
        name: "",
        cost: ""
      };
      this.addModal = true;
      this.action = "add";
    },

    submit: async function() {
      this.$q.loading.show();
      try {
        const convertString = this.payment.name.replace(/\s+/g, "_");

        let data = {
          name:
            this.payment.name.charAt(0).toUpperCase() +
            this.payment.name.slice(1),
          type: convertString,
          cost: +this.payment.cost,
          months: +this.payment.months
        };
        if (this.action === "edit") {
          await this.$dbCon
            .service("global-payments")
            .patch(this.payment._id, data);
        } else {
          await this.$dbCon.service("global-payments").create(data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.notify({
            message:
              this.action === "edit"
                ? "Payment edited successfully"
                : "Payment added successfully",
            color: "positive",
            icon: "check"
          });
          this.addModal = false;
          this.$q.loading.hide();
        }, 1000);
      }
    },

    deleteFee: async function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this Payment?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(async () => {
          this.$q.loading.show();
          try {
            await this.$dbCon.service("global-payments").remove(x._id);
            this.getGlobalPayments();
          } catch (e) {
            console.log(e);
          } finally {
            setTimeout(() => {
              this.$q.notify({
                message: "Payment deleted successfully",
                color: "positive",
                icon: "check"
              });
              this.$q.loading.hide();
            }, 1000);
          }
        });
    },

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

    getGlobalPayments: async function() {
      try {
        const response = await this.$dbCon.service("global-payments").find();
        this.global_payments = response.data;
      } catch (e) {
        console.log(e);
      }
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
    this.$dbCon.service("global-payments").onDataChange(() => {
      this.getGlobalPayments();
    });
  }
};
</script>
