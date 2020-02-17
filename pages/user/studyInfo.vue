<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-school-outline</v-icon>
          ข้อมูลประวัติการศึกษา
        </h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-select :items="items" label="ระดับวุฒิการศึกษา"></v-select>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field label="วุฒิการศึกษา" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field label="สาขา" />
        </v-col>
        <v-col cols="12" md="5" xs="12">
          <v-text-field label="ปีที่สำเร็จการศึกษา (พ.ศ.)" />
        </v-col>
        <v-col cols="12" md="2" xs="12">
          <v-checkbox class="mx-2" label="กำลังศึกษา"></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="9" xs="12">
          <v-text-field label="ชื่อสถานศึกษา" />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-select :items="pated" label="ประเทศ"></v-select>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class="mx-0 font-weight-light" color="primary">
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
export default {
  data() {
    return {
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
