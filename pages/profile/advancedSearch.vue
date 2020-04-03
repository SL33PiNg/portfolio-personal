<template>
  <div>
    <v-btn @click="advancedSearch">!!</v-btn>
  </div>
</template>

<script>
export default {
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

<style></style>
