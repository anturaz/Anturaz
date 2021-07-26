<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin"/>
        <q-breadcrumbs-el label="Maintenance" icon="widgets"/>
        <q-breadcrumbs-el label="System User" icon="people"/>
      </q-breadcrumbs>
    </div>
    <q-page-sticky position="bottom-right" :offset="[30, 30]" style="z-index:999">
      <AddSystemUser/>
    </q-page-sticky>
    <div class>
      <q-table :data="data" :columns="columns" :filter="filter" row-key="name">
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="name" :props="props">{{props.row.fname+" "+props.row.lname}}</q-td>
          <q-td key="email" :props="props">{{props.row.email}}</q-td>
       
          <q-td key="position" :props="props">{{props.row.position}}</q-td>
          <q-td key="user_classification" :props="props">{{props.row.user_classification}}</q-td>
          <q-td key="status" :props="props">{{props.row.status}}</q-td>
          <q-td key="actions" :props="props" class="row items-center">
            <ViewSystemUser class="col" :systemUser="props.row"/>
            <EditSystemUser class="col" :systemUser="props.row"/>
            <DeleteSystemUser class="col" :systemUser="props.row" />
            <Others class="col" v-if="props.row.status=='Pending'" :userId="props.row._id"/>
          </q-td>
        </q-tr>
      </q-table>
    </div>
  </div>
</template>

<script>
import AddSystemUser from "./addSystemUser.vue";
import ViewSystemUser from "./viewSystemUser.vue";
import EditSystemUser from "./editSystemUser.vue";
import DeleteSystemUser from "./deleteSystemUser.vue";
import Others from "./Others.vue";
export default {
  components: {
    AddSystemUser,
    ViewSystemUser,
    EditSystemUser,
    DeleteSystemUser,
    Others
  },
  data() {
    return {
      filter: "",
      data: [],
      columns: [
        { name: "name", label: "Name", field: "name", align: "center" },
        { name: "email", label: "Email", field: "email", align: "center" },
   
        {
          name: "position",
          label: "Position",
          field: "position",
          align: "center"
        },
        {
          name: "user_classification",
          label: "User Classification",
          field: "user_classification",
          align: "center"
        },
        { name: "status", label: "Status", field: "status", align: "center" },
        { name: "actions", label: "Actions", field: "actions", align: "center" }
      ]
    };
  },
  methods: {
    getData: function() {
      this.$dbCon
        .service("users")
        .find({query:{
          system_user_type: "Admin"
        }})
        .then(result => {
          this.data = result.data;
        });
    }
  },
  mounted() {
    this.$dbCon.services.users.onDataChange(() => {
      this.getData();
    });
  }
};
</script>
