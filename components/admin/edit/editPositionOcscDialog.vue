<template>
  <v-dialog v-model="isOpen" width="500">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">mdi-pencil</v-icon>
    </template>
    <v-card>
      <v-card-title>แก้ไขตำแหน่งสายงานก.พ.</v-card-title>
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
        <v-spacer></v-spacer>
        <v-btn color="success" @click.stop="updatePositionOcsc">บันทึก</v-btn>
        <v-btn color="primary" @click.stop="isOpen = false">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isOpen: false,
      name: this.item.name,
      id: this.item._id,
    }
  },
  methods: {
    async updatePositionOcsc() {
      if (!this.name) return
      try {
        await this.$axios.$patch('/select/positionOcsc', {
          _id: this.id,
          name: this.name,
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.$emit('refetch')
        this.isOpen = false
      }
    },
  },
}
</script>
