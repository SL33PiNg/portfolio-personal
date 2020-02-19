<template>
  <v-container>
    <v-row wrap justify="center">
      <v-card width="600">
        <v-card-title
          >{{ name }} <v-spacer></v-spacer>
          <v-chip class="success">{{ status }}</v-chip></v-card-title
        >

        <v-list-item>
          <v-list-item-subtitle>
            <h4>แผนก</h4>
            {{ section }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ตำแหน่ง</h4>
            {{ rank }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-subtitle>
            <h4>ปีที่เข้างาน</h4>
            {{ join }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ประเทศ</h4>
            {{ country }}
          </v-list-item-subtitle></v-list-item
        >
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
      rank: 'Cleaner Manager',
      country: 'Thailand',
      join: '1996'
    }
  }
}
</script>

<style></style>
