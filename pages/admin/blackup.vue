<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-history</v-icon>
            สำรองข้อมูล
          </h1></v-sheet
        >
      </v-row>

      <v-row justify="center" class="ma-2">
        <v-col cols="11" md="11" xs="1" sm="6">
          <v-btn block class="primary" @click="backup">สำรองข้อมูล </v-btn>
        </v-col>
      </v-row>

      <v-card outlined class="mx-auto ma-5">
        <v-data-table :items="backupList" :headers="headers">
          <template v-slot:top>
            <v-dialog v-model="restore" max-width="500px">
              <v-card>
                <v-container>
                  <v-card-title>
                    <span class="headline"
                      >ต้องการกู้คืนข้อมูลของวันที่ {{ folderName }}</span
                    >
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="Restore()">
                      ตกลง
                    </v-btn>
                    <v-btn outlined @click="restore = false">
                      ยกเลิก
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.date="{ item }">
            <p>
              {{ item.name }}
            </p>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="warning" v-on="on">
                  <v-icon text-center @click="openRestore(item.name)">
                    mdi-restore
                  </v-icon></v-chip
                >
              </template>
              <span></span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="error" v-on="on"
                  ><v-icon text-center>
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
  data() {
    return {
      folderName: '',
      restore: false,
      backupList: [],
      headers: [
        {
          text: 'วันที่',
          align: 'start',
          value: 'date',
          width: '85%',
        },
        { text: 'การจัดการ', align: 'center', value: 'action', width: '15%' },
      ],
    }
  },
  created() {
    this.getBackup()
  },
  methods: {
    async Restore() {
      try {
        const result = await this.$axios.$get(
          `/admin/restore/${this.folderName}`
        )
        console.log(result)
      } catch (error) {
        console.log(error)
      } finally {
        this.restore = false
      }
    },
    openRestore(item) {
      this.folderName = item
      this.restore = true
    },
    backup() {
      try {
        this.$axios.$get('/admin/blackup')
      } catch (error) {
      } finally {
        this.getBackup()
      }
    },
    async getBackup() {
      try {
        const result = await this.$axios.$get('/admin/backuplist')
        this.backupList = result.map((r) => ({ name: r }))
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
