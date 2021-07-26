<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Maintenance" icon="widgets" />
        <q-breadcrumbs-el label="Store" icon="store" />
      </q-breadcrumbs>
    </div>
    <div class>
      <q-table :data="data" :columns="columns" :filter="filter" row-key="name">
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="store_name" :props="props">{{props.row.store_name}}</q-td>
          <q-td key="business_type" :props="props">{{props.row.store_name}}</q-td>
          <q-td key="mobile_number" :props="props">{{props.row.mobile_number}}</q-td>
          <q-td key="landline_number" :props="props">{{props.row.landline_number}}</q-td>
          <q-td key="bank_name" :props="props">{{props.row.bank_name}}</q-td>
          <q-td key="account_name" :props="props">{{props.row.account_name}}</q-td>
          <q-td key="account_number" :props="props">{{props.row.account_number}}</q-td>
          <q-td key="access" :props="props">
            <q-toggle
              :value="props.row.access"
              color="primary"
              @input="changeStatus(props.row.access,props.row._id,props.row)"
            />
          </q-td>
        </q-tr>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          name: "store_name",
          label: "Store Name",
          field: "store_name",
          align: "center"
        },
        {
          name: "business_type",
          label: "Business Type",
          field: "business_type",
          align: "center"
        },
        {
          name: "mobile_number",
          label: "Mobile Number",
          field: "mobile_number",
          align: "center"
        },
        {
          name: "landline_number",
          label: "Landline Number",
          field: "landline_number",
          align: "center"
        },
        {
          name: "bank_name",
          label: "Bank Name",
          field: "bank_name",
          align: "center"
        },
        {
          name: "account_name",
          label: "Account Name",
          field: "account_name",
          align: "center"
        },
        {
          name: "account_number",
          label: "Account Number",
          field: "account_number",
          align: "center"
        },
        {
          name: "access",
          label: "Access",
          field: "access",
          align: "center"
        }
      ]
    };
  },
  mounted() {
    this.$dbCon.services.store.onDataChange(() => {
      this.getData();
    });
  },
  methods: {
    changeStatus: function(currentStatus, id, store) {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to Turn " +
            (currentStatus == true ? "Off" : "On") +
            " the access of this store?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          store.access = !currentStatus;
          this.$dbCon
            .service("store")
            .patch(id, store)
            .then(() => {
              this.$q.dialog({
                title: "Success",
                message: "Accessibility of this store is updated!",
                cancel: false,
                persistent: true
              });
            });
        });
    },
    getData: function() {
      this.$dbCon
        .service("store")
        .find({})
        .then(results => {
          this.data = results.data;
        });
    }
  }
};
</script>
