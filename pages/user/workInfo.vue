<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
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
            :rules="rules.number"
            label="ปีที่เข้าทำงาน (พ.ศ.)"
            outlined
          />
        </v-col>

        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="work.end"
            v-mask="mask"
            :rules="rules.number"
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
          <v-text-field
            v-model="work.department"
            :rules="rules.department"
            label="แผนก"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field
            v-model="work.position"
            :rules="rules.position"
            label="ตำแหน่ง"
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" md="9">
          <v-text-field
            v-model="work.company"
            :rules="rules.company"
            label="ชื่อหน่วยงาน"
            outlined
          />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-select
            v-model="work.country"
            :rules="rules.selects"
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
          <froala
            v-if="!loading"
            v-model="work.workinfoDetails"
            :config="config"
          ></froala>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3">
        <v-btn
          :disabled="!formIsValid"
          class="mx-0 font-weight-light"
          color="primary"
          @click="addWork"
        >
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
                        <v-btn color="error" @click="delWork(tempDataItem)">
                          ตกลง
                        </v-btn>
                        <v-btn color="primary" @click="del = false">
                          ยกเลิก
                        </v-btn>
                      </v-card-actions>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :class="item.status ? 'success' : 'error'">{{
                item.status ? 'กำลังทำงาน' : 'ออกจากงาน'
              }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="openDel(item._id)" v-on="on"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  ></template
                ><span>ลบ</span></v-tooltip
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
    mask,
  },
  mixins: [UserMix],
  data() {
    return {
      rules: {
        number: [
          (val) => (val || '').length > 0 || 'กรุณากรอก พ.ศ. เป้นตัวเลข',
        ],
        department: [(val) => (val || '').length > 0 || 'กรุณากรอกข้อมูล'],
        position: [(val) => (val || '').length > 0 || 'กรุณากรอกข้อมูล'],
        company: [(val) => (val || '').length > 0 || 'กรุณากรอกข้อมูล'],
        selects: [(val) => (val || '').length > 0 || 'กรุณาเลือกข้อมูล'],
      },
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
        position: '',
        workinfoDetails: '',
      },
      user: {},
      headers: [
        {
          text: 'ชื่อหน่วยงาน',
          align: 'left',
          value: 'company',
        },
        {
          text: 'แผนก',
          align: 'left',
          value: 'department',
        },
        {
          text: 'ตำแหน่ง',
          align: 'left',
          value: 'position',
        },
        {
          text: 'ปีที่เข้าทำงาน (พ.ศ.)',
          align: 'left',
          value: 'start',
        },
        {
          text: 'ปีที่ออกจากงาน (พ.ศ.)',
          align: 'left',
          value: 'end',
        },
        {
          text: 'สถานะ',
          align: 'center',
          value: 'status',
        },
        {
          text: 'การจัดการ',
          align: 'center',
          value: 'action',
        },
      ],
      config: {
        charCounterMax: 3000,
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
              'clearFormatting',
            ],
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
              'quote',
            ],
          },
        },
      },
    }
  },
  computed: {
    formIsValid() {
      return (
        this.work.start &&
        this.work.department &&
        this.work.company &&
        this.work.country &&
        this.work.position
      )
    },
  },
  watch: {
    'work.status'(val) {
      if (val) this.work.end = ''
    },
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
          ...this.work,
        })

        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.success('เพิ่มข้อมูล"ไม่สำเร็จ"')
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
          position: '',
          workinfoDetails: '',
        }
      }
    },
    async delWork(id) {
      try {
        await this.$axios.$delete(`/users/workinfo/${id}`)
        this.$toast.show('ลบข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('ลบข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.del = false
        this.tempDataItem = ''
        this.getUser()
      }
    },
  },
}
</script>
