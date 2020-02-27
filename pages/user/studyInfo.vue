<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-school-outline</v-icon>
            ข้อมูลประวัติการศึกษา
          </h1></v-sheet
        >
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12" md="6" xs="12">
          <v-select
            v-model="education.educationVocabulary"
            :items="items"
            label="ระดับวุฒิการศึกษา"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field
            v-model="education.educationName"
            label="วุฒิการศึกษา"
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field v-model="education.branch" label="สาขา" outlined />
        </v-col>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="education.graduate"
            v-mask="mask"
            :disabled="education.status"
            label="ปีที่สำเร็จการศึกษา (พ.ศ.)"
            outlined
          />
        </v-col>
        <v-col cols="12" md="2" xs="12">
          <v-checkbox
            v-model="education.status"
            class="mx-2"
            label="กำลังศึกษา"
          ></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="9" xs="12">
          <v-text-field
            v-model="education.academyName"
            label="ชื่อสถานศึกษา"
            outlined
          />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-select
            v-model="education.country"
            :items="pated"
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
          <wysiwyg v-model="content"></wysiwyg>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn
          class="mx-0 font-weight-light"
          color="primary"
          @click="addEducation"
        >
          เพิ่มข้อมูล
        </v-btn>
      </v-row>

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
                          color="blue darken-1"
                          text
                          @click="delEducation(tempDataItem)"
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
              <p>{{ item.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา' }}</p>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn icon @click="openDel(item._id)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </template></v-data-table
          >
        </v-card>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import UserMix from '@/mixins/user'
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask
  },

  mixins: [UserMix],
  data() {
    return {
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
        image: ''
      },
      user: {},
      headers: [
        {
          text: 'ระดับวุฒิการศึกษา',
          align: 'left',
          value: 'educationVocabulary'
        },
        {
          text: 'วุฒิการศึกษา',
          align: 'left',
          value: 'educationName'
        },
        {
          text: 'สาขา',
          align: 'left',
          value: 'branch'
        },
        {
          text: 'ปีที่สำเร็จการศึกษา (พ.ศ.)',
          align: 'left',
          value: 'graduate'
        },
        {
          text: 'ชื่อสถานศึกษา',
          align: 'left',
          value: 'academyName'
        },
        {
          text: 'ประเทศ',
          align: 'left',
          value: 'country'
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
      pated: ['ไทย', 'อังกฤษ', 'ลาว', 'พม่า', 'จีน'],
      items: [
        'มัธยมศึกษาตอนปลาย',
        'ปวส',
        'อุดมศึกษาหรือเทียบเท่า',
        'ปริญญาตรี',
        'ปริญญาโท',
        'ปริญญาเอก'
      ]
    }
  },
  methods: {
    openDel(item) {
      this.tempDataItem = item
      this.del = true
    },
    async addEducation() {
      try {
        this.loadBtn = true
        await this.$axios.$post('/users/studyinfo', {
          ...this.education
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
          image: ''
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
    }
  }
}
</script>
