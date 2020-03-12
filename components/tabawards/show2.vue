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
              <info-Ser></info-Ser>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import infoSer from '~/components/infoawards/infoSer.vue'
export default {
  components: {
    infoSer
  },
  data() {
    return {
      dialog: false,
      name: 'บริการวิชาการ1',
      types: 'บริการวิชาการ',
      years: '2020'
    }
  }
}
</script>

<style></style>
