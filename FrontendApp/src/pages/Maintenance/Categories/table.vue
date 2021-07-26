<template>
  <div>
    <div class="q-pa-md">
      <q-table :data="data" :columns="columns" :filter="filter" row-key="name">
        <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="category_name" :props="props">{{props.row.category_name}}</q-td>
          <q-td key="classification" :props="props">{{props.row.classification}}</q-td>
          <q-td key="subcategories" :props="props">{{props.row.subcategories.length}}</q-td>
          <q-td key="payment_options" :props="props">{{props.row.payment_options.length}}</q-td>
          <q-td key="status" :props="props">{{props.row.status}}</q-td>
          <q-td class="row item-center" key="actions" :props="props">
            <ViewCategory class="col" :category="props.row"/>
            <EditCategory class="col" :category="props.row"/>
            <OtherActions class="col" :category="props.row"/>
          </q-td>
        </q-tr>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[30, 30]" style="z-index:999">
      <AddCategory/>
    </q-page-sticky>
  </div>
</template>

<script>
import AddCategory from "./addCategory";
import ViewCategory from "./viewCategory.vue";
import EditCategory from "./editCategory.vue";
import OtherActions from "./otherActions.vue";
export default {
  components: {
    AddCategory,
    ViewCategory,
    EditCategory,
    OtherActions
  },
  data() {
    return {
      categories: [],
      filter: "",
      columns: [
        {
          name: "category_name",
          label: "Category Name",
          field: "category_name",
          align: "left"
        },
        {
          name: "classification",
          label: "Classification",
          field: "classification",
          align: "center"
        },
        {
          name: "subcategories",
          label: "Subcategories",
          field: "subcategories",
          align: "center"
        },
        {
          name: "payment_options",
          label: "Payment Options",
          field: "payment_options",
          align: "center"
        },
        { name: "status", label: "Status", field: "status", align: "center" },
        { name: "actions", label: "Actions", field: "actions", align: "center" }
      ],
      data: []
    };
  },
  methods: {
    getData: function() {
      this.$q.loading.show();
      this.$dbCon.services.categories.find({
        query: {
            $sort: { createdAt: -1 },
            $limit: 999999999999
          }
      }).then(result => {
        this.data = result.data;
        this.categories = result.data;
        this.$q.loading.hide();
      });
    }
  },
  mounted() {
    this.getData();
    this.$dbCon.service("categories").onDataChange(() => {
      this.getData();
    });
  }
};
</script>

