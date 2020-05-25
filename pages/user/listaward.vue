<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-seal-variant</v-icon>
            ผลงานทั้งหมด
          </h2></v-sheet
        >
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" md="5" xs="12">
          <v-select
            v-model="catagorySelect"
            :items="items"
            placeholder="เลือกประเภทผลงาน"
            outlined
            dense
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
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-subheader>ผลงานเด่น ({{ showawards.length }})</v-subheader>
      <v-row justify="center">
        <card1
          v-for="i in showawards"
          :key="i.id"
          :award="i"
          @toggleDelete="openDel"
          @reload="getAllAwrds"
        ></card1>
      </v-row>

      <v-divider :inset="true" class="grey darken-2"></v-divider>

      <v-subheader>รายการค้นหา ({{ hiddenawards.length }})</v-subheader>
      <v-row justify="center">
        <card1
          v-for="i in hiddenawards"
          :key="i.id"
          :award="i"
          @toggleDelete="openDel"
          @reload="getAllAwrds"
        ></card1>
      </v-row>
    </v-container>
    <v-dialog v-model="delDialog" max-width="500px">
      <v-card>
        <v-container>
          <v-card-title>ต้องการลบผลงาน: {{ tempAward.name }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="delAward()">
              ตกลง
            </v-btn>
            <v-btn color="" @click="delDialog = false">
              ยกเลิก
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import card1 from '@/components/Cards/feedscard'
export default {
  components: {
    card1,
  },

  data: () => ({
    tempAward: {},
    delDialog: false,
    catagorySelect: 5,
    awards: [],
    loading: false,
    search: '',
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
    showawards() {
      return this.filterCat.filter((award) => award.highlights === true)
    },
    hiddenawards() {
      return this.filterString.filter((award) => award.highlights === false)
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
    this.getAllAwrds()
  },
  methods: {
    openDel(award) {
      this.tempAward = { ...award }
      this.delDialog = true
    },
    async getAllAwrds() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/users/award')
        this.awards = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    async delAward() {
      this.loading = true
      try {
        await this.$axios.$delete(`/users/award/${this.tempAward._id}`)
        this.$toast.show('ลบข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('ลบข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.delDialog = false
        this.loading = false
        this.getAllAwrds()
      }
    },
  },
}
</script>

<style></style>
