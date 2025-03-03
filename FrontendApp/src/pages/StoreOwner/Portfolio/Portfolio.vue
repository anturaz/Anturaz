<template>
  <div class="row">
    <div class="col-md-4 col-xs-12">
      <SocialMediaLinks />
    </div>
    <br />
    <input
      type="file"
      ref="uploader"
      multiple
      v-show="false"
      accept="image/*"
      @change="onImageSelected"
    />
    <div class="col-md-8 col-xs-12">
      <q-card :class="!$q.screen.lt.md ? 'q-ml-md' : 'q-mt-md'" bordered flat>
        <q-card-section>
          <div>
            <b>Available:</b>
            {{ (total_storage - compute_used).toFixed(2) }} MB &nbsp;
            <b>Used:</b>
            {{ compute_used }} MB &nbsp;
            <b>Total:</b>
            {{ total_storage.toFixed(2) }} MB
          </div>
          <div v-if="compute_used == total_storage && total_storage == 0.5">
            You have consumed your free 5MB storage.
          </div>
          <q-linear-progress
            stripe
            style="height: 10px"
            :value="compute_used / total_storage"
          />
        </q-card-section>
        <q-card-section class="row justify-end">
          <AvailStorageSpace
            :class="$q.screen.lt.md ? 'full-width q-pb-sm' : ''"
          />
          <q-btn
            label="Delete Multiple"
            v-if="!isDeletingMultiple"
            color="grey"
            unelevated
            :disable="store.gallery.length == 0"
            @click="isDeletingMultiple = true"
            :class="$q.screen.lt.md ? 'full-width' : ''"
          />
          <q-btn
            label="Delete All Selected"
            v-if="isDeletingMultiple"
            color="red"
            :disable="store.gallery.length == 0"
            unelevated
            @click="
              isDeletingMultiple = false;
              deleteMultiple();
            "
            :class="$q.screen.lt.md ? 'full-width' : ''"
          />
        </q-card-section>
        <q-card-section
          class="flex q-gutter-sm"
          :class="$q.screen.lt.md ? 'justify-center' : 'justify-left'"
        >
          <q-card flat bordered style="width:130px;height:130px">
            <q-btn flat style="width:100%;height:100%" @click="upload = true">
              <q-card-section>
                <q-icon name="add" size="50px" />
              </q-card-section>
            </q-btn>
          </q-card>
          <div v-for="(galleryFile, index) in store.gallery" v-bind:key="index">
            <q-card
              v-if="galleryFile.type == 'image'"
              flat
              bordered
              style="width:130px;height:130px; position: relative;"
            >
              <q-card-section style="padding: 0; height: 100%;">
                <img
                  class="col"
                  :src="galleryFile.name"
                  style="border: 1px solid grey; width: 100%; height: 100%; object-fit: cover;"
                />
              </q-card-section>
              <q-btn
                flat
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                @click="
                  isDeletingMultiple
                    ? selectToDelete(galleryFile)
                    : viewImage(galleryFile, index)
                "
              >
                <q-checkbox
                  v-if="isDeletingMultiple"
                  :value="toDelete.includes(galleryFile)"
                  @click.native="
                    isDeletingMultiple
                      ? selectToDelete(galleryFile)
                      : viewImage(galleryFile, index)
                  "
                  class="absolute bg-white"
                  style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
                />
                <q-icon
                  v-if="!isDeletingMultiple"
                  name="image"
                  size="30px"
                  color="grey"
                  class="absolute bg-white round-border"
                  style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
                />
              </q-btn>
            </q-card>
            <q-card
              flat
              bordered
              style="width:130px;height:130px; position: relative;"
              v-if="galleryFile.type == 'video link'"
            >
              <q-card-section style="padding: 0; height: 100%;">
                <q-img
                  class="col"
                  :src="
                    'https://img.youtube.com/vi/' +
                      getYTID(galleryFile.link) +
                      '/maxresdefault.jpg'
                  "
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
              </q-card-section>
              <q-btn
                flat
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                @click.native="
                  isDeletingMultiple
                    ? selectToDelete(galleryFile)
                    : viewVideo(galleryFile, index)
                "
              >
                <q-checkbox
                  v-if="isDeletingMultiple"
                  :value="toDelete.includes(galleryFile)"
                  @click.native="
                    isDeletingMultiple
                      ? selectToDelete(galleryFile)
                      : viewVideo(galleryFile, index)
                  "
                  class="absolute bg-white"
                  style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
                />
                <q-icon
                  v-if="!isDeletingMultiple"
                  name="arrow_right"
                  size="30px"
                  color="grey"
                  class="absolute bg-white round-border"
                  style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
                />
              </q-btn>
            </q-card>

            <!-- <q-card
  flat
  bordered
  style="width:130px;height:130px; position: relative;"
  v-if="galleryFile.type == 'video link'"
