<template>
  <v-container>
    <v-row class="ma-3 ">
      <h3>
        โครงการวิจัย
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
          placeholder="เลือกภาพปกโครงการวิจัย"
          prepend-icon="mdi-camera"
          label="ภาพปก"
          @change="handleChange"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2" xs="12">
        <v-text-field label="โครงการวิจัย" disabled />
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-select :items="items" label="ประเภทโครงการวิจัย"></v-select>
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <v-radio-group column>
          <v-radio label="หัวหน้าโครงการวิจัย" value="radio-1"></v-radio>
          <v-radio label="ผู้ร่วมโครงการวิจัย" value="radio-2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5" xs="12">
        <v-text-field
          v-model="Award.name"
          label="ชื่อโครงการวิจัยภาษาไทย"
          clearable
        />
      </v-col>
      <v-col cols="12" md="5" xs="12">
        <v-text-field
          v-model="Award.nameEN"
          label="ชื่อโครงการวิจัยภาษาอังกฤษ"
          clearable
        />
      </v-col>
      <v-col cols="12" md="2" xs="12">
        <v-text-field
          v-model="Award.fiscalYear"
          label="ปีงบประมาณ"
          clearable
          placeholder="พ.ศ."
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" xs="12">
        <froala :config="config"></froala>
      </v-col>
    </v-row>
    <v-row justify="end" class="ma-3 ">
      <v-btn class="mx-0 font-weight-light" color="primary" @click="addAward">
        เพิ่มข้อมูล
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    Award: {
      awardType: '',
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
      highlights: null
    },
    content: null,
    items: ['การวิจัยทางวิทยาศาสตร์', 'การวิจัยทางสังคมศาสตร์'],
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!'
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
    },
    imageUrl: '',
    imageFile: ''
  }),

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
          ...this.Award
        })
        console.log(this.Award)
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.success('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.loading = false
        this.Award = {
          awardType: '',
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
          highlights: null
        }
      }
    }
  }
}
</script>
