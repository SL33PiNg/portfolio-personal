<template>
  <v-container>
    <v-row v-for="i in user.workinfo" :key="i._id" wrap justify="center">
      <v-card width="600" class="mt-5 text-left">
        <v-card-title
          >{{ i.company }} <v-spacer></v-spacer>
          <v-icon @click.stop="openDetail(i)">mdi-magnify</v-icon></v-card-title
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
          <v-list-item-subtitle>
            <h4>ประเทศ</h4>
            {{ i.country }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-subtitle>
            <h4>ปีที่เริ่มทำงาน-ออกจากงาน (พ.ศ.)</h4>
            {{ i.start }} - {{ i.end || 'ปัจจุบัน' }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-container>
            <v-row justify="end" class="ma-1">
              <v-icon color="red" @click="dialog = false">
                mdi-close-box</v-icon
              ></v-row
            >
            <v-sheet color="primary" width="100%">
              <h1 class="ma-2 white--text">
                <v-icon large color="white">mdi-briefcase-outline</v-icon>
                รายละเอียดข้อมูลการทำงาน
              </h1></v-sheet
            >
            <v-card-title class="headline">
              {{ detail.company }}<v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-chip :class="detail.status ? 'success' : 'secondary'">{{
                detail.status ? 'กำลังทำงาน' : 'ออกจากงาน'
              }}</v-chip></v-card-title
            >

            <v-card-subtitle>แผนก : {{ detail.department }} </v-card-subtitle>
            <v-card-subtitle>ตำแหน่ง : {{ detail.position }}</v-card-subtitle>
            <v-card-subtitle
              >ปีที่เริ่มทำงาน (พ.ศ.) : {{ detail.start }}</v-card-subtitle
            >

            <v-card-subtitle
              >ปีที่ออกจากงาน (พ.ศ.) :
              {{ detail.end || 'ปัจจุบัน' }}</v-card-subtitle
            >
            <v-card-subtitle>ประเทศ : {{ detail.country }}</v-card-subtitle>
            <v-card-subtitle
              >รายละเอียด :<froalaView
                v-model="detail.workinfoDetails"
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
      detail: '',
      dialog: false,
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
