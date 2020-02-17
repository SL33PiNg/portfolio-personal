<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-history</v-icon>
          ประวัติการแก้ไข
        </h1>
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
      headers: [
        { text: 'ชื่อ', align: 'start', value: 'name' },
        { text: 'สถานะ', align: 'start', value: 'status' },
        { text: 'หมายเหตุ', align: 'start', value: 'note' }
      ]
    }
  }
}
</script>
