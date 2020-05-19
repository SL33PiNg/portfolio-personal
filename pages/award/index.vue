<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-trophy-award</v-icon>
            ผลงานทั้งหมด{{ filAwardtype }}
          </h1></v-sheet
        >
      </v-row>
      <template v-if="!type">
        <v-subheader class="ma-2"><h3>โครงการวิจัย</h3> </v-subheader>
        <v-row justify="center">
          <v-slide-group>
            <card1 v-for="i in filAwardtype1" :key="i.id" :award="i"></card1>
          </v-slide-group>
        </v-row>

        <v-row justify="end">
          <router-link to="/award?type=1"
            ><div class="black--text mb-3 mr-3">
              ดูโครงการวิจัยเพิ่มเติม
            </div></router-link
          >
        </v-row>

        <v-subheader class="ma-2"
          >,
          <h3>บริการวิชาการ</h3></v-subheader
        >
        <v-row justify="center">
          <v-slide-group>
            <card1 v-for="i in filAwardtype2" :key="i.id" :award="i"></card1>
          </v-slide-group>
        </v-row>
        <v-row justify="end">
          <router-link to="/award?type=2"
            ><div class="black--text mb-3 mr-3">
              ดูบริการวิชาการเพิ่มเติม
            </div>
          </router-link>
        </v-row>

        <v-subheader class="ma-2"><h3>รางวัล</h3></v-subheader>
        <v-row justify="center">
          <v-slide-group>
            <card1 v-for="i in filAwardtype3" :key="i.id" :award="i"></card1>
          </v-slide-group>
        </v-row>
        <v-row justify="end">
          <router-link to="/award?type=3"
            ><div class="black--text mb-3 mr-3">
              ดูรางวัลเพิ่มเติม
            </div></router-link
          >
        </v-row>

        <v-subheader class="ma-2"><h3>อื่นๆ</h3></v-subheader>
        <v-row justify="center">
          <v-slide-group>
            <card1 v-for="i in filAwardtype4" :key="i.id" :award="i"></card1>
          </v-slide-group>
        </v-row>
        <v-row justify="end">
          <router-link to="/award?type=4"
            ><div class="black--text mb-3 mr-3">
              ดูอื่นๆเพิ่มเติม
            </div></router-link
          >
        </v-row>
      </template>
      <template v-else>
        <v-row justify="end">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              label="ชื่อผลงาน"
              clearable
              class="ma-2"
            />
          </v-col>
        </v-row>
        <v-subheader class="ma-2"
          ><h3>{{ getNameBytype }}</h3></v-subheader
        >
        <v-row justify="center">
          <card1 v-for="i in filterString" :key="i.id" :award="i"></card1>
        </v-row>
        <v-row justify="end">
          <v-btn class="mr-3 primary" to="/award">กลับไปหน้าหลัก</v-btn>
        </v-row>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import card1 from '@/components/Cards/feedscard'
export default {
  components: {
    card1,
  },
  data: () => ({
    type: null,
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
    getNameBytype() {
      if (this.type) {
        return this.items.find((a) => a.value === this.type).text
      } else {
        return ''
      }
    },
    filterByType() {
      if (this.type) {
        return this.awards.filter((award) => award.awardType === this.type)
      } else {
        return []
      }
    },
    filAwardtype1() {
      return this.awards.filter((award) => award.awardType === 1).slice(0, 2)
    },
    filAwardtype2() {
      return this.awards.filter((award) => award.awardType === 2).slice(0, 2)
    },
    filAwardtype3() {
      return this.awards.filter((award) => award.awardType === 3).slice(0, 2)
    },
    filAwardtype4() {
      return this.awards.filter((award) => award.awardType === 4).slice(0, 2)
    },
    // hiddenawards() {
    //   return this.filterString.filter((award) => award.highlights === true)
    // // },
    // filterCat() {
    //   if (this.catagorySelect === 5) {
    //     return this.awards
    //   }
    //   return this.awards.filter(
    //     (award) => award.awardType === this.catagorySelect
    //   )
    // },
    filterString() {
      if (this.search) {
        return this.filterByType.filter(
          (award) =>
            award.name.search(this.search) >= 0 ||
            award.eventYear.search(this.search) >= 0
        )
      }
      return this.filterByType
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(newVal) {
        if (newVal.type) {
          if (['1', '2', '3', '4'].includes(newVal.type)) {
            this.type = Number(newVal.type)
          } else {
            this.type = null
          }
        } else {
          this.type = null
        }
      },
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
