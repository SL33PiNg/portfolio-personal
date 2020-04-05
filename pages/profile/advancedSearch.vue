<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12">
        <v-card class="my-2" width="100%">
          <v-row justify="center">
            <h2 class="mt-5">
              ค้นหาขั้นสูง
            </h2></v-row
          ><card></card>
          <v-row justify="center" class="ma-2">
            <v-col cols="12" xs="12">
              <v-row justify="center">
                <v-btn block class="success" @click="advancedSearch"
                  >ค้นหา <v-icon>mdi-magnify</v-icon>
                </v-btn></v-row
              ></v-col
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import card from '@/components/Cards/adcard'
export default {
  components: {
    card,
  },
  data() {
    return {
      users: null,
      name: {
        firstname: 'personalInfo.firstnameTH',
        lastname: 'personalInfo.lastnameTH',
        nickname: 'personalInfo.nicknameTH',
        expId: 'expId',
        ocscId: 'ocscId',
      },
      search: [
        {
          condition: 'and',
          data: '5e872f907135bf392cb10c12',
          fieldname: 'ocscId',
        },
        {
          condition: 'and',
          data: '5e7cfa1bbb11331818191525',
          fieldname: 'expId',
        },
      ],
    }
  },
  methods: {
    async advancedSearch() {
      const result2 = {
        username: { $ne: 'admin' },
        $or: [],
      }
      const or = []
      const and = []
      this.search.forEach((s) => {
        if (s.condition === 'or')
          or.push({ [this.name[s.fieldname]]: this.check(s.data, s.fieldname) })
        else
          and.push({
            [this.name[s.fieldname]]: this.check(s.data, s.fieldname),
          })
      })
      if (or.length !== 0) {
        result2.$or.push({ $or: or })
      }
      if (and.length !== 0) {
        result2.$or.push({ $and: and })
      }
      console.log(result2)
      try {
        const post = await this.$axios.$post(`/profile/advancedSearch`, {
          query: result2,
        })
        console.log(post)
        this.users = post
      } catch (error) {
        console.log(error)
      }
    },
    check(s, f) {
      if (f === 'expId' || f === 'ocscId') {
        return s
      }
      return { $regex: s }
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
</style>
