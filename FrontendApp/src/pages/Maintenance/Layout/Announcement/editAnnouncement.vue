<template>
  <div>
    <q-btn icon="edit" size="sm" color="primary" flat @click="opened=true"/>
    <q-dialog v-model="opened" persistent>
      <q-card :style="$q.screen.lt.sm?'':'min-width: 700px; max-width: 80vw;'">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Edit Announcement</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 50vh" class="scroll q-gutter-sm">
           <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white"/>
            </template>
            <ul>
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>
          <div :class="$q.screen.lt.sm?'':'row'">
          <div class="col-6 items-center">
          <q-input v-model="updated.title" label="Title"/>
          <q-select v-model="updated.user" :options="['Store Owner','Shopper','All']" label="User"/>
          <br>
          <q-input outlined v-model="updated.content" type="textarea" label="Content"/>
          
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="col-5 items-center ">
            <p class="text-h7 text-grey-6">Posted Until:</p>
          <q-date v-model="updated_until" :options="date => date >= $formatDateForPicker(new Date())" minimal/>
          </div>
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="Save" @click="validate" color="primary"/>
          <q-btn flat label="Cancel" @click="close" color="grey"/>
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
      opened: false,
      updated: _.cloneDeep(this.announcement),
      updated_until: this.$formatDateForPicker(this.announcement.until),
      error: []
    }
  },
  methods:{
    validate: function(){
       this.error = [];
      if (this.updated.title.trim() == "") {
        this.error.push("Title field is required.");
      }
      if (this.updated.content.trim() == "") {
        this.error.push("Content field is required.");
      }
      if (this.error.length == 0) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Update this Announcement?",
            cancel: {
              push: true,
              color: "grey",
              flat: true
            }
          })
          .onOk(() => {
            this.save();
          });
      }
    },
    save: function(){
      this.updated.until=this.updated_until
      this.$dbCon.service("announcements").update(this.updated._id, this.updated)
      this.opened=false
    },
    close: function(){
      this.updated= _.cloneDeep(this.announcement)
      this.opened=false
    },
    
  },
    beforeMount(){

        console.log(this.updated_until)
    }
};
</script>
 