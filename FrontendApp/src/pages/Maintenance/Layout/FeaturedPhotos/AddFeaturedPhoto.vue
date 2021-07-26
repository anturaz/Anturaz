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
      <q-card style="min-width: 700px; max-width: 80vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Add New Featured Photo</div>
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
          <q-input v-model="title" label="Title"/>
          <q-input v-model="caption" label="Caption"/>
          <br>
          <p class>
            <span class="text-grey-7">Featured Photo:</span>
            <input type="file" @change="onImageSelected" file="png">
          </p>
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
      caption: "",
      fileSelected: "",
      error: []
    };
  },
  methods: {
    validate: function() {
        this.error=[]
        if(this.title.trim()==""){
            this.error.push("Title field is required.")
        }
        if(this.caption.trim()==""){
            this.error.push("Caption field is required.")
        }
        if(!this.fileSelected ){
            this.error.push("Featured Photo field is required.")
        }
        if(this.error.length==0){
           this.$q.dialog({
        title: 'Confirmation',
        message: 'Do you want to add this Featured Photo?s',
cancel: {
            push: true,
            color: "grey",
            flat: true
          }
      })  .onOk(() => { 

           this.submit()
           })
        }
    },
    submit:  function(){
        const formData = new FormData();
      formData.append(this.$appLink, this.fileSelected, this.fileSelected.name);

    this.$axios
        .post(this.$appLink + "/addFeaturedPhotos", formData)
        .then(result => {
            console.log(result)
            result.data.title=this.title
            result.data.caption=this.caption
            result.data.createdAt=new Date()
            this.$dbCon.service("featured-photos").update(result.data._id,result.data).then(()=>{
            this.$q
              .dialog({
                title: "Success!",
                message: "Featured Photo Added",
               persistent: true
              })
              .onOk(() => {
                  this.close()
                //  this.$router.go(this.$router.currentRoute);
              });
            })
          })
    
    },
    onImageSelected: function(event) {
      this.fileSelected = event.target.files[0];
    },
    close: function(){
        this.opened=false
        this.title=""
        this.caption=""
        this.fileSelected=""
    }
  },
  mounted(){
 
  }
};
</script>

<style>
</style>
