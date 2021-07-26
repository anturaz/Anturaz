<template>
  <div>
    <q-btn
      class="q-pb-md"
      icon="history"
      @click="opened=true"
      label="view payment schedules"
      flat
      color="black"
      size="md"
    />
    <q-dialog v-model="opened">
      <q-card style="width:600px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div>Payment Schedules</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <q-list bordered separator>
            <q-item v-for="sched in schedules" :key="sched">
              <q-item-section>
                <q-item-label class="text-bold">Schedule: {{$formatDate_DateOnly(sched.schedule)}}</q-item-label>
                <q-item-label caption>Amount: {{$prettyMoney(sched.amount)}}</q-item-label>
                <q-item-label caption class>Status: <span :class="sched.status=='Pending'? 'text-grey': 'text-green'">{{sched.status=='Pending'?'Pending':'Paid'}}</span></q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" @click="opened=false" color="grey" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    schedules: Object
  },
  data() {
    return {
      opened: false
    };
  }
};
</script>

<style>
</style>