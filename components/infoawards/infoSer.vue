<template>
  <v-container>
    <v-row justify="end" class="ma-1 "> </v-row>
    <v-sheet color="primary" width="100%">
      <h1 class="ma-2 white--text">
        <v-icon large color="white">mdi-school-outline</v-icon>
        รายละเอียดข้อมูลผลงาน
      </h1></v-sheet
    >
    <v-card-subtitle>ชื่องานบริการวิชาการ:{{ award.name }} </v-card-subtitle>
    <v-card-subtitle>ปีที่จัดงาน:{{ award.eventYear }} </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle>รายละเอียด : </v-card-subtitle>
    <froalaView v-model="award.infoemation"></froalaView>
  </v-container>
</template>
<script>
export default {
  props: {
    award: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
