<template>
  <div class="row justify-center">
    <q-list class="col-md-6 col-xs-12 q-ma-lg" bordered>
      <q-item>
        <q-item-section>Delivery Services Management</q-item-section>
        <q-item-section side>
          <q-checkbox :value="true" readonly />
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>Gift Wrapping Services Management</q-item-section>
        <q-item-section side>
         <q-checkbox :value="true" readonly />
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>Transpo/Fuel Subsidy Management</q-item-section>
        <q-item-section side>
          <q-checkbox :value="true" readonly />
        </q-item-section>
      </q-item>
        <q-separator />
       <q-item>
        <q-item-section>Booking Management System</q-item-section>
        <q-item-section side>
          <q-checkbox :value="true" readonly />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      class="col-md-6 col-xs-12 q-ml-lg q-mr-lg text-justify text-grey"
    >The features above have been activated and charges are initially set as FREE. You can modify or customize these charges later at your store's dashboard.</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      delivery: true,
      giftwrapping: true,
      transpo_fuel: true
    }
  }
};
</script>

<style>
</style>