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

    <v-img
      :src="`http://localhost:3000/api/award/${award.cover}`"
      height="250"
      width="400"
    ></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle
          ><h4>ประเภทผลงาน: {{ award.awardType | idToString(items) }}</h4>
          ปี: {{ award.eventYear }}
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
          <v-row justify="end" class="mr-1">
            <v-icon color="red" class="ma-1" @click="dialog = false">
              mdi-close-box</v-icon
            >
          </v-row>
          <keep-alive>
            <component :is="cardType" :award="award" />
          </keep-alive>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import type1 from '~/components/infoawards/infoRes.vue'
import type2 from '~/components/infoawards/infoSer.vue'
import type3 from '~/components/infoawards/infoAwa.vue'
import type4 from '~/components/infoawards/infoOther.vue'
export default {
  components: {
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
  },

  methods: {
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
