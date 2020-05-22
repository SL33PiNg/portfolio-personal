<template>
  <v-container>
    <v-col offset="3" cols="6">
      <v-img
        :src="`http://localhost:3000/api/award/${award.cover}`"
        height="300"
        width="523.31"
        contain
      ></v-img>
    </v-col>
    <v-card-subtitle>ชื่อรางวัล:{{ award.name }} </v-card-subtitle>
    <v-card-subtitle>ปีที่ได้รับรางวัล:{{ award.eventYear }} </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle>รายละเอียด: </v-card-subtitle>
    <froalaView v-model="award.infoemation"></froalaView>
  </v-container>
</template>
<script>
export default {
  name: 'Type3',
  props: {
    award: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
