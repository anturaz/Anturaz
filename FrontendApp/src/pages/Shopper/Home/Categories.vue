<template>
  <div class="q-pa-lg">
    <div v-if="$q.screen.lt.md" class="q-gutter-sm q-pb-sm">
      <q-input outlined dense placeholder="What are you looking for?" />
      <q-input outlined dense placeholder="Location" />
      <div align="right">
        <q-btn unelevated color="primary" label="Search" icon="search" />
      </div>
    </div>
    <q-card
      bordered
      square
      flat
      align="center"
      style="border:1px solid primary;background-color: rgb(255,255,255,0.7)"
    >
      <q-card-section>
        <b class="text-primary">CATEGORIES</b>
      </q-card-section>
      <q-card-section class="row">
        <!-- <q-btn :label unelevated :color="index%2==0?'primary': 'grey'"></q-btn> -->
        <q-list
          class="col-12 q-ma-sm rounded-borders"
          :class="index%2==0?'bg-primary': 'bg-grey'"
          bordered
          separator
          :style="!$q.screen.lt.md?'min-width:120px;max-width:120px;min-height:50px':''"
          v-for="(category,index) in data"
          v-if="index<9"
          :key="category._id"
        >
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                class="text-white"
                caption
                lines="2"
                align="center"
              >{{category.category_name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.$dbCon
      .service("categories")
      .find({})
      .then(results => {
        this.data = results.data;
      });
  }
};
</script>