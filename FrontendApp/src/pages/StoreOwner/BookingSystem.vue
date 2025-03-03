<template>
  <div class="q-pa-md row">
    <q-breadcrumbs class="col-12 text-grey">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Booking System" icon="library_books" />
    </q-breadcrumbs>
    <br />
    <br />

    <div class="text-h5 q-mb-md">Booking Calendar</div>
    <div class="col-12">
      <q-card flat>
        <q-card-section class="row q-gutter-md">
          <q-date
            v-model="date"
            landscape
            :class="$q.screen.lt.sm ? 'col-11' : 'col-7'"
            minimal
            :events="events"
          />

          <div
            class="q-gutter-md"
            :class="$q.screen.lt.sm ? 'col-11' : 'col-4'"
            v-if="date != ''"
          >
            <div class="text-title">Set date as..</div>
            <q-btn
              class="full-width"
              color="primary"
              unelevated
              v-if="btn_fully_booked && date"
              size="sm"
              @click="setAsFullyBooked"
              label="FULLY BOOKED"
              :disable="isDateDisabled"
            />
            <q-btn
              class="full-width"
              color="primary"
              unelevated
              size="sm"
              v-if="btn_not_available"
              @click="setAsNotAvailable"
              label="NOT AVAILABLE"
              :disable="isDateDisabled"
            />
            <q-btn
              class="full-width"
              v-if="btn_available"
              unelevated
              size="sm"
              color="primary"
              @click="makeAvailable()"
              label="AVAILABLE"
            />
            <q-btn
              class="full-width"
              v-if="btn_available"
              unelevated
              size="sm"
              color="primary"
              @click="editNotAvailable()"
              label="Edit"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <q-markup-table flat>
            <thead>
              <tr>
                <th class="text-left">Date</th>
                <th class="text-center">Status</th>
                <th class="text-center">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.schedules.length == 0">
                <td class="text-grey" colspan="3" align="center">
                  no records found
                </td>
              </tr>
              <tr
                @click="date = $formatDateForPicker(sched.date)"
                v-for="(sched, index) in data.schedules"
                v-bind:key="index"
              >
                <td class="text-left">
                  {{ $formatDate_DateOnly(sched.date) }}
                </td>
                <td class="text-center" v-if="sched.status == 0">
                  Fully Booked
                </td>
                <td class="text-center" v-else-if="sched.status == 1">
                  Not Available
                </td>
                <td class="text-center">
                  {{ sched.remarks ? sched.remarks : "" }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  data() {
    return {
      date: "",
      data: [],
      events: [],
      btn_fully_booked: false,
      btn_not_available: false,
      btn_available: false
    };
  },
  computed: {
    isDateDisabled() {
      if (!this.date || !this.data.schedules) return true; // Disable if no date or schedules

      // Normalize date format to YYYY/MM/DD for comparison
      const normalizeDate = dateStr => {
        if (dateStr.includes("/")) return dateStr; // Already in correct format
        const date = new Date(dateStr);
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}/${String(date.getDate()).padStart(2, "0")}`;
      };

      // Check if the selected date exists in schedules
      const matchedSchedule = this.data.schedules.find(
        schedule => normalizeDate(schedule.date) === this.date
      );
      return matchedSchedule ? matchedSchedule.disable : false;
    }
  },
  methods: {
    setAsFullyBooked: async function() {
      this.$q
        .dialog({
          title: "Remarks",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.data.schedules.push({
            date: this.$formatDateFromPickerToDatabase(this.date),
            status: 0,
            remarks: data,
            disable: false
          });
          this.date = "";
          this.$dbCon
            .service("store-schedule")
            .update(this.data._id, this.data);
        });
    },
    setAsNotAvailable: async function() {
      this.$q
        .dialog({
          title: "Remarks",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.data.schedules.push({
            date: this.$formatDateFromPickerToDatabase(this.date),
            status: 1,
            remarks: data,
            disable: false
          });
          this.date = "";

          this.$dbCon
            .service("store-schedule")
            .update(this.data._id, this.data);
        });
    },
    makeAvailable: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to make this date available?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.data.schedules.forEach(function(sched, index) {
            if (this.$formatDateFromPickerToDatabase(this.date) == sched.date) {
              this.data.schedules.splice(index, 1);
              this.$dbCon
                .service("store-schedule")
                .update(this.data._id, this.data);
              this.date = "";
            }
          }, this);
        });
    },
    changeDate: function() {
      var dateIncluded = false;
      this.data.schedules.forEach(function(i) {
        if (this.$formatDateFromPickerToDatabase(this.date) == i.date) {
          dateIncluded = true;
        }
      }, this);
      if (dateIncluded) {
        this.btn_fully_booked = false;
        this.btn_not_available = false;
        this.btn_available = true;
      } else {
        this.btn_fully_booked = true;
        this.btn_not_available = true;
        this.btn_available = false;
      }
    },
    editNotAvailable: function() {
      this.data.schedules.forEach(function(sched, index) {
        if (this.$formatDateFromPickerToDatabase(this.date) == sched.date) {
          this.$q
            .dialog({
              title: "Remarks",
              prompt: {
                model: this.data.schedules[index].remarks,
                type: "text" // optional
              },
              cancel: true,
              persistent: true
            })
            .onOk(data => {
              this.data.schedules[index].remarks = data;
              this.$dbCon
                .service("store-schedule")
                .update(this.data._id, this.data);
              this.date = "";
            });
        }
      }, this);
    },

    formatDate(dateString) {
      var date = new Date(dateString);
      var day = String(date.getDate()).padStart(2, "0");
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var year = date.getFullYear();
      return `${year}/${month}/${day}`;
    },

    async getData() {
      try {
        const result = await this.$dbCon.service("store-schedule").find({
          query: {
            store_id: this.$local.getItem("store_token")
          }
        });

        if (result.data && result.data[0] && result.data[0].schedules) {
          const events = result.data[0].schedules.map(item => {
            return this.formatDate(item.date);
          });

          this.events = events;
          this.data = result.data[0];
          console.log(events);
        } else {
          console.log("No schedules found.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    date: function() {
      this.changeDate();
    }
  },
  mounted() {
    this.$dbCon.service("store-schedule").onDataChange(() => {
      this.getData();
    });
  }
};
</script>

<style></style>
