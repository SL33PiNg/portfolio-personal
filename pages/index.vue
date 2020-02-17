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
              v-for="color in colors"
              :key="color"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-sheet :color="color" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-row>
      <v-row justify="end"> <v-btn text>ดูผลงานทั้งหมด</v-btn></v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
      model: 0
    }
  }
}
</script>
