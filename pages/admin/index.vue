<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-magnify text-centernify</v-icon>
          ค้นหารายชื่อ
        </h1>
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
          :items="status"
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

                    <v-divider></v-divider>

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

            <v-dialog v-model="close" max-width="500px">
              <v-card>
                <v-container>
                  <v-card-title>
                    <span class="headline">ระงับการใช้งาน</span>
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

                  <v-divider></v-divider>

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

                  <v-divider></v-divider>

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

            <v-dialog v-model="complain" max-width="500px">
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  คำร้องเรียน
                </v-card-title>

                <v-card-text>
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          ชื่อผู้ร้องเรียน
                        </th>
                        <th class="text-left">วันที่</th>
                        <th class="text-left">เรื่องร้องเรียน</th>
                        <th class="text-left">สถานะ</th>
                      </tr>
                    </thead>
                  </v-simple-table>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="complain = false">
                    บันทึก
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="complain = false">
                    ยกเลิก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.action="{ item }">
            <v-chip class="light-green"
              ><v-icon text-center @click="addStatus(item)">
                mdi-account-plus
              </v-icon></v-chip
            >

            <v-chip class="indigo lighten-1">
              <v-icon text-center @click="shutAccount(item)">
                mdi-account-cancel
              </v-icon></v-chip
            >

            <v-chip class="red">
              <v-icon text-center @click="closeAccount(item)">
                mdi-account-remove
              </v-icon></v-chip
            >

            <v-chip class="amber"
              ><v-icon text-center @click="comAccount(item)">
                mdi-account-alert
              </v-icon></v-chip
            >
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
      search: '',
      add: false,
      shut: false,
      close: false,
      complain: false,
      tempDataItem: {},
      headers: [
        { text: 'ชื่อ', align: 'start', value: 'name' },
        { text: 'สถานะการใช้งาน', align: 'start', value: 'usageStatus' },
        { text: 'สถานะบัญชี', align: 'start', value: 'accountStatus' },
        { text: 'สถานะการร้องเรียน', align: 'start', value: 'comStatus' },
        { text: 'การจัดการ', value: 'action', sortable: false, align: 'center' }
      ],

      status: [
        {
          name: 'ชานนท์ ศรีคงทน',
          usageStatus: 'เผยแพร่',
          accountStatus: 'เปิด',
          comStatus: 'ไม่มี'
        },
        {
          name: 'ธนกฤต อ่อนเขตร์',
          usageStatus: 'เผยแพร่',
          accountStatus: 'เปิด',
          comStatus: 'ไม่มี'
        },

        {
          name: 'โกล์ดดี โรเจอร์ส',
          usageStatus: 'ไม่เผยแพร่',
          accountStatus: 'เปิด',
          comStatus: 'ไม่มี'
        }
      ]
    }
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
    comAccount(item) {
      this.complain = true
    }
  }
}
</script>
