<template>
    <div>
        <q-btn color="primary" flat dense size="sm" icon="remove_red_eye" @click="opened=true" />
         <q-dialog v-model="opened" persistent transition-show="scale" transition-hide="scale">
         <q-card flat class="bg-primary text-white" style="width: 700px; max-width: 80vw;">
            <q-card-section>
               <div class="row">
                <div class="text-h6 col-11">View System User </div>
                <div class="col-1"> <q-btn flat icon="close" @click="opened = false" size="xs" /></div>
               </div>
            </q-card-section>
            <q-card-section class="bg-white text-black">
                <div class="q-pa-md">

                    <b>Name: </b>{{user.fname+" "+user.lname}}<br>
                    <b>Position: </b>{{user.position}}<br>
                    <b>Email: </b>{{user.email}}<br>
                    <b>User Classification: </b>{{user.user_classification}}<br><br>
                    <q-field outlined label="Permissions" color="black" stack-label>
                        <template v-slot:control>
                            <ol>
                                <li v-for="(permission,index) in user.permissions" v-bind:key="index">{{permission}}</li>
                            </ol>
                       </template>
                    </q-field><br>
                    <div align="right">
                    <q-btn  color="primary" outline label="close" @click="opened=false" />
                    </div>
                </div>
            </q-card-section>
         </q-card>
         </q-dialog>
    </div>
</template>

<script>
export default {
    props: ['systemUser'],
    data(){
        return{
            opened: false,
            user: {}
        }
    },
    mounted(){
        this.user=_.cloneDeep(this.systemUser)
    }
}
</script>

