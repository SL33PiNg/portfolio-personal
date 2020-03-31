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
        >
          <v-hover v-slot:default="{ hover }" open-delay="200">
            <v-card
              width="700"
              :elevation="hover ? 5 : 1"
              class="ma-4"
              @click="$router.push(`/profile/${i.username}`)"
            >
              <v-row>
                <v-list-item>
                  <v-list-item-avatar width="120" height="120" class="ma-5"
                    ><v-img
                      :src="`${hostname}/api/avatar/${i.avatar}`"
                      aspect-ratio="1.7"
                      class="ma-5 mx-auto"
                    ></v-img
                  ></v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="headline">
                      {{ i.personalInfo.academicRank
                      }}{{ i.personalInfo.firstnameTH }}
                      {{ i.personalInfo.lastnameTH }}</v-list-item-title
                    >

                    <v-list-item-subtitle class="my-1"
                      >ชื่อเล่น :{{
                        i.personalInfo.nicknameTH
                      }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="my-1"
                      >หน่วยงาน : {{ i.departmentName }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="my-1">
                      ความเชี่ยวชาญ :</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="my-1"
                      >ตำแหน่งสายงาน (ก.พ.) :</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-row>
            </v-card>
          </v-hover>
        </v-row>
      </v-card></v-row
    >
  </v-container>
</template>

<script>
import normal from '~/components/search/nomal.vue'
export default {
  components: {
    normal,
  },
  data() {
    return {
      user: {},
      users: [],
      loading: true,
      hostname: location.origin,
      departments: [],
    }
  },
  computed: {
    departmentName() {
      const found = this.departments.find(
        (f) => f._id === this.user.careerInfo.dpmentID
      )
      const a = { ...found }
      return a.name
    },
  },
  created() {
    this.getAllProfile()
    this.getDepartment()
  },
  methods: {
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
    async getDepartment() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/department')
        this.departments = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
