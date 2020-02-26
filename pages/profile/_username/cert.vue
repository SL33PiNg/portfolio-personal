<template>
  <v-container>
    <v-row v-for="i in user.certificateinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5">
        <v-card-title
          ><v-chip color="success">
            <h3>{{ i.certificateName }}</h3></v-chip
          >
        </v-card-title>

        <v-list-item>
          <v-list-item-subtitle>
            <h4>หน่วยงานที่ออก:{{ i.guarantee }}</h4>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ปีที่ได้รับ:{{ i.graduate }}</h4>
          </v-list-item-subtitle>
        </v-list-item>
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
