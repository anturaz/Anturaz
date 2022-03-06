<template>
  <div class="q-pa-sm">
    <div v-if="$q.screen.lt.md" class="q-gutter-sm q-pb-sm">
      <q-input outlined dense placeholder="What are you looking for?" />
      <q-input outlined dense placeholder="Location" />
      <div align="right">
        <q-btn unelevated color="primary" label="Search" icon="search" />
      </div>
    </div>

    
    <q-card
      bordered
      flat
      
      align="center"
      style="border-radius: 20px; background-color: transparent;border-color: #d8a957;"
    >
      <q-card-section style="position: relative; padding-top: 8px; padding-bottom: 8px; padding-left: 0px;padding-right: 0px;">
        <p class="text-subtitle1">CATEGORIES</p>
        <q-separator color="primary"/>
      </q-card-section>
      <q-card-section class="row">
        <!-- <q-btn :label unelevated :color="index%2==0?'primary': 'grey'"></q-btn> -->
        <div class="row justify-center">
        <q-list

          class="q-ma-sm rounded-borders items-center"
          :class="index==1 || index == 4 || index == 7?'bg-white text-primary': 'bg-primary text-white'"
          bordered
          separator
          :style="!$q.screen.lt.md?'min-width:100px;max-width:10px;min-height:40px;border-radius: 15px':''"
          v-for="(category,index) in data"
          v-if="index<8"
          :key="category._id"
        >
          <q-item  clickable v-if="index != 7"  >
            <q-item-section>
              <!-- <i class="far fa-map-marker-alt"></i> -->
            <q-item-label>
              <q-icon v-if="index == 0" name="fas fa-female" size="25px" />
              <q-icon v-if="index == 1" name="fas fa-ring" size="25px" />
              <q-icon v-if="index == 2" name="fas fa-user-tie" size="25px" />
              <q-icon v-if="index == 3" name="fas fa-crown" size="25px" />
              <q-icon v-if="index == 4" name="fas fa-gift" size="25px" />
              <q-icon v-if="index == 5" name="fas fa-map-marker-alt" size="25px" />
              <q-icon v-if="index == 6" name="fas fa-video" size="25px" />
            </q-item-label>
            <q-item-label
                :class="index==1 || index == 4 || index == 7?'bg-white text-primary': 'bg-primary text-white'"
                caption
                align="center"
                
              >{{category.category_name}}</q-item-label>
          </q-item-section>
            <!-- <q-item-section avatar>
              <q-item-label>
                <q-icon name="format_size" />
              </q-item-label>
              
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="text-white"
                caption
                lines="2"
                align="center"
              >{{category.category_name}}</q-item-label>
            </q-item-section> -->
          </q-item>
          <q-item clickable v-else>
              <q-item-section>
                <q-item-label>
                  SEE ALL
                </q-item-label>
              </q-item-section>
            <!-- <q-item-section avatar>
              <q-item-label>
                <q-icon name="format_size" />
              </q-item-label>
              
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="text-white"
                caption
                lines="2"
                align="center"
              >{{category.category_name}}</q-item-label>
            </q-item-section> -->
          </q-item>
        </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      logos: {
        "Sound System": "s"
      }
    };
  },
  mounted() {
    this.$dbCon
      .service("categories")
      .find({})
      .then(results => {
        this.data = results.data;
        console.log("this",this.data)
      });
  }
};
</script>
<style scoped>
</style>