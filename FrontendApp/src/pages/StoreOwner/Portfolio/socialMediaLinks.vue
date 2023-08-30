<template>
  <div>
    <p class="text-h6 text-black">
      Add your store social media page or channel
    </p>
    <q-list bordered>
      <q-item
        clickable
        v-ripple
        @click="editLink('facebook', store.links.facebook)"
      >
        <q-item-section avatar>
          <q-avatar square>
            <img :src="$appLink + '/statics/facebook-logo.jpg'" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          Facebook
          <br />
          <small v-if="store.links.facebook.trim() != ''">{{
            store.links.facebook
          }}</small>
          <small v-else class="text-grey">click here to add link</small>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        clickable
        v-ripple
        @click="editLink('instagram', store.links.instagram)"
      >
        <q-item-section avatar>
          <q-avatar square>
            <img :src="$appLink + '/statics/instagram-logo.jpg'" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          Instagram
          <br />
          <small v-if="store.links.instagram.trim() != ''">{{
            store.links.instagram
          }}</small>
          <small v-else class="text-grey">click here to add link</small>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        clickable
        v-ripple
        @click="editLink('pinterest', store.links.pinterest)"
      >
        <q-item-section avatar>
          <q-avatar square>
            <img :src="$appLink + '/statics/pinterest-logo.jpg'" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          Pinterest
          <br />
          <small v-if="store.links.pinterest.trim() != ''">{{
            store.links.pinterest
          }}</small>
          <small v-else class="text-grey">click here to add link</small>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        clickable
        v-ripple
        @click="editLink('youtube', store.links.youtube)"
      >
        <q-item-section avatar>
          <q-avatar square>
            <img :src="$appLink + '/statics/youtube-logo.jpg'" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          Youtube
          <br />
          <small v-if="store.links.youtube.trim() != ''">{{
            store.links.youtube
          }}</small>
          <small v-else class="text-grey">click here to add link</small>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple @click="editLink('vimeo', store.links.vimeo)">
        <q-item-section avatar>
          <q-avatar square>
            <img :src="$appLink + '/statics/vimeo-logo.jpg'" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          Vimeo
          <br />
          <small v-if="store.links.vimeo.trim() != ''">{{
            store.links.vimeo
          }}</small>
          <small v-else class="text-grey">click here to add link</small>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="modifyLink">
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <q-list separator bordered style="width:100%">
            <q-item clickable v-ripple @click="modifyLinkDialog()">
              <q-item-section avatar>
                <q-btn flat round icon="edit" />
              </q-item-section>
              <q-item-section>Modify Link</q-item-section>
            </q-item>
            <q-item clickable @click="$refs.hiddenLink.click()" v-ripple>
              <q-item-section avatar>
                <q-btn flat round icon="remove_red_eye" color="primary" />
              </q-item-section>
              <q-item-section style="color:primary">View Link</q-item-section>
              <a
                v-show="false"
                ref="hiddenLink"
                :href="'https://' + current_link"
                target="_blank"
              ></a>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: {},
      current_link: "",
      current_type: "",
      modifyLink: false
    };
  },
  methods: {
    getData: async function() {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token")
          }
        })
        .then(result => {
          this.store = result.data[0];
        });
    },
    modifyLinkDialog: function() {
      this.$q
        .dialog({
          title: (this.current_link.trim() == "" ? "Add" : "Modify") + " link",
          prompt: {
            model: this.current_link
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          // if (!this.isUrl(data.trim())) {
          //   this.$q
          //     .dialog({
          //       title: "Invalid URL",
          //       message:
          //         "The link was not a valid " +
          //         this.current_type[0].toUpperCase() +
          //         this.current_type.substring(1, this.current_type.length) +
          //         " link.",
          //       persistent: true,
          //     })
          //     .onOk(() => {
          //       this.modifyLinkDialog();
          //     });
          //   return;
          // }
          var URL_regex = "";
          if (this.current_type == "facebook") {
            URL_regex =
              "^(https?://)?(www.facebook.com|facebook.com|m.facebook.com|fb.com|m.fb.com)/.+$";
          } else if (this.current_type == "instagram") {
            URL_regex =
              "^(https?://)?(www.instagram.com|instagram.com|m.instagram.com|ig.com|m.ig.com)/.+$";
          } else if (this.current_type == "pinterest") {
            URL_regex =
              "^(https?://)?(www.pinterest.com|pinterest.com|m.pinterest.com)/.+$";
          } else if (this.current_type == "youtube") {
            URL_regex =
              "^(https?://)?(www.youtube.com|youtube.com|m.youtube.com)/.+$";
          } else if (this.current_type == "vimeo") {
            URL_regex =
              "^(https?://)?(www.vimeo.com|vimeo.com|m.vimeo.com)/.+$";
          }
          if (!data.trim().match(URL_regex)) {
            this.$q.dialog({
              title:
                "The link was not a valid " +
                this.current_type[0].toUpperCase() +
                this.current_type.substring(1, this.current_type.length) +
                " link",
              message:
                "Please input valid " +
                this.current_type[0].toUpperCase() +
                this.current_type.substring(1, this.current_type.length) +
                " link to proceed."
            });
            return;
          }
          this.modifyLink = false;
          this.store.links[this.current_type] = data
            .trim()
            .replace("https://", "")
            .replace("http://", "");
          this.$dbCon
            .service("store")
            .patch(this.$local.getItem("store_token"), this.store)
            .then(() => {
              this.$q.notify({
                message: "Successfully Updated!",
                position: "top-right",
                color: "primary",
                timeout: 700,
                icon: "check"
              });
            });
        });
    },
    isUrl: function(str) {
      var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (regexp.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    editLink: function(type, link) {
      this.current_link = link;
      this.current_type = type;
      if (link.trim() == "") {
        this.modifyLinkDialog();
      } else {
        this.modifyLink = true;
      }
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
  }
};
</script>
