<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3 ">
        <h1>
          <v-icon large color="black"> mdi-file-certificate-outline</v-icon>
          ใบรับรอง
        </h1>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" md="5">
          <v-text-field label="ชื่อใบรับรอง" clearable />
        </v-col>

        <v-col cols="12" xs="12" md="4">
          <v-text-field label="หน่วยงานที่ออกใบรับรอง" clearable />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-text-field label="ปีที่ได้รับ (พ.ศ.)" clearable />
        </v-col>
      </v-row>

      <v-row
        ><v-col cols="12"><v-textarea label="รายละเอียด"></v-textarea></v-col
      ></v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class=" font-weight-light" color="primary">
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
export default {
  data() {
    return {
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
