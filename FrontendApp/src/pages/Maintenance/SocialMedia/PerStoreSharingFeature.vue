<template>
  <div>
    <q-table
      :dense="$q.screen.lt.md"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
    >
      <template v-if="selected.length!=0" v-slot:top-left>
        <q-btn
          label="Enable"
          @click="enable_selected"
          color="primary"
          :disable="selected.length==0"
        />&nbsp;
        <q-btn
          label="Disable"
          @click="disable_selected"
          :disable="selected.length==0"
          color="grey"
          outline
        />
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="check_box" :props="props">
          <q-checkbox
            :value="selected.includes(props.row._id)"
            @click.native="selection(props.row._id)"
          />
        </q-td>
        <q-td key="shop_name" :props="props">{{props.row.shop_name}}</q-td>
        <q-td key="email" :props="props">{{props.row.email}}</q-td>

        <q-td key="categories_market_areas" :props="props">
          <ViewStore :store="props.row"/>
        </q-td>
        <q-td key="sharing_feature" :props="props">
          <q-toggle
            :value="props.row.sharing_feature"
            @click.native="changeSharingFeature(props.row)"
            color="primary"
          />
          <font color="grey">{{(props.row.sharing_feature+"").toUpperCase()}}</font>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import ViewStore from "./ViewStore.vue";
export default {
  components: {
    ViewStore
  },
  data() {
    return {
      selected: [],
      filter: "",
      columns: [
        { name: "check_box", label: "", align: "center" },
        {
          name: "shop_name",
          label: "Store Name",
          field: "shop_name",
          align: "center"
        },
        { name: "email", label: "Email", field: "email", align: "center" },
        {
          name: "categories_market_areas",
          label: "Categories/Market Areas",
          align: "center"
        },

        {
          name: "sharing_feature",
          label: "Sharing Feature",
          field: "sharing_feature",
          align: "center"
        }
      ],
      data: []
    };
  },
  methods: {
    selection: function(x) {
      if (!this.selected.includes(x)) {
        this.selected.push(x);
      } else {
        var index = this.selected.findIndex(function(element) {
          return element == x;
        });
        this.selected.splice(index, 1);
      }
    },
    enable_selected: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you want to Enable all selected?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.selected.forEach(id =>{
            this.$dbCon.service("shop").patch(id,{sharing_feature: true})
            this.selected=[]
          })
        });
    },
    disable_selected: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you want to Disable all selected?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.selected.forEach(id =>{
            this.$dbCon.service("shop").patch(id,{sharing_feature: false})
            this.selected=[]
          })
        });
    },
    getData: function() {
      this.$dbCon
        .service("shop")
        .find({})
        .then(result => {
          this.data = result.data;
        });
    },
    changeSharingFeature: function(x) {
      this.$q
        .dialog({
          title: "Confirm",
          message:
            "Would you like to enable/disable this Store's Sharing Feature?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          let updated = _.cloneDeep(x);
          updated.sharing_feature =
            updated.sharing_feature == true ? false : true;
          this.$dbCon.service("shop").update(x._id, updated);
        });
    }
  },
  mounted() {
    this.$dbCon.service("shop").onDataChange(() => {
      this.getData();
    });
  }
};
</script>