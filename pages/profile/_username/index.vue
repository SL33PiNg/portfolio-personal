<template>
  <v-tabs background-color="white" color="primary">
    <v-tab>
      โครงการวิจัย
    </v-tab>
    <v-tab>
      บริการวิชาการ
    </v-tab>
    <v-tab>
      รางวัล
    </v-tab>
    <v-tab>
      อื่นๆ
    </v-tab>

    <v-tab-item> <show-One></show-One> </v-tab-item>
    <v-tab-item> <show-Two></show-Two> </v-tab-item>
    <v-tab-item> <show-Three></show-Three> </v-tab-item>
    <v-tab-item> <show-Four></show-Four> </v-tab-item>
  </v-tabs>
</template>
<script>
import showOne from '~/components/tabawards/show1.vue'
import showTwo from '~/components/tabawards/show2.vue'
import showThree from '~/components/tabawards/show3.vue'
import showFour from '~/components/tabawards/show4.vue'
export default {
  components: {
    showOne,
    showTwo,
    showThree,
    showFour
  }
}
</script>
