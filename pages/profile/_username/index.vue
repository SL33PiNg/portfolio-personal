<template>
  <v-tabs background-color="white" color="primary" grow>
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

    <v-tab-item>
      <card1
        v-for="i in filterAward(1)"
        :key="i.id"
        :award="i"
        :disable="true"
      ></card1>
    </v-tab-item>
    <v-tab-item>
      <card1
        v-for="i in filterAward(2)"
        :key="i.id"
        :award="i"
        :disable="true"
      ></card1>
    </v-tab-item>
    <v-tab-item>
      <card1
        v-for="i in filterAward(3)"
        :key="i.id"
        :award="i"
        :disable="true"
      ></card1>
    </v-tab-item>
    <v-tab-item>
      <card1
        v-for="i in filterAward(4)"
        :key="i.id"
        :award="i"
        :disable="true"
      ></card1>
    </v-tab-item>
  </v-tabs>
</template>
<script>
import card1 from '@/components/Cards/feedscard'
export default {
  components: {
    card1,
  },
  props: {
    awards: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    filterAward(val) {
      return this.awards.filter((f) => f.awardType === val)
    },
  },
}
</script>
