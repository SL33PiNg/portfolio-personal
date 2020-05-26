<template>
  <v-container>
    <v-row class="ma-3">
      <h3>โครงการวิจัย</h3>
    </v-row>
    <v-form ref="form" v-model="valid">
      <v-row justify="center">
        <v-col cols="12">
          <v-img
            v-if="award.cover"
            :src="`http://localhost:3000/api/award/${award.cover}`"
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
            placeholder="เลือกภาพปกโครงการวิจัย"
            prepend-icon="mdi-camera"
            label="ภาพปก"
            @change="handleChange"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-select
            v-model="award.researchCategory"
            :rules="[emptyRule, stringRule]"
            :items="items"
            label="ประเภทโครงการวิจัย"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="3" xs="12">
          <v-text-field
            v-model="award.eventYear"
            v-mask="mask"
            :rules="[numberRule]"
            label="ปีที่จัดทำโครงการ"
            placeholder="พ.ศ."
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" xs="12" class="mt-n7">
          <v-radio-group v-model="award.jobTitles" column dense>
            <v-radio
              label="หัวหน้าโครงการวิจัย"
              value="หัวหน้าโครงการวิจัย"
            ></v-radio>
            <v-radio
              label="ผู้ร่วมโครงการวิจัย"
              value="ผู้ร่วมโครงการวิจัย"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="award.name"
            :rules="[emptyRule, stringRule]"
            label="ชื่อโครงการวิจัยภาษาไทย"
            dense
            outlined
          />
        </v-col>

        <v-col cols="12" md="5" xs="12">
          <v-text-field
            v-model="award.nameEN"
            :rules="[emptyRule, stringRule]"
            label="ชื่อโครงการวิจัยภาษาอังกฤษ"
            dense
            outlined
          />
        </v-col>
        <v-col cols="12" md="2" xs="12">
          <v-text-field
            v-model="award.fiscalYear"
            v-mask="mask"
            :rules="[numberRule]"
            label="ปีงบประมาณ"
            dense
            outlined
            placeholder="พ.ศ."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" xs="12">
          <froala v-model="award.infoemation" :config="config"></froala>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3">
        <v-btn
          :disabled="!valid"
          class="mx-0 font-weight-light"
          color="primary"
          @click="editmode ? updateAward() : addAward()"
        >
          {{ editmode ? 'อัปเดต' : 'เพิ่มข้อมูล' }}
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
  props: {
    editmode: Boolean,
    award: {
      type: Object,
      default: () => ({
        awardType: 1,
        name: '',
        nameEN: '',
        researchCategory: 'การวิจัยทางวิทยาศาสตร์',
        fiscalYear: '',
        jobTitles: 'หัวหน้าโครงการวิจัย',
        funding: null,
        fundingSource: '',
        eventYear: '',
        file: '',
        infoemation: '',
        cover: '',
      }),
    },
  },
  data: () => ({
    emptyRule: (v) => !!v || 'กรุณากรอกข้อมูล',
    stringRule: (v) => (v && v.length > 0) || 'กรุณากรอกข้อมูล',
    numberRule: (v) => (v && v > 0) || 'กรุณากรอกตัวเลข (พ.ศ.)',
    valid: true,
    loading: true,
    mask: '####',
    content: null,
    items: ['การวิจัยทางวิทยาศาสตร์', 'การวิจัยทางสังคมศาสตร์'],
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
    // formIsValid() {
    //   return this.award.name
    // },
  },
  methods: {
    async updateAward() {
      try {
        await this.$axios.$patch('/users/award', {
          ...this.award,
        })
        this.$toast.success('อัปเดตข้อมูล"สำเร็จ"')
        this.$refs.form.reset()
      } catch (error) {
        this.$toast.error('อัปเดตข้อมูลไม่สำเร็จ"')
      } finally {
        this.editMode = false
        this.$emit('close')
      }
    },
    async handleChange(e) {
      if (!e) return
      const fr = new FileReader()
      fr.readAsDataURL(e)
      fr.addEventListener('load', () => {
        this.award.cover = fr.result
        this.imageFile = e
      })
      const data = new FormData()
      data.append('award', e)
      try {
        const result = await this.$axios.$post('/award/image', data)
        console.log(result)
        this.award.cover = result.file
      } catch (error) {}
    },
    async addAward() {
      this.loading = true
      try {
        await this.$axios.$post('/users/award', {
          ...this.award,
        })
        console.log(this.award)
        this.$toast.success('เพิ่มข้อมูล"สำเร็จ"')
      } catch (error) {
        this.$toast.success('เพิ่มข้อมูล"ไม่สำเร็จ"')
      } finally {
        this.$refs.form.reset()
        this.loading = false
        this.imageUrl = ''
        this.imageFile = ''
        this.award = {
          awardType: 1,
          name: '',
          nameEN: '',
          researchCategory: 'การวิจัยทางวิทยาศาสตร์',
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
