<template>
  <v-card width="auto" height="auto" class="ma-3">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h3>
            {{ award.name }}
          </h3>
        </v-list-item-title>
      </v-list-item-content>
      <v-btn icon @click="award.highlights = !award.highlights">
        <v-icon :color="award.highlights ? 'yellow' : 'grey'">mdi-star</v-icon>
      </v-btn>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="150"
      width="auto"
    ></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle
          ><h4>ประเภทผลงาน: {{ award.awardType | idToString(items) }}</h4>
          ปี: {{ award.fiscalYear }}
        </v-list-item-subtitle> </v-list-item-content
      ><v-btn icon @click.stop="openDetail(i)"
        ><v-icon>mdi-magnify</v-icon></v-btn
      >
      <v-btn icon><v-icon>mdi-delete-outline</v-icon></v-btn>
    </v-list-item>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-container>
            <v-row justify="end" class="ma-1 ">
              <v-icon color="red" @click="dialog = false">
                mdi-close-box</v-icon
              ></v-row
            >
            <v-sheet color="primary" width="100%">
              <h1 class="ma-2 white--text">
                <v-icon large color="white">mdi-school-outline</v-icon>
                รายละเอียดข้อมูลผลงาน
              </h1></v-sheet
            >
            <v-card-title class="headline ma-2"> {{ award.name }}</v-card-title>
            <v-card-subtitle
              >ประเภทโครงการวิจัย: {{ award.awardType }}
            </v-card-subtitle>
            <v-card-subtitle>ปี: {{ award.fiscalYear }}</v-card-subtitle>
            <v-card-subtitle>ปี: {{ award.fiscalYear }}</v-card-subtitle>
            <v-card-subtitle
              >ตำแหน่งในโครงการวิจัย: {{ award.jobTitles }}</v-card-subtitle
            >
            <v-card-subtitle
              >ชื่อโครงการภาษาไทย: {{ award.name }}</v-card-subtitle
            >
            <v-card-subtitle
              >ชื่อโครงการภาษาอังกฤษ: {{ award.nameEN }}</v-card-subtitle
            >
            <v-card-subtitle>ปีที่จัด: {{ award.eventYear }}</v-card-subtitle>
            รายละเอียด :<froalaView v-model="award.infoemation"></froalaView>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
export default {
  filters: {
    idToString(value, items) {
      return items[value - 1].text
    }
  },
  props: {
    award: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      items: [
        { text: 'โครงการวิจัย', value: 1 },
        { text: 'บริการวิชาการ', value: 2 },
        { text: 'รางวัล', value: 3 },
        { text: 'อื่นๆ', value: 4 },
        { text: 'ทั้งหมด', value: 5 }
      ]
    }
  },
  methods: {
    openDel(item) {
      this.tempDataItem = item
      this.del = true
    }
  }
}
</script>

<style></style>
