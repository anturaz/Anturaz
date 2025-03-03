<template>
  <div>
    <q-breadcrumbs class="text-grey">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Users" icon="people" />
    </q-breadcrumbs>
    <br />
    <q-table
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
      flat
      bordered
    >
      <template v-slot:top-right>
        <AddUser class="q-pr-md" />
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
        <q-td key="position" :props="props">{{ props.row.position }}</q-td>
        <q-td key="email" :props="props">{{ props.row.email }}</q-td>
        <q-td key="user_type" :props="props">{{
          props.row.store_account_type
        }}</q-td>

        <q-td key="verified" :props="props">
          <div v-if="props.row.store_account_type == 'Owner'">
            <q-badge color="primary">Owner</q-badge>
          </div>
          <div v-else>
            <q-badge v-if="props.row.verified" color="green">
              Verified
            </q-badge>
            <q-badge v-else color="red">
              Not Verified
            </q-badge>
          </div>
        </q-td>

        <q-td key="access" :props="props">
          <!-- {{ props.row.hasOwnProperty("expiration") }} -->
          <div v-if="props.row.hasOwnProperty('subscriptions')">
            <ActivateUser
              v-if="new Date() > new Date(props.row.subscriptions.date_end)"
              :data="props.row"
            />
            <q-toggle
              :value="props.row.access"
              v-if="new Date(props.row.subscriptions.date_end) > new Date()"
              @click.native="
                !ifVerified(props.row.verified) &&
                  changeAccess(props.row._id, props.row.access)
              "
              :disable="ifVerified(props.row.verified)"
              :color="ifVerified(props.row.verified) ? 'grey' : 'primary'"
            />
          </div>
          <div v-else>
            <ActivateUser
              v-if="props.row.store_account_type != 'Owner'"
              :disabled="ifVerified(props.row.verified)"
              :data="props.row"
              :color="ifVerified(props.row.verified) ? 'grey' : 'primary'"
            />
          </div>

          <!-- <q-toggle
            :value="props.row.access"
            v-if="props.row.user_type != 'Owner' && props.row.verified == true"
            @click.native="changeAccess(props.row._id, props.row.access)"
            color="primary"
          /> -->
          <!-- <ActivateUser
            v-if="props.row.user_type != 'Owner' && props.row.verified != true"
            :data="props.row"
          /> -->
        </q-td>
        <q-td key="actions" :props="props">
          <div class="row">
            <ViewUser :data="props.row" class="col-4" />
            <EditUser :data="props.row" class="col-4" />
            <q-btn flat icon="delete" color="primary" class="col-4" />
          </div>
        </q-td>
      </q-tr>
    </q-table>
    <q-page-sticky
      position="bottom-right"
      :offset="[30, 30]"
      style="z-index:999"
    ></q-page-sticky>
  </div>
</template>

<script>
import AddUser from "./Users/addUser.vue";
import ViewUser from "./Users/viewUser.vue";
import EditUser from "./Users/editUser.vue";
import ActivateUser from "./Users/activateUser.vue";
export default {
  components: {
    AddUser,
    ViewUser,
    EditUser,
    ActivateUser
  },
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "center"
        },
        {
          name: "position",
          label: "Position",
          field: "position",
          align: "center"
        },
        {
          name: "email",
          label: "Email Address",
          field: "email",
          align: "center"
        },
        {
          name: "user_type",
          label: "User Type",
          field: "user_type",
          align: "center"
        },

        {
          name: "verified",
          label: "Verified",
          align: "center",
          field: "verified"
        },
        {
          name: "access",
          label: "Access",
          align: "center"
        },

        {
          name: "actions",
          label: "Actions",
          align: "center"
        }
      ],
      data: []
    };
  },
  methods: {
    ifVerified: function(verified) {
      if (!verified) {
        return true;
      } else {
        return false;
      }
    },
    getData: function() {
      this.$dbCon
        .service("users")
        .find({
          query: {
            store_id: this.$local.getItem("store_token")
          }
        })
        .then(results => {
          this.data = results.data;
          this.$forceUpdate();
        });
    },
    changeAccess: function(user_id, current_access) {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you want to change the access of this user?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon.service("users").patch(user_id, {
            access: !current_access
          });
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

<style></style>
