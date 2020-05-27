<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-history</v-icon>
            ประวัติการแก้ไขแอดมิน
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
        <v-data-table :search="search" :items="logs" :headers="headers">
          <template v-slot:item.userID.personalInfo.firstnameTH="{ item }">
            <p>
              {{ item.userID.personalInfo.firstnameTH }}
              {{ item.userID.personalInfo.lastnameTH }}
            </p>
          </template>
          <template v-slot:item.adminID.personalInfo.firstnameTH="{ item }">
            <p>
              {{ item.adminID.personalInfo.firstnameTH }}
              {{ item.adminID.personalInfo.lastnameTH }}
            </p>
          </template>
          <template v-slot:item.date="{ item }">
            <p>
              {{ item.date | toDateString }}
            </p>
          </template>
          <template v-slot:item.information="{ item }">
            <v-menu :open-on-hover="true">
              <template v-slot:activator="{ on }">
                <div style="max-width: 100px;" v-on="on">
                  <p class="text-truncate">
                    {{ item.msg }}
                  </p>
                </div>
              </template>
              <v-card width="250">
                {{ item.msg }}
              </v-card>
            </v-menu>
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip :color="getcolor(item.logType)">
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
        {
          text: 'ชื่อ ผู้ถูกแก้ไข',
          align: 'start',
          value: 'userID.personalInfo.firstnameTH',
          sort: (a, b) => b.localeCompare(a, 'th'),
        },
        {
          text: 'ชื่อ ผู้แก้ไข',
          align: 'start',
          value: 'adminID.personalInfo.firstnameTH',
          sort: (a, b) => b.localeCompare(a, 'th'),
        },
        { text: 'วัน/เวลา', align: 'center', value: 'date' },
        { text: 'การแก้ไข', align: 'center', value: 'type' },
        { text: 'หมายเหตุ', align: 'start', value: 'information' },
      ],
    }
  },
  created() {
    this.getAllLog()
  },
  methods: {
    getcolor(type) {
      return type === 1 ? 'primary' : type === 2 ? 'warning' : 'error'
    },
    async getAllLog() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/admin/history')
        this.logs = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
