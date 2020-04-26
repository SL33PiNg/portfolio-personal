<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-history</v-icon>
            ประวัติการแก้ไขผู้ใช้งาน
          </h1></v-sheet
        >
      </v-row>
      <v-card-title>
        <v-text-field
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card outlined class="mx-auto ma-5">
        <v-data-table :items="logs" :headers="headers">
          <template v-slot:item.name="{ item }">
            <p>
              {{ item.userID.personalInfo.firstnameTH }}
              {{ item.userID.personalInfo.lastnameTH }}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    text-center
                    v-on="on"
                    @click="$router.push(`/profile/${item.userID.username}`)"
                  >
                    mdi-account
                  </v-icon>
                </template>
                <span>ไปยังหน้าโปรไฟล์</span>
              </v-tooltip>
            </p>
          </template>
          <template v-slot:item.date="{ item }">
            <p>
              {{ item.date | toDateString }}
            </p>
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip :color="getcolor(item.userLog)">
              {{ item.userLog }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  filters: {
    toDateString(date) {
      const dd = new Date(date)
      return dd.toLocaleString('th-TH')
    },
  },
  data() {
    return {
      loading: false,
      logs: [],
      search: '',
      headers: [
        { text: 'ชื่อ', align: 'start', value: 'name' },
        { text: 'วัน/เวลา', align: 'center', value: 'date' },
        { text: 'IP', align: 'center', value: 'ip' },
        { text: 'การแก้ไข', align: 'center', value: 'type' },
      ],
    }
  },
  created() {
    this.getAllLogUser()
  },
  methods: {
    getcolor(type) {
      return type === 'เพิ่มข้อมูลประวัติการทำงาน' ||
        type === 'เพิ่มข้อมูลใบรับรอง' ||
        type === 'เพิ่มข้อมูลประวัติการศึกษา'
        ? 'primary'
        : 'error'
    },
    async getAllLogUser() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/admin/historyUserEdit')
        this.logs = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
