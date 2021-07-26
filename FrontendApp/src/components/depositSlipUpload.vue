<template>
  <div>
    <q-btn color="primary" label="Upload Bank Receipt" @click="opened=true" />
    <q-dialog v-model="opened">
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">Upload Deposit Slip</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <input class="hidden" type="file" @change="onImageSelected" ref="fileupload" />
          <div style="pointer:cursor">
            <q-img
              @click="$refs.fileupload.click()"
              :src="photoUrl"
              style="width:100%; border: 1px solid grey"
              :ratio="16/9"
            />
          </div>
          <q-input outlined class="q-pt-sm" v-model="reference_number" label="Reference Number" />
          <q-input
            outlined
            class="q-pt-sm"
            v-model="total_amount"
            type="number"
            label="Total Amount"
          />
          <q-input
            outlined
            class="q-pt-sm"
            @click="() => $refs.qDateProxy.show()"
            v-model="date_deposited"
            label="Date Deposited"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="startDate" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_deposited" @input="() => $refs.startDate.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input outlined v-model="remarks" label="Remarks" type="textarea" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="SUBMIT" color="primary" @click="validate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    submitFunction: { type: Function }
  },
  data() {
    return {
      opened: false,
      remarks: "",
      photoUrl: this.$appLink + "/statics/AddImage.png",
      fileSelected: {},
      reference_number: "",
      total_amount: "",
      date_deposited: "",
      data: {}
    };
  },
  methods: {
    onImageSelected: function(event) {
      this.fileSelected = {};
      try {
        this.fileSelected = event.target.files[0];
        this.photoUrl = URL.createObjectURL(event.target.files[0]);
      } catch (e) {
        this.photoUrl = this.$appLink + "/img/AddImage.png";
      }
      this.$forceUpdate();
    },
    validate: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.submit();
        });
    },
    submit: async function() {
      var photo = await this.$uploadFile(this.fileSelected);
      this.submitFunction(
        photo,
        this.remarks,
        this.reference_number,
        this.total_amount,
        this.date_deposited
      );
      this.opened = false;
    }
  }
};
</script>

<style>
</style>