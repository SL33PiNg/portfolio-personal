<template>
  <v-dialog v-model="isOpen" width="500">
    <template v-slot:activator="{ on }">
      <v-chip color="primary"><v-icon v-on="on">mdi-plus</v-icon></v-chip>
    </template>
    <v-card>
      <v-card-title>เพิ่มตำแหน่งสายงานก.พ.ย่อย: {{ item.name }}</v-card-title>
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
        <v-btn color="primary" @click.stop="isOpen = false">ยกเลิก</v-btn>
        <v-btn color="success" @click.stop="addsubPositionOcsc">บันทึก</v-btn>
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
      name: '',
    }
  },
  methods: {
    async addsubPositionOcsc() {
      if (!this.name) return
      try {
        await this.$axios.$post('/select/positionOcsc/sub', {
          _id: this.item._id,
          subName: this.name,
        })
      } catch (error) {
        this.$toast.error(
          `ชื่อตำแหน่งสายงาน ก.พ.(ย่อย) : ${this.name} มีอยู่แล้ว`
        )
      } finally {
        this.name = ''
        this.$emit('refetch')
        this.isOpen = false
      }
    },
  },
}
</script>
