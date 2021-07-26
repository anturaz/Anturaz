<template>
  <div>
    <q-btn dense flat color="primary" @click="opened=true" icon="remove_red_eye"/>
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">{{store.shop_name}}</div>
          <div class="text-h7 text-white">{{store.email}}</div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-field outlined color="black" label="Categories" stack-label>
            <template v-slot:control>
              <ol>
                <li v-for="(category,index) in store.categories" v-bind:key="index">{{category}}</li>
              </ol>
            </template>
          </q-field>
          <br>
          <q-field outlined color="black" label="Market Areas" stack-label>
            <template v-slot:control>
              <ol>
                <li
                  v-for="(market_area,index) in store.market_areas"
                  v-bind:key="index"
                >{{market_area}}</li>
              </ol>
            </template>
          </q-field>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["store"],
  data() {
    return {
      opened: false
    };
  }
};
</script>
