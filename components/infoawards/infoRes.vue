<template>
  <v-container>
    <v-row class="mt-n8">
      <v-col offset="3" cols="6">
        <v-img
          :src="`http://localhost:3000/api/award/${award.cover}`"
          height="300"
          width="523.31"
          contain
        ></v-img>
      </v-col>
    </v-row>
    <v-card outlined class="ma-12">
      <v-card-title class="blue-grey lighten-5 blue-grey--text">
        ข้อมูลโครงการงานวิจัย</v-card-title
      ><v-simple-table>
        <template v-slot:default>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <td class="text-left">
              ชื่อโครงการ
            </td>
            <td class="text-left">
              <v-span class="ml-n12">{{ award.name }}</v-span>
            </td>
          </tbody>
          <tbody>
            <td class="text-left blue-grey lighten-5">
              ชื่อโครงการภาษาอังกฤษ
            </td>
            <td class="text-left blue-grey lighten-5">
              <v-span class="ml-n12">{{ award.nameEN }}</v-span>
            </td>
          </tbody>
          <tbody>
            <td class="text-left">
              ประเภทโครงการวิจัย
            </td>
            <td class="text-left">
              <v-span class="ml-n12">{{ award.researchCategory }}</v-span>
            </td>
          </tbody>
          <tbody>
            <td class="text-left blue-grey lighten-5">
              ตำแหน่งในโครงการวิจัย
            </td>
            <td class="text-left blue-grey lighten-5">
              <v-span class="ml-n12">{{ award.jobTitles }}</v-span>
            </td>
          </tbody>
          <tbody>
            <td class="text-left">
              ปีที่จัดทำโครงการ
            </td>
            <td class="text-left">
              <v-span class="ml-n12">{{ award.eventYear }}</v-span>
            </td>
          </tbody>
          <tbody>
            <td class="text-left blue-grey lighten-5">
              ปีงบประมาณ
            </td>
            <td class="text-left blue-grey lighten-5">
              <v-span class="ml-n12">{{ award.fiscalYear }}</v-span>
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
  name: 'Type1',
  props: {
    award: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
<style>
.v-card__title {
  -webkit-box-align: center;
  align-items: center;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;

  letter-spacing: 0.0125em;
  line-height: 1.5rem;
  word-break: break-all;
}
</style>
