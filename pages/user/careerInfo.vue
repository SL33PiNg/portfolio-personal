<template>
  <v-card v-if="!loading" class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white"> mdi-domain </v-icon>
            ข้อมูลหน่วยงานปัจจุบัน
          </h2>
        </v-sheet>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.jobPost"
            label="ตำแหน่ง"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-autocomplete
            v-model="user.careerInfo.dpmentID"
            :items="departments"
            item-text="name"
            item-value="_id"
            label="หน่วยงาน"
            outlined
            dense
          >
            <template slot="item" slot-scope="{ item: { name } }">
              <p>{{ name }}</p>
            </template></v-autocomplete
          >
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.department"
            label="ฝ่าย"
            outlined
            dense
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="user.careerInfo.email"
            :rules="emailRules"
            label="E-mail (ที่หน่วยงาน)"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field
            v-model="user.careerInfo.phone"
            v-mask="mask"
            label="เบอร์ที่หน่วยงาน"
            required
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-autocomplete
            v-model="user.careerInfo.country"
            :items="countrylist"
            item-text="name"
            item-value="name"
            label="ประเทศ"
            outlined
            dense
          >
            <template slot="item" slot-scope="{ item: { name } }">
              <p>{{ name }}</p>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3">
        <v-btn
          class="mx-0 font-weight-light"
          color="primary"
          @click="updateUser('ข้อมูลหน่วยงาน')"
        >
          ยืนยัน
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import country from '@/static/countrylist.json'
import getUser from '@/mixins/user'
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask,
  },
  mixins: [getUser],
  data: () => ({
    countrylist: country,
    mask: '###-#######',
    user: [],

    items: [],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    valid: false,

    departments: [],
    selectExp: '',
  }),
  watch: {
    'user.careerInfo.dpmentID'(newVal, oldVal) {
      // eslint-disable-next-line no-console
      console.log(typeof newVal)
    },
  },
  created() {
    this.getExpertist()
  },
  methods: {
    async getExpertist() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/department')
        this.departments = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
