<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-history</v-icon>
            สำรองข้อมูล
          </h1></v-sheet
        >
      </v-row>
      <v-card outlined class="mx-auto ma-5">
        <v-row justify="center" class="ma-2">
          <v-col cols="11" md="11" xs="1" sm="6">
            <v-btn block class="primary" @click="blackup">สำรองข้อมูล </v-btn>
          </v-col>
        </v-row>
        <v-data-table> </v-data-table>
      </v-card>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    blackup() {
      try {
        this.$axios.$get('/admin/blackup')
      } catch (error) {
      } finally {
        console.log('GG')
      }
    },
  },
}
</script>
