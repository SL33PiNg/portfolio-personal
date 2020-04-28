<template>
  <v-container>
    <v-row justify="end" class="ma-1"> </v-row>
    <v-sheet color="primary" width="100%">
      <h1 class="ma-2 white--text">
        <v-icon large color="white">mdi-school-outline</v-icon>
        รายละเอียดข้อมูลผลงาน
      </h1></v-sheet
    >
    <v-col offset="3" cols="6">
      <v-img
        :src="`http://localhost:3000/api/award/${award.cover}`"
        height="300"
        width="523.31"
      ></v-img>
    </v-col>
    <v-card-subtitle>ชื่อ:{{ award.name }}</v-card-subtitle>
    <v-card-subtitle>ปี: </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle>รายละเอียด: </v-card-subtitle>
    <froalaView v-model="award.infoemation"></froalaView>
  </v-container>
</template>
<script>
export default {
  name: 'Type4',
  props: {
    award: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
