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
        </v-list-item>
        <v-list-item>
          <v-list-item-subtitle>
            <h4>ประเทศ</h4>
            {{ i.country }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <h4>ปีที่ทำงาน</h4>
            พ.ศ.{{ i.start }} - {{ i.end || 'ปัจจุบัน' }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-card-title class="headline primary white--text">
            ข้อมูลประวัติการทำงาน
            <v-spacer></v-spacer>
            <v-icon large color="white" @click="dialog = false">
              mdi-close</v-icon
            ></v-card-title
          >
          <v-card-title>
            {{ detail.company }}<v-spacer></v-spacer>

            <v-chip :class="detail.status ? 'success' : 'secondary'">{{
              detail.status ? 'กำลังทำงาน' : 'ออกจากงาน'
            }}</v-chip></v-card-title
          >

          <v-card-subtitle class="mt-2"
            >แผนก : {{ detail.department }}
          </v-card-subtitle>
          <v-card-subtitle>ตำแหน่ง : {{ detail.position }}</v-card-subtitle>
          <v-card-subtitle
            >ปีที่ทำงาน (พ.ศ.) : {{ detail.start }}</v-card-subtitle
          >

          <v-card-subtitle
            >ปีที่ออกจากงาน (พ.ศ.) :
            {{ detail.end || 'กำลังทำงาน' }}</v-card-subtitle
          >
          <v-card-subtitle>ประเทศ : {{ detail.country }}</v-card-subtitle>
          <v-divider class="ma-1"></v-divider>
          <v-card-subtitle class="mt-3"
            >รายละเอียด :<froalaView
              v-model="detail.workinfoDetails"
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
