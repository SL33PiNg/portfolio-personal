<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-pencil-outline</v-icon>
          แก้ไขหมวดหมู่
        </h1>
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
        { name: 'ตราราชการกระทรวง' }
      ],
      sections: [
        'บริหาร',
        'บริหารการปกครอง',
        'บริหารงานทูต',
        'ตราราชการกระทรวง'
      ]
    }
  }
}
</script>
