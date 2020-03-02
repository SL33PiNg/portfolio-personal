<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-briefcase-outline</v-icon>
            ข้อมูลประวัติการทำงาน
          </h1></v-sheet
        >
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="work.start"
            v-mask="mask"
            label="ปีที่เข้าทำงาน (พ.ศ.)"
            outlined
          />
        </v-col>

        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="work.end"
            v-mask="mask"
            :disabled="work.status"
            label="ปีที่ออกจากงาน (พ.ศ.)"
            outlined
          />
        </v-col>

        <v-col cols="12" md="2" xs="12">
          <v-checkbox
            v-model="work.status"
            class="mx-2"
            label="กำลังทำงาน"
          ></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-text-field v-model="work.department" label="แผนก" outlined />
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field v-model="work.position" label="ตำแหน่ง" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" md="9">
          <v-text-field v-model="work.company" label="ชื่อหน่วยงาน" outlined />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-select
            v-model="work.country"
            :items="countrylist"
            item-text="name"
            item-value="name"
            label="ประเทศ"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" xs="12">
          <h4>รายละเอียด</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" xs="12">
          <froala :config="config"></froala>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class="mx-0 font-weight-light" color="primary" @click="addWork">
          เพิ่มข้อมูล
        </v-btn>
      </v-row>
      <template>
        <v-card outlined>
          <v-data-table :headers="headers" :items="user.workinfo">
            <template v-slot:top>
              <v-dialog v-model="del" max-width="500px">
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-card-title>ต้องการลบรายการนี้?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="delWork(tempDataItem)"
                        >
                          ตกลง
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="del = false">
                          ยกเลิก
                        </v-btn>
                      </v-card-actions>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.status="{ item }">
              <p>{{ item.status ? 'work' : 'not work' }}</p>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn icon @click="openDel(item._id)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import country from '@/static/countrylist.json'
import UserMix from '@/mixins/user'
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask
  },
  mixins: [UserMix],
  data() {
    return {
      countrylist: country,
      del: false,
      tempDataItem: '',
      mask: '####',
      loadBtn: false,
      work: {
        start: '',
        end: '',
        status: null,
        department: '',
        company: '',
        country: '',
        position: ''
      },
      user: {},
      headers: [
        {
          text: 'ชื่อหน่วยงาน',
          align: 'left',
          value: 'company'
        },
        {
          text: 'แผนก',
          align: 'left',
          value: 'department'
        },
        {
          text: 'ตำแหน่ง',
          align: 'left',
          value: 'position'
        },
        {
          text: 'ปีที่เข้าทำงาน (พ.ศ.)',
          align: 'left',
          value: 'start'
        },
        {
          text: 'ปีที่ออกจากงาน (พ.ศ.)',
          align: 'left',
          value: 'end'
        },
        {
          text: 'สถานะ',
          align: 'left',
          value: 'status'
        },
        {
          text: 'การจัดการ',
          align: 'center',
          value: 'action'
        }
      ],
      config: {
        quickInsertEnabled: false,
        toolbarButtons: {
          moreText: {
            buttons: [
              'bold',
              'italic',
              'underline',
              'strikeThrough',
              'subscript',
              'superscript',
              'fontFamily',
              'fontSize',
              'textColor',
              'backgroundColor',
              'inlineClass',
              'inlineStyle',
              'clearFormatting'
            ]
          },
          moreParagraph: {
            buttons: [
              'alignLeft',
              'alignCenter',
              'formatOLSimple',
              'alignRight',
              'alignJustify',
              'formatOL',
              'formatUL',
              'paragraphFormat',
              'paragraphStyle',
              'lineHeight',
              'outdent',
              'indent',
              'quote'
            ]
          }
        }
      }
    }
  },
  methods: {
    openDel(item) {
      this.tempDataItem = item
      this.del = true
    },
    async addWork() {
      try {
        this.loadBtn = true
        await this.$axios.$post('/users/workinfo', {
          ...this.work
        })
        this.$toast.success('"สำเร็จ"')
      } catch (error) {
        this.$toast.success('error')
      } finally {
        this.loadBtn = false
        this.getUser()
        this.work = {
          start: '',
          end: '',
          status: null,
          department: '',
          company: '',
          country: '',
          position: ''
        }
      }
    },
    async delWork(id) {
      try {
        await this.$axios.$delete(`/users/workinfo/${id}`)
        this.$toast.success('"สำเร็จ"')
      } catch (error) {
        this.$toast.success('error')
      } finally {
        this.del = false
        this.tempDataItem = ''
        this.getUser()
      }
    }
  }
}
</script>
