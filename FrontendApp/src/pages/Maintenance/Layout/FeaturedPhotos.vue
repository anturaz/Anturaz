<template>
    <div :style="$q.screen.lt.sm? 'min-width:100%' : ''">
      <br v-if="$q.screen.lt.sm">
      <q-table :data="data" :columns="columns" :filter="filter" row-key="name">
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="title" :props="props">{{props.row.title}}</q-td>
          <q-td key="caption" :props="props">{{props.row.caption}}</q-td>
          <q-td key="createdAt" :props="props">{{ $formatDate(props.row.createdAt) }}</q-td>
          <q-td key="actions" class="row" :props="props">
            <ViewFeaturedPhoto :featuredPhoto="props.row" class="col"/>
            <EditFeaturedPhoto :featuredPhoto="props.row"  class="col"/>
            <DeleteFeaturedPhoto :featuredPhoto="props.row"  class="col"/>
          </q-td>
        </q-tr>
      </q-table>
      <q-page-sticky position="bottom-right" :offset="[30, 30]" style="z-index:999">
      <AddFeaturedPhoto/>
    </q-page-sticky>
    </div>
    
</template>

<script>
import AddFeaturedPhoto from "./FeaturedPhotos/AddFeaturedPhoto.vue";
import ViewFeaturedPhoto from "./FeaturedPhotos/ViewFeaturedPhoto.vue";
import EditFeaturedPhoto from "./FeaturedPhotos/EditFeaturedPhoto.vue";
import DeleteFeaturedPhoto from "./FeaturedPhotos/DeleteFeaturedPhoto.vue";
export default {
  components: {
    AddFeaturedPhoto,
    ViewFeaturedPhoto,
    EditFeaturedPhoto,
    DeleteFeaturedPhoto
  },
  data() {
    return {
      filter: "",
      columns: [
        { name: "title", label: "Title", align: "center" },
        { name: "caption", label: "Caption", align: "center" },
        { name: "createdAt", label: "Created At", align: "center" },
        {
          name: "actions",
          label: "Actions",
          align: "center",
          style: "min-width:160px"
        }
      ],
      data: [],
      fileSelected: null
    };
  },
  methods: {
    getData: function() {
      this.$dbCon
        .service("featured-photos")
        .find({
          query: {
            $sort: { createdAt: -1 },
            $limit: 999999999999
          }
        })
        .then(result => {
          this.data = result.data;
        });
    }
  },
  mounted() {
    this.$dbCon.service("featured-photos").onDataChange(() => {
      this.getData();
    });
  }
};
</script>