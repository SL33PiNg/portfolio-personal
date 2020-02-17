<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-briefcase-outline</v-icon>
          ข้อมูลประวัติการทำงาน
        </h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field label="ปีที่เข้าทำงาน (พ.ศ.)" />
        </v-col>

        <v-col cols="12" md="5" xs="12">
          <v-text-field label="ปีที่ออกจากงาน (พ.ศ.)" />
        </v-col>

        <v-col cols="12" md="2" xs="12">
          <v-checkbox class="mx-2" label="กำลังทำงาน"></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-text-field label="แผนก" />
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field label="ตำแหน่ง" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" md="9">
          <v-text-field label="ชื่อองค์กร" />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-select :items="items" label="ประเทศ"></v-select>
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
