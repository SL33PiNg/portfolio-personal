/* eslint-disable prettier/prettier */
<template>
  <v-card class="mx-auto ma-3" max-width="70%" outlined>
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="yellow">mdi-star</v-icon>
          ผลงานที่โดดเด่น
        </h1>
      </v-row>
      <v-row>
        <template>
          <v-carousel v-model="model">
            <v-carousel-item
              v-for="award in markAward"
              :key="award.id"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-sheet height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <h1>{{ award.name }}</h1>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-row>
      <v-row justify="end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }"
            ><v-btn text to="/award" v-on="on">ดูผลงานทั้งหมด</v-btn></template
          ><span>ดูผลงานทั้งหมด</span></v-tooltip
        >
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
      model: 0,
      markAward: [],
    }
  },
  created() {
    this.getMarkAward()
  },
  methods: {
    async getMarkAward() {
      try {
        const result = await this.$axios.$get('/award')
        this.markAward = result
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
