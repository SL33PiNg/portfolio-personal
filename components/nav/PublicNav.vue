<template>
  <v-navigation-drawer
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
        color="primary"
        class="ma-2"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-magnify',
          title: 'ค้นหาโปรไฟล์',
          to: '/profile',
        },
        {
          icon: 'mdi-account-star-outline',
          title: 'แอดมิน',
          to: '/admin',
        },
        {
          icon: 'mdi-account-search-outline',
          title: 'การค้นหาขั้นสูง',
          to: '/profile/search/advance',
        },
      ],
    }
  },
}
</script>
