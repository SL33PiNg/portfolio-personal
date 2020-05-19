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
          <v-carousel v-model="model" cycle hide-delimiters>
            <v-carousel-item
              v-for="award in markAward"
              :key="award.id"
              reverse-transition="fade-transition"
              transition="fade-transition"
              :src="`http://localhost:3000/api/award/${award.cover}`"
              contain
              link
              :to="`/award/${award._id}`"
            >
              <v-row no-gutters style="height: 100%;">
                <v-col align-self="end">
                  <div class="white text-center">
                    <h3 class="black--text">{{ award.name }}</h3>
                  </div>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-row>
      <v-row justify="end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <router-link to="/award" v-on="on"
              ><div class="black--text mr-5">ดูผลงานทั้งหมด</div></router-link
            ></template
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
    onClickHandler(index) {
      console.log(index)
    },

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
<style lang="sass" scoped>
$data-table-expanded-content-box-shadow: inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75), inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75) !default
</style>
