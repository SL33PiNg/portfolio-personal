<template>
  <v-dialog v-model="isOpen" width="500" persistent>
    <template v-slot:activator="{ on }">
      <v-chip class="error"><v-icon small v-on="on">mdi-delete</v-icon></v-chip>
    </template>
    <v-card>
      <v-card-title>ลบรายการตำแหน่งสายงานก.พ.</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p>ต้องการลบรายการนี้? {{ name }}</p>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="" @click.stop="isOpen = false">ยกเลิก</v-btn
        ><v-btn color="error" @click.stop="delPositionOcsc">ตกลง</v-btn>
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
    async delPositionOcsc() {
      if (!this.name) return
      try {
        await this.$axios.$delete(`/select/positionOcsc/${this.id}`)
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
