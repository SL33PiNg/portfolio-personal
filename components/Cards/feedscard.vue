<template>
  <v-card width="auto" height="auto" class="ma-3">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h3>
            {{ award.name }}
          </h3>
        </v-list-item-title>
      </v-list-item-content>

      <v-icon v-if="isProfile" :color="award.highlights ? 'warning' : 'grey'"
        >mdi-star</v-icon
      >
      <v-btn v-else-if="isUser" icon @click="highlights()">
        <v-icon :color="award.highlights ? 'warning' : 'grey'">mdi-star</v-icon>
      </v-btn>
      <v-btn
        v-else-if="isAdmin"
        icon
        :disabled="disable"
        @click="markedAward()"
      >
        <v-icon :color="award.markedAward ? 'warning' : 'grey'"
          >mdi-star</v-icon
        >
      </v-btn>
    </v-list-item>
    <v-card outlined>
      <v-img
        :src="`http://localhost:3000/api/award/${award.cover}`"
        height="232"
        width="350"
        contain
      ></v-img>
    </v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle
          ><h4>ประเภทผลงาน: {{ award.awardType | idToString(items) }}</h4>
          ปี พ.ศ.: {{ award.eventYear }}
        </v-list-item-subtitle> </v-list-item-content
      ><v-tooltip bottom>
        <template v-slot:activator="{ on }"
          ><v-btn icon @click.stop="openDetail(award)" v-on="on"
            ><v-icon>mdi-magnify</v-icon></v-btn
          ></template
        >
        <span>ดูรายละเอียด</span></v-tooltip
      >

      <v-tooltip bottom>
        <template v-if="isUser" v-slot:activator="{ on }">
          <v-btn icon @click.stop="editItem(award)" v-on="on"
            ><v-icon>mdi-pencil-outline</v-icon></v-btn
          ></template
        >
        <span>ลบผลงาน</span></v-tooltip
      >
      <v-tooltip bottom>
        <template v-if="isUser" v-slot:activator="{ on }">
          <v-btn icon @click="$emit('toggleDelete', award)" v-on="on"
            ><v-icon>mdi-delete-outline</v-icon></v-btn
          ></template
        >
        <span>ลบผลงาน</span></v-tooltip
      >
    </v-list-item>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-row justify="end" class="mr-2">
            <v-icon color="red" class="mt-1" @click="dialog = false">
              mdi-close-box</v-icon
            >
          </v-row>
          <v-row justify="center">
            <v-sheet color="primary" width="90%" class="mt-n5">
              <h1 class="ma-2 white--text">
                <v-icon large color="white">mdi-school-outline</v-icon>
                รายละเอียดข้อมูลผลงาน
              </h1></v-sheet
            >
          </v-row>

          <keep-alive>
            <component :is="cardType" :award="award" />
          </keep-alive>
        </v-card>
      </v-dialog>
      <v-dialog v-model="editMode" width="70%">
        <v-card>
          <v-container>
            <v-row align="start" no-gutters>
              <v-col offset="1" class="mt-1" cols="10">
                <v-sheet color="primary" elevation="8">
                  <h1 class="white--text">
                    <v-icon large color="white"> mdi-pencil-outline</v-icon>
                    แก้ไขข้อมูล
                  </h1>
                </v-sheet>
              </v-col>
              <v-col cols="auto" class="ml-8">
                <v-icon
                  x-large
                  class="mb-3"
                  color="red"
                  @click="editMode = false"
                >
                  mdi-close-box</v-icon
                >
              </v-col>
            </v-row>
            <component
              :is="awardType"
              :award="detail"
              editmode
              @close="close"
            />
            <!-- {{ detail }}
          <award1 v-if="detail.awardType === 1"></award1>
          <award2 v-else-if="detail.awardType === 2"></award2>
          <award3 v-else-if="detail.awardType === 3"></award3>
          <award4 v-else-if="detail.awardType === 4"></award4> -->
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import award1 from '@/components/award/awardinfo1'
import award2 from '@/components/award/awardinfo2'
import award3 from '@/components/award/awardinfo3'
import award4 from '@/components/award/awardinfo4'
import type1 from '~/components/infoawards/infoRes.vue'
import type2 from '~/components/infoawards/infoSer.vue'
import type3 from '~/components/infoawards/infoAwa.vue'
import type4 from '~/components/infoawards/infoOther.vue'
export default {
  components: {
    award1,
    award2,
    award3,
    award4,
    type1,
    type2,
    type3,
    type4,
  },
  filters: {
    idToString(value, items) {
      return items[value - 1].text
    },
  },
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    award: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editMode: false,
      isProfile: this.$route.name === 'profile-username',
      isUser: this.$route.name === 'user-listaward',
      isAdmin: this.$route.name === 'admin-feed',
      dialog: false,
      detail: '',
      items: [
        { text: 'โครงการวิจัย', value: 1 },
        { text: 'บริการวิชาการ', value: 2 },
        { text: 'รางวัล', value: 3 },
        { text: 'อื่นๆ', value: 4 },
        { text: 'ทั้งหมด', value: 5 },
      ],
    }
  },
  computed: {
    cardType() {
      return `type${this.award.awardType}`
    },
    awardType() {
      return `award${this.detail.awardType}` || 'award1'
    },
  },

  methods: {
    close() {
      this.editMode = false
      this.$emit('reload')
    },
    editItem(item) {
      this.detail = { ...item }
      this.editMode = true
    },
    openDetail(x) {
      this.detail = x
      this.dialog = true
    },
    async markedAward() {
      try {
        await this.$axios.$get(
          `/admin/markedAward/${this.award._id}/${!this.award.markedAward}`
        )
      } catch (error) {
      } finally {
        this.$emit('reload')
      }
    },
    async highlights() {
      try {
        await this.$axios.$get(
          `/users/highlight/${this.award._id}/${!this.award.highlights}`
        )
      } catch (error) {
      } finally {
        this.$emit('reload')
      }
    },
  },
}
</script>

<style></style>
