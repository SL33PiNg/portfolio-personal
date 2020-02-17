<template>
  <v-card v-if="!loading" class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black"> mdi-domain </v-icon>
          ข้อมูลหน่วยงานปัจจุบัน
        </h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" xs="12">
          <v-text-field v-model="user.careerInfo.jobPost" label="ตำแหน่ง" />
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-select
            v-model="selectExp"
            :items="expertists"
            item-text="name"
            item-value="_id"
            label="หน่วยงาน"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field v-model="user.careerInfo.department" label="ฝ่าย"
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="user.careerInfo.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.phone"
            :rules="telRules"
            :counter="10"
            label="เบอร์ที่หน่วยงาน"
            required
          />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-select :items="pated" label="ประเทศ"></v-select>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn
          class="mx-0 font-weight-light"
          color="primary"
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
export default {
  mixins: [getUser],
  data: () => ({
    user: [],
    pated: ['ไทย', 'อังกฤษ', 'ลาว', 'พม่า', 'จีน'],
    items: [],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    valid: false,
    telephone: '',
    telRules: [
      (v) => !!v || 'Telephone number is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters'
    ],
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
