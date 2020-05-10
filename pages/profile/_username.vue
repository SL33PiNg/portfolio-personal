<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" md="4">
        <v-row>
          <v-card width="100%" class="mt-8">
            <v-row justify="center">
              <v-sheet color="primary" width="90%" elevation="8" class="mt-n8">
                <h1 class="ma-2 white--text">
                  <v-icon large color="white"> mdi-account-circle</v-icon>
                  ข้อมูลส่วนตัว
                </h1></v-sheet
              >
            </v-row>
            <v-img
              :src="`${hostname}/api/avatar/${user.avatar}`"
              aspect-ratio="1.7"
              width="420"
              height="250"
              contain
              class="mt-5 mx-auto"
            ></v-img>
            <v-row class="ml-8 mt-2">
              <h4>
                {{ user.personalInfo.academicRank }}
                {{ user.personalInfo.firstnameTH }}
                {{ user.personalInfo.lastnameTH }}
              </h4>
            </v-row>
            <v-row class="ml-8 mt-2">
              <h4>
                {{ user.personalInfo.firstnameEN }}
                {{ user.personalInfo.lastnameEN }}
              </h4>
            </v-row>
            <v-row class="ml-8 mt-2 mb-3">
              <h4>
                ชื่อเล่น :{{ user.personalInfo.nicknameTH }} ({{
                  user.personalInfo.nicknameEN
                }})
              </h4>
            </v-row>
            <v-divider></v-divider>
            <v-list>
              <v-list-group>
                <template v-slot:activator>
                  <v-row class="ml-4"><h4>ข้อมูลหน่วยงาน</h4></v-row>
                </template>

                <v-list-item class="ml-4"
                  ><h4>หน่วยงาน</h4>
                  <div class="ml-2">{{ departmentName }}</div></v-list-item
                >
                <v-list-item class="ml-4"
                  ><h4>ฝ่าย</h4>
                  <div class="ml-2">
                    {{ user.careerInfo.department }}
                  </div></v-list-item
                >
                <v-list-item class="ml-4"
                  ><h4>ตำแหน่ง</h4>
                  <div class="ml-2">
                    {{ user.careerInfo.jobPost }}
                  </div></v-list-item
                >
                <v-list-item class="ml-4"
                  ><h4>ประเทศ</h4>
                  <div class="ml-2">
                    {{ user.careerInfo.country }}
                  </div></v-list-item
                >
                <v-list-item class="ml-4"
                  ><h4>
                    อีเมล
                  </h4>
                  <div class="ml-2">
                    {{ user.careerInfo.email }}
                  </div></v-list-item
                >
                <v-list-item class="ml-4"
                  ><h4>
                    เบอร์โทรศัพท์
                  </h4>
                  <div class="ml-2">
                    {{ user.careerInfo.phone }}
                  </div></v-list-item
                >
              </v-list-group>
            </v-list>

            <v-divider></v-divider>

            <v-row class="ml-8 mt-2">
              <h4>ความเชี่ยวชาญ</h4>
            </v-row>

            <v-row class="ml-7 mb-3">
              <v-chip v-for="x in expertList" :key="x" class="ma-1">{{
                x
              }}</v-chip>
            </v-row>
            <v-divider></v-divider>

            <v-row class="ml-8 mt-2">
              <h4>ตำแหน่งสายงาน (ก.พ.)</h4>
            </v-row>

            <v-row class="ml-7 mb-2">
              <v-chip v-for="i in ocscList" :key="i" class="ma-1"
                >{{ i }}
              </v-chip>
            </v-row>

            <v-divider></v-divider>
            <v-row class="ml-8 mt-2">
              <h4>ช่องทางการติดต่อส่วนตัว</h4>
            </v-row>
            <v-row class="ml-8 mt-2"
              ><v-icon color="red">mdi-email</v-icon>

              <div class="ml-2">{{ user.personalInfo.email }}</div>
            </v-row>
            <v-row class="ml-8 mt-2">
              <v-icon color="warning">mdi-phone</v-icon>
              <div class="ml-2">{{ user.personalInfo.phone }}</div>
            </v-row>

            <v-row class="ml-8 mt-2">
              <v-icon color="blue">mdi-facebook </v-icon>
              <div class="ml-2">{{ user.personalInfo.facebook }}</div>
            </v-row>

            <v-row class="ml-8 mt-2 mb-3"
              ><v-icon color="green">mdi-alpha-l-circle</v-icon>
              <div class="ml-2">{{ user.personalInfo.lineID }}</div>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions class="ml-5">
              <Complaint :user="user"></Complaint>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-card outlined max-height="1000">
          <v-tabs
            v-model="tab"
            background-color="white"
            color="primary"
            centered
          >
            <v-tab
              v-for="item in tabItems"
              :key="item.id"
              :to="`/profile/${username}${item.path}`"
              >{{ item.title }}</v-tab
            >
          </v-tabs>

          <nuxt-child :awards="user.awardList"></nuxt-child>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Complaint from '~/components/complainPro/comp.vue'
