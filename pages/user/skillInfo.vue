<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-lightbulb-on-outline</v-icon>
          ข้อมูลความเชี่ยวชาญ
        </h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="10" xs="12">
          <label>ความเชี่ยวชาญ</label>
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
        <v-btn class="mx-0 font-weight-light" color="primary"
          >เพิ่มข้อมูล</v-btn
        >
      </v-row>

      <v-container>
        <v-row class="ma-3">
          <h1>
            <v-icon large color="black">mdi-lightbulb-on-outline</v-icon>

            ข้อมูลทักษะความสามารภ
          </h1>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12
          "
            xs="12"
          >
            <v-textarea></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="end" class="ma-3 ">
          <v-btn class="mx-0 font-weight-light" color="primary">
            อัปเดตข้อมูล
          </v-btn>
        </v-row>
      </v-container>
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
