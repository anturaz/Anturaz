<template>
  <div>
    <q-btn icon="remove_red_eye" size="sm" color="primary" flat @click="opened = true"/>
    <!-- <q-dialog v-model="opened">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-bold">{{announcement.title}}</div>
          <div class="text-h7">{{$formatDate(announcement.createdAt)}}</div>
        </q-card-section>
    <q-separator/>-->
    <q-dialog v-model="opened" persistent>
      <q-card style="width:400px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h5 text-bold">{{announcement.title}}</div>
          <div class="text-h7"><b>Date Created:</b> {{$formatDate(announcement.createdAt)}}</div>
          <div class="text-h7"><b>Posted Until:</b> {{$formatDate_DateOnly(announcement.until)}}</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 50vh;" class="scroll">
          <q-field outlined color="black" label="User" stack-label>{{announcement.user}}</q-field>
        </q-card-section>

        <q-card-section style="max-height: 50vh;" class="scroll">
          <q-field outlined color="black" label="Content" stack-label>{{announcement.content}}</q-field>
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
  props: ["announcement"],
  data() {
    return {
      opened: false
    };
  }
};
</script>

<style>
</style>
