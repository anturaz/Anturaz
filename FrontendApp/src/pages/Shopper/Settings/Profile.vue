<template>
  <div>
    <br v-if="$q.screen.lt.sm">
    <q-card flat bordered>
      <q-card-section>
        <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white"/>
          </template>
          <ul>
            <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
          </ul>
        </q-banner>
        <div :class="!$q.screen.lt.sm? 'row q-gutter-sm': ''">
          <q-input class="col" v-model="updated.fname" label="First Name"/>

          <q-input class="col" v-model="updated.lname" label="Last Name"/>
        </div>
        <q-input v-model="updated.mobile_number" label="Mobile Number"/>
        <q-input :value="updated.email" disable label="Email Address"/>
        <div @click="$refs.qDateProxy.show()">
        <q-input v-model="updated.birthday" readonly mask="date" label="Birthday">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="updated.birthday" @input="() => $refs.qDateProxy.hide()"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        </div>
        <br>

        <p class="caption">Address<i>(Default for Delivery/Service Address)</i></p>
        <div class="q-gutter-md" :class="$q.screen.lt.sm? '': 'row'">
          <q-input
            :class="$q.screen.lt.sm? '': 'col'"
            v-model="updated.address.house_bldg_st"
            label="House/ Building No./ Street"
          />
          <q-input
            :class="$q.screen.lt.sm? '': 'col'"
            v-model="updated.address.barangay_district"
            label="Barangay/ District"
          />
          <q-input
            :class="$q.screen.lt.sm? '': 'col'"
            v-model="updated.address.city_municipality"
            label="City/Municipality"
          />
        </div>
        <div class="q-gutter-md" :class="$q.screen.lt.sm? '': 'row'">
          <q-input
            :class="$q.screen.lt.sm? '': 'col'"
            v-model="updated.address.state_province"
            label="State/Province"
          />
          <q-input
            :class="$q.screen.lt.sm? '': 'col'"
            v-model="updated.address.zip_code"
            label="Zip Code"
          />
          <q-input
            :class="$q.screen.lt.sm? '': 'col'"
            v-model="updated.address.country"
            label="Country"
          />
        </div>
        <br>
        <p class="caption">Gender</p>
        <div class="row q-px-md">
          <q-radio class="col" dense v-model="updated.gender" val="Male" label="Male"/>
          <q-radio class="col" dense v-model="updated.gender" val="Female" label="Female"/>
        </div>
      </q-card-section>

      <q-card-section align="right">
        <br>
        <q-btn color="primary" @click="validate" label="Save changes"/>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      updated: [],
      error: []
    };
  },
  methods: {
    validate: function() {
      this.error = [];
      if (this.updated.fname.trim() == "") {
        this.error.push("First Name field is required.");
      }
      if (this.updated.lname.trim() == "") {
        this.error.push("Last Name field is required.");
      }
      if (this.updated.mobile_number.trim() == "") {
        this.error.push("Mobile Number field is required.");
      }
      if (this.updated.email.trim() == "") {
        this.error.push("Email field is required.");
      }

      if (this.updated.birthday.trim() == "") {
        this.error.push("Birthday field is required.");
      }
      if (this.updated.address.house_bldg_st.trim() == "") {
          this.error.push("House/ Building/ Street field is required.");
      }
      if (this.updated.address.barangay_district.trim() == "") {
          this.error.push("Barangay/ District field is required.");
      }
      if (this.updated.address.city_municipality.trim() == "") {
          this.error.push("City/ Municipality field is required.");
      }
      if (this.updated.address.state_province.trim() == "") {
          this.error.push("State/ Province field is required.");
      }
      if (this.updated.address.zip_code.trim() == "") {
          this.error.push("Zip Code field is required.");
      }
      if (this.updated.address.country.trim() == "") {
          this.error.push("Country field is required.");
      }

      if (this.error.length == 0) {
        this.save();
      }
    },
    save: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to update your profile?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$dbCon
            .service("users")
            .patch(this.updated._id, this.updated)
            .then(() => {
              this.$q.dialog({
                title: "Success!",
                message: "Profile is now updated.",
                cancel: {
                  push: true,
                  color: "grey",
                  flat: true
                }
              });
            });
        });
    }
  },
  async mounted() {
    await this.$getUser().then(results=>{
        this.updated = results;
      });
  }
};
</script>

<style>
</style>
