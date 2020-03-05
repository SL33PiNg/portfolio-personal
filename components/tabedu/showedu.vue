<template>
  <v-container>
    <v-row v-for="i in user.educationinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5 text-left" @click.stop="openDetail(i)">
        <v-card-title
          >{{ i.academyName }} <v-spacer></v-spacer>
          <v-chip :class="i.status ? 'primary' : 'success'">{{
            i.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา'
          }}</v-chip></v-card-title
        >
        <v-card-text>{{ i.educationVocabulary }}</v-card-text>
        <v-card-text>{{ i.educationName }}/{{ i.branch }}</v-card-text>
      </v-card>
    </v-row>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-container>
            <v-row justify="end" class="ma-1 ">
              <v-icon color="red" @click="dialog = false">
                mdi-close-box</v-icon
              ></v-row
            >
            <v-sheet color="primary" width="100%">
              <h1 class="ma-2 white--text">
                <v-icon large color="white">mdi-school-outline</v-icon>
                รายละเอียดข้อมูลประวัติการศึกษา
              </h1></v-sheet
            >
            <v-card-title class="headline">
              {{ detail.academyName }}<v-spacer></v-spacer>
              <v-chip :class="detail.status ? 'primary' : 'success'">{{
                detail.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา'
              }}</v-chip></v-card-title
            >

            <v-card-subtitle
              >ระดับวุฒิการศึกษา : {{ detail.educationVocabulary }}
            </v-card-subtitle>
            <v-card-subtitle
              >ชื่อวุฒิการศึกษา : {{ detail.educationName }}</v-card-subtitle
            >
            <v-card-subtitle>สาขา : {{ detail.branch }}</v-card-subtitle>
            <v-card-subtitle
              >ปีที่สำเร็จการศึกษา : {{ detail.graduate }}</v-card-subtitle
            >
            <v-card-subtitle>ประเทศ : {{ detail.country }}</v-card-subtitle>
            <v-card-subtitle
              >รายละเอียด :<froalaView
                v-model="detail.educationinfoDetails"
              ></froalaView
            ></v-card-subtitle>
          </v-container>
        </v-card>
      </v-dialog>
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
      username: '',
      dialog: false,
      detail: ''
    }
  },
  created() {
    this.username = this.$route.params.username
    this.getProfile()
  },
  methods: {
    openDetail(x) {
      this.detail = x
      this.dialog = true
    },
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
