<template>
  <v-dialog v-model="isOpen" width="500" persistent>
    <template v-slot:activator="{ on }">
      <v-icon small v-on="on">mdi-delete</v-icon>
    </template>
    <v-card>
      <v-card-title>ลบรายการหน่วยงาน</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p>ต้องการลบรายการนี้? {{ name }}</p>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.stop="isOpen = false"
          >ไม่</v-btn
        >
        <v-btn color="blue darken-1" text @click.stop="delDepartment"
          >ใช่</v-btn
        >
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
      loading: true,
    }
  },
  methods: {
    async delDepartment() {
      try {
        await this.$axios.$delete(`/select/department/${this.id}`)
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
