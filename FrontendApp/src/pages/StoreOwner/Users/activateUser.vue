<template>
  <div>
    <q-btn label="Activate User" @click="opened=true" unelevated color="primary" size="sm" />
    <q-dialog v-model="opened">
      <q-card :style="$q.screen.lt.sm? '': 'min-width: 700px; max-width: 40vw;'">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="verified_user" color="white" size="30px" />&nbsp; Activate User
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll q-gutter-sm">
          <div>
            <div>
              <div align="left" v-if="!$q.screen.lt.md">
                <q-btn
                  class="q-ml-sm"
                  :color="tab=='OnlinePayment'?'primary':'grey'"
                  @click="tab='OnlinePayment'"
                  unelevated
                  :outline="tab!='OnlinePayment'"
                  size="20px"
                  label="Online Payment"
                  icon="payment"
                />
                <q-btn
                  :color="tab=='BankDeposit'?'primary':'grey'"
                  @click="tab='BankDeposit'"
                  unelevated
                  :outline="tab!='BankDeposit'"
                  size="20px"
                  label="bank deposit"
                  icon="account_balance"
                />
              </div>
              <q-btn-group rounded v-if="$q.screen.lt.md">
                <q-btn
                  rounded
                  :color="tab=='OnlinePayment'?'primary':'white'"
                  :class="tab=='OnlinePayment'?'text-white':'text-grey'"
                  @click="tab='OnlinePayment'"
                  label="Online Payment"
                  icon="payment"
                />
                <q-btn
                  rounded
                  :color="tab=='BankDeposit'?'primary':'white'"
                  :class="tab=='BankDeposit'?'text-white':'text-grey'"
                  @click="tab='BankDeposit'"
                  label="Bank Deposit"
                  icon="account_balance"
                />
              </q-btn-group>

              <div v-show="tab=='BankDeposit'">
                <div class="q-pa-sm" align="left">
                  <b>1. Deposit amount to the following BDO bank account:</b>
                  <br />
                  <div class="q-pl-md q-pt-xs">
                    <b>Account Name:</b> Anturaz, Inc.
                    <br />
                    <b>Account Number:</b> 1802 394 837
                    <br />
                    <b>Bank Name:</b> Banco De Oro
                    <br />
                    <b>Amount:</b>
                    {{$prettyMoney(advertise_per_month * months_of_advertisment)}}
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>2. Upload deposit slip/screenshot of your payment</b>
                  <br />
                  <div class="q-pl-md q-pt-xs">
                    <b>A. Over-the-counter payments:</b> Write you full name onto the deposit slip. Scan or take a photograph of the deposit slip
                    <br />
                    <b>B. Online Banking:</b>
                    Take a screenshot of the successful transaction made
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>3. Wait until your payment is verified by the Anturaz Admin.</b>
                </div>
                <div class="q-pa-sm items-right" align="right">
                  <q-btn
                    color="primary"
                    unelevated
                    label="Pay via Bank Deposit"
                    @click="payViaBankDeposit"
                  />
                </div>
              </div>

              <div v-show="tab=='OnlinePayment'">
                <div class="q-pa-sm" align="left">
                  <b>1. Select Account Type from dropdown list. These are the following</b>
                  <div>
                    <ul>
                      <li>Visa</li>
                      <li>Mastercard</li>
                      <li>American Express</li>
                    </ul>
                  </div>
                </div>
                <div class="q-pa-sm" align="left">
                  <b>2. Enter Account Information</b>
                  <div>
                    <ul>
                      <li>Card Number</li>
                      <li>Card Holder</li>
                      <li>Expiry Date</li>
                      <li>CVV</li>
                    </ul>
                  </div>
                </div>
                <div class="q-pa-sm items-right" align="right">
                  <AltPayNet
                    :onlinePaymentResult="onlinePaymentResult"
                    :item="{ price: advertise_per_month * months_of_advertisment, description: months_of_advertisment+' Month/s of Advertisment ('+advertise_per_month+'/month)'}"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_storeOwner.vue";
import DepositSlipUpload from "components/depositSlipUpload.vue";

export default {
  components: {
    AltPayNet,
    DepositSlipUpload
  },
  data() {
    return {
      opened: false,
      tab: "OnlinePayment"
    };
  }
};
</script>

<style>
</style>    