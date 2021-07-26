<template>
  <div>
    <q-btn icon="edit" color="primary" @click="opened=true" flat dense/>
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">Edit Featured Photo Details</div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white"/>
            </template>
            <ul>
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>
          <q-input v-model="data.title" label="Title"/>
          <q-input v-model="data.caption" label="Caption"/>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn label="Close" @click="close" color="grey" flat/>
          <q-btn label="Submit" @click="validate" color="primary"/>
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
      opened: false,
      data: {},
      error: []
    };
  },
  methods: {
    validate: function() {
      this.error = [];
      if (this.data.title.trim() == "") {
        this.error.push("Title field is required.");
      }
      if (this.data.caption.trim() == "") {
        this.error.push("Caption field is required.");
      }
      if (this.error.length == 0) {
        this.submit();
      }
    },
    submit: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to update this Featured Photo Details?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon
            .service("featured-photos")
            .update(this.data._id, this.data)
            .then(() => {
                this.opened=false
              this.$q.dialog({
                title: "Success!",
                message: "Featured Photo details updated.",
                cancel: {
                  push: true,
                  color: "grey",
                  flat: true
                }
              });
            });
        });
    },
    close: function(){
      this.data= _.cloneDeep(this.featuredPhoto)
      this.opened=false
    }
  },
  mounted() {
    this.data = _.cloneDeep(this.featuredPhoto);
  }
};
</script>

<style>
</style>
