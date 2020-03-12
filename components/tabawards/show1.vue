<template>
  <v-container>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="80%">
        <template v-slot:activator="{ on }">
          <v-card width="600" v-on="on">
            <v-card-title
              >ชื่อ :{{ name }} <v-spacer></v-spacer>
              <v-chip class="primary">{{ status }}</v-chip>
            </v-card-title>
            <v-card-text>{{ types }}/{{ years }}</v-card-text>
          </v-card>
        </template>

        <v-card>
          <v-container>
            <v-row justify="space-around" wrap>
              <info-Res></info-Res>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import infoRes from '~/components/infoawards/infoRes.vue'
export default {
  components: {
    infoRes
  },

  data() {
    return {
      dialog: false,
      name: 'โครงการวิจัยที่1',
      types: 'โครงการวิจัย',
      years: '2020',
      status: 'หัวหน้าโครงการวิจัย'
    }
  }
}
</script>

<style></style>
