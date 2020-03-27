<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-card width="80%" class="mt-6">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <h1>
                  <v-icon large color="black"
                    >mdi-newspaper-variant-outline</v-icon
                  >
                  ผลงานทั้งหมด
                </h1>
              </v-flex>
              <v-flex xs12 md6>
                <v-select
                  v-model="catagorySelect"
                  :items="items"
                  placeholder="เลือกประเภทผลงาน"
                >
                  ประเภทผลงาน
                </v-select>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="search" label="ชื่อผลงาน" clearable />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-subheader>รายการค้นหา ({{ hiddenawards.length }} )</v-subheader>
        <v-row justify="center">
          <card1 v-for="i in hiddenawards" :key="i.id" :award="i"></card1>
        </v-row>
      </v-card>
    </v-layout>
  </v-container>
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
