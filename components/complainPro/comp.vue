<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }"
        ><v-btn color="warning" v-on="on"> <h4>ร้องเรียน</h4></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          คำร้องเรียน
        </v-card-title>

        <v-text-field
          v-model="reportName"
          label="ชื่อผู้ร้องเรียน"
          class="ma-2"
          clearable
          outlined
        ></v-text-field>
        <v-textarea
          v-model="information"
          label="รายละเอียด"
          class="ma-2"
          outlined
        ></v-textarea>

        <v-col cols="6">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="เลือกรูปภาพ"
            prepend-icon="mdi-camera"
            label="ภาพประกอบ"
          ></v-file-input>
        </v-col>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="addReport">
            บันทึก
          </v-btn>
          <v-btn color="error" @click="dialog = false">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      config: {
        placeholderText: 'Edit Your Content Here!',
        charCounterMax: 3000,
        quickInsertEnabled: false,
        // imageUploadURL: '/api/upload_image',
        toolbarButtons: {
          moreImage: {
            buttons: ['insertImage'],
          },
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

      dialog: false,
      loadBtn: false,
      information: '',
      reportName: '',
    }
  },
  methods: {
    async addReport() {
      try {
        this.loadBtn = true
        await this.$axios.$post(`/profile/report`, {
          profileID: this.user._id,
          profileName: this.user.username,
          profilefirstnameTH: this.user.personalInfo.firstnameTH,
          profilelastnameTH: this.user.personalInfo.lastnameTH,
          reportName: this.reportName,
          information: this.information,
        })
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.dialog = false
        this.information = ''
        this.reportName = ''
      }
    },
  },
}
</script>
