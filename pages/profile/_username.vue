<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col cols="12" md="4">
        <v-row>
          <v-card width="100%" class="mt-8">
            <v-row justify="center">
              <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
                <h1 class="ma-2 white--text">
                  <v-icon large color="white"> mdi-account-circle</v-icon>
                  ข้อมูลส่วนตัว
                </h1></v-sheet
              >
            </v-row>
            <v-img
              :src="`${hostname}/api/avatar/${user.avatar}`"
              aspect-ratio="1.7"
              width="200"
              height="200"
              class=" mt-5 mx-auto"
            ></v-img>
            <v-list-item class="ml-4">
              <h4>
                {{ user.personalInfo.academicRank
                }}{{ user.personalInfo.firstnameTH }}
                {{ user.personalInfo.lastnameTH }} ({{
                  user.personalInfo.nicknameTH
                }})
              </h4>
            </v-list-item>
            <v-list-item class="ml-4">
              <h4>
                {{ user.personalInfo.firstnameEN }}
                {{ user.personalInfo.lastnameEN }} ({{
                  user.personalInfo.nicknameEN
                }})
              </h4>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
              <v-list-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="ml-4"
                      ><h4>ข้อมูลหน่วยงาน</h4></v-list-item-title
                    >
                  </v-list-item-content>
                </template>

                <v-list-item><h4>หน่วยงาน :</h4></v-list-item>
                <v-list-item
                  ><h4>ฝ่าย :</h4>
                  {{ user.careerInfo.department }}</v-list-item
                >
                <v-list-item
                  ><h4>ตำแหน่ง :</h4>
                  {{ user.careerInfo.jobPost }}</v-list-item
                >
                <v-list-item><h4>ประเทศ :</h4></v-list-item>
                <v-list-item
                  ><h4>
                    อีเมลล์ :
                  </h4>
                  {{ user.careerInfo.email }}</v-list-item
                >
                <v-list-item
                  ><h4>
                    เบอร์โทรศัพท์ :
                  </h4>
                  {{ user.careerInfo.phone }}</v-list-item
                >
              </v-list-group>
            </v-list>

            <v-divider></v-divider>

            <v-list-item class="ml-4">
              <h4>ความเชี่ยวชาญ</h4>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="ml-4">
              <h4>ตำแหน่งสายงาน (ก.พ.)</h4>
            </v-list-item>
            <v-list-item class="ml-4">
              <v-chip v-for="i in ocscList" :key="i" color="primary">{{
                i
              }}</v-chip>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="ml-4">
              <h4>ช่องทางการติดต่อส่วนตัว</h4>
            </v-list-item>
            <v-list-item
              ><v-icon color="red">mdi-email</v-icon>

              : {{ user.personalInfo.email }}
            </v-list-item>
            <v-list-item>
              <v-icon color="warning">mdi-phone</v-icon>
              : {{ user.personalInfo.phone }}
            </v-list-item>

            <v-list-item>
              <v-icon color="blue">mdi-facebook </v-icon>
              : {{ user.personalInfo.facebook }}
            </v-list-item>

            <v-list-item
              ><v-icon color="green">mdi-alpha-l-circle</v-icon> :
              {{ user.personalInfo.lineID }}
            </v-list-item>
            <v-divider></v-divider>
            <v-card-actions class="ml-4">
              <v-btn color="primary" text>
                <h4>ดาวน์โหลดนามบัตร</h4>
              </v-btn>
              <v-btn color="warning" text>
                <h4>ร้องเรียน</h4>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-card outlined min-height="835">
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

          <nuxt-child></nuxt-child>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  validate({ params }) {
    return isNaN(+params.username)
  },
  data: () => ({
    dialog: false,
    tab: null,
    tab2: null,
    user: {},
    loading: true,
    username: '',
    positionocsc: [],
    tabItems: [
      { id: 1, title: 'ผลงาน', path: '/' },
      {
        id: 2,
        title: 'ทักษะความสามารถ',
        path: '/skill'
      },
      {
        id: 3,
        title: 'การศึกษาและการทำงาน',
        path: '/edu'
      },
      { id: 4, title: 'ใบรับรอง', path: '/cert' }
    ],
    hostname: location.origin
  }),
  computed: {
    ocscList() {
      const a = []
      console.log(this.positionocsc)
      this.positionocsc.forEach((pocsc) => {
        this.user.ocscId.forEach((ocsc) => {
          pocsc.sub.forEach((psub) => {
            if (psub._id === ocsc) {
              console.log(psub)
              a.push(psub.name)
            }
          })
        })
      })
      return a
    }
  },

  created() {
    this.username = this.$route.params.username
    this.getProfile()
    this.getPositionOcsc()
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
    async getPositionOcsc() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/positionOcsc')
        console.log(result)
        this.positionocsc = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
