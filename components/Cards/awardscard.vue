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
      <v-btn icon @click="highlights()">
        <v-icon :color="award.highlights ? 'warning' : 'grey'">mdi-star</v-icon>
      </v-btn>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="150"
      width="auto"
    ></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle
          ><h4>ประเภทผลงาน: {{ award.awardType | idToString(items) }}</h4>
          ปี: {{ award.eventYear }}
        </v-list-item-subtitle> </v-list-item-content
      ><v-btn icon @click.stop="openDetail(award)"
        ><v-icon>mdi-magnify</v-icon></v-btn
      >
      <v-btn icon @click="$emit('toggleDelete', award)"
        ><v-icon>mdi-delete-outline</v-icon></v-btn
      >
    </v-list-item>
    <v-row wrap justify="center">
      <v-dialog v-model="dialog" width="70%">
        <v-card>
          <v-row justify="end" class="mr-1">
            <v-icon color="red" @click="dialog = false"> mdi-close-box</v-icon>
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
    type4
  },
  filters: {
    idToString(value, items) {
      return items[value - 1].text
    }
  },
  props: {
    award: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false,
      detail: '',
      items: [
        { text: 'โครงการวิจัย', value: 1 },
        { text: 'บริการวิชาการ', value: 2 },
        { text: 'รางวัล', value: 3 },
        { text: 'อื่นๆ', value: 4 },
        { text: 'ทั้งหมด', value: 5 }
      ]
    }
  },
  computed: {
    cardType() {
      return `type${this.award.awardType}`
    }
  },

  methods: {
    openDetail(x) {
      this.detail = x
      this.dialog = true
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
    }
  }
}
</script>

<style></style>
