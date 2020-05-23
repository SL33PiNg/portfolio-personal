<template>
  <v-container>
    <v-row justify="center">
      <v-card class="my-2" width="100%">
        <v-row justify="center">
          <h2 class="mt-5">
            ค้นหา
          </h2></v-row
        >
        <v-row class="ma-1">
          <v-col cols="12" md="3" xs="12">
            <v-select
              v-model="academic"
              dense
              :items="academicPos"
              label="ตำแหน่งทางวิชาการ"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" xs="12">
            <v-text-field
              v-model="name"
              dense
              label="ชื่อ-นามสกุล,ชื่อเล่น"
              outlined
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="3" xs="12">
            <treeselect
              v-model="expId"
              :options="expertists"
              :normalizer="normalizer"
              :disable-branch-nodes="true"
              clear-on-select
              placeholder="ความเชี่ยวชาญ"
            />
          </v-col>
          <v-col cols="12" md="3" xs="12">
            <treeselect
              v-model="ocscId"
              :options="positionocsc"
              :normalizer="normalizer"
              :disable-branch-nodes="true"
              clear-on-select
              placeholder="ตำแหน่งสายงาน ก.พ."
              outlined
            /> </v-col
        ></v-row>
        <v-row justify="center" class="ma-1">
          <v-col cols="6" md="6" xs="12">
            <v-btn block class="secondary" to="/profile/advancedSearch"
              >การค้นหาขั้นสูง</v-btn
            >
          </v-col>
          <v-col cols="6" md="6" xs="12">
            <v-btn
              block
              class="primary"
              :disabled="!inputNotemtpy"
              @click="search"
              >ค้นหา <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-card width="100%">
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
              <v-row justify="space-around" no-gutters>
                <v-col cols="auto" align-self="center">
                  <v-list-item-avatar width="110" height="110" class="ma-2"
                    ><v-img
                      :src="`${hostname}/api/avatar/${i.avatar}`"
                      aspect-ratio="1.7"
                      class="ma-1 mx-auto"
                    ></v-img
                  ></v-list-item-avatar>
                </v-col>
                <v-col cols="12" md="4" align-self="start">
                  <v-list-item-title class="headline mt-2 ml-2">
                    {{ i.personalInfo.academicRank
                    }}{{ i.personalInfo.firstnameTH }}
                    {{ i.personalInfo.lastnameTH }}</v-list-item-title
                  >
                  <h class="ml-2">ชื่อเล่น :{{ i.personalInfo.nicknameTH }}</h>
                  <h>หน่วยงาน : {{ getDepartment(i.careerInfo.dpmentID) }}</h>
                </v-col>

                <v-col cols="12" md="6" align-self="start" class="mt-2 mb-2">
                  <v-list-item-subtitle class="ml-2 mt-2">
                    <span><h4>ความเชี่ยวชาญ</h4> </span>
                    <v-chip
                      v-for="a in getExpert(i.expId)"
                      :key="a"
                      class="my-1 ma-1"
                    >
                      {{ a }}</v-chip
                    >
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="ml-2 mt-2">
                    <span><h4>ตำแหน่งสายงาน (ก.พ.)</h4> </span>
                    <v-chip
                      v-for="b in getOcsc(i.ocscId)"
                      :key="b"
                      class="my-1 ma-1"
                    >
                      {{ b }}
                    </v-chip>
                  </v-list-item-subtitle>

                  <v-list-item-subtitle> </v-list-item-subtitle>
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
import Treeselect from '@riophae/vue-treeselect'
export default {
  components: {
    Treeselect,
  },
  middleware: ['getSelect'],

  data() {
    return {
      normalizer(node) {
        return {
          id: node._id,
          label: node.name,
          children: node.sub,
        }
      },
      name: null,
      academic: null,
      expId: undefined,
      ocscId: undefined,
      positionocsc: [],
      expertists: [],
      user: {},
      users: [],
      loading: true,
      hostname: location.origin,
      clearOnSelect: false,
      academicPos: [
        '',
        'ศาสตราจารย์',
        'รองศาสตราจารย์',
        'ผู้ช่วยศาสตราจารย์',
        'อาจารย์',
      ],
    }
  },
  computed: {
    inputNotemtpy() {
      return this.name || this.academic || this.expId || this.ocscId
    },
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
    // this.getAllProfile()
    this.getExpertist()
    this.getPositionOcsc()
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
    async getExpertist() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/expertist')
        this.expertists = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    async getPositionOcsc() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/positionOcsc')
        this.positionocsc = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    async search() {
      this.loading = true
      try {
        if (this.name || this.academic || this.expId || this.ocscId) {
          const result = await this.$axios.$post(`/profile/search`, {
            academic: this.academic,
            name: this.name,
            expId: this.expId,
            ocscId: this.ocscId,
          })
          this.users = result
          console.log(result)
        } else {
          this.getAllProfile()
        }
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.css"></style>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
.vue-treeselect__control {
  height: 40px;
  border: 1px solid #858585;
}
</style>
