<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-history</v-icon>
            การร้องเรียน
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
        <v-data-table
          :items="reports"
          :search="search"
          :headers="headers"
          hide-default-footer
        >
          <template v-slot:top>
            <v-dialog v-model="account" max-width="500px">
              <v-card>
                <v-container>
                  <v-card-title>
                    <span class="headline">สถานะการร้องเรียน</span>
                  </v-card-title>
                  <v-row justify="center">
                    <v-radio-group v-model="tempDataItem.status">
                      <v-radio label="ตรวจสอบแล้ว " :value="true"></v-radio>
                      <v-radio label="ยังไม่ตรวจสอบ" :value="false"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-card-text>
                    <span class="headline">รายละเอียด</span>
                    <froalaView v-model="tempDataItem.information"></froalaView>
                  </v-card-text>

                  <v-card-text>
                    <span class="headline">ภาพประกอบ</span>
                    <v-img
                      :src="`http://localhost:3000/api/report/${tempDataItem.cover}`"
                      height="250"
                      width="450"
                      contain
                    ></v-img>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="" @click="account = false">
                      ยกเลิก
                    </v-btn>
                    <v-btn color="primary" @click="allowReport">
                      บันทึก
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog>

            <v-dialog v-model="del" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">ลบการร้องเรียน </span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <p>
                        ต้องการลบรายการร้องเรียนของ
                        {{ tempDataItem.reportName }} ?
                      </p>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="" @click="del = false"> ยกเลิก </v-btn
                  ><v-btn color="error" @click="delReports(tempDataItem)">
                    ตกลง
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip :class="item.status ? 'success' : 'error'">{{
              item.status ? 'ตรวจสอบแล้ว' : 'ยังไม่ตรวจสอบ'
            }}</v-chip>
          </template>
          <template v-slot:item.profilefirstnameTH="{ item }">
            <p>
              {{ item.profilefirstnameTH }}
              {{ item.profilelastnameTH }}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    text-center
                    v-on="on"
                    @click="$router.push(`/profile/${item.profileName}`)"
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
          <template v-slot:item.action="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="warning" v-on="on">
                  <v-icon text-center @click="Account(item)">
                    mdi-alert-rhombus-outline
                  </v-icon></v-chip
                >
              </template>
              <span>รายละเอียดการร้องเรียน </span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="error" v-on="on"
                  ><v-icon text-center @click="openDel(item)">
                    mdi-delete
                  </v-icon></v-chip
                >
              </template>
              <span>ลบการร้องเรียน</span>
            </v-tooltip>
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
      del: false,
      reports: [],
      loading: false,
      account: false,
      search: '',
      tempDataItem: {},
      headers: [
        {
          text: 'ชื่อ ผู้ร้องเรียน',
          align: 'start',
          value: 'reportName',
        },
        {
          text: 'ชื่อ ผู้ถูกร้องเรียน',
          align: 'center',
          value: 'profilefirstnameTH',
          sort: (a, b) => b.localeCompare(a, 'th'),
        },
        { text: 'วัน/เวลา', align: 'center', value: 'date' },
        { text: 'การแก้ไข', align: 'center', value: 'status' },
        { text: 'การจัดการ', align: 'center', value: 'action' },
      ],
    }
  },
  created() {
    this.getAllReport()
  },
  methods: {
    Account(item) {
      this.tempDataItem = { ...item }
      this.account = true
    },
    async getAllReport() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/admin/reports')
        this.reports = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    async allowReport() {
      this.loading = true
      try {
        if (this.tempDataItem.status)
          await this.$axios.$get(`/admin/allowReport/${this.tempDataItem._id}`)
        else
          await this.$axios.$get(
            `/admin/NotAllowedReport/${this.tempDataItem._id}`
          )
      } catch (error) {
      } finally {
        this.loading = false
        this.account = false

        this.getAllReport()
      }
    },
    openDel(item) {
      this.tempDataItem = item
      this.del = true
    },
    async delReports() {
      try {
        await this.$axios.$delete(`/admin/delReports/${this.tempDataItem._id}`)
        this.$toast.show('ลบข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('ลบข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.del = false
        this.tempDataItem = ''
        this.getAllReport()
      }
    },
  },
}
</script>
