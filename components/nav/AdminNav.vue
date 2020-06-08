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
      <v-list-item-content class="ml-n5">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-group class="ma-2">
      <template v-slot:activator>
        <v-list-item-icon>
          <v-icon>mdi-history</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          >ประวัติการแก้ไขข้อมูล</v-list-item-title
        >
      </template>
      <v-list-item class="ml-7">
        <v-btn text to="/admin/history">ประวัติการแก้ไขผู้ดูแล </v-btn>
      </v-list-item>
      <v-list-item class="ml-7">
        <v-btn text to="/admin/historyUserEdit"
          >ประวัติการแก้ไขผู้ใช้งาน
        </v-btn>
      </v-list-item>
    </v-list-group>
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
          icon: 'mdi-autorenew',
          title: 'สำรองข้อมูล',
          to: '/admin/backup',
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
      twoitems: [
        {
          icon: 'mdi-history',
          title: 'Dining',
          active: false,
          items: [
            {
              title: 'ประวัติการแก้ไขผู้ดูแล',
              to: '/admin/history',
            },
            {
              title: 'ประวัติการแก้ไขผู้ใช้งาน',
              to: '/admin/historyUserEdit',
            },
          ],
        },
      ],
    }
  },
}
</script>
