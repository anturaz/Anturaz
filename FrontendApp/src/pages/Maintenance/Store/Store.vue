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
        <template v-slot:top-left>
          <q-btn
            @click="exportExcel"
            class="q-ma-sm"
            label="EXCEL"
            squared
            color="green"
            icon="table_chart"
            unelevated
          />

          <q-space />
        </template>

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
          <q-td key="store_name" :props="props">{{
            props.row.store_name
          }}</q-td>
          <q-td key="original_email" :props="props">{{
            props.row.original_email
          }}</q-td>
          <q-td key="mobile_number" :props="props">{{
            props.row.mobile_number
          }}</q-td>
          <q-td key="landline_number" :props="props">{{
            props.row.landline_number
          }}</q-td>
          <q-td key="bank_name" :props="props">{{ props.row.bank_name }}</q-td>
          <q-td key="account_name" :props="props">{{
            props.row.account_name
          }}</q-td>
          <q-td key="createdAt" :props="props">{{
            new Date(props.row.createdAt).toLocaleString()
          }}</q-td>
          <q-td key="account_number" :props="props">{{
            props.row.account_number
          }}</q-td>

          <q-td key="access" :props="props">
            <q-toggle
              :value="props.row.access"
              color="primary"
              @input="changeStatus(props.row.access, props.row._id, props.row)"
            />
          </q-td>

          <q-td key="action" :props="props">
            <q-btn
              color="red"
              icon="delete"
              @click="deleteStore(props.row._id)"
              dense
              flat
            />
          </q-td>
        </q-tr>
      </q-table>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
import { saveAs } from "file-saver";
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
          name: "original_email",
          label: "Email",
          field: "original_email",
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
          name: "createdAt",
          label: "Created at",
          field: "createdAt",
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
        },

        {
          name: "action",
          label: "Action",
          field: "action",
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
    exportExcel() {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      var XLSX = xlsx;

      // Ensure there's data to export
      if (!this.data.length) {
        this.$q.notify({
          type: "negative",
          message: "No data available to export."
        });
        return;
      }

      // Extract headers (column names) from the first data row
      const headers = Object.keys(this.data[0]);

      // Convert data to an array format (including headers)
      const tableData = [
        headers, // Add headers as the first row
        ...this.data.map(item => headers.map(header => item[header])) // Map row values
      ];

      // Create worksheet
      var ws = XLSX.utils.aoa_to_sheet(tableData);

      // Apply styling to the header row
      const range = XLSX.utils.decode_range(ws["!ref"]); // Get data range
      for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
        if (!ws[cellRef]) continue;

        ws[cellRef].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } }, // White text
          fill: { fgColor: { rgb: "4F81BD" } }, // Blue background
          alignment: { horizontal: "center" }
        };
      }

      // Create workbook and append sheet
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Stores");

      // Write to file
      XLSX.writeFile(wb, `${formattedDate}-stores.xlsx`);
    },
    exportPDF() {},
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
    deleteStore: async function(id) {
      console.log(id);
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to delete this store?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          this.$q.loading.show();
          try {
            await this.$dbCon.authenticate();
            await this.deleteStoreServices(id);
            await this.$dbCon.service("store").remove(id);
            this.$q.dialog({
              title: "Success",
              message: "Store deleted successfully.",
              cancel: false,
              persistent: true
            });
          } catch (error) {
            console.log(error);
          } finally {
            this.$q.loading.hide();
          }
        });
    },

    deleteStoreServices: async function(id) {
      console.log(id);
      try {
        const services = [
          "store-fuel-delivery",
          "item-subscriptions",
          "gallery-subscription",
          "users",
          "store-advertisment",
          "store-schedule",
          "products"
        ];
        for (const service of services) {
          const items = await this.$dbCon
            .service(service)
            .find({ query: { store_id: id } });

          const deletePromises = items.data.map(item => {
            this.$dbCon.service(service).remove(item._id);
          });
          await Promise.all(deletePromises);
        }
        console.log(
          `Store and related services with id ${id} deleted successfully.`
        );
      } catch (error) {
        console.log(error);
      }
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
