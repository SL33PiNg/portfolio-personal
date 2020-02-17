<template>
  <v-layout justify-center align-center column>
    <v-flex v-for="i in users" :key="i.id" class="my-1" xs12 md12>
      <v-card width="600" @click="$router.push(`/profile/${i.username}`)">
        <v-card-title>
          ชื่อ : {{ i.personalInfo.firstnameTH }} นามสกุล :
          {{ i.personalInfo.lastnameTH }} ชื่อเล่น :</v-card-title
        >
        <v-card-text>หน่วยงาน :</v-card-text>
        <v-card-text>ความเชี่ยวชาญ :</v-card-text>
        <v-card-text>ตำแหน่งสายงาน (ก.พ.) :</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      loading: 0
    }
  }
}
</script>

<style></style>
