<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-lightbulb-on-outline</v-icon>
            ข้อมูลความเชี่ยวชาญ
          </h2>
        </v-sheet>
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" md="10" xs="12">
          <treeselect
            v-model="user.expId"
            :options="expertists"
            :normalizer="normalizer"
            :disable-branch-nodes="true"
            clear-on-select
            multiple
            placeholder="ความเชี่ยวชาญ"
          />
        </v-col>
      </v-row>
      <v-row class="ma-3" justify="end">
        <v-btn
          :loading="updateLoad"
          color="primary"
          @click="updateUser('ข้อมูลความเชี่ยวชาญ')"
          >เพิ่มข้อมูล</v-btn
        >
      </v-row>
    </v-container>
    <v-container class="mx-auto ma-8">
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h2 class="ma-2 white--text">
            <v-icon color="white">mdi-tools</v-icon>

            ข้อมูลทักษะความสามารถ
          </h2></v-sheet
        >
      </v-row>
      <v-row class="mt-10 ma-8">
        <v-col
          cols="12"
          md="12
          "
          xs="12"
        >
          <v-row>
            <v-col cols="12" md="12" xs="12">
              <froala
                v-if="!loading"
                v-model="user.skillsDetails"
                :config="config"
              >
              </froala>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3">
        <v-btn
          :loading="updateLoad"
          color="primary"
          @click="updateUser('ข้อมูลทักษะความสามารถ')"
        >
          อัปเดตข้อมูล
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import getUser from '@/mixins/user'
import Treeselect from '@riophae/vue-treeselect'

// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect,
  },
  mixins: [getUser],
  data() {
    return {
      user: {
        expId: [],
        skillsDetails: '',
      },
      loading: true,
      updateLoad: false,
      clearOnSelect: false,
      multiple: true,
      skills: [
        {
          name: 'ศึกษาศาสตร์',
        },
        {
          name: 'การฝึกหัดครูอนุบาล',
        },
      ],
      expertists: [],
      value: null,
      result: {},
      normalizer(node) {
        return {
          id: node._id,
          label: node.name,
          children: node.sub,
        }
      },
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
  created() {
    this.getExpertist()
  },
  methods: {
    async getExpertist() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/expertist')
        this.expertists = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.css"></style>
