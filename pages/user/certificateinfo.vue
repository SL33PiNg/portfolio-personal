<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="success" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white"> mdi-file-certificate-outline</v-icon>
            ใบรับรอง
          </h1></v-sheet
        >
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" xs="12" md="5">
          <v-text-field label="ชื่อใบรับรอง" clearable outlined />
        </v-col>

        <v-col cols="12" xs="12" md="4">
          <v-text-field label="หน่วยงานที่ออกใบรับรอง" clearable outlined />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-text-field
            v-mask="mask"
            label="ปีที่ได้รับ (พ.ศ.)"
            clearable
            outlined
          />
        </v-col>
      </v-row>

      <v-row
        ><v-col cols="12"
          ><v-textarea label="รายละเอียด" outlined></v-textarea></v-col
      ></v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class=" font-weight-light" color="success">
          เพิ่มข้อมูล
        </v-btn></v-row
      >
      <template>
        <v-card outlined>
          <v-data-table :headers="headers" hide-default-footer></v-data-table>
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
          text: 'ชื่อใบรับรอง',
          align: 'left',
          value: 'name'
        },
        {
          text: 'ปีที่ได้รับ',
          align: 'left',
          value: 'name'
        }
      ]
    }
  }
}
</script>
