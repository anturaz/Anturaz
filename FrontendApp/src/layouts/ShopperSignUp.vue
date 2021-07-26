<template>
  <div class="q-pt-xl flex flex-center">
    <q-card flat :bordered="!$q.screen.lt.sm" style="max-width:500px">
      <q-card-section>
        <div class="text-h6">Sign Up</div>
      </q-card-section>
      <q-card-section>
        <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          <ul>
            <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
          </ul>
        </q-banner>
      </q-card-section>
      <q-card-section>
        <div :class="!$q.screen.lt.sm? 'row': ''">
          <q-input class="col-5" v-model="fname" label="First Name" />
          <div class="col-1" />
          <q-input class="col-6" v-model="lname" label="Last Name" />
        </div>
        <q-input v-model="mobile_number" label="Mobile Number" />
        <q-input v-model="email" label="Email Address" />
        <q-input v-model="password" label="Password" type="password" />
        <div @click="$refs.qDateProxy.show()">
          <q-input
            v-model="birthday"
            mask="date"
            label="Birthday"
            readonly
            @click="$refs.qDateProxy.show()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="birthday" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <br />
        <p class="caption">Gender</p>
        <div class="row q-px-md">
          <q-radio class="col" dense v-model="gender" val="Male" label="Male" />
          <q-radio class="col" dense v-model="gender" val="Female" label="Female" />
        </div>
      </q-card-section>

      <q-card-section class="flex justify-between">
        <p
          class="text-italic text-grey"
        >By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notification from us and can opt out any time.</p>
      </q-card-section>
      <q-card-section align="right">
        <q-btn color="primary" @click="validate()" label="SIGN UP" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fname: "",
      lname: "",
      mobile_number: "",
      email: "",
      password: "",
      birthday: "",
      gender: "Male",
      error: []
    };
  },
  methods: {
    validate: async function() {
      this.error = [];
      if (this.fname.trim() == "") {
        this.error.push("First Name field is required.");
      }
      if (this.lname.trim() == "") {
        this.error.push("Last Name field is required.");
      }
      if (this.mobile_number.trim() == "") {
        this.error.push("Mobile Number field is required.");
      } else {
        await this.$dbCon
          .service("shopper")
          .find({
            query: {
              mobile_number: this.mobile_number
            }
          })
          .then(result => {
            if (result.data.length != 0) {
              this.error.push("Mobile Number has been taken.");
            }
          });
      }
      if (this.email.trim() == "") {
        this.error.push("Email field is required.");
      } else {
        await this.$dbCon
          .service("shopper")
          .find({
            query: {
              email: this.email
            }
          })
          .then(result => {
            if (result.data.length != 0) {
              this.error.push("Email Address has been taken.");
            }
          });
      }
      if (this.password.trim() == "") {
        this.error.push("Password field is required.");
      }
      if (this.birthday.trim() == "") {
        this.error.push("Birthday field is required.");
      }
      if (this.error.length == 0) {
        this.$q
          .dialog({
            title: "Confirmation",
            message: "Do you want to proceed to your registration?",
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
    submit: async function() {
      var result = await this.$dbCon.service("users").create({
        fname: this.fname,
        lname: this.lname,
        mobile_number: this.mobile_number,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
        gender: this.gender,
        address: {
          house_bldg_st: "",
          barangay_district: "",
          city_municipality: "",
          state_province: "",
          zip_code: "",
          country: "Philippines"
        },
        access: true,
        system_user_type: "Shopper"
      });

      await this.$axios({
        method: "GET",
        url: this.$appLink + "/ShopperRegistrationConfirmation?id=" + result._id
      });
      
      this.$q
        .dialog({
          title: "Success!",
          message: "Please login to continue."
        })
        .onOk(() => {
          this.$router.push("/ShopperLogin");
        });
    }
  }
};
</script>

<style>
</style>
