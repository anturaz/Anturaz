<template>
  <div class="q-pa-xl">
    <div class="row justify-between">
      <div class="col-md-8 col-sm-12 row">
      <q-input
        outlined
        dense
        class="q-ma-sm"
        label="Start Date"
        @click="() => $refs.qDateProxy.show()"
        v-model="$parent.start_date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="startDate" transition-show="scale" transition-hide="scale">
              <q-date v-model="$parent.start_date" @input="() => $refs.startDate.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        outlined
        dense
        class="q-ma-sm"
        label="End Date"
        @click="() => $refs.qDateProxy.show()"
        v-model="$parent.end_date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="endDate" transition-show="scale" transition-hide="scale">
              <q-date v-model="$parent.end_date" @input="() => $refs.endDate.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </div>
      <div class="col-md-4 col-sm-12" align="right ">
        <q-btn
          @click="exportExcel"
          v-if="generateExcel"
          class="q-ma-sm"
          label="EXCEL"
          squared
          color="green"
          icon="table_chart"
          unelevated
        />
        <q-btn
          @click="exportPDF"
          v-if="generatePDF"
          class="q-ma-sm"
          label="PDF"
          squared
          color="red"
          icon="picture_as_pdf"
          unelevated
        />
      </div>
    </div>
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-center" v-for="header in header" :key="header">{{header.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in data" :key="data">
          <td class="text-center" v-for="header in header" :key="header">{{data[header.field]}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import xlsx from "xlsx";
import { saveAs } from "file-saver";
export default {
  props: {
    generateExcel: Boolean,
    generatePDF: Boolean,
    header: Array,
    data: Array,
    start_date: String,
    end_date: String
  },
  data() {
    return {
      filter: "",
      body: [],
      dataForTable: []
    };
  },
  methods: {
    exportExcel: function() {
      var XLSX = xlsx;
      /* make the worksheet */
      var ws = XLSX.utils.json_to_sheet(this.data);

      /* write workbook (use type 'binary') */
      var csv = XLSX.utils.sheet_to_csv(ws);

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      saveAs(
        new Blob([s2ab(csv)], {
          type: "application/octet-stream"
        }),
       this.start_date+"-"+this.end_date + ".csv"
      );
    },
    exportPDF: function() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var pdfFonts = require("pdfmake/build/vfs_fonts.js");
      var header = [];
      var widths = [];
      var body = [];
      this.header.forEach(function(x) {
        header.push({ text: x.label, bold: true });
        widths.push("*");
      });
      this.data.forEach(function(x) {
        var row = [];
        for (let key in x) {
          row.push(x[key]);
        }
        body.push(row);
      });
      console.log("BODY", body);
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      var table = [header, ...body];
      this.body = body;
      var docDefinition = {
        pageOrientation: 'landscape',
        content: [
          {
            style: {
              margin: [0, 5, 0, 15],
              fontSize: 10
            },
            table: {
              widths: widths,
              body: table
            }
          }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
    }
  }
};
</script>

<style>
</style>