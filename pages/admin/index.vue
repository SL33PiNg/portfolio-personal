<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-magnify text-centernify</v-icon>
            ค้นหารายชื่อ
          </h1></v-sheet
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
                    >สิทธิ์การใช้งาน : {{ tempDataItem.name }}</span
                  ></v-card-title
                >
                <v-card-text>
                  <v-container>
                    <v-card-text>
                      <v-checkbox class="mx-2" label="แอดมิน"></v-checkbox>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="blue darken-1" text @click="add = false">
                        บันทึก
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="add = false">
                        ยกเลิก
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-dialog v-model="shut" max-width="500px">
              <v-card>
                <v-container>
                  <v-card-title>
                    <span class="headline">ระงับการใช้งาน</span>
                  </v-card-title>
                  <v-row justify="center">
                    <v-radio-group>
                      <v-radio label="เปิดการใช้งาน " value="radio-1"></v-radio>
                      <v-radio label="ระงับการใช้งาน" value="radio-2"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-card-text>
                    <v-textarea placeholder="หมายเหตุ"></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="shut = false">
                      บันทึก
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="shut = false">
                      ยกเลิก
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog>
            <v-dialog v-model="close" max-width="500px">
              <v-card>
                <v-container>
                  <v-card-title>
                    <span class="headline">ปิดการใช้งานบัญชี</span>
                  </v-card-title>
                  <v-row justify="center">
                    <v-radio-group>
                      <v-radio
                        label="เปิดการใช้งานบัญชี "
                        value="radio-1"
                      ></v-radio>
                      <v-radio
                        label="ปิดการใช้งานบัญชี"
                        value="radio-2"
                      ></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-card-text>
                    <v-textarea placeholder="หมายเหตุ"></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close = false">
                      บันทึก
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="close = false">
                      ยกเลิก
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.action="{ item }">
            <v-chip class="primary"
              ><v-icon text-center @click="addStatus(item)">
                mdi-account-edit
              </v-icon></v-chip
            >

            <v-chip class="warning">
              <v-icon text-center @click="shutAccount(item)">
                mdi-account-cancel
              </v-icon></v-chip
            >

            <v-chip class="red">
              <v-icon text-center @click="closeAccount(item)">
                mdi-account-remove
              </v-icon></v-chip
            >
          </template>
          <template v-slot:item.isPublic="{ item }">
            <p>{{ item.isPublic ? 'เผยแผร่' : 'ระงับการเผยแผร่' }}</p>
          </template>
          <template v-slot:item.isActive="{ item }">
            <p>{{ item.isActive ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน' }}</p>
          </template>
          <template v-slot:item.nameTH="{ item }">
            <p>
              {{ item.personalInfo.academicRank }}
              {{ item.personalInfo.firstnameTH }}
              {{ item.personalInfo.lastnameTH }}
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
      users: [],
      search: '',
      loading: true,
      add: false,
      shut: false,
      close: false,
      tempDataItem: {},
      headers: [
        {
          text: 'ชื่อ',
          align: 'start',
          value: 'nameTH'
        },
        {
          text: 'สถานะการใช้งาน',
          value: 'isPublic'
        },
        { text: 'สถานะบัญชี', value: 'isActive' },
        {
          text: 'สิทธิ์การใช้งาน',
          align: 'center',
          value: 'roles'
        },
        {
          text: 'การจัดการ',
          value: 'action',
          align: 'center'
        }
      ]
    }
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
      this.shut = true
    },
    closeAccount(item) {
      this.close = true
    },
    async getAllProfile() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/profile')
        this.users = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
