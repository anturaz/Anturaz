<template>
  <div class="q-pa-md">CONTACT{{contacts}}</div>
</template>

<script>
export default {
  data() {
    return {
      contacts: ""
    };
  },
  async mounted() {
    try{
    if (Notification.permission == "granted") {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: "Here is a notification body!",
          icon: "images/example.png",
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification("Hello world!", options);
      });
    }
    }catch(e){
      alert(e)
    }
  }
};
</script>