<template>
  <div>
    <q-btn icon="remove_red_eye" @click="opened=true" color="primary" flat dense/>
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">View Featured Photo</div>
        </q-card-section>

        <q-separator/>
        <q-card-section>
          <b>Title:</b>
          {{featuredPhoto.title}}
          <br>
          <b>Caption:</b>
          {{featuredPhoto.caption}}
        </q-card-section>
        <q-separator/>
        <q-card-section style="max-height: 50vh" class="scroll">
          <img :src="featuredPhoto.path" width="100%">
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn @click="opened=false" label="close" color="grey" flat/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["featuredPhoto"],
  data() {
    return {
      opened: false
    };
  }
};
</script>

<style>
</style>
