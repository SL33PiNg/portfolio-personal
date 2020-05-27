<template>
  <v-container>
    <v-row v-for="i in user.certificateinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5 ma-1">
        <v-card-title>
          {{ i.certificateName }} <v-spacer></v-spacer>
          <v-icon @click.stop="openDetail(i)">mdi-magnify</v-icon>
        </v-card-title>

        <v-list-item>
          <v-list-item-subtitle>
            <h4>หน่วยงานที่ออก</h4>
            {{ i.guarantee }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ปีที่ได้รับ</h4>
            {{ i.graduate }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-card-title class="headline primary white--text">
            ข้อมูลใบรับรอง
            <v-spacer></v-spacer>
            <v-icon large color="white" @click="dialog = false">
              mdi-close</v-icon
            ></v-card-title
          >
          <v-card-title> {{ detail.certificateName }}</v-card-title>

          <v-card-subtitle class="mt-2"
            >หน่วยงานที่ออก:{{ detail.guarantee }}</v-card-subtitle
          >
          <v-card-subtitle>ปีที่ได้รับ:{{ detail.graduate }}</v-card-subtitle>
          <v-divider class="ma-1"></v-divider>
          <v-card-subtitle class="mt-3"
            >รายละเอียด :<froalaView
              v-model="detail.certificateinfoDetails"
            ></froalaView
          ></v-card-subtitle>
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
