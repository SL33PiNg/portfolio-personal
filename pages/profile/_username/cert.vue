<template>
  <v-container>
    <v-row v-for="i in user.certificateinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5" @click.stop="openDetail(i)">
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
                รายละเอียดข้อมูลใบรับรอง
              </h1></v-sheet
            >

            <v-card-subtitle
              >ชื่อใบรับรอง : {{ detail.certificateName }}</v-card-subtitle
            >
            <v-card-subtitle
              >หน่วยงานที่ออก:{{ detail.guarantee }}</v-card-subtitle
            >
            <v-card-subtitle>ปีที่ได้รับ:{{ detail.graduate }}</v-card-subtitle>
            <v-card-subtitle
              >รายละเอียด :<froalaView
                v-model="detail.certificateinfoDetails"
              ></froalaView
            ></v-card-subtitle>
          </v-container>
        </v-card>
      </v-dialog>
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
