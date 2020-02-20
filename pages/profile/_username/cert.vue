<template>
  <v-container>
    <v-row wrap justify="center">
      <v-card width="600">
        <v-card-title>{{ name }} </v-card-title>

        <v-list-item>
          <v-list-item-subtitle>
            <h4>หน่วยงานที่ออก</h4>
            {{ Department }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ปีที่ได้รับ</h4>
            {{ years }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'ชื่อใบรับรอง',
      Department: 'กองกำลัง คสช.',
      years: '2019'
    }
  }
}
</script>

<style></style>
