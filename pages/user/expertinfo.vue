<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="success" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-lightbulb-on-outline</v-icon>
            ข้อมูลความเชี่ยวชาญ
          </h1>
        </v-sheet>
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" md="10" xs="12">
          <treeselect
            v-model="value"
            :options="expertists"
            :normalizer="normalizer"
            :disable-branch-nodes="true"
            clear-on-select
            multiple
            placeholder="ความเชี่ยวชาญ"
          />
        </v-col>
      </v-row>
      <v-row class="ma-3 " justify="end">
        <v-btn class="mx-0 font-weight-light" color="success"
          >เพิ่มข้อมูล</v-btn
        >
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect
  },
  data() {
    return {
      clearOnSelect: false,
      multiple: true,
      items: ['การศึกษา', 'บริหารธุรกิจ', 'วิทยาศาสตร์'],
      skills: [
        {
          name: 'ศึกษาศาสตร์'
        },
        {
          name: 'การฝึกหัดครูอนุบาล'
        }
      ],
      expertists: [],
      value: null,
      normalizer(node) {
        return {
          id: node._id,
          label: node.name,
          children: node.sub
        }
      }
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
    }
  }
}
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.css"></style>
