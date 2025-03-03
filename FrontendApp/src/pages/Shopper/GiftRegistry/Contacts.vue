<template>
  <div>
    <q-btn-group push :class="!$q.screen.lt.md ? '' : ''">
      <q-btn color="primary" label="Guest list" @click="opened = true" />
      <!-- <q-btn
        color="primary"
        label="Notift Guest"
        @click="notifContacts"
        :disable="disable"
      /> -->
    </q-btn-group>

    <q-dialog v-model="opened">
      <q-card style="min-width:50vw">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            Contacts
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-breadcrumbs
            separator=">"
            class="text-grey-10 col-12 text-body1 q-pb-md"
            active-color="grey-10"
          >
            <q-breadcrumbs-el label="Contact Details" icon="description" />
          </q-breadcrumbs>

          <div class="row">
            <div class="col-4 col-md-4 q-pr-md col-lg-4 col-sm-12 col-xs-12">
              <q-input v-model="contact.name" label="Name" />
            </div>
            <div class="col-4 q-pr-md col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <q-input type="email" v-model="contact.email" label="Email" />
            </div>
            <div class="col-4 q-pr-md col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <q-input
                type="number"
                v-model="contact.phone"
                label="Phone number"
              />
            </div>
          </div>

          <div class="row justify-end q-pt-md">
            <div class="col-12 col-md-2 q-pr-md">
              <div align="right">
                <q-btn
                  v-if="save"
                  label="Save"
                  @click="saveBtn"
                  color="primary"
                />
                <q-btn v-else label="Edit" @click="editBtn" color="primary" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-lg">
          <div class="row">
            <div class="col-4 text-left">
              <p class="text-h6">Contacts <q-icon left name="contacts" /></p>
            </div>
            <div class="col-2 text-right"></div>

            <div class="col-4 text-right">
              <p
                style="line-height: 2.5; color:red;"
                class="text-right text-weight-light"
                v-if="isHide"
              >
                Please add items in order to notify your guests
              </p>
            </div>
            <div class="col-2 text-right">
              <q-btn
                @click="notifContacts"
                :disable="disable"
                class="bg-primary"
              >
                <q-icon left name="notifications" />
                <div>Notify</div>
              </q-btn>
            </div>
          </div>
          <!-- 
          <q-breadcrumbs
            separator=">"
            class="text-grey-10 col-12 text-body1 q-pb-md"
            active-color="grey-10"
          >
            <q-breadcrumbs-el label="Contact list" icon="contacts" />

            <q-btn class="bg-primary">
              <q-icon left name="notifications" />
              <div>Notify</div>
            </q-btn>
          </q-breadcrumbs> -->
          <q-list bordered separator v-if="data.length > 0">
            <q-item
              v-for="(contact, index) in data[0].contacts"
              :key="contact.name"
            >
              <q-item-section>
                <div class="text-bold text-subtitle2">{{ contact.name }}</div>
                <div>
                  <b class="text-subtitle2">Email:</b> {{ contact.email }}
                </div>
                <div>
                  <b class="text-subtitle2">Phone:</b> {{ contact.phone }}
                </div>
              </q-item-section>
              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    icon="edit"
                    @click="editContact(contact, index)"
                  />
                  <q-btn flat icon="delete" @click="deleteContact(contact)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>

          <q-list v-else>
            <q-item-section>
              <div class="text-h6 text-center">No contacts found</div>
            </q-item-section>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { contactInviteGiftRegEmail } from "../../../api/services/giftRegistryServices";
export default {
  props: {
    gift_id: String,
    selectedProd: Array,
    giftReg: Object
  },
  data() {
    return {
      opened: false,
      save: true,
      edit: false,
      contact: {
        name: "",
        email: "",
        phone: ""
      },
      data: [],
      editIndex: null,
      disable: false,
      localSelectedProd: [...this.selectedProd],
      isHide: false
    };
  },
  watch: {
    opened(newVal) {
      if (newVal) {
        this.$emit("openContacts");
      }
    },
    selectedProd: {
      deep: true, // Watch for changes inside the array
      handler(newValue) {
        this.isHide = newValue.length === 0;
        this.disable = newValue.length === 0 || this.data.length === 0;
        this.localSelectedProd = [...newValue]; // Update local copy when parent changes
      }
    }
  },
  methods: {
    updateParent() {
      this.$emit("update:selectedProd", [...this.localSelectedProd]); // Emit change to parent
    },
    async getContacts() {
      try {
        const res = await this.$dbCon.service("gift-registry-contacts").find({
          query: { gift_id: this.gift_id }
        });
        this.disable = res.data.length === 0;
        console.log(this.localSelectedProd);
        this.disable =
          res.data.length === 0 ||
          (!this.localSelectedProd || this.localSelectedProd.length === 0);

        // console.log(res.data);
        this.data = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveBtn() {
      this.$q.loading.show();
      try {
        if (this.data.length === 0) {
          const res = await this.$dbCon
            .service("gift-registry-contacts")
            .create({
              gift_id: this.gift_id,
              contacts: [this.contact]
            });
          this.data.push(res);
        } else {
          this.data[0].contacts.push(this.contact);
          await this.updateContacts();
        }
        this.resetContactForm();
        this.notify("Contact added successfully");
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
        }, 500);
      }
    },
    async editBtn() {
      this.$q.loading.show();
      try {
        this.data[0].contacts[this.editIndex] = { ...this.contact };
        await this.updateContacts();
        this.resetContactForm();
        this.notify("Contact updated successfully");
        this.save = true;
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
        }, 500);
      }
    },
    async editContact(contact, index) {
      this.editIndex = index;
      this.contact = { ...contact };
      this.save = false;
      this.edit = true;
    },
    async deleteContact(contact) {
      this.$q.loading.show();
      try {
        if (this.data[0].contacts.length === 1) {
          await this.$dbCon
            .service("gift-registry-contacts")
            .remove(this.data[0]._id);
          this.data = [];
        } else {
          this.data[0].contacts = this.data[0].contacts.filter(
            v => v.name !== contact.name
          );
          await this.updateContacts();
        }
        this.notify("Contact deleted successfully");
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
        }, 500);
      }
    },
    async updateContacts() {
      await this.$dbCon
        .service("gift-registry-contacts")
        .patch(this.data[0]._id, {
          contacts: this.data[0].contacts
        });
    },
    resetContactForm() {
      this.contact = { name: "", email: "", phone: "" };
      this.edit = false;
    },
    notify(message) {
      this.$q.notify({
        color: "primary",
        position: "top",
        message,
        icon: "check"
      });
    },

    async notifContacts() {
      this.$q.loading.show();
      try {
        const { data: contactRes } = await this.$dbCon
          .service("gift-registry-contacts")
          .find({
            query: {
              gift_id: this.data[0].gift_id
            }
          });
        console.log("email here", contactRes[0].contacts);

        contactRes[0].contacts.map(async contact => {
          await contactInviteGiftRegEmail(this.giftReg, contact);
        });

        // await this.$axios({
        //   method: "GET",
        //   url: this.$appLink + "/sendEmail?id=" + this.gift_id
        // }).then(result => {
        //   this.notify("Email Notification sent successfully");
        // });
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          this.$q.loading.hide();
        }, 500);
      }
    }
  },
  mounted() {
    this.$dbCon
      .service("gift-registry-contacts")
      .onDataChange(this.getContacts);
  }
};
</script>
