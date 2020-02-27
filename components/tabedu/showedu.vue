<template>
  <v-container>
    <v-row v-for="i in user.educationinfo" :key="i._id" wrap justify="center">
      <div class="text-left">
        <v-card width="600" class="mt-5" @click.stop="dialog = true">
          <v-card-title
            >{{ i.academyName }} <v-spacer></v-spacer>
            <v-chip :class="i.status ? 'primary' : 'success'">{{
              i.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา'
            }}</v-chip></v-card-title
          >
          <v-card-text>{{ i.educationVocabulary }}</v-card-text>
          <v-card-text>{{ i.educationName }}/{{ i.branch }}</v-card-text>
        </v-card>
      </div></v-row
    >
    <v-dialog v-model="dialog">
      <v-card></v-card>
    </v-dialog>
  </v-container>
</template>
<script>
// import detailsOne from '~/components/detailsaward/details1.vue'
export default {
  data() {
    return {
      user: {},
      loading: true,
      username: '',
      dialog: false
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
