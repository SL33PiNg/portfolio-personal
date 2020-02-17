<template>
  <v-container>
    <v-row wrap justify="center">
      <v-card width="600">
        <v-card-title>ชื่อ :{{ name }} </v-card-title>
        <v-card-text>{{ types }}/{{ years }}</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'บริการวิชาการ1',
      types: 'บริการวิชาการ',
      years: '2020'
    }
  }
}
</script>

<style></style>
