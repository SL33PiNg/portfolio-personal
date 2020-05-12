<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white"> mdi-file-certificate-outline</v-icon>
            ใบรับรอง
          </h1></v-sheet
        >
      </v-row>
      <v-form ref="form" v-model="valid">
        <v-row class="mt-10">
          <v-col cols="12" xs="12" md="5">
            <v-text-field
              v-model="certificate.certificateName"
              :rules="[emptyRule, stringRule]"
              label="ชื่อใบรับรอง"
              clearable
              outlined
            />
          </v-col>

          <v-col cols="12" xs="12" md="4">
            <v-text-field
              v-model="certificate.guarantee"
              :rules="[emptyRule, stringRule]"
              label="หน่วยงานที่ออกใบรับรอง"
              clearable
              outlined
            />
          </v-col>
          <v-col cols="12" xs="12" md="3">
            <v-text-field
              v-model="certificate.graduate"
              v-mask="mask"
              :rules="[numberRule]"
              label="ปีที่ได้รับ (พ.ศ.)"
              clearable
              outlined
            />
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
              v-model="certificate.certificateinfoDetails"
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
          <v-data-table :headers="headers" :items="user.certificateinfo">
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
                          @click="decertificate(tempDataItem)"
                        >
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
              <p>{{ item.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา' }}</p>
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
                  <v-chip class="error" v-on="on"
                    ><v-icon text-center @click="openDel(item._id)">
                      mdi-delete
                    </v-icon></v-chip
                  >
                </template>
                <span>ลบการร้องเรียน</span>
              </v-tooltip>
            </template>
          </v-data-table>
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
      del: false,
      tempDataItem: '',
      mask: '####',
      user: {},
      certificate: {
        certificateName: '',
        graduate: '',
        guarantee: '',
        file: '',
        certificateinfoDetails: '',
      },
      headers: [
        {
          text: 'ชื่อใบรับรอง',
          align: 'left',
          value: 'certificateName',
          width: '35%',
        },
        {
          text: 'หน่วยงานที่ออกใบรับรอง',
          align: 'left',
          value: 'guarantee',
          width: '35%',
        },
        {
          text: 'ปีที่ได้รับ',
          align: 'left',
          value: 'graduate',
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
    //   return this.certificate.certificateName && this.certificate.guarantee
    // },
  },
  methods: {
    cancelEdit() {
      this.$refs.form.reset()
      this.editMode = false
    },
    editItem(item) {
      this.certificate = { ...item }
      this.editMode = true
    },
    async validate() {
      if (!this.editMode) {
        try {
          this.loadBtn = true
          await this.$axios.$post('/users/certificateinfo', {
            ...this.certificate,
          })
          this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
          this.$refs.form.reset()
        } catch (error) {
          this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
        } finally {
          this.loadBtn = false
          this.getUser()
        }
      } else {
        try {
          await this.$axios.$patch('/users/update', {
            ...this.certificate,
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
    // async addcertificate() {
    //   try {
    //     this.loadBtn = true
    //     await this.$axios.$post('/users/certificateinfo', {
    //       ...this.certificate,
    //     })
    //     this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
    //   } catch (error) {
    //     this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
    //   } finally {
    //     this.loadBtn = false
    //     this.getUser()
    //     this.certificate = {
    //       certificateName: '',
    //       graduate: '',
    //       guarantee: '',
    //       file: '',
    //       certificateinfoDetails: '',
    //     }
    //   }
    // },
    async decertificate(id) {
      try {
        await this.$axios.$delete(`/users/certificateinfo/${id}`)
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
