<template>
    <div>
    <q-btn color="grey-7" round flat size="sm" icon="more_vert">
               <q-menu cover auto-close>
                  <q-list>
                     <q-item clickable @click="confirm_status=true">
                        <q-item-section>Set as {{category.status=="Active"? "Inactive": "Active"}}</q-item-section>
                     </q-item>
                     <q-item clickable @click="confirm_delete=true">
                        <q-item-section>Delete Permanently</q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
            </q-btn>
            <!-- DIALOGS AND CONFIRMATION -->
      <q-dialog v-model="confirm_status">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Set this Category as {{category.status=="Active"? "Inactive": "Active"}}? </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="YES" @click="setStatus" color="primary"  v-close-popup />
          <q-btn flat label="NO" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm_delete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red" text-color="white" />
          <span class="q-ml-sm">Delete this Category permanently? </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="YES" @click="deleteCategory" color="red"  v-close-popup />
          <q-btn flat label="NO" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
<q-dialog v-model="success_delete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="green" text-color="white" />
          <span class="q-ml-sm">Successfully Deleted! </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OKAY" color="green"  v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
        </div>
</template>

<script>
export default {
    props:['category'],
    data(){
        return{
            confirm_status: false,
            confirm_delete: false,
            success_delete: false,
        }
    },
    methods:{
        setStatus: function(){
            
            this.category.status=="Active"? this.category.status="Inactive": this.category.status="Active"
            this.$dbCon.services.categories.update(this.category['_id'],this.category)

        },
        deleteCategory: function(){
            
            this.$dbCon.services.categories.remove(this.category['_id']).then(()=>{
               this.success_delete=true
            })
            
        }
    }
}
</script>
