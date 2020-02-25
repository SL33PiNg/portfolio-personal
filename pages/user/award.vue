<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-trophy-award</v-icon>
            ข้อมูลผลงาน
          </h1></v-sheet
        >
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12" xs="12" md="12">
          <v-select
            v-model="select"
            :items="items"
            placeholder="เลือกประเภทผลงาน"
            outlined
            >ประเภทผลงาน</v-select
          ></v-col
        ></v-row
      >

      <award1 v-if="select === 1"></award1>
      <award2 v-else-if="select === 2"></award2>
      <award3 v-else-if="select === 3"></award3>
      <award4 v-else-if="select === 4"></award4>
    </v-container>
  </v-card>
</template>
<script>
import award1 from '@/components/award/awardinfo1'
import award2 from '@/components/award/awardinfo2'
import award3 from '@/components/award/awardinfo3'
import award4 from '@/components/award/awardinfo4'

export default {
  components: {
    award1,
    award2,
    award3,
    award4
  },
  data() {
    return {
      select: 1,
      items: [
        { text: 'โครงการวิจัย', value: 1 },
        { text: 'บริการวิชาการ', value: 2 },
        { text: 'รางวัล', value: 3 },
        { text: 'อื่นๆ', value: 4 }
      ]
    }
  }
}
</script>
