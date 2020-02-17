<template>
  <v-container>
    <v-row wrap justify="center">
      <div class="text-left">
        <v-dialog v-model="dialog" width="1000">
          <template v-slot:activator="{ on }">
            <v-card width="600" v-on="on">
              <v-card-title
                >{{ name }} <v-spacer></v-spacer>
                <v-chip class="success">{{ status }}</v-chip></v-card-title
              >
              <v-card-text>{{ level }}</v-card-text>
              <v-card-text>{{ educa }}/{{ depart }}</v-card-text>
            </v-card>
          </template>

          <v-card> </v-card>
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>
<script>
// import detailsOne from '~/components/detailsaward/details1.vue'
export default {
  data() {
    return {
      name: 'มหาวิทยาลัยเทคโนโลยีราชมงคล ธัญบุรี',
      level: 'ปริญญาโท',
      educa: 'วิศวกรรมศาสตร์',
      depart: 'วิศกรรมคอมพิวเตอร์',
      status: 'กำลังศึกษา'
    }
  }
}
</script>

<style></style>
