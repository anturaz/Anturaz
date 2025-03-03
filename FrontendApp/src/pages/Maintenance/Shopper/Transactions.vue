<template>
  <div>
    <q-btn
      color="primary"
      icon="payment"
      @click="handleTransaction"
      flat
      dense
    />

    <q-dialog v-model="transactions" persistent>
      <q-card style="width: 800px !important; max-width: 80vw;">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">SHOPPER TRANSACTIONS</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-table
            :data="data"
            :columns="columns"
            :filter="filter"
            row-key="name"
            flat
          >
            <!-- <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template> -->
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="type" :props="props">{{ props.row.type }}</q-td>
              <q-td key="date_ordered" :props="props">{{
                $formatDate(props.row.logs[0].date)
              }}</q-td>

              <q-td key="payment_date" :props="props">{{
                props.row.payment_date
                  ? $formatDate(props.row.payment_date)
                  : "N/A"
              }}</q-td>

              <q-td key="payment_type" :props="props">{{
                props.row.payment_date
                  ? $formatDate(props.row.payment_date)
                  : "N/A"
              }}</q-td>

              <q-td key="amount" :props="props">{{
                $prettyMoney(props.row.total)
              }}</q-td>

              <q-td key="status" :props="props">{{ props.row.status }}</q-td>
              <!-- <q-td key="email" :props="props">{{ props.row.email }}</q-td>
              <q-td key="mobile_number" :props="props">{{
                props.row.mobile_number
              }}</q-td>
              <q-td key="gender" :props="props">{{ props.row.gender }}</q-td>
              <q-td key="status" :props="props">
                <q-toggle
                  :value="props.row.access"
                  color="primary"
                  @input="
                    changeStatus(props.row.access, props.row._id, props.row)
                  "
                />
              </q-td> -->
              <q-td key="action" :props="props">
                <div class="row item-center">
                  <q-btn
                    color="red"
                    icon="delete"
                    @click="deleteTransaction(props.row._id)"
                    flat
                    dense
                  />
                </div>
              </q-td>
            </q-tr>
          </q-table>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="cancel" @click="transactions = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    shopper_id: { type: String, required: true }
  },
  data() {
    return {
      data: [],
      transactions: [],
      shopperDetails: null,
      transactions: false,
      columns: [
        { name: "type", label: "Type", field: "type", align: "center" },
        {
          name: "date_ordered",
          label: "Date Ordered",
          field: "date_ordered",
          align: "center"
        },
        {
          name: "payment_date",
          label: "Date payed",
          field: "payment_date",
          align: "center"
        },

        {
          name: "amount",
          label: "Amount",
          field: "amount",
          align: "center"
        },

        {
          name: "status",
          label: "Status",
          field: "status",
          align: "center"
        },

        //   {
        //     name: "email",
        //     label: "Email Address",
        //     field: "email",
        //     align: "center"
        //   },

        //   {
        //     name: "mobile_number",
        //     label: "Mobile Number",
        //     field: "mobile_number",
        //     align: "center"
        //   },
        //   {
        //     name: "gender",
        //     label: "Gender",
        //     field: "gender",
        //     align: "center"
        //   },
        //   {
        //     name: "status",
        //     label: "Status",
        //     field: "status",
        //     align: "center"
        //   },
        {
          name: "action",
          label: "Action",
          field: "action",
          align: "center"
        }
      ]
    };
  },
  methods: {
    handleTransaction: async function() {
      this.transactions = true;
      try {
        console.log(this.shopper_id);
        const [resProductTrans, resServiceTrans] = await Promise.all([
          this.$dbCon.service("product-transactions").find({
            query: {
              shopper_id: this.shopper_id
            }
          }),

          this.$dbCon.service("service-transactions").find({
            query: {
              shopper_id: this.shopper_id
            }
          })
        ]);

        const data = [...resProductTrans.data, ...resServiceTrans.data];
        this.data = data;
      } catch (e) {}
    },

    deleteTransaction: async function() {}
  },

  mounted() {
    // if (this.shopper_id) {
    //   this.handleTransaction();
    // }
  }
};
</script>
