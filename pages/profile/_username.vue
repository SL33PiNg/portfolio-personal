<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col cols="6" md="4">
        <v-card class="pa-2 " outlined tile>
          <v-list>
            <v-list-item-content>
              <v-img
                :src="`${hostname}${user.avatar}`"
                aspect-ratio="1.7"
                width="200"
                height="200"
                class=" ma-2"
              ></v-img>

              <v-list-item-title>
                <h4>
                  ชื่อ-นามสกุล : {{ user.personalInfo.firstnameTH }}
                  {{ user.personalInfo.lastnameTH }}
                </h4>
              </v-list-item-title>

              <v-list-item-title>
                <h4>
                  ชื่อเล่น :
                </h4>
              </v-list-item-title>
              <v-divider></v-divider>

              <v-list-item-title><h4>ที่อยู่ที่ทำงาน</h4></v-list-item-title>
              <v-list-item-subtitle>หน่วยงาน :</v-list-item-subtitle>
              <v-list-item-subtitle>ฝ่าย :</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title><h4>ช่องทางการติดต่อ</h4></v-list-item-title>
              <v-list-item-subtitle
                ><v-icon color="red">mdi-email</v-icon>:
                {{ user.personalInfo.email }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                ><v-icon color="warning">mdi-phone</v-icon>:
                {{ user.personalInfo.phone }}</v-list-item-subtitle
              >
              <v-list-item-subtitle>
                <v-icon color="blue">mdi-facebook</v-icon>:
                {{ user.personalInfo.facebook }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                ><v-icon color="green">mdi-alpha-l-circle</v-icon>:
                {{ user.personalInfo.lineID }}</v-list-item-subtitle
              >
              <v-divider></v-divider>
              <v-spacers></v-spacers>
              <v-spacers></v-spacers>
              <v-list-item-title><h4>ความเชี่ยวชาญ</h4></v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
              <v-divider></v-divider>
              <v-spacers></v-spacers>
              <v-spacers></v-spacers>
              <v-list-item-title
                ><h4>ตำแหน่งสายงาน (ก.พ.)</h4></v-list-item-title
              >
              <v-list-item-subtitle></v-list-item-subtitle>
              <v-divider></v-divider>
              <v-spacers></v-spacers>
              <v-spacers></v-spacers>
              <v-list-item-title>
                <v-col cols="12" md="6">
                  <v-btn class="primary">ดาวน์โหลดนามบัตร</v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="warning" dark v-on="on">รายงานปัญหา</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">รายงานปัญหา</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-textarea> </v-textarea>

                          <v-btn color="error" text @click="dialog = false"
                            >Close</v-btn
                          >
                          <v-btn color="success" text @click="dialog = false"
                            >Save</v-btn
                          >
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-list-item-title>
            </v-list-item-content>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-tabs v-model="tab" background-color="white" color="primary" centered>
          <v-tab
            v-for="item in tabItems"
            :key="item.id"
            :to="`/profile/${username}${item.path}`"
            >{{ item.title }}</v-tab
          >
        </v-tabs>
        <nuxt-child></nuxt-child>
      </v-col>
    </v-row>
    <v-row else>loading</v-row>
  </v-container>
</template>

<script>
export default {
  validate({ params }) {
    return isNaN(+params.username)
  },
  data: () => ({
    dialog: false,
    tab: null,
    tab2: null,
    user: {},
    loading: 0,
    username: '',
    tabItems: [
      { id: 1, title: 'ผลงาน', path: '/' },
      {
        id: 2,
        title: 'ทักษะความสามารถ',
        path: '/skill'
      },
      {
        id: 3,
        title: 'การศึกษาและการทำงาน',
        path: '/edu'
      },
      { id: 4, title: 'ใบรับรอง', path: '/cert' }
    ],
    hostname: location.origin.replace('3000', 3001)
  }),

  async created() {}
}
</script>
