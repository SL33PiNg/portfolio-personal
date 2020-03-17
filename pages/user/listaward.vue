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
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ชื่อผลงาน"
            outlined
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <card1 v-for="i in awardFilter" :key="i.id" :award="i"></card1>
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
    awards: [],
    loading: false,
    search: '',
    items: [
      { text: 'โครงการวิจัย', value: 1 },
      { text: 'บริการวิชาการ', value: 2 },
      { text: 'รางวัล', value: 3 },
      { text: 'อื่นๆ', value: 4 },
      { text: 'ทั้งหมด', value: 5 }
    ]
  }),
  computed: {
    awardFilter() {
      return this.awards.filter((award) => award.name.search(this.search) > -1)
    }
  },
  created() {
    this.getAllAwrds()
  },
  methods: {
    async getAllAwrds() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/users/award')
        this.awards = result
        console.log(this.awards)
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
