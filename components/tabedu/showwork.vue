<template>
  <v-container>
    <v-row v-for="i in user.workinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5">
        <v-card-title
          >{{ i.company }} <v-spacer></v-spacer>
          <v-chip :class="i.status ? 'primary' : 'error'">{{
            i.status ? 'กำลังทำงาน' : 'ออกจากงาน'
          }}</v-chip></v-card-title
        >

        <v-list-item>
          <v-list-item-subtitle>
            <h4>แผนก</h4>
            {{ i.department }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ตำแหน่ง</h4>
            {{ i.position }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-subtitle>
            <h4>ปีที่เข้างาน</h4>
            {{ i.start }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ประเทศ</h4>
            {{ i.country }}
          </v-list-item-subtitle></v-list-item
        >
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      loading: true,
      username: ''
    }
  },
  created() {
    this.username = this.$route.params.username
    this.getProfile()
  },
  methods: {
    async getProfile() {
      this.loading = true
      try {
        const result = await this.$axios.$get(
          `/profile/${this.$route.params.username}`
        )
        this.user = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
