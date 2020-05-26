<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-pencil-outline</v-icon>
            แก้ไขหมวดหมู่
          </h2></v-sheet
        >
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-tabs centered>
            <v-tab to="/admin/edit">หน่วยงาน</v-tab>
            <v-tab to="/admin/edit/expert">ความเชี่ยวชาญ</v-tab>
            <v-tab to="/admin/edit/position-ocsc">ตำแหน่งสายงาน(ก.พ.)</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <nuxt-child></nuxt-child>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      positions: [
        { name: 'บริหาร' },
        { name: 'บริหารการปกครอง' },
        { name: 'บริหารงานทูต' },
        { name: 'ตราราชการกระทรวง' },
      ],
      sections: [
        'บริหาร',
        'บริหารการปกครอง',
        'บริหารงานทูต',
        'ตราราชการกระทรวง',
      ],
    }
  },
}
</script>
