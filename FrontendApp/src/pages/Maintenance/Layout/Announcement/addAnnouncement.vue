<template>
  <div>
    <q-btn
      icon="add"
      :size="$q.screen.lt.sm? 'md' : 'xl'"
      @click="opened=true"
      round
      color="primary"
    />
    <q-dialog v-model="opened" persistent>
      <q-card :style="$q.screen.lt.sm? '': 'min-width: 700px; max-width: 80vw;'">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Add New Announcement</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 60vh" class="scroll q-gutter-sm">
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white"/>
            </template>
            <ul>
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>
          <div :class="$q.screen.lt.sm? '': 'row'  ">
          <div class="col-6 items-center">
          <q-input v-model="title" label="Title"/>
          <q-select v-model="user" :options="['Store Owner','Shopper','All']" label="User"/>
          <q-input outlined v-model="content" type="textarea" label="Content"/>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="col-5 items-center">
            <p class="text-h7 text-grey-6">Posted Until:</p>
          <q-date v-model="until" :options="date => date >= $formatDateForPicker(new Date())" minimal/>
          </div>
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="Submit" @click="validate" color="primary"/>
          <q-btn flat label="Cancel" @click="close" color="grey"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      title: "",
      content: "",
      user: "All",
      until: this.$formatDateForPicker(new Date()),
      error: []
    };
  },
  methods: {
    validate: function() {
      this.error = [];
      if (this.title.trim() == "") {
        this.error.push("Title field is required.");
      }
      if (this.content.trim() == "") {
        this.error.push("Content field is required.");
      }
      if (this.error.length == 0) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Add this Announcement?",
            cancel: {
              push: true,
              color: "grey",
              flat: true
            }
          })
          .onOk(() => {
            this.submit();
          });
      }
    },
    submit: function() {
      this.$dbCon
        .service("announcements")
        .create({
          title: this.title,
          content: this.content,
          user: this.user,
          createdAt: new Date(),
          until: this.$formatDateFromPickerToDatabase(this.until),
        })
        .then(() => {
          this.close();
        });
    },
    close: function() {
      this.title = "";
      this.content = "";
      this.user = "All";
      this.until= this.$formatDateForPicker(new Date())
      this.opened = false;
    }
  }
};
</script>

<style>
</style>
