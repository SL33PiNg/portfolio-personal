<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-trophy-award</v-icon>
            ผลงานทั้งหมด
          </h1></v-sheet
        >
      </v-row>
      <v-row
        ><v-col cols="12" md="6">
          <v-select
            v-model="catagorySelect"
            :items="items"
            placeholder="เลือกประเภทผลงาน"
            class="ma-2"
          >
            ประเภทผลงาน
          </v-select></v-col
        >
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="ชื่อผลงาน"
            clearable
            class="ma-2"
          />
        </v-col>
      </v-row>
      <v-subheader>รายการค้นหา ({{ hiddenawards.length }} )</v-subheader>
      <v-row justify="center">
        <card1 v-for="i in hiddenawards" :key="i.id" :award="i"></card1>
      </v-row> </v-container
  ></v-card>
</template>

<script>
import card1 from '@/components/Cards/feedscard'
export default {
  components: {
    card1,
  },
  data: () => ({
    group: 'awardType',
    search: '',
    catagorySelect: 5,
    awards: [],
    items: [
      { text: 'โครงการวิจัย', value: 1 },
      { text: 'บริการวิชาการ', value: 2 },
      { text: 'รางวัล', value: 3 },
      { text: 'อื่นๆ', value: 4 },
      { text: 'ทั้งหมด', value: 5 },
    ],
  }),
  computed: {
    // awardFilter() {
    //   return this.awards.filter((award) => award.name.search(this.search) > -1)
    // },
    hiddenawards() {
      return this.filterString.filter((award) => award.highlights === true)
    },
    filterCat() {
      if (this.catagorySelect === 5) {
        return this.awards
      }
      return this.awards.filter(
        (award) => award.awardType === this.catagorySelect
      )
    },
    filterString() {
      if (this.search) {
        return this.filterCat.filter(
          (award) =>
            award.name.search(this.search) >= 0 ||
            award.eventYear.search(this.search) >= 0
        )
      }
      return this.filterCat
    },
  },
  created() {
    this.getAwardhighlights()
  },
  methods: {
    async getAwardhighlights() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/admin/award')
        this.awards = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
