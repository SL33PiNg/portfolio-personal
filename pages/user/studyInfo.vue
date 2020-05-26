<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-school-outline</v-icon>
            ข้อมูลประวัติการศึกษา
          </h2></v-sheet
        >
      </v-row>
      <v-form ref="form" v-model="valid">
        <v-row class="mt-10">
          <v-col cols="12" md="6" xs="12">
            <v-select
              v-model="education.educationVocabulary"
              :rules="[emptyRule, stringRule]"
              :items="items"
              label="ระดับวุฒิการศึกษา"
              outlined
              dense
              ><template slot="item" slot-scope="{ item }">
                <p>{{ item }}</p>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" md="6" xs="12">
            <v-text-field
              v-model="education.educationName"
              :rules="[emptyRule, stringRule]"
              label="ชื่อวุฒิการศึกษา"
              outlined
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="5" xs="12">
            <v-text-field
              v-model="education.branch"
              :rules="[emptyRule, stringRule]"
              label="สาขา"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="5" xs="12">
            <v-text-field
              v-model="education.graduate"
              v-mask="mask"
              :disabled="education.status"
              label="ปีที่สำเร็จการศึกษา (พ.ศ.)"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="2" xs="12">
            <v-checkbox
              v-model="education.status"
              class="mx-2"
              label="กำลังศึกษา"
              dense
            ></v-checkbox> </v-col
        ></v-row>
        <v-row>
          <v-col cols="12" md="9" xs="12">
            <v-text-field
              v-model="education.academyName"
              :rules="[emptyRule, stringRule]"
              label="ชื่อสถานศึกษา"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="3" xs="12">
            <v-autocomplete
              v-model="education.country"
              :rules="[emptyRule, stringRule]"
              :items="countrylist"
              item-text="name"
              item-value="name"
              label="ประเทศ"
              outlined
              dense
              ><template slot="item" slot-scope="{ item: { name } }">
                <p>{{ name }}</p>
              </template>
            </v-autocomplete>
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
              v-model="education.educationinfoDetails"
              :config="config"
            ></froala>
          </v-col>
        </v-row>
        <v-row justify="end" class="ma-3">
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
          <v-data-table :headers="headers" :items="user.educationinfo">
            <template v-slot:top>
              <v-dialog v-model="del" max-width="500px">
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-card-title>ต้องการลบรายการนี้?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="error"
                          @click="delEducation(tempDataItem)"
                        >
                          ตกลง
                        </v-btn>
                        <v-btn color="" @click="del = false">
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
                item.status ? 'กำลังศึกษา' : 'จบการศึกษา'
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
                <template v-slot:activator="{ on }">
                  <v-chip class="error">
                    <v-icon @click="openDel(item._id)" v-on="on"
                      >mdi-delete</v-icon
                    >
                  </v-chip></template
                ><span>ลบ</span></v-tooltip
              >
            </template></v-data-table
          >
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
      education: {
        educationVocabulary: '',
        educationName: '',
        academyName: '',
        branch: '',
        graduate: '',
        country: '',
        status: null,
        image: '',
        educationinfoDetails: '',
      },
      user: {},
      headers: [
        {
          text: 'ระดับวุฒิการศึกษา',
          align: 'left',
          value: 'educationVocabulary',
        },
        {
          text: 'วุฒิการศึกษา',
          align: 'left',
          value: 'educationName',
        },
        {
          text: 'สาขา',
          align: 'left',
          value: 'branch',
        },

        {
          text: 'ชื่อสถานศึกษา',
          align: 'left',
          value: 'academyName',
        },
        {
          text: 'ประเทศ',
          align: 'left',
          value: 'country',
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

      items: [
        'มัธยมศึกษาตอนปลาย',
        'ปวส',
        'อุดมศึกษาหรือเทียบเท่า',
        'ปริญญาตรี',
        'ปริญญาโท',
        'ปริญญาเอก',
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
        this.education.educationVocabulary &&
        this.education.educationName &&
        this.education.academyName &&
        this.education.branch &&
        this.education.country
      )
    },
  },
  watch: {
    'education.status'(val) {
      if (val) this.education.graduate = ''
    },
  },
  methods: {
    cancelEdit() {
      this.$refs.form.reset()
      this.editMode = false
    },
    editItem(item) {
      this.education = { ...item }
      this.editMode = true
    },
    async validate() {
      if (!this.editMode) {
        try {
          this.loadBtn = true
          await this.$axios.$post('/users/studyinfo', {
            ...this.education,
          })
          this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
          this.$refs.form.reset()
        } catch (error) {
          this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
        } finally {
          this.loadBtn = false
          this.getUser()
          this.editMode = false
        }
      } else {
        try {
          await this.$axios.$patch('/users/studyinfo', {
            ...this.education,
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
    async addEducation() {
      try {
        this.loadBtn = true
        await this.$axios.$post('/users/studyinfo', {
          ...this.education,
        })
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.loadBtn = false
        this.getUser()
        this.education = {
          educationVocabulary: '',
          educationName: '',
          academyName: '',
          branch: '',
          graduate: '',
          country: '',
          status: null,
          image: '',
          educationinfoDetails: '',
        }
      }
    },
    async delEducation(id) {
      try {
        await this.$axios.$delete(`/users/studyinfo/${id}`)
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
