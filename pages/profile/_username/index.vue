<template>
  <v-tabs v-resize="onResize" background-color="white" color="primary" grow>
    <v-tab> โครงการวิจัย </v-tab>
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
      <v-card :height="maxH" class="overflow-y-auto">
        <v-container>
          <v-row>
            <v-col v-for="i in filterAward(1)" :key="i.id" cols="12" md="6">
              <card1 :award="i" :disable="true"></card1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card :height="maxH" class="overflow-y-auto">
        <v-container>
          <v-row>
            <v-col v-for="i in filterAward(2)" :key="i.id" cols="12" md="6">
              <card1 :award="i" :disable="true"></card1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card :height="maxH" class="overflow-y-auto">
        <v-container>
          <v-row>
            <v-col v-for="i in filterAward(3)" :key="i.id" cols="12" md="6">
              <card1 :award="i" :disable="true"></card1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card :height="maxH" class="overflow-y-auto">
        <v-container>
          <v-row>
            <v-col v-for="i in filterAward(4)" :key="i.id" cols="12" md="6">
              <card1 :award="i" :disable="true"></card1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
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
  data() {
    return {
      maxH: window.innerHeight,
    }
  },
  methods: {
    filterAward(val) {
      return this.awards.filter((f) => f.awardType === val)
    },
    onResize() {
      this.maxH = window.innerHeight
    },
  },
}
</script>