>
  <q-card-section style="padding: 0; height: 100%;">
    <q-img
      class="col"
      :src="
        'https://img.youtube.com/vi/' +
        getYTID(galleryFile.link) +
        '/maxresdefault.jpg'
      "
      style="width: 100%; height: 100%; object-fit: cover;"
    />
  </q-card-section>
  <q-btn
    flat
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    @click.native="
      isDeletingMultiple
        ? selectToDelete(galleryFile)
        : viewVideo(galleryFile, index)
    "
  >
    <q-checkbox
      v-if="isDeletingMultiple"
      :value="toDelete.includes(galleryFile)"
      @click.native="
        isDeletingMultiple
          ? selectToDelete(galleryFile)
          : viewVideo(galleryFile, index)
      "
      class="absolute bg-white"
      style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
    />
    <q-icon
      v-if="!isDeletingMultiple"
      name="arrow_right"
      size="30px"
      color="grey"
      class="absolute bg-white round-border"
      style="top: 10px; right: 4px; transform: translateY(-20%); z-index: 1;"
    />
  </q-btn>
</q-card> -->
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="viewImg">
      <q-card style="width:300px">
        <q-img :src="current_image.name" />
        <q-btn
          flat
          icon="close"
          class="absolute"
          style="top: -19; right: 0px; transform: translateY(-1%);"
          v-close-popup
        />
        <q-card-section>
          <q-btn
            fab
            color="red"
            icon="delete"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            @click="deleteImage()"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h7 ellipsis q-pt-md">
              {{ $formatDate(current_image.createdAt) }}
            </div>
            <div class="col-auto text-grey q-pt-md">
              <q-icon name="storage" />
              {{ current_image.size }} MB
            </div>
          </div>
          <q-btn
            dense
            outline
            label="close"
            class="col-12 full-width q-mt-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewVid">
      <q-card>
        <q-video
          v-if="viewVid"
          :src="'https://www.youtube.com/embed/' + getYTID(current_video.link)"
        />

        <q-card-section>
          <q-btn
            fab
            color="red"
            icon="delete"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            @click="deleteVideoLink"
          />
          <div class="row no-wrap items-center">
            <div class="col text-h7 ellipsis q-pt-md">
              {{ $formatDate(current_video.createdAt) }}
            </div>
            <div class="col-auto text-grey q-pt-md">
              <q-icon name="storage" />
              {{ current_video.size }} MB
            </div>
          </div>
          <q-btn
            dense
            outline
            label="close"
            class="col-12 full-width q-mt-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="upload">
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <q-list separator bordered style="width:100%">
            <q-item
              clickable
              v-ripple
              @click="$refs.uploader.click(), (upload = false)"
            >
              <q-item-section avatar>
                <q-btn flat round icon="insert_photo" />
              </q-item-section>
              <q-item-section>Upload Picture</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="addVideoLink(), (upload = false)"
              v-ripple
            >
              <q-item-section avatar>
                <q-btn flat round icon="link" />
              </q-item-section>
              <q-item-section style="color:primary"
                >Add Youtube Video Link</q-item-section
              >
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
import SocialMediaLinks from "./socialMediaLinks.vue";
import AvailStorageSpace from "./availStorageSpace.vue";
import imageCompression from "browser-image-compression";

