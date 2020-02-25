<template>
  <v-navigation-drawer
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <h4>การค้นหา</h4>
    <v-btn block>search</v-btn>
    <v-btn block to="/profile">profile</v-btn>
    <v-btn block to="/admin">admin</v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
