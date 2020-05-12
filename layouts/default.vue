<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <user-nav v-if="pathMatch === 1"></user-nav>
      <admin-nav v-if="pathMatch === 2"></admin-nav>
      <public-nav v-if="pathMatch === 3"></public-nav>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app color="">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn text color="normal" @click="$router.push('/')" v-on="on">
            An Online Portfolio for RMUTT Staff
          </v-btn></template
        >
        <span>หน้าแรก</span></v-tooltip
      >

      <v-spacer />

      <template v-if="!$auth.loggedIn">
        <v-btn text to="/login">
          login
        </v-btn>
      </template>

      <template v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip to="/user" v-on="on">{{
              $auth.user.username
            }}</v-chip></template
          >
          <span>แก้ไขโปรไฟล์</span></v-tooltip
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }"
            ><v-btn text @click="$auth.logout()" v-on="on"
              >logout</v-btn
            ></template
          >
          <span>ออกจากระบบ</span></v-tooltip
        >
      </template>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <!-- <v-footer :fixed="true" app>
      <span class="red"> </span>
    </v-footer> -->
  </v-app>
</template>

<script>
import userNav from '@/components/nav/UserNav'
import publicNav from '@/components/nav/PublicNav'
import AdminNav from '@/components/nav/AdminNav'
export default {
  components: {
    userNav,
    publicNav,
    AdminNav,
  },
  data() {
    return {
      drawer: true,
      pathMatch: 1,
    }
  },
  computed: {
    bp() {
      return this.$vuetify.breakpoint.name
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        if (newVal.path.startsWith('/user')) this.pathMatch = 1
        else if (newVal.path.startsWith('/admin')) this.pathMatch = 2
        else this.pathMatch = 3
      },
    },
  },
  methods: {},
}
</script>
