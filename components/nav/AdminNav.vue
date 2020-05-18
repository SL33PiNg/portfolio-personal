<template>
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
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-magnify',
          title: 'ค้นหารายชื่อ',
          to: '/admin',
        },
        {
          icon: 'mdi-pencil-outline',
          title: 'แก้ไขหมวดหมู่',
          to: '/admin/edit',
        },
        {
          icon: 'mdi-newspaper-variant-outline',
          title: 'จัดการหน้าฟีดข่าว',
          to: '/admin/feed',
        },
        {
          icon: 'mdi-alert-rhombus-outline',
          title: 'การร้องเรียน',
          to: '/admin/report',
        },

        {
          icon: 'mdi-history',
          title: 'ประวัติการแก้ไขแอดมิน',
          to: '/admin/history',
        },
        {
          icon: 'mdi-history',
          title: 'ประวัติการแก้ไขผู้ใช้งาน',
          to: '/admin/historyUserEdit',
        },
        {
          icon: 'mdi-autorenew',
          title: 'สำรองข้อมูล',
          to: '/admin/blackup',
        },
        //  {
        //         icon: 'mdi-account-multiple-plus-outline',
        //         title: 'สร้างบัญชีผู้ดูแลระบบ',
        //         to: '/admin/create',
        //       },
        // {
        //   icon: 'mdi-backup-restore',
        //   title: 'สำรองข้อมูล',
        //   to: '/',
        // },
      ],
    }
  },
}
</script>
