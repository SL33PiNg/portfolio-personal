// eslint-disable-next-line prettier/prettier
export default async function ({ store }) {
  try {
    await store.dispatch('select/getAllSelect')
    console.log(store)
  } catch (error) {
    console.log(error)
  }
}
