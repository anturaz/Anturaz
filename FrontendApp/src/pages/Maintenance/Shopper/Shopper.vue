<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Maintenance" icon="widgets" />
        <q-breadcrumbs-el label="Shopper" icon="shopping_cart" />
      </q-breadcrumbs>
    </div>
    <q-table :data="data" :columns="columns" :filter="filter" row-key="name">
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
        <q-td key="name" :props="props">{{
          props.row.fname + " " + props.row.lname
        }}</q-td>
        <q-td key="email" :props="props">{{ props.row.email }}</q-td>
        <q-td key="mobile_number" :props="props">{{
          props.row.mobile_number
        }}</q-td>
        <q-td key="gender" :props="props">{{ props.row.gender }}</q-td>
        <q-td key="status" :props="props">
          <q-toggle
            :value="props.row.access"
            color="primary"
            @input="changeStatus(props.row.access, props.row._id, props.row)"
          />
        </q-td>
        <q-td key="action" :props="props">
          <div class="row item-center">
            <Transactions :shopper_id="props.row._id" />
            <q-btn
              color="red"
              icon="delete"
              @click="deleteShopper(props.row._id)"
              flat
              dense
            />
          </div>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import Transactions from "./Transactions.vue";
export default {
  components: {
    Transactions
  },
  data() {
    return {
      data: [],
      columns: [
        { name: "name", label: "Name", field: "name", align: "center" },
        {
          name: "email",
          label: "Email Address",
          field: "email",
          align: "center"
        },

        {
          name: "mobile_number",
          label: "Mobile Number",
          field: "mobile_number",
          align: "center"
        },
        {
          name: "gender",
          label: "Gender",
          field: "gender",
          align: "center"
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "center"
        },
        {
          name: "action",
          label: "Action",
          field: "action",
          align: "center"
        }
      ],
      selectedShopper: null
    };
  },
  mounted() {
    this.$dbCon.services.users.onDataChange(() => {
      this.getData();
    });
  },
  methods: {
    deleteShopper: function(id) {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to delete this shopper?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$dbCon
            .service("users")
            .remove(id)
            .then(() => {
              this.$q.dialog({
                title: "Success",
                message: "Shopper is deleted!",
                cancel: false,
                persistent: true
              });
            });
        });
    },

    changeStatus: function(currentStatus, id, user) {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to Turn " +
            (currentStatus == true ? "Off" : "On") +
            " the access of this shopper?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          user.access = !currentStatus;
          this.$dbCon
            .service("users")
            .patch(id, user)
            .then(() => {
              this.$q.dialog({
                title: "Success",
                message: "Accessibility of this user is updated!",
                cancel: false,
                persistent: true
              });
            });
        });
    },
    getData: function() {
      this.$dbCon
        .service("users")
        .find({
          query: {
            system_user_type: "Shopper"
          }
        })
        .then(results => {
          this.data = results.data;
        });
    }
  },
  mounted() {
    this.$dbCon.service("users").onDataChange(() => {
      this.getData();
    });
  }
};
</script>
