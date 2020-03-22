<template>
  <v-container>
    <v-row v-for="i in user.educationinfo" :key="i._id">
      <v-card>
        <v-card-text>
          <div>รายละเอียดการศึกษา</div>
          <p class="display-1 text--primary">
            {{ i.educationName }}/{{ i.branch }}
          </p>
        </v-card-text>
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
      username: '',
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
    },
  },
}
</script>

<style></style>