export default {
  components: {
    AvailStorageSpace,
    SocialMediaLinks
  },
  data() {
    return {
      store: [],
      current_image: {},
      current_video: {},
      current_index: 0,
      total_storage: 0,
      viewImg: false,
      viewVid: false,
      modifyLink: false,
      upload: false,
      current_link: "",
      toDelete: [], //Items to delete
      isDeletingMultiple: false //To know if in Multiple Deleting Status
    };
  },
  methods: {
    onlinePaymentResult: async function(result, info) {
      // console.log(result);
    },
    viewImage: function(x, y) {
      this.current_image = x;
      this.current_index = y;
      this.viewImg = true;
    },
    viewVideo: function(x, y) {
      this.current_video = x;
      this.current_index = y;
      this.viewVid = true;
    },
    selectToDelete(x) {
      if (this.toDelete.includes(x)) {
        this.toDelete.splice(_.findIndex(this.toDelete, x), 1);
      } else {
        this.toDelete.push(x);
      }
    },
    deleteImage: async function() {
      await this.$axios({
        method: "post",
        url: this.$appLink + "/deletePortfolioGallery",
        data: { img_directory: this.current_image.directory }
      }).then(result => {
        if (result.data == true) {
          this.store.gallery.splice(this.current_index, 1);
          this.$dbCon
            .service("store")
            .patch(this.store._id, this.store)
            .then(() => {
              this.$q.notify({
                message: "Successfully Deleted!",
                position: "top-right",
                color: "primary",
                timeout: 700,
                icon: "check"
              });
              this.viewImg = false;
              this.viewVid = false;
            });
        } else {
          this.$q.notify({
            message: "An error occured! Please try again.",
            position: "top-right",
            color: "red",
            timeout: 700,
            icon: "check"
          });
        }
      });
    },
    deleteVideoLink: function() {
      this.store.gallery.splice(this.current_index, 1);
      this.$dbCon
        .service("store")
        .patch(this.store._id, this.store)
        .then(() => {
          this.$q.notify({
            message: "Successfully Deleted!",
            position: "top-right",
            color: "primary",
            timeout: 700,
            icon: "check"
          });
          this.viewImg = false;
          this.viewVid = false;
        });
    },
    deleteMultiple: function() {
      this.$q.loading.show();
      this.toDelete.forEach(async function(x) {
        if (x.type != "video link") {
          await this.$axios({
            method: "post",
            url: this.$appLink + "/deletePortfolioGallery",
            data: { img_directory: x.directory }
          });
        }
        await this.store.gallery.splice(
          await _.findIndex(this.store.gallery, x),
          1
        );
        await this.$dbCon.service("store").patch(this.store._id, this.store);
      }, this);
      this.$q.loading.hide();
    },

    async compressImage(file) {
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Maximum width or height
        useWebWorker: true // Use web worker for compression
      };
      try {
        const compressedFile = await imageCompression(file, options);
        console.log("Original file size:", file.size / 1024 / 1024, "MB");
        console.log(
          "Compressed file size:",
          compressedFile.size / 1024 / 1024,
          "MB"
        );
        return compressedFile;
      } catch (error) {
        console.error("Error compressing image:", error);
        return file; // Return original file if compression fails
      }
    },

    async uploadImages(file) {
      const compressedFile = await this.compressImage(file);
      return this.uploadImage(compressedFile);
    },

    uploadImage: async function(fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(this.$appLink + "/upload", formData);
      return result.data;
    },

    onImageSelected: async function(event) {
      this.$q.loading.show();

      //COMPUTE MUNA
      var totalSizeToUpload = 0;
      for (var x = 0; x < event.target.files.length; x++) {
        totalSizeToUpload += parseFloat(
          event.target.files[x].size / 1024 / 1024
        );
      }
      if (
        this.total_storage >
        parseFloat(this.compute_used) + totalSizeToUpload
      ) {
        for (var x = 0; x < event.target.files.length; x++) {
          await this.uploadFile(event.target.files[x]);
        }
      } else {
        this.$q.dialog({
          title: "Not Enough Storage Space",
          message:
            "Your free space was used up. Please add portfolio storage to continue."
        });
      }
      this.$q.loading.hide();
    },
    uploadFile: async function(x) {
      // console.log("FILE TO UPLOAD", x.type);
      if (["image/jpeg", "image/png"].includes(x.type)) {
        var fileLink = await this.uploadImages(x);
        var fileName = fileLink.split("/")[fileLink.split("/").length - 1];
        this.store.gallery.unshift({
          type: "image",
          name: fileLink,
          directory: "public/uploads/" + fileName,
          size: (x.size / 1000000).toFixed(2), //CONVERTING BYTE TO MEGABYTE
          createdAt: new Date()
        });
        // console.log(this.store.gallery);
        await this.$dbCon.service("store").patch(this.store._id, this.store);
      } else {
        this.$q.notify({
          message: "Error Uploading! The system only accepts .JPG and .PNG!",
          position: "top-right",
          color: "red",
          timeout: 700,
          icon: "check"
        });
      }
    },
    // uploadFile: async function(x) {
    //   const formData = new FormData();
    //   await formData.append(this.$appLink, x, x.name);
    //   await this.$axios
    //     .post(this.$appLink + "/uploadPortfolioGallery", formData)
    //     .then(async result => {
    //       console.log("UPLOADING RESULT", result);
    //       if (result.data != false) {
    //         this.store.gallery.unshift(result.data);
    //         await this.$dbCon
    //           .service("store")
    //           .patch(this.store._id, this.store);
    //       } else {
    //         this.$q.loading.hide();
    //         this.$q.notify({
    //           message:
    //             "Error Uploading! The system only accepts .JPG and .PNG!",
    //           position: "top-right",
    //           color: "red",
    //           timeout: 700,
    //           icon: "check"
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       console.log("ERROR", error);
    //       this.$q.loading.hide();
    //     });
    // },
    addVideoLink: function() {
      this.$q
        .dialog({
          title: "Add Video Link",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(async data => {
          var isURL = await this.isUrl(data.trim());
          if (data.trim() != "" && isURL) {
            if (
              !data
                .trim()
                .match(
                  "^(https?://)?(www.youtube.com|youtube.com|youtu.?be)/.+$"
                )
            ) {
              this.$q.dialog({
                title: "The link was not a valid Youtube video",
                message: "Please input valid Youtube Link to proceed."
              });
              return;
            }

            if (this.total_storage > parseFloat(this.compute_used) + 1) {
              this.store.gallery.unshift({
                type: "video link",
                link: data,
                size: 1,
                createdAt: new Date()
              });
              this.$dbCon.service("store").patch(this.store._id, this.store);
            } else {
              this.$q.dialog({
                title: "Not Enough Storage Space",
                message:
                  "Your free space was used up. Please add portfolio storage to continue."
              });
            }
          } else {
            this.$q.dialog({
              title: "Video Link is Invalid",
              message: "The Video Link you insert is invalid."
            });
          }
        });
    },
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
      await this.$dbCon
        .service("gallery-subscription")
        .find({
          query: {
            store_id: this.$local.getItem("store_token")
          }
        })
        .then(result => {
          this.total_storage = 0;
          result.data.map(data => {
            this.total_storage += data.mb;
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
    getYTID: function(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
    this.$dbCon.service("gallery-subscription").onDataChange(() => {
      this.getData();
    });
  },
  computed: {
    // a computed getter
    compute_used: function() {
      var total = 0;
      this.store.gallery.forEach(x => {
        total += parseFloat(x.size);
      });
      return total.toFixed(2);
    }
  }
};
</script>

<style></style>
