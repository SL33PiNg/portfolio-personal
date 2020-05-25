<template>
  <v-layout class="fill-height" tag="v-list" column>
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
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'หน้าแรก',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'ข้อมูลส่วนตัว',
          to: '/user',
        },
        {
          icon: 'mdi-domain',
          title: 'หน่วยงานปัจจุบัน',
          to: '/user/careerInfo',
        },
        {
          icon: 'mdi-lightbulb-on-outline',
          title: 'ความเชี่ยวชาญ',
          to: '/user/expertinfo',
        },

        {
          icon: 'mdi-briefcase-outline',
          title: 'ประวัติการทำงาน',
          to: '/user/workinfo',
        },
        {
          icon: 'mdi-school-outline',
          title: 'ประวัติการศึกษา',
          to: '/user/studyinfo',
        },
        {
          icon: ' mdi-file-certificate-outline',
          title: 'ใบรับรอง',
          to: '/user/certificateinfo',
        },
        {
          icon: 'mdi-trophy-award',
          title: 'เพิ่มผลงานใหม่',
          to: '/user/award',
        },
        {
          icon: 'mdi-seal-variant',
          title: 'ผลงานทั้งหมด',
          to: '/user/listaward',
        },
      ],
    }
  },
}
</script>
