<template>
  <v-container>
    <v-row v-for="i in user.educationinfo" :key="i._id" wrap justify="center">
      <div class="text-left">
        <v-dialog v-model="dialog" width="1000">
          <template v-slot:activator="{ on }">
            <v-card width="600" class="mt-5" v-on="on">
              <v-card-title
                >{{ i.academyName }} <v-spacer></v-spacer>
                <v-chip :class="i.status ? 'primary' : 'success'">{{
                  i.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา'
                }}</v-chip></v-card-title
              >
              <v-card-text>{{ i.educationVocabulary }}</v-card-text>
              <v-card-text>{{ i.educationName }}/{{ i.branch }}</v-card-text>
            </v-card>
          </template>

          <v-card> </v-card>
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>
<script>
// import detailsOne from '~/components/detailsaward/details1.vue'
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
