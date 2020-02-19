<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="success" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-briefcase-outline</v-icon>
            ข้อมูลประวัติการทำงาน
          </h1></v-sheet
        >
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12" md="5" xs="12">
          <v-text-field label="ปีที่เข้าทำงาน (พ.ศ.)" outlined />
        </v-col>

        <v-col cols="12" md="5" xs="12">
          <v-text-field label="ปีที่ออกจากงาน (พ.ศ.)" outlined />
        </v-col>

        <v-col cols="12" md="2" xs="12">
          <v-checkbox
            class="mx-2"
            label="กำลังทำงาน"
            outlined
          ></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-text-field label="แผนก" outlined />
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field label="ตำแหน่ง" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" md="9">
          <v-text-field label="ชื่อองค์กร" outlined />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-select :items="items" label="ประเทศ" outlined></v-select>
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
export default {
  data() {
    return {
      headers: [
        {
          text: 'ตำแหน่ง',
          align: 'left',
          value: 'name'
        },
        {
          text: 'ชื่อองค์กร',
          align: 'left',
          value: 'name'
        },
        {
          text: 'สถานะ',
          align: 'left',
          value: 'name'
        }
      ],
      items: ['ไทย', 'อังกฤษ', 'ลาว', 'พม่า', 'จีน'],
      work: [
        {
          name: 'ผู้อำนวยการ'
        },
        {
          name: 'รองผู้อำนวยการ'
        }
      ]
    }
  }
}
</script>
