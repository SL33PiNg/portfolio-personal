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
    <v-card outlined class="ma-12">
      <v-card-title class="blue-grey lighten-5 blue-grey--text">
        ข้อมูลรางวัล</v-card-title
      ><v-simple-table>
        <template v-slot:default>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <td class="text-left">
              ชื่อรางวัล
            </td>
            <td class="text-left">
              <v-span class="ml-n12">{{ award.name }}</v-span>
            </td>
          </tbody>
          <tbody>
            <td class="text-left blue-grey lighten-5">
              ปีที่ได้รับรางวัล
            </td>
            <td class="text-left blue-grey lighten-5">
              <v-span class="ml-n12">{{ award.eventYear }}</v-span>
            </td>
          </tbody>
        </template>
      </v-simple-table>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <td class="text-left">
                รายละเอียด
              </td>
            </tr>
            <tr>
              <froalaView
                v-model="award.infoemation"
                class="ml-4 ma-1"
              ></froalaView>
            </tr>
          </thead>
        </template>
      </v-simple-table>
    </v-card>
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
