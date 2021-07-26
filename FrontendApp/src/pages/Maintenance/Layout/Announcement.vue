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
        <q-td key="created_at" :props="props">{{ $formatDate(props.row.createdAt)}}</q-td>
        <q-td key="until" :props="props">{{ $formatDate_DateOnly(props.row.until)}}</q-td>
        <q-td key="content" :props="props">{{props.row.content}}</q-td>
        <q-td key="user" :props="props">{{props.row.user}}</q-td>
        <q-td key="actions" class="flex item-center" :props="props">
          <ViewAnnouncement v-if="!$q.screen.lt.lg" class="col" :announcement="props.row"/>
          <EditAnnouncement v-if="!$q.screen.lt.lg" class="col" :announcement="props.row"/>
          <DeleteAnnouncement v-if="!$q.screen.lt.lg"  class="col" :announcement="props.row"/>
          <q-btn icon="more_vert" v-if="$q.screen.lt.lg" flat round size="sm" color="grey-7">
            <q-menu>
              <q-list>
                <q-item>
                  <q-item-section><ViewAnnouncement class="col" :announcement="props.row"/></q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section><EditAnnouncement class="col" :announcement="props.row"/></q-item-section>
                </q-item>
                <q-separator/>
                <q-item >
                  <q-item-section><DeleteAnnouncement class="col" :announcement="props.row"/></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </q-tr>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[30, 30]" style="z-index:999">
      <AddAnnouncement/>
    </q-page-sticky>
  </div>
</template>

<script>
import AddAnnouncement from "./Announcement/addAnnouncement.vue";
import ViewAnnouncement from "./Announcement/viewAnnouncement.vue";
import EditAnnouncement from "./Announcement/editAnnouncement.vue";
import DeleteAnnouncement from "./Announcement/deleteAnnouncement.vue";
import { date } from "quasar";
export default {
  components: {
    AddAnnouncement,
    ViewAnnouncement,
    EditAnnouncement,
    DeleteAnnouncement
  },
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "title",
          label: "Title",
          field: "title",
          align: "center",
          style: "width:20%"
        },
        {
          name: "created_at",
          label: "Created At",
          field: "created_at",
          align: "center",
          style: "width:10%"
        },
        {
          name: "until",
          label: "Posted Until",
          field: "until",
          align: "center",
          style: "width:10%"
        },
        {
          name: "content",
          label: "Content",
          field: "content",
          align: "center"
        },
        { name: "user", label: "User", field: "user", align: "center" },
        {
          name: "actions",
          label: "Actions",
          align: "center",
          style: "width:200px"
        }
      ],
      data: []
    };
  },
  methods: {
    getData: function() {
      this.$dbCon
        .service("announcements")
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
    this.$dbCon.service("announcements").onDataChange(() => {
      this.getData();
    });
  }
};
</script>