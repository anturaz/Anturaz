<template>
    <div>
        <div class="q-pa-md ">
            <q-breadcrumbs>
              <q-breadcrumbs-el icon="home" to="/Admin" />
              <q-breadcrumbs-el label="Maintenance" icon="widgets" />
              <q-breadcrumbs-el label="Social Media" icon="share"  />
            </q-breadcrumbs>
        </div>

        <div class="q-pa-md" >
            <q-list bordered separator class="bg-white">
                <q-item clickable v-ripple>
                    <q-item-section>General Sharing Feature</q-item-section>
                    <q-item-section side>
                      <q-toggle
                        @click.native="changeGeneralSharingFeature()"
                        :value="general_sharing_feature"
                        color="primary"
                        />
                    </q-item-section>
                </q-item>
            </q-list><br>
            <PerStoreSharingFeature v-if="general_sharing_feature==true" />
        </div>
 
    </div>
</template>
<script>
import PerStoreSharingFeature from './PerStoreSharingFeature.vue'
export default {
    components:{
        PerStoreSharingFeature
    },
    data(){
        return{
            general_sharing_feature: null,
            id: null
        }
    },
    methods:{
        "getData": function(){
            this.$dbCon.service("social-media-management").find({}).then(result=>{
                this.general_sharing_feature=result.data[0].general_sharing_feature
                this.id=result.data[0]._id
            })
        },
        "changeGeneralSharingFeature": function(){
             this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to enable/disable the Sharing Feature?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
            this.$dbCon.service("social-media-management").update(this.id,
            {general_sharing_feature:( this.general_sharing_feature==true? false: true)})
        })
        }
    },
    mounted(){
        this.$dbCon.service("social-media-management").onDataChange(()=>{
            this.getData()
        })
    }
    
}
</script>
