<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-history</v-icon>
            ประวัติการแก้ไข
          </h1></v-sheet
        >
      </v-row>
      <v-card-title>
        <v-text-field
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" hide-default-footer></v-data-table>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ชื่อ', align: 'start', value: 'name' },
        { text: 'สถานะ', align: 'start', value: 'status' },
        { text: 'หมายเหตุ', align: 'start', value: 'note' }
      ]
    }
  }
}
</script>
