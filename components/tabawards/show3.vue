<template>
  <v-container>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="80%">
        <template v-slot:activator="{ on }">
          <v-card width="600" v-on="on">
            <v-card-title>ชื่อ :{{ name }} </v-card-title>
            <v-card-text>{{ types }}/{{ years }}</v-card-text>
          </v-card>
        </template>

        <v-card>
          <v-container>
            <v-row justify="space-around">
              <div>
                <h1 class="subheading grey--text">{{ name }}</h1>
              </div>
            </v-row>

            <v-row justify="space-around">
              <v-col cols="5">
                <v-img
                  src="https://picsum.photos/510/300?random"
                  aspect-ratio="1.7"
                ></v-img>
              </v-col>
            </v-row>
            <v-row justify="space-around" wrap>
              <v-col cols="10">
                <info-Awa></info-Awa>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import infoAwa from '~/components/infoawards/infoAwa.vue'
export default {
  components: {
    infoAwa,
  },
  data() {
    return {
      dialog: false,
      name: 'รางวัลที่1',
      types: 'รางวัล',
      years: '2020',
    }
  },
}
</script>

<style></style>
