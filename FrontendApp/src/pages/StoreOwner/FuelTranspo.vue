<template>
  <div>
    <q-breadcrumbs class="col-12 text-grey">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Fuel and Transportation" icon="drive_eta" />
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
      :data="data.fuel_delivery"
      :columns="columns"
      :filter="filter"
      row-key="name"
      flat
      bordered
    >
      <template v-slot:top-right>
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
        <q-td key="province" :props="props">{{ props.row.location }}</q-td>
        <q-td key="fuel_transporation_fee" :props="props">{{
          props.row.fuel_transpo != "" && props.row.fuel_transpo != 0
            ? $prettyMoney(props.row.fuel_transpo)
            : "FREE"
        }}</q-td>
        <q-td key="edit" :props="props">
          <q-btn
            icon="edit"
            flat
            dense
            @click="editFee(props.row.__index, props.row.fuel_transpo)"
          />
          <q-btn
            icon="delete"
            flat
            dense
            @click="deleteFee(props.row.__index, props.row.fuel_transpo)"
          />
        </q-td>
      </q-tr>
    </q-table>
    <!-- add modal -->
    <!-- My AddForm component is now a child component of FuelTranspo.vue -->
    <AddForm :isVisible.sync="addModal" :data="data" :type="type" />
  </div>
</template>

<script>
import AddForm from "../../components/Form/AddForm.vue";
export default {
  components: {
    AddForm
  },
  data() {
    return {
      addModal: false,
      myPagination: { rowsPerPage: 10 },
      data: {},
      filter: "",
      type: "Fuel/Transportation",
      columns: [
        {
          name: "province",
          label: "Province",
          field: "location",
          align: "center",
          style: "width:20%"
        },
        {
          name: "fuel_transporation_fee",
          label: "Fuel/Transportation Fee",
          field: "fuel_transpo",
          align: "center"
        },
        {
          name: "edit",
          label: "Edit",
          align: "center",
          style: "width:200px"
        }
      ]
    };
  },
  methods: {
    editFee: function(x, y) {
      this.$q
        .dialog({
          title: "Edit Fuel/Transporation Charge",
          prompt: {
            model: this.data.fuel_delivery[x].fuel_transpo,
            type: "number" // optional
          },
          cancel: true
        })
        .onOk(data => {
          this.$q
            .dialog({
              title: "Do you want to continue?",
              message: "Charges apply to all services.",
              cancel: true
            })
            .onOk(() => {
              this.data.fuel_delivery[x].fuel_transpo = data;
              this.$dbCon
                .service("store-fuel-delivery")
                .update(this.data._id, this.data)
                .then(() => {
                  this.$q.notify({
                    message: "Successfully Updated!",
                    position: "top-right",
                    color: "primary",
                    timeout: 700,
                    icon: "check"
                  });
                });
            });
        });
    },
    deleteFee: function(x, y) {
      this.$q
        .dialog({
          title: "Delete Fuel/Transporation Charge",
          message: "Are you sure you want to delete this charge?",
          cancel: true
        })
        .onOk(() => {
          this.data.fuel_delivery.splice(x, 1);
          this.$dbCon
            .service("store-fuel-delivery")
            .update(this.data._id, this.data)
            .then(() => {
              this.$q.notify({
                message: "Successfully Deleted!",
                position: "top-right",
                color: "primary",
                timeout: 700,
                icon: "check"
              });
            });
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
