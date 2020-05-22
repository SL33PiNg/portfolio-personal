<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in itemss"
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
    <v-row justify="center" class="mt-12">
      <v-date-picker
        v-model="date"
        width="230"
        color="primary"
        header-color="primary"
        class="mt-12"
        locale="th"
        dark
      ></v-date-picker>
    </v-row>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      items: [
        {
          icon: 'mdi-magnify',
          title: 'ค้นหาโปรไฟล์',
          to: '/profile',
        },
        {
          icon: 'mdi-account-star-outline',
          title: 'ผู้ดูแลระบบ',
          to: '/admin',
        },
      ],
    }
  },
  computed: {
    itemss() {
      if (this.$auth.hasScope('ADMIN')) {
        return this.items
      } else {
        return [
          {
            icon: 'mdi-magnify',
            title: 'ค้นหาโปรไฟล์',
            to: '/profile',
          },
        ]
      }
    },
  },
}
</script>
