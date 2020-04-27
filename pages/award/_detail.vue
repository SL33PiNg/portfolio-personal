<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <!-- <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-trophy-award</v-icon>
            รายละเอียดผลงาน "{{ award.name }}"
          </h1></v-sheet
        >
      </v-row> -->
      <keep-alive>
        <component :is="cardType" :award="award" />
      </keep-alive>
    </v-container>
  </v-card>
</template>

<script>
import type1 from '~/components/infoawards/infoRes.vue'
import type2 from '~/components/infoawards/infoSer.vue'
import type3 from '~/components/infoawards/infoAwa.vue'
import type4 from '~/components/infoawards/infoOther.vue'
export default {
  components: {
    type1,
    type2,
    type3,
    type4,
  },
  data: () => ({
    awardDone: false,
    award: {
      type: Object,
      default: () => ({}),
    },
  }),
  computed: {
    cardType() {
      return `type${this.award.awardType}`
    },
  },
  created() {
    this.getAward()
  },
  methods: {
    async getAward() {
      try {
        const result = await this.$axios.$get(
          `/award/detail/${this.$route.params.detail}`
        )
        this.award = result
      } catch (error) {
      } finally {
        this.awardDone = true
      }
    },
  },
}
</script>

<style></style>
