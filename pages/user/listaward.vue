<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-seal-variant</v-icon>
            ผลงานทั้งหมด
          </h1></v-sheet
        >
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" md="5" xs="12">
          <v-select
            v-model="catagorySelect"
            :items="items"
            placeholder="เลือกประเภทผลงาน"
            outlined
          >
            ประเภทผลงาน
          </v-select>
        </v-col>
        <v-col cols="12" md="5" xs="12">
          <v-text-field v-model="search" label="ชื่อผลงาน" clearable outlined
        /></v-col>
      </v-row>
      <v-row justify="center">
        <card1 v-for="i in awards" :key="i.id" :award="i"></card1>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import card1 from '@/components/Cards/awardscard'
export default {
  components: {
    card1
  },

  data: () => ({
    catagorySelect: 5,
    awards: [
      {
        id: 0,
        title: 'Memento',
        catId: 1,
        year: 2019,
        fav: false
      },
      {
        id: 1,
        title: 'Inception',
        catId: 2,
        year: 2020,
        fav: false
      },
      {
        id: 2,
        title: 'Interstella',
        catId: 3,
        year: 2021,
        fav: false
      },
      {
        id: 3,
        title: 'Dunkerk',
        catId: 3,
        year: 2022,
        fav: false
      },
      {
        id: 4,
        title: 'Batman Begin',
        catId: 1,
        year: 2022,
        fav: false
      },
      {
        id: 5,
        title: 'The Dark Knight',
        catId: 1,
        year: 2022,
        fav: false
      },
      {
        id: 6,
        title: 'The Dark Knight Rises',
        catId: 1,
        year: 2022,
        fav: false
      },
      {
        id: 7,
        title: 'Tanet',
        catId: 3,
        year: 2022,
        fav: false
      },
      {
        id: 8,
        title: 'The Following',
        catId: 3,
        year: 2022,
        fav: false
      },
      {
        id: 9,
        title: 'Insomnia ',
        catId: 4,
        year: 2022,
        fav: false
      },
      {
        id: 10,
        title: 'The Prestige',
        catId: 4,
        year: 2022,
        fav: false
      }
    ],
    items: [
      { text: 'โครงการวิจัย', value: 1, color: 'light-blue lighten-4' },
      { text: 'บริการวิชาการ', value: 2, color: 'amber lighten-4' },
      { text: 'รางวัล', value: 3, color: 'teal lighten-4' },
      { text: 'อื่นๆ', value: 4, color: 'green lighten-4' },
      { text: 'ทั้งหมด', value: 5, color: '' }
    ]
  })
}
</script>

<style></style>
