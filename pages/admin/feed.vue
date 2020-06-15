<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-newspaper-variant-outline</v-icon>
            การแสดงผลงาน
          </h2></v-sheet
        >
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="catagorySelect"
            :items="items"
            placeholder="เลือกประเภทผลงาน"
          >
            ประเภทผลงาน
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="search" label="ชื่อผลงาน" clearable />
        </v-col>
      </v-row>
      <v-row>
        <template>
          <v-subheader>ผลงานเด่น ({{ showawards.length }} / 5)</v-subheader>

          <v-carousel height="400" light hide-delimiters align="center">
            <v-carousel-item
              v-for="award in showawards"
              :key="award.id"
              reverse-transition="fade-transition"
              transition="fade-transition"
              contain
              link
            >
              <card1 :award="award" @reload="getAwardhighlights"></card1>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-row>

      <v-row justify="center">
        <card1
          v-for="i in hiddenawards"
          :key="i.id"
          :award="i"
          :disable="isMaxMark"
          @reload="getAwardhighlights"
        ></card1>
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
    search: '',
    catagorySelect: 5,
    awards: [],
    items: [
      { text: 'โครงการวิจัย', value: 1, color: 'light-blue lighten-4' },
      { text: 'บริการวิชาการ', value: 2, color: 'amber lighten-4' },
      { text: 'รางวัล', value: 3, color: 'teal lighten-4' },
      { text: 'อื่นๆ', value: 4, color: 'green lighten-4' },
      { text: 'ทั้งหมด', value: 5, color: '' },
    ],
  }),
  computed: {
    isMaxMark() {
      return this.showawards.length >= 5
    },
    showawards() {
      return this.filterCat.filter((award) => award.markedAward === true)
    },
    hiddenawards() {
      return this.filterString.filter((award) => award.markedAward === false)
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
