<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-lightbulb-on-outline</v-icon>

          ข้อมูลความเชี่ยวชาญ
        </h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10" xs="12">
          <v-select :items="items" label="ความเชี่ยวชาญ"></v-select>
        </v-col>
      </v-row>
      <v-row class="ma-3 " justify="end">
        <v-btn class="mx-0 font-weight-light" color="primary"
          >เพิ่มข้อมูล</v-btn
        >
      </v-row>
      <v-data-table
        :headers="headers"
        :items="skills"
        hide-default-footer
        class="elevation-1"
      >
        <template>
          <v-icon small>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

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
            <wysiwyg v-model="content"></wysiwyg>
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
export default {
  data() {
    return {
      content: null,
      config: {},
      items: ['1', '2', '3'],
      headers: [{ text: 'ความเชี่ยวชาญ', align: 'start', value: 'name' }],
      skills: [{ name: 'การศึกษา' }, { name: 'วิทยาศาสตร์' }]
    }
  }
}
</script>
