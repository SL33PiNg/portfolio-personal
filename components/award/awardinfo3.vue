<template>
  <v-container>
    <v-row class="ma-3">
      <h3>
        รางวัล
      </h3>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4" xs="12">
        <v-img
          v-if="imageUrl"
          :src="imageUrl"
          aspect-ratio="1.7"
          width="200"
          height="200"
          class="ma-2"
        ></v-img>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4" xs="6">
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="เลือกภาพปกรางวัล"
          prepend-icon="mdi-camera"
          label="ภาพปก"
          @change="handleChange"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" xs="12">
        <v-text-field label="รางวัล" disabled />
      </v-col>

      <v-col cols="12" md="6" xs="12">
        <v-text-field
          v-model="Award.name"
          :rules="rules1.name"
          label="ชื่อรางวัล"
          clearable
        />
      </v-col>

      <v-col cols="12" md="3" xs="12">
        <v-text-field
          v-model="Award.eventYear"
          v-mask="mask"
          :rules="rules1.number"
          label="ปีที่ได้รับรางวัล"
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
      </v-btn></v-row
    >
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
    rules1: {
      name: [(val) => (val || '').length > 0 || 'กรุณากรอกข้อมูล'],
      number: [(val) => (val || '').length > 0 || 'กรุณากรอก พ.ศ. เป้นตัวเลข'],
    },
    loading: true,
    Award: {
      awardType: 3,
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
    handleChange(e) {
      const fr = new FileReader()
      fr.readAsDataURL(e)
      fr.addEventListener('load', () => {
        this.imageUrl = fr.result
        this.imageFile = e
        // eslint-disable-next-line no-console
        console.log(fr)
      })
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
          awardType: 3,
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
