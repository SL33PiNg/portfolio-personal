<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white"> mdi-file-certificate-outline</v-icon>
            ใบรับรอง
          </h1></v-sheet
        >
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" xs="12" md="5">
          <v-text-field
            v-model="certificate.certificateName"
            label="ชื่อใบรับรอง"
            clearable
            outlined
          />
        </v-col>

        <v-col cols="12" xs="12" md="4">
          <v-text-field
            v-model="certificate.guarantee"
            label="หน่วยงานที่ออกใบรับรอง"
            clearable
            outlined
          />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-text-field
            v-model="certificate.graduate"
            v-mask="mask"
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
      <v-row justify="end" class="ma-3 ">
        <v-btn
          class=" font-weight-light"
          color="primary"
          @click="addcertificate"
        >
          เพิ่มข้อมูล
        </v-btn>
      </v-row>

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
                          color="blue darken-1"
                          text
                          @click="decertificate(tempDataItem)"
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
    mask
  },
  mixins: [UserMix],
  data() {
    return {
      del: false,
      tempDataItem: '',
      mask: '####',
      user: {},
      certificate: {
        certificateName: '',
        graduate: '',
        guarantee: '',
        file: '',
        certificateinfoDetails: ''
      },
      headers: [
        {
          text: 'ชื่อใบรับรอง',
          align: 'left',
          value: 'certificateName'
        },
        {
          text: 'หน่วยงานที่ออกใบรับรอง',
          align: 'left',
          value: 'guarantee'
        },
        {
          text: 'ปีที่ได้รับ',
          align: 'left',
          value: 'graduate'
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
    async addcertificate() {
      try {
        this.loadBtn = true
        await this.$axios.$post('/users/certificateinfo', {
          ...this.certificate
        })
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.loadBtn = false
        this.getUser()
        this.certificate = {
          certificateName: '',
          graduate: '',
          guarantee: '',
          file: '',
          certificateinfoDetails: ''
        }
      }
    },
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
    }
  }
}
</script>
