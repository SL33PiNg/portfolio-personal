<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="pa-2" outlined tile>
          <div>
            <h3>{{ name }}</h3>
          </div>
          <div class="caption grey--text">{{ years }}</div>

          <v-img width="200" height="200" class="ma-2"></v-img>
          <p>รายละเอียดงาน</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: 'ชื่อผลงานโครงการวิจัยที่1',
    years: 'โครงการวืจัย/2562',
  }),
}
</script>
