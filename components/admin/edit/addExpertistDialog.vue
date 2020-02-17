<template>
  <v-dialog v-model="isOpen" width="500">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">mdi-folder-plus</v-icon>
    </template>
    <v-card>
      <v-card-title>เพิ่มความเชี่ยวชาญ</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="name" label="ชื่อ"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.stop="isOpen = false"
          >ยกเลิก</v-btn
        >
        <v-btn color="blue darken-1" text @click.stop="addExpertist"
          >บันทึก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      name: ''
    }
  },
  methods: {
    async addExpertist() {
      if (!this.name) return
      try {
        await this.$axios.$post('/select/expertist', { name: this.name })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.name = ''
        this.$emit('refetch')
        this.isOpen = false
      }
    }
  }
}
</script>
