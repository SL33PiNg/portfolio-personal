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
                  จัดการฟีดข่าว
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
        <v-subheader>ผลงานเด่น ({{ showawards.length }} / 5)</v-subheader>
        <v-row justify="center">
          <card1
            v-for="i in showawards"
            :key="i.id"
            :award="i"
            @reload="getAwardhighlights"
          ></card1>
        </v-row>

        <v-divider :inset="true" class="grey darken-2"></v-divider>

        <v-subheader>รายการค้นหา ({{ hiddenawards.length }})</v-subheader>
        <v-row justify="center">
          <card1
            v-for="i in hiddenawards"
            :key="i.id"
            :award="i"
            :disable="isMaxMark"
            @reload="getAwardhighlights"
          ></card1>
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
          (award) => award.name.search(this.search) >= 0
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
