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
      <v-form ref="form" v-model="valid">
        <v-row class="mt-10">
          <v-col cols="12" md="5" xs="12">
            <v-text-field
              v-model="work.start"
              v-mask="mask"
              :rules="[numberRule]"
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
        <v-row class="mt-n2">
          <v-col cols="12" md="6" xs="12">
            <v-text-field
              v-model="work.department"
              :rules="[emptyRule, stringRule]"
              label="แผนก"
              outlined
            />
          </v-col>
          <v-col cols="12" md="6" xs="12">
            <v-text-field
              v-model="work.position"
              :rules="[emptyRule, stringRule]"
              label="ตำแหน่ง"
              outlined
            />
          </v-col>
        </v-row>
        <v-row class="mt-n2">
          <v-col cols="12" xs="12" md="9">
            <v-text-field
              v-model="work.company"
              :rules="[emptyRule, stringRule]"
              label="ชื่อหน่วยงาน"
              outlined
            />
          </v-col>
          <v-col cols="12" xs="12" md="3">
            <v-select
              v-model="work.country"
              :rules="[emptyRule, stringRule]"
              :items="countrylist"
              item-text="name"
              item-value="name"
              label="ประเทศ"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-n2">
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
        <v-row justify="end" class="ma-3 mt-n1">
          <v-btn
            :disabled="!valid"
            class="font-weight-light"
            color="primary"
            @click="validate"
          >
            {{ editMode ? 'อัปเดต' : 'เพิ่มข้อมูล' }}
          </v-btn>
          <v-btn v-if="editMode" class="ml-2" @click="cancelEdit">
            ยกเลิก
          </v-btn>
        </v-row>
      </v-form>
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
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-chip class="warning" v-on="on">
                    <v-icon text-center @click="editItem(item)">
                      mdi-pencil
                    </v-icon></v-chip
                  >
                </template>
                <span>แก้ไขข้อมูล </span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }"
                  ><v-chip class="error">
                    <v-icon @click="openDel(item._id)" v-on="on"
                      >mdi-delete</v-icon
                    ></v-chip
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
      emptyRule: (v) => !!v || 'กรุณากรอกข้อมูล',
      stringRule: (v) => (v && v.length > 0) || 'กรุณากรอกข้อมูล',
      numberRule: (v) => (v && v > 0) || 'กรุณากรอกตัวเลข (พ.ศ.)',
      editMode: false,
      valid: true,
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
          width: '20%',
        },
        {
          text: 'แผนก',
          align: 'left',
          value: 'department',
          width: '15%',
        },
        {
          text: 'ตำแหน่ง',
          align: 'left',
          value: 'position',
          width: '15%',
        },
        {
          text: 'ปีที่เข้าทำงาน (พ.ศ.)',
          align: 'left',
          value: 'start',
          width: '10%',
        },
        {
          text: 'ปีที่ออกจากงาน (พ.ศ.)',
          align: 'left',
          value: 'end',
          width: '10%',
        },
        {
          text: 'สถานะ',
          align: 'center',
          value: 'status',
          width: '15%',
        },
        {
          text: 'การจัดการ',
          align: 'center',
          value: 'action',
          width: '15%',
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
    // formIsValid() {
    //   return (
    //     this.work.start &&
    //     this.work.department &&
    //     this.work.company &&
    //     this.work.country &&
    //     this.work.position
    //   )
    // },
  },
  watch: {
    'work.status'(val) {
      if (val) this.work.end = ''
    },
  },
  methods: {
    cancelEdit() {
      this.$refs.form.reset()
      this.editMode = false
    },
    editItem(item) {
      this.work = { ...item }
      this.editMode = true
    },
    async validate() {
      if (!this.editMode) {
        try {
          this.loadBtn = true
          await this.$axios.$post('/users/workinfo', {
            ...this.work,
          })
          this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
          this.$refs.form.reset()
        } catch (error) {
          this.$toast.success('เพิ่มข้อมูล"ไม่สำเร็จ"')
        } finally {
          this.editMode = false
          this.loadBtn = false
          this.getUser()
        }
      } else {
        try {
          await this.$axios.$patch('/users/updateWorkinfo', {
            ...this.work,
          })
          this.$toast.success('อัปเดตข้อมูล"สำเร็จ"')
          this.$refs.form.reset()
        } catch (error) {
          this.$toast.error('อัปเดตข้อมูลไม่สำเร็จ"')
        } finally {
          this.editMode = false
          this.loadBtn = false
          this.getUser()
        }
      }
    },
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
