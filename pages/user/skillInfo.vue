<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-lightbulb-on-outline</v-icon>

            ข้อมูลทักษะความสามารภ
          </h1></v-sheet
        >
      </v-row>
      <v-row class="mt-10">
        <v-col
          cols="12"
          md="12
          "
          xs="12"
        >
          <v-textarea outlined></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class="mx-0 font-weight-light" color="primary">
          อัปเดตข้อมูล
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  components: {},
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
