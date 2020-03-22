<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <froalaView v-model="user.skillsDetails"></froalaView>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {},
    username: '',
    loading: true,
  }),
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
    },
  },
}
</script>

<style></style>
