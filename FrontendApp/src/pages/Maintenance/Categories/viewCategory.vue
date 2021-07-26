<template>
    <div>
      <q-btn icon="remove_red_eye" color="primary" size="sm" round flat @click="opened = true" />
      <q-dialog v-model="opened" persistent transition-show="scale" transition-hide="scale">
         <q-card flat class="bg-primary text-white" style="width: 700px; max-width: 80vw;">
            <q-card-section>
               <div class="row">
                <div class="text-h6 col-11">View Category </div>
                <div class="col-1"> <q-btn flat icon="close" @click="opened = false" size="xs" /></div>
               </div>
            </q-card-section>
            <q-card-section class="bg-white text-black">
                <div class="q-pa-md">
                    <div class="row">
                        <div class="col-11">
                            <b>Category Name:</b> {{category.category_name}} 
                        </div>
                        <div class="col-1">
                            <EditCategory :category="category"/>
                        </div>
                    </div>
       
                    <b>Classification:</b> {{category.classification}} <br>
                    <b>Status:</b> {{category.status}} <br>
                    <br>
                    <q-field outlined label="Payment Options" color="black" stack-label>
                        <template v-slot:control>
                            <q-chip icon="brightness_1" v-for="(payment_option, index) in category.payment_options" v-bind:key="index">{{payment_option}}</q-chip>
                       </template>
                    </q-field>
                    <br>
                    <q-field outlined label="Subcategories" color="black" stack-label>
                        <template v-slot:control>
                            <ol>
                                <li v-for="(subcategory,index) in category.subcategories" v-bind:key="index">{{subcategory}}</li>
                            </ol>
                       </template>
                    </q-field>
                </div>
                <br>
                <div align="right">
                    <q-btn label="close" outline color="primary" @click="opened = false"  />
                </div>
            </q-card-section>
          
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
import EditCategory from './editCategory'
export default {
    props: ['category'],
    components: {
        EditCategory
    },
    data(){
        return{
            opened: false
        }
    }
}
</script>
