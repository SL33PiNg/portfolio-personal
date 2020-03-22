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
        class="ma-2 "
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
          title: 'ค้นหารายชื่อ',
          to: '/admin'
        },
        {
          icon: 'mdi-pencil-outline',
          title: 'แก้ไขหมวดหมู่',
          to: '/admin/edit'
        },
        {
          icon: 'mdi-newspaper-variant-outline',
          title: 'จัดการหน้าฟีดข่าว',
          to: '/admin/feed'
        },
        {
          icon: 'mdi-alert-rhombus-outline',
          title: 'การร้องเรียน',
          to: '/admin/report'
        },

        {
          icon: 'mdi-history',
          title: 'ประวัติการแก้ไข',
          to: '/admin/history'
        },
        {
          icon: 'mdi-account-multiple-plus-outline',
          title: 'สร้างบัญชีผู้ดูแลระบบ',
          to: '/admin/create'
        },
        {
          icon: 'mdi-backup-restore',
          title: 'สำรองข้อมูล',
          to: '/'
        }
      ]
    }
  }
}
</script>
