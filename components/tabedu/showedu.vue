<template>
  <v-container>
    <v-row v-for="i in user.educationinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5 text-left">
        <v-card-title
          >{{ i.educationVocabulary }} <v-spacer></v-spacer>
          <v-icon @click.stop="openDetail(i)">mdi-magnify</v-icon></v-card-title
        >
        <v-list-item>
          <v-list-item-subtitle>
            <h4>ปีที่สำเร็จ/วุฒิการศึกษา</h4>
            {{ i.graduate || 'กำลังศึกษา' }}/{{ i.educationName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>สถานศึกษา</h4>
            {{ i.academyName }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-subtitle>
            <h4>ประเทศ</h4>
            {{ i.country }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-card-title class="headline primary white--text">
            ข้อมูลประวัติการศึกษา
            <v-spacer></v-spacer>
            <v-icon large color="white" @click="dialog = false">
              mdi-close</v-icon
            ></v-card-title
          >
          <v-card-title>
            {{ detail.academyName }}<v-spacer></v-spacer>
            <v-chip :class="detail.status ? 'success' : 'primary'">{{
              detail.status ? 'กำลังศึกษา' : 'สำเร็จการศึกษา'
            }}</v-chip></v-card-title
          >

          <v-card-subtitle class="mt-2"
            >ระดับวุฒิการศึกษา : {{ detail.educationVocabulary }}
          </v-card-subtitle>
          <v-card-subtitle
            >ชื่อวุฒิการศึกษา : {{ detail.educationName }}</v-card-subtitle
          >
          <v-card-subtitle>สาขา : {{ detail.branch }}</v-card-subtitle>
          <v-card-subtitle
            >ปีที่สำเร็จการศึกษา :
            {{ detail.graduate || 'กำลังศึกษา' }}</v-card-subtitle
          >
          <v-card-subtitle>ประเทศ : {{ detail.country }}</v-card-subtitle>
          <v-divider class="ma-1"></v-divider>
          <v-card-subtitle class="mt-3"
            >รายละเอียด :<froalaView
              v-model="detail.educationinfoDetails"
            ></froalaView
          ></v-card-subtitle>
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
      detail: '',
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
    },
  },
}
</script>

<style></style>
