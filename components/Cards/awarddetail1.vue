<template>
  <v-dialog v-model="dialog" width="70%">
    <v-card>
      <v-container>
        <v-row justify="end" class="ma-1 ">
          <v-icon color="red" @click="dialog = false">
            mdi-close-box</v-icon
          ></v-row
        >
        <v-sheet color="primary" width="100%">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-school-outline</v-icon>
            รายละเอียดข้อมูลผลงาน
          </h1></v-sheet
        >
        <v-card-title class="headline"> {{ award.name }}</v-card-title>
        <v-card-subtitle>ประเภทผลงาน: {{ award.catId }} </v-card-subtitle>
        <v-card-subtitle>ปี: {{ award.fiscalYear }}</v-card-subtitle>
        <v-card-subtitle>ตำแหน่ง: {{ award.fiscalYear }}</v-card-subtitle>
        <v-card-subtitle
          >ชื่อโครงการภาษาไทย: {{ award.fiscalYear }}</v-card-subtitle
        >
        <v-card-subtitle
          >ชื่อโครงการภาษาอังกฤษ: {{ award.fiscalYear }}</v-card-subtitle
        >
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    award: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {}
}
</script>
