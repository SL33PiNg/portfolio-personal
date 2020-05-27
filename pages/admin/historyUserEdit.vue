<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-history</v-icon>
            ประวัติการแก้ไขผู้ใช้งาน
          </h2></v-sheet
        >
      </v-row>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card outlined class="mx-auto ma-5">
        <v-row justify="end" class="mr-1">
          <v-col cols="auto">
            <v-chip @click="action = 'all'">ทั้งหมด</v-chip>
            <v-chip color="primary" @click="action = 'เพิ่ม'">เพิ่ม</v-chip>
            <v-chip color="warning" @click="action = 'แก้ไข'">แก้ไข</v-chip>
            <v-chip color="error" @click="action = 'ลบ'">ลบ</v-chip>
          </v-col>
        </v-row>
        <v-data-table
          :items="actionFillter"
          :headers="headers"
          :search="search"
        >
          <template v-slot:item.userID.personalInfo.firstnameTH="{ item }">
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
            <v-chip :color="getcolor(item.action)">
              {{ item.msg }}
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
        {
          text: 'ชื่อ',
          align: 'center',
          value: 'userID.personalInfo.firstnameTH',
          sort: (a, b) => b.localeCompare(a, 'th'),
        },
        { text: 'วัน/เวลา', align: 'center', value: 'date' },
        { text: 'IP', align: 'center', value: 'ip' },
        { text: 'การแก้ไข', align: 'center', value: 'type' },
      ],
      action: 'all',
    }
  },
  computed: {
    actionFillter() {
      return this.action === 'all'
        ? this.logs
        : this.logs.filter((log) => log.action === this.action)
    },
  },
  created() {
    this.getAllLogUser()
  },
  methods: {
    getcolor(action) {
      if (action === 'เพิ่ม') {
        return 'primary'
      } else if (action === 'แก้ไข') {
        return 'warning'
      } else if (action === 'ลบ') {
        return 'error'
      }
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
