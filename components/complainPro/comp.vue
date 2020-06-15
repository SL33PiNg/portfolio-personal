<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }"
        ><v-btn block color="warning" v-on="on"> <h4>ร้องเรียน</h4></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline warning white--text">
          คำร้องเรียน
        </v-card-title>

        <v-text-field
          v-model="reportName"
          label="ชื่อผู้ร้องเรียน"
          class="ma-3 mt-5"
          clearable
          outlined
          dense
        ></v-text-field>
        <v-textarea
          v-model="information"
          label="รายละเอียด"
          class="ma-3"
          outlined
          dense
        ></v-textarea>
        <v-container>
          <v-row justify="start" class="mt-n10">
            <v-col cols="6">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="เลือกรูปภาพ"
                prepend-icon="mdi-camera"
                label="ภาพประกอบ"
                @change="handleChange"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-img
                v-if="imageUrl"
                :src="imageUrl"
                aspect-ratio="1.7"
                height="250"
                class="ma-2"
                contain
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" @click="dialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" @click="addReport">
            บันทึก
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
      cover: '',
      imageUrl: '',
      imageFile: '',
    }
  },
  methods: {
    async handleChange(e) {
      if (!e) return
      const fr = new FileReader()
      fr.readAsDataURL(e)
      fr.addEventListener('load', () => {
        this.imageUrl = fr.result
        this.imageFile = e
      })
      const data = new FormData()
      data.append('report', e)
      try {
        const result = await this.$axios.$post('/profile/image', data)
        console.log(result)
        this.cover = result.file
      } catch (error) {}
    },
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
          cover: this.cover,
        })
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.error('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.dialog = false
        this.information = ''
        this.reportName = ''
        this.cover = ''
        this.imageUrl = ''
        this.imageFile = ''
      }
    },
  },
}
</script>
