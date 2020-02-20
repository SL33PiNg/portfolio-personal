<template>
  <v-card v-if="!loading" class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="success" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white"> mdi-domain </v-icon>
            ข้อมูลหน่วยงานปัจจุบัน
          </h1>
        </v-sheet>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.jobPost"
            label="ตำแหน่ง"
            outlined
          />
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-select
            v-model="selectExp"
            :items="expertists"
            item-text="name"
            item-value="_id"
            label="หน่วยงาน"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.department"
            label="ฝ่าย"
            outlined
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="user.careerInfo.email"
            :rules="emailRules"
            label="E-mail"
            required
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.phone"
            v-mask="mask"
            label="เบอร์ที่หน่วยงาน"
            required
            outlined
          />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-select :items="pated" label="ประเทศ" outlined></v-select>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn
          class="mx-0 font-weight-light"
          color="success"
          @click="updateUser"
        >
          ยืนยัน
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import getUser from '@/mixins/user'
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask
  },
  mixins: [getUser],
  data: () => ({
    mask: '###-#######',
    user: [],
    pated: ['ไทย', 'อังกฤษ', 'ลาว', 'พม่า', 'จีน'],
    items: [],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    valid: false,

    expertists: [],
    selectExp: ''
  }),
  watch: {
    selectExp(newVal, oldVal) {
      // eslint-disable-next-line no-console
      console.log(oldVal, newVal)
    }
  },
  created() {
    this.getExpertist()
  },
  methods: {
    async getExpertist() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/department')
        this.expertists = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
