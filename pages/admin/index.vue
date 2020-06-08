<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-magnify text-centernify</v-icon>
            ค้นหารายชื่อ
          </h2></v-sheet
        >
      </v-row>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card outlined class="mx-auto ma-5">
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          hide-default-footer
        >
          <template v-slot:top>
            <v-dialog v-model="add" max-width="500px">
              <v-card>
                <v-card-title
                  ><span class="headline"
                    >กำหนดสิทธิ์การใช้งาน
                  </span></v-card-title
                >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <p>
                        กำหนดสิทธิ์ของ :
                        {{ tempDataItem.personalInfo.firstnameTH }}
                        {{ tempDataItem.personalInfo.lastnameTH }}
                      </p>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn v-if="!isAdmin" color="primary" @click="addAdmin">
                    เพิ่มสิทธิ์ 'ผู้ดูแลระบบ'
                  </v-btn>
                  <v-btn v-else color="error" @click="removeAdmin">
                    ลบสิทธิ์ 'ผู้ดูแลระบบ'
                  </v-btn>
                  <v-btn color="" @click="add = false">
                    ยกเลิก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="shut" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">กำหนดสถานะการใช้งาน</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <p v-if="isPublic">
                        สถานะการใช้งาน : เผยแพร่
                      </p>
                      <p v-else>
                        สถานะการใช้งาน : ระงับการเผยแพร่
                      </p>
                    </v-row>
                  </v-container>
                  <v-textarea v-model="msg" placeholder="หมายเหตุ"></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn v-if="!isPublic" color="primary" @click="allowPublic">
                    เผยแผร่
                  </v-btn>
                  <v-btn v-else color="error" @click="allowPublic">
                    ระงับการเผยแพร่
                  </v-btn>
                  <v-btn color="" @click="shut = false">
                    ยกเลิก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="close" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">กำหนดสถานะบัญชีผู้ใช้</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <p v-if="isActive">
                        สถานะบัญชี : เปิดการใช้งานบัญชี
                      </p>
                      <p v-else>
                        สถานะบัญชี : ปิดการใช้งานบัญชี
                      </p>
                    </v-row>
                  </v-container>
                  <v-textarea v-model="msg" placeholder="หมายเหตุ"></v-textarea>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn v-if="!isActive" color="primary" @click="allowActive">
                    เปิดการใช้งานบัญชี
                  </v-btn>
                  <v-btn v-else color="error" @click="allowActive">
                    ปิดการใช้งานบัญชี
                  </v-btn>
                  <v-btn color="" @click="close = false">
                    ยกเลิก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="primary" v-on="on"
                  ><v-icon text-center @click="addStatus(item)">
                    mdi-account-edit
                  </v-icon></v-chip
                >
              </template>
              <span>กำหนดสิทธิ์การใช้งาน</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="warning" v-on="on">
                  <v-icon text-center @click="shutAccount(item)">
                    mdi-account-cancel
                  </v-icon></v-chip
                >
              </template>
              <span>กำหนดสถานะการใช้งาน</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-chip class="error" v-on="on">
                  <v-icon text-center @click="closeAccount(item)">
                    mdi-account-remove
                  </v-icon></v-chip
                >
              </template>
              <span>กำหนดสถานะบัญชีผู้ใช้</span>
            </v-tooltip>
          </template>
          <template v-slot:item.isPublic="{ item }">
            <p>{{ item.isPublic ? 'เผยแผร่' : 'ระงับการเผยแผร่' }}</p>
          </template>
          <template v-slot:item.isActive="{ item }">
            <p>{{ item.isActive ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน' }}</p>
          </template>
          <template v-slot:item.personalInfo.firstnameTH="{ item }">
            <p>
              {{ item.personalInfo.firstnameTH }}
              {{ item.personalInfo.lastnameTH }}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="primary"
                    text-center
                    v-on="on"
                    @click="$router.push(`/profile/${item.username}`)"
                  >
                    mdi-account
                  </v-icon>
                </template>
                <span>ไปยังหน้าโปรไฟล์</span>
              </v-tooltip>
            </p>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  middleware: ['check-admin'],
  data() {
    return {
      msg: '',
      isAdmin: null,
      isPublic: null,
      isActive: null,
      users: [],
      search: '',
      loading: true,
      add: false,
      shut: false,
      close: false,
      tempDataItem: {
        personalInfo: {
          firstnameTH: '',
          lastnameTH: '',
        },
      },
      headers: [
        {
          text: 'ชื่อ',
          align: 'start',
          value: 'personalInfo.firstnameTH',
          sort: (a, b) => b.localeCompare(a, 'th'),
        },
        {
          text: 'สถานะการใช้งาน',
          value: 'isPublic',
        },
        { text: 'สถานะบัญชี', value: 'isActive' },
        {
          text: 'สิทธิ์การใช้งาน',
          // align: 'center',
          value: 'roles',
        },
        {
          text: 'การจัดการ',
          value: 'action',
          align: 'center',
        },
      ],
    }
  },

  watch: {
    tempDataItem(val) {
      this.isAdmin = val.roles.includes('ADMIN')
      this.isPublic = val.isPublic
      this.isActive = val.isActive
    },
  },

  created() {
    this.getAllProfile()
  },
  methods: {
    addStatus(item) {
      this.tempDataItem = { ...item }
      this.add = true
    },
    shutAccount(item) {
      this.tempDataItem = { ...item }
      this.shut = true
    },
    closeAccount(item) {
      this.tempDataItem = { ...item }
      this.close = true
    },
    async getAllProfile() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/admin/userProfile')
        this.users = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    async addAdmin() {
      this.loading = true
      try {
        await this.$axios.$get(`admin/addAdmin/${this.tempDataItem._id}`)
      } catch (error) {
      } finally {
        this.loading = false
        this.add = false
        this.getAllProfile()
      }
    },
    async removeAdmin() {
      this.loading = true
      try {
        await this.$axios.$get(`admin/removeAdmin/${this.tempDataItem._id}`)
      } catch (error) {
      } finally {
        this.loading = false
        this.add = false
        this.getAllProfile()
      }
    },
    async allowPublic() {
      this.loading = true
      try {
        if (!this.isPublic)
          await this.$axios.$post(
            `/admin/allowPublic/${this.tempDataItem._id}`,
            {
              msg: this.msg,
            }
          )
        else
          await this.$axios.$post(
            `/admin/NotAllowedPublic/${this.tempDataItem._id}`,
            {
              msg: this.msg,
            }
          )
      } catch (error) {
      } finally {
        this.loading = false
        this.shut = false
        this.msg = ''
        this.getAllProfile()
      }
    },
    async allowActive() {
      this.loading = true
      try {
        if (!this.isActive)
          await this.$axios.$post(
            `/admin/allowActive/${this.tempDataItem._id}`,
            {
              msg: this.msg,
            }
          )
        else
          await this.$axios.$post(
            `/admin/NotAllowedActive/${this.tempDataItem._id}`,
            {
              msg: this.msg,
            }
          )
      } catch (error) {
      } finally {
        this.loading = false
        this.close = false
        this.msg = ''
        this.getAllProfile()
      }
    },
  },
}
</script>

<style lang="css">
.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
