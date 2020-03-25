<template>
  <v-card class="mx-auto ma-8" max-width="90%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-briefcase-outline</v-icon>
            สร้างบัญชีผู้ดูแลระบบ
          </h1></v-sheet
        >
        <v-row>
          <v-col cols="12" md="6" xs="6">
            <v-card class="ma-5">
              <v-row justify="center"> <h2 class="mt-5">รายชื่อ</h2></v-row>
              <v-row class="mt-5">
                <v-row justify="center" wrap class="ma-2">
                  <v-col cols="12" md="8" xs="12">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="ค้นหารายชื่อ"
                      outlined
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-row>

              <v-data-table class="mb-2" :headers="headers"></v-data-table>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" xs="6">
            <v-card class="ma-5">
              <v-row justify="center"> <h2 class="mt-5">สร้างบัญชี</h2></v-row>
              <v-row justify="center" class="mt-5 ma-2">
                <v-col cols="12" md="8" xs="12">
                  <v-text-field label="ชื่อผู้ใช้" outlined class="">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="8" xs="12">
                  <v-text-field label="รหัสผ่าน" outlined> </v-text-field>
                </v-col>
                <v-col cols="12" md="8" xs="12">
                  <v-text-field label="ยืนยันรหัสผ่าน" outlined> </v-text-field>
                </v-col>
                <v-col cols="12" md="8" xs="12">
                  <v-btn block class="success mb-3">ยืนยัน</v-btn>
                </v-col></v-row
              >
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ชื่อ', align: 'start', value: 'name' },
        { text: 'สถานะ', align: 'start', value: 'status' },
        { text: 'การจัดการ', align: 'start', value: 'status' },
      ],
    }
  },
}
</script>
