<template>
  <v-tabs background-color="white" color="primary">
    <v-tab>
      ประวัติการทำงาน
    </v-tab>
    <v-tab>
      ประวัติการศึกษา
    </v-tab>

    <v-tab-item> <show-Work></show-Work> </v-tab-item>
    <v-tab-item> <show-Edu></show-Edu> </v-tab-item>
  </v-tabs>
</template>
<script>
import showWork from '~/components/tabedu/showwork.vue'
import showEdu from '~/components/tabedu/showedu.vue'

export default {
  components: {
    showWork,
    showEdu,
  },
}
</script>
