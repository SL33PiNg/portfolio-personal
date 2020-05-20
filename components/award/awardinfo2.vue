<template>
  <v-container>
    <v-row class="ma-3">
      <h3>
        งานบริการวิชาการ
      </h3>
    </v-row>
    <v-form ref="form" v-model="valid">
      <v-row justify="center">
        <v-col cols="12">
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
      <v-row justify="center">
        <v-col cols="12" md="4" xs="6">
          <v-file-input
            :rules="[emptyRule]"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="เลือกภาพปกงานบริการวิชาการ"
            prepend-icon="mdi-camera"
            label="ภาพปก"
            @change="handleChange"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" xs="12">
          <v-text-field label="งานบริการวิชาการ" disabled />
        </v-col>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="Award.name"
            :rules="[emptyRule, stringRule]"
            label="ชื่องานบริการวิชาการ"
            clearable
          />
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-text-field
            v-model="Award.eventYear"
            v-mask="mask"
            :rules="[numberRule]"
            label="ปีที่จัดงาน"
            clearable
            placeholder="พ.ศ."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" xs="12">
          <froala v-model="Award.infoemation" :config="config"></froala>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3">
        <v-btn
          :disabled="!formIsValid"
          class="mx-0 font-weight-light"
          color="primary"
          @click="addAward"
        >
          เพิ่มข้อมูล
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask,
  },
  data: () => ({
    mask: '####',
    emptyRule: (v) => !!v || 'กรุณากรอกข้อมูล',
    stringRule: (v) => (v && v.length > 0) || 'กรุณากรอกข้อมูล',
    numberRule: (v) => (v && v > 0) || 'กรุณากรอกตัวเลข (พ.ศ.)',
    valid: true,
    loading: true,
    Award: {
      awardType: 2,
      name: '',
      nameEN: '',
      researchCategory: '',
      fiscalYear: '',
      jobTitles: '',
      funding: null,
      fundingSource: '',
      eventYear: '',
      file: '',
      infoemation: '',
      cover: '',
    },

    content: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
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
    imageUrl: '',
    imageFile: '',
  }),
  computed: {
    formIsValid() {
      return this.Award.name
    },
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
      data.append('award', e)
      try {
        const result = await this.$axios.$post('/award/image', data)
        console.log(result)
        this.Award.cover = result.file
      } catch (error) {}
    },
    async addAward() {
      this.loading = true
      try {
        await this.$axios.$post('/users/award', {
          ...this.Award,
        })
        console.log(this.Award)
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.success('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.loading = false
        this.Award = {
          awardType: 2,
          name: '',
          nameEN: '',
          researchCategory: '',
          fiscalYear: '',
          jobTitles: '',
          funding: null,
          fundingSource: '',
          eventYear: '',
          file: '',
          infoemation: '',
          cover: '',
        }
      }
    },
  },
}
</script>
