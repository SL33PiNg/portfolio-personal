<template>
  <v-container>
    <v-row justify="center"> <normal></normal> </v-row>
    <v-row justify="center">
      <v-card width="90%">
        <v-row
          v-for="i in users"
          :key="i.id"
          class="my-5 ma-2"
          xs12
          md12
          justify="center"
          wrap
        >
          <v-hover v-slot:default="{ hover }" open-delay="200">
            <v-card
              width="100%"
              :elevation="hover ? 5 : 1"
              class="ma-2"
              @click="$router.push(`/profile/${i.username}`)"
            >
              <v-row justify="space-around">
                <v-col cols="12" md="6">
                  <v-list-item>
                    <v-list-item-avatar width="110" height="110" class="ma-1"
                      ><v-img
                        :src="`${hostname}/api/avatar/${i.avatar}`"
                        aspect-ratio="1.7"
                        class="ma-1 mx-auto"
                      ></v-img
                    ></v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="headline ml-1">
                        {{ i.personalInfo.academicRank
                        }}{{ i.personalInfo.firstnameTH }}
                        {{ i.personalInfo.lastnameTH }}</v-list-item-title
                      >

                      <v-list-item-subtitle class="my-1 ml-2"
                        >ชื่อเล่น :{{
                          i.personalInfo.nicknameTH
                        }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle class="my-1 ml-2"
                        >หน่วยงาน : {{ getDepartment(i.careerInfo.dpmentID) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col cols="12" md="6" align-self="center">
                  <v-list-item-subtitle>
                    <v-span><h4>ความเชี่ยวชาญ</h4> </v-span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-row class="ml-1">
                      <v-chip
                        v-for="a in getExpert(i.expId)"
                        :key="a"
                        class="my-1 ma-1"
                      >
                        {{ a }}</v-chip
                      ></v-row
                    >
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-span><h4>ตำแหน่งสายงาน (ก.พ.)</h4> </v-span>
                  </v-list-item-subtitle>

                  <v-chip
                    v-for="b in getOcsc(i.ocscId)"
                    :key="b"
                    class="my-1 ma-1"
                  >
                    {{ b }}
                  </v-chip>

                  <v-list-item-subtitle> {{ b }}</v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import normal from '~/components/search/nomal.vue'
export default {
  middleware: ['getSelect'],
  components: {
    normal,
  },
  data() {
    return {
      user: {},
      users: [],
      loading: true,
      hostname: location.origin,
    }
  },
  computed: {
    department() {
      return this.$store.state.select.department
    },
    expert() {
      return this.$store.state.select.expert
    },
    ocsc() {
      return this.$store.state.select.ocsc
    },
  },
  created() {
    this.getAllProfile()
  },
  methods: {
    getOcsc(ids) {
      const a = []

      this.ocsc.forEach((pocsc) => {
        ids.forEach((ocsc) => {
          pocsc.sub.forEach((psub) => {
            if (psub._id === ocsc) {
              a.push(psub.name)
            }
          })
        })
      })
      return a
    },
    getExpert(ids) {
      const b = []

      this.expert.forEach((lexp) => {
        ids.forEach((exp) => {
          lexp.sub.forEach((expsub) => {
            if (expsub._id === exp) {
              b.push(expsub.name)
            }
          })
        })
      })
      return b
    },
    getDepartment(id) {
      if (!id) return ''
      const found = this.department.find((f) => f._id === id)
      const c = { ...found }
      return c.name
    },
    async getAllProfile() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/profile')
        this.users = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
