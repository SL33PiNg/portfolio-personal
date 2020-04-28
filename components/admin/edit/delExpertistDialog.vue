<template>
  <v-dialog v-model="isOpen" width="500" persistent>
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">mdi-delete</v-icon>
    </template>
    <v-card>
      <v-card-title>ลบรายการความเชี่ยวชาญ</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p>ต้องการลบรายการนี้? {{ name }}</p>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click.stop="delExpertist">ตกลง</v-btn>
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
    async delExpertist() {
      if (!this.name) return
      try {
        await this.$axios.$delete(`/select/expertist/${this.id}`)
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
