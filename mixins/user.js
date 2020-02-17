export default {
  data: () => ({
    loading: false
  }),
  async created() {
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
  methods: {
    async updateUser() {
      try {
        const user = await this.$axios.$patch('/users', {
          ...this.user
        })
        this.user = user
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}
