<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-history</v-icon>
            สำรองข้อมูล
          </h2></v-sheet
        >
      </v-row>
      <v-row v-show="false" justify="center" class="mt-8">
        <v-col cols="11">
          <v-file-input
            id="backupInput"
            label="อัปโหลดไฟล์"
            outlined
            dense
            @change="Restore"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-4">
        <v-col cols="auto">
          <v-btn
            :loading="backupLoading"
            height="250"
            width="250"
            max-height="250"
            max-width="250"
            class="primary display-1"
            @click="backup"
            >สำรองข้อมูล
            <v-icon class="display-1" dark> mdi-upload</v-icon>
            <template v-slot:loader>
              <v-progress-circular
                :rotate="90"
                :size="170"
                :width="15"
                :value="progress"
              >
                <p class="display-1">{{ progress }}%</p>
              </v-progress-circular>
            </template>
          </v-btn>
        </v-col>

        <v-col cols="auto" offset="1">
          <v-btn
            :loading="restoreLoading"
            height="250"
            width="250"
            max-height="250"
            max-width="250"
            class="warning display-1"
            @click="openFileDialog"
            >กู้คืนข้อมูล
            <v-icon class="display-1" dark> mdi-backup-restore</v-icon>
            <template v-slot:loader>
              <v-progress-circular
                :rotate="90"
                :size="170"
                :width="15"
                :value="restoreProgress"
              >
                <p class="display-1">{{ restoreProgress }}%</p>
              </v-progress-circular>
            </template>
          </v-btn>
        </v-col>
      </v-row>

      <!-- <v-card outlined class="mx-auto ma-5">
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
            <v-btn
              @click="
                downloadF(`http://localhost:3000/api/admin/backup/${item.name}`)
              "
            >
              download
            </v-btn>
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
      </v-card> -->
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      backupLoading: false,
      progress: 0,
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
      restoreLoading: false,
      restoreProgress: 0,
    }
  },
  created() {
    this.getBackup()
  },

  methods: {
    async upload(file) {
      if (!file) return
      const data = new FormData()
      data.append('restore', file)
      try {
        const result = await this.$axios.$post(`/admin/restore`, data)
        console.log(result)
      } catch (error) {}
    },
    openFileDialog() {
      document.getElementById('backupInput').click()
    },
    async Restore(file) {
      if (!file) return
      const data = new FormData()
      data.append('restore', file)
      this.restoreLoading = true
      try {
        const { body } = await fetch(
          'http://localhost:3000/api/admin/restore',
          {
            method: 'post',
            body: data,
          }
        )
        const reader = body.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }
          const decode = new TextDecoder('utf-8')
          this.restoreProgress = decode.decode(value)
          console.log(this.restoreProgress)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.restoreProgress = 0
        this.restoreLoading = false
      }
    },
    openRestore(item) {
      this.folderName = item
      this.restore = true
    },
    async backup() {
      try {
        this.backupLoading = true
        const { body } = await fetch('http://localhost:3000/api/admin/blackup')
        const reader = body.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }
          const decode = new TextDecoder('utf-8')
          this.progress = decode.decode(value)
          console.log(this.progress)
        }
        this.downloadF()
      } catch (error) {
      } finally {
        this.backupLoading = false
        this.progress = 0
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
    downloadF() {
      window.open('http://localhost:3000/api/admin/backupDownload')
    },
  },
}
</script>
