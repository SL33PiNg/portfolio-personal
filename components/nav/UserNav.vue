<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
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
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'ข้อมูลส่วนตัว',
          to: '/user'
        },
        {
          icon: 'mdi-domain',
          title: 'หน่วยงานปัจจุบัน',
          to: '/user/careerInfo'
        },
        {
          icon: 'mdi-lightbulb-on-outline',
          title: 'ความเชี่ยวชาญ',
          to: '/user/skillinfo'
        },
        {
          icon: 'mdi-briefcase-outline',
          title: 'ประวัติการทำงาน',
          to: '/user/workinfo'
        },
        {
          icon: 'mdi-school-outline',
          title: 'ประวัติการศึกษา',
          to: '/user/studyinfo'
        },
        {
          icon: 'mdi-trophy-award',
          title: 'เพิ่มผลงานใหม่',
          to: '/user/award'
        },
        {
          icon: 'mdi-seal-variant',
          title: 'ผลงานทั้งหมด',
          to: '/user/listaward'
        },
        {
          icon: ' mdi-file-certificate-outline',
          title: 'ใบรับรอง',
          to: '/user/certificateinfo'
        }
      ]
    }
  }
}
</script>
