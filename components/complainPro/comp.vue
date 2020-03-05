<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }"
        ><v-btn color="warning" text v-on="on"> <h4>ร้องเรียน</h4></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          คำร้องเรียน
        </v-card-title>

        <v-textarea class="ma-2"></v-textarea>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            บันทึก
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>
