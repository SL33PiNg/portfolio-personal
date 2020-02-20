/* eslint-disable prettier/prettier */
export default {
  data: () => ({
    loading: false
  }),
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      this.loading = true
      try {
        const user = await this.$axios.$get('/users')
        this.user = user
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async updateUser () {
      try {
        const user = await this.$axios.$patch('/users', {
          ...this.user
        })
        this.user = user
        this.$toast.success('Succesfully update profile')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}
