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
      style="border-radius: 25px; background-color: transparent;border-color: #d8a957;"
    >
      <q-card-section>
        <b class="text-subtitle1">CATEGORIES</b>
         <q-separator color="primary"/>
      </q-card-section>
      <q-card-section class="row">
        <!-- <q-btn :label unelevated :color="index%2==0?'primary': 'grey'"></q-btn> -->
        <div class="row justify-center">
        <q-list

          class="col-12 q-ma-sm rounded-borders items-center"
          :class="index==1 || index == 4 || index == 7?'bg-white text-primary': 'bg-primary text-white'"
          bordered
          separator
          :style="!$q.screen.lt.md?'min-width:100px;max-width:10px;min-height:70px;border-radius: 15px':''"
          v-for="(category,index) in data"
          v-if="index<8"
          :key="category._id"
        >
          <q-item  clickable v-if="index != 7"  >
            <q-item-section>
            <q-item-label><q-icon name="format_size" size="25px" /></q-item-label>
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
          <q-item
                
                align="center" clickable v-else>
                
              SEE ALL
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