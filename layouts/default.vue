<template>
  <v-app>
    <v-navigation-drawer :clipped="true" fixed app>
      <user-nav v-if="pathMatch === 1"></user-nav>
      <admin-nav v-if="pathMatch === 2"></admin-nav>
      <public-nav v-if="pathMatch === 3"></public-nav>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app color="">
      <v-toolbar-title> </v-toolbar-title>
      <v-btn text color="normal" @click="$router.push('/')">
        An Online Portfolio for RMUTT Staff
      </v-btn>

      <v-spacer />

      <template v-if="!$auth.loggedIn">
        <v-btn text to="/login">
          login
        </v-btn>
      </template>

      <template v-else>
        <v-chip to="/user">{{ $auth.user.username }}</v-chip>
        <v-btn text @click="$auth.logout()">logout</v-btn>
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
    AdminNav
  },
  data() {
    return {
      drawer: true,
      pathMatch: 1
    }
  },
  computed: {
    bp() {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        if (newVal.path.startsWith('/user')) this.pathMatch = 1
        else if (newVal.path.startsWith('/admin')) this.pathMatch = 2
        else this.pathMatch = 3
      }
    }
  },
  methods: {}
}
</script>
