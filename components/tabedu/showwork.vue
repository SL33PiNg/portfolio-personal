<template>
  <v-container>
    <v-row wrap justify="center">
      <v-card width="600">
        <v-card-title
          >{{ name }} <v-spacer></v-spacer>
          <v-chip class="success">{{ status }}</v-chip></v-card-title
        >
        <v-card-text>แผนก :{{ section }}</v-card-text>
        <v-card-text>ตำแหน่ง:{{ rank }}</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'ชื่อบริษัท',
      status: 'กำลังทำอยู่',
      section: 'ทำความสะอาด',
      rank: 'Cleaner Manager'
    }
  }
}
</script>

<style></style>
