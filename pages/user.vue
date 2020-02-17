<template>
  <nuxt-child></nuxt-child>
</template>

<script>
export default {
  middleware: ['check-user']
}
</script>

<style></style>