export default {
  validate({ params }) {
    return isNaN(+params.username)
  },
  components: {
    Complaint,
  },
  data: () => ({
    maxH: window.innerHeight,
    profileDone: false,
    selectDone1: false,
    selectDone2: false,
    selectDone3: false,
    dialog: false,
    tab: null,
    tab2: null,
    user: {
      personalInfo: {
        academicRank: '',
      },
    },
    username: '',
    positionocsc: [],
    expertists: [],
    tabItems: [
      { id: 1, title: 'ผลงาน', path: '/' },
      {
        id: 2,
        title: 'ทักษะความสามารถ',
        path: '/skill',
      },
      {
        id: 3,
        title: 'การศึกษาและการทำงาน',
        path: '/edu',
      },
      { id: 4, title: 'ใบรับรอง', path: '/cert' },
    ],
    hostname: location.origin,
    departments: [],
  }),
  computed: {
    loading() {
      return (
        this.getProfile &&
        this.selectDone1 &&
        this.selectDone2 &&
        this.selectDone3
      )
    },
    departmentName() {
      if (!this.loading) return ''
      const found = this.departments.find(
        (f) => f._id === this.user.careerInfo.dpmentID
      )
      const c = { ...found }
      return c.name
    },
    expertList() {
      const b = []

      this.expertists.forEach((lexp) => {
        this.user.expId.forEach((exp) => {
          lexp.sub.forEach((expsub) => {
            if (expsub._id === exp) {
              b.push(expsub.name)
            }
          })
        })
      })
      return b
    },
    ocscList() {
      const a = []

      this.positionocsc.forEach((pocsc) => {
        this.user.ocscId.forEach((ocsc) => {
          pocsc.sub.forEach((psub) => {
            if (psub._id === ocsc) {
              a.push(psub.name)
            }
          })
        })
      })
      return a
    },
  },

  created() {
    this.username = this.$route.params.username
    this.getProfile()
    this.getPositionOcsc()
    this.getDepartment()
    this.getExpertist()
  },
  methods: {
    async getProfile() {
      try {
        const result = await this.$axios.$get(
          `/profile/${this.$route.params.username}`
        )
        this.user = result
      } catch (error) {
      } finally {
        this.profileDone = true
      }
    },
    async getExpertist() {
      try {
        const result = await this.$axios.$get('/select/expertist')

        this.expertists = result
      } catch (error) {
      } finally {
        this.selectDone1 = true
      }
    },
    async getPositionOcsc() {
      try {
        const result = await this.$axios.$get('/select/positionOcsc')

        this.positionocsc = result
      } catch (error) {
      } finally {
        this.selectDone2 = true
      }
    },
    async getDepartment() {
      try {
        const result = await this.$axios.$get('/select/department')
        this.departments = result
      } catch (error) {
      } finally {
        this.selectDone3 = true
      }
    },
  },
}
</script>
<style lang="css" scoped>
.v-list {
  padding: 0px 0;
}
</style>
