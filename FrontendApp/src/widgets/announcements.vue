<template>
  <div class="column">
    <q-card class="col" flat :bordered="!$q.screen.lt.md"  :style="
            $q.screen.lt.md
              ? 'border-top:solid orange 1px'
              : 'border: solid orange 1px'
          ">
      <q-card-section>
        <div class="row justify-between text-grey" v-if="!$q.screen.lt.md">
          <div class="text-title ">Announcements</div>
          <q-icon name="fas fa-bullhorn"  />
        </div>
        <q-separator class="q-mt-md" v-if="!$q.screen.lt.md" />
        <q-list v-for="announcement in data" :key="announcement._id">
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-bold">{{announcement.title}}</q-item-label>
              <q-item-label caption class="text-primary">
                {{$formatDate_DateOnly(announcement.createdAt)}}
              </q-item-label>
              <q-item-label caption lines="2">{{announcement.content}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["fromTypeUser"],
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.$dbCon
      .service("announcements")
      .find({
        query: {
          user: {
            $in: ["All", this.fromTypeUser],
          },
        },
      })
      .then((results) => {
        this.data = results.data;
      });
  },
};
</script>

<style>
</style>