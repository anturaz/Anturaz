<template>
  <div>
    <q-breadcrumbs class="col-12 text-grey">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Delivery" icon="motorcycle" />
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
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <q-tr
        slot="body"
        v-if="store.market_areas.includes(props.row.location)"
        slot-scope="props"
        :props="props"
      >
        <q-td key="province" :props="props">{{props.row.location}}</q-td>
        <q-td
          key="delivery"
          :props="props"
        >{{ props.row.delivery!="" && props.row.delivery != 0 ? $prettyMoney(props.row.delivery): 'FREE'}}</q-td>
        <q-td key="edit" :props="props">
          <q-btn icon="edit" flat dense @click="editFee(props.row.__index,props.row.delivery)" />
        </q-td>
      </q-tr>
    </q-table>
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
          <q-btn flat label="Cancel" @click="opened=false" />
          <q-btn flat label="Submit" @click="save" />
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
          style: "width:20%",
        },
        {
          name: "delivery",
          label: "Delivery Fee",
          field: "delivery",
          align: "center",
        },
        {
          name: "edit",
          label: "Edit",
          align: "center",
          style: "width:200px",
        },
      ],
    };
  },
  methods: {
    editFee: function (x, y) {
      this.current_delivery = x;
      this.current_fee = this.data.fuel_delivery[
        this.current_delivery
      ].delivery;
      this.current_formatted_fee = this.$prettyMoney(this.current_fee);
      this.opened = true;
    },
    toInputFee: function () {
      this.current_formatted_fee = this.current_fee;
    },
    toChangeFee: function () {
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
    save: async function (x) {
      await this.$refs.inp_fee.blur();
      this.data.fuel_delivery[
        this.current_delivery
      ].delivery = this.current_fee;
      this.$q
        .dialog({
          title: "Do you want to continue?",
          message: "Charges apply to all products.",
          cancel: true,
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
                icon: "check",
              });
            });
        });
    },
  },
  async mounted() {
    await this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$local.getItem("store_token"),
        },
      })
      .then((result) => {
        this.store = result.data[0];
      });
    await this.$dbCon
      .service("store-fuel-delivery")
      .find({
        query: {
          store_id: this.$local.getItem("store_token"),
        },
      })
      .then((result) => {
        this.data = result.data[0];
      });
  },
};
</script>

<style>
</style>
