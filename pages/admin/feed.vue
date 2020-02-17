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
        <v-list>
          <v-subheader>ผลงานเด่น ({{ showawards.length }})</v-subheader>
          <v-list-item
            v-for="i in showawards"
            :key="i.id"
            :class="items[i.catId - 1].color"
            three-line
            @click="i.isPublic = !i.isPublic"
          >
            <v-list-item-content>
              <v-list-item-title>{{ i.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                i.catId | idToString(items)
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ i.year }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider :inset="true" class="grey darken-2"></v-divider>

          <v-subheader>รายการค้นหา ({{ hiddenawards.length }})</v-subheader>
          <v-list-item
            v-for="i in hiddenawards"
            :key="i.id"
            :class="items[i.catId - 1].color"
            three-line
            @click="i.isPublic = !i.isPublic"
          >
            <v-list-item-content>
              <v-list-item-title>{{ i.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                i.catId | idToString(items)
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ i.year }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  filters: {
    idToString(value, items) {
      return items[value - 1].text
    }
  },
  data: () => ({
    search: '',
    catagorySelect: 5,
    awards: [
      {
        id: 0,
        title: 'Memento',
        catId: 1,
        year: 2019,
        isPublic: false
      },
      {
        id: 1,
        title: 'Inception',
        catId: 2,
        year: 2020,
        isPublic: false
      },
      {
        id: 2,
        title: 'Interstella',
        catId: 3,
        year: 2021,
        isPublic: false
      },
      {
        id: 3,
        title: 'Dunkerk',
        catId: 3,
        year: 2022,
        isPublic: false
      },
      {
        id: 4,
        title: 'Batman Begin',
        catId: 1,
        year: 2022,
        isPublic: false
      },
      {
        id: 5,
        title: 'The Dark Knight',
        catId: 1,
        year: 2022,
        isPublic: false
      },
      {
        id: 6,
        title: 'The Dark Knight Rises',
        catId: 1,
        year: 2022,
        isPublic: false
      },
      {
        id: 7,
        title: 'Tanet',
        catId: 3,
        year: 2022,
        isPublic: false
      },
      {
        id: 8,
        title: 'The Following',
        catId: 3,
        year: 2022,
        isPublic: false
      },
      {
        id: 9,
        title: 'Insomnia ',
        catId: 4,
        year: 2022,
        isPublic: false
      },
      {
        id: 10,
        title: 'The Prestige',
        catId: 4,
        year: 2022,
        isPublic: false
      }
    ],
    items: [
      { text: 'โครงการวิจัย', value: 1, color: 'light-blue lighten-4' },
      { text: 'บริการวิชาการ', value: 2, color: 'amber lighten-4' },
      { text: 'รางวัล', value: 3, color: 'teal lighten-4' },
      { text: 'อื่นๆ', value: 4, color: 'green lighten-4' },
      { text: 'ทั้งหมด', value: 5, color: '' }
    ]
  }),
  computed: {
    showawards() {
      return this.filterCat.filter((x) => x.isPublic === true)
    },
    hiddenawards() {
      return this.filterString.filter((x) => x.isPublic === false)
    },
    filterCat() {
      if (this.catagorySelect === 5) {
        return this.awards
      }
      return this.awards.filter((x) => x.catId === this.catagorySelect)
    },
    filterString() {
      if (this.search) {
        return this.filterCat.filter((x) => x.title.search(this.search) >= 0)
      }
      return this.filterCat
    }
  }
}
</script>
