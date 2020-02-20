<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="success" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-school-outline</v-icon>
            ข้อมูลประวัติการศึกษา
          </h1></v-sheet
        >
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12" md="6" xs="12">
          <v-select
            :items="items"
            label="ระดับวุฒิการศึกษา"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field label="วุฒิการศึกษา" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field label="สาขา" outlined />
        </v-col>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-mask="mask"
            label="ปีที่สำเร็จการศึกษา (พ.ศ.)"
            outlined
          />
        </v-col>
        <v-col cols="12" md="2" xs="12">
          <v-checkbox class="mx-2" label="กำลังศึกษา"></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="9" xs="12">
          <v-text-field label="ชื่อสถานศึกษา" outlined />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-select :items="pated" label="ประเทศ" outlined></v-select>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class="mx-0 font-weight-light" color="success">
          เพิ่มข้อมูล
        </v-btn>
      </v-row>

      <template>
        <v-card outlined>
          <v-data-table
            :headers="headers"
            :items="desserts"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask
  },
  data() {
    return {
      mask: '####',
      headers: [
        {
          text: 'ระดับวุฒิการศึกษา',
          align: 'left',
          value: 'name'
        },
        {
          text: 'วุฒิการศึกษา',
          align: 'left',
          value: 'name'
        },
        {
          text: 'สถานะ',
          align: 'left',
          value: 'name'
        }
      ],
      pated: ['ไทย', 'อังกฤษ', 'ลาว', 'พม่า', 'จีน'],
      study: [
        {
          name: 'มัธยมศึกษาปีที่6'
        },
        {
          name: 'ปริญญาตรี'
        }
      ],
      items: [
        'มัธยมศึกษาตอนปลาย',
        'ปวส',
        'อุดมศึกษาหรือเทียบเท่า',
        'ปริญญาตรี',
        'ปริญญาโท',
        'ปริญญาเอก'
      ]
    }
  }
}
</script>
