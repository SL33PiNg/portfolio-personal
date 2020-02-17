<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-account</v-icon>
          ข้อมูลส่วนตัว
        </h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4" xs="12">
          <v-hover v-slot:default="{ hover }">
            <v-card max-width="200" max-height="200">
              <v-img
                :src="`${hostname}/api/avatar/${user.avatar}`"
                width="200"
                height="200"
              ></v-img>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out white v-card--reveal display-3 white--text"
                  style="height: 50%;"
                >
                  <v-btn text icon block x-large @click="openFileDialog"
                    ><v-icon>mdi-camera</v-icon></v-btn
                  >
                </div>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4" xs="12">
          <v-file-input
            id="file-upload"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="เลือกรูปโปรไฟล์"
            prepend-icon="mdi-camera"
            label="รูปโปรไฟล์"
            style="display:none"
            @change="handleChange"
          ></v-file-input> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="user.personalInfo.academicRank"
            :items="academicPos"
            label="ตำแหน่งทางวิชาการ"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            :items="divisionPos"
            label="ตำแหน่งสายงาน (ก.พ.)"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.firstnameTH"
            label="ชื่อ"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.lastnameTH"
            label="นามสกุล"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.nickname"
            label="ชื่อเล่น"
          ></v-text-field> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.phone"
            v-mask="mask"
            label="เบอร์ติดต่อ"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="2">
          <v-switch
            v-model="user.personalInfo.showPhone"
            :label="`${user.personalInfo.showPhone ? 'เผยแพร่' : 'ไม่เผยแพร่'}`"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="user.personalInfo.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="user.personalInfo.facebook"
            label="Facebook"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="user.personalInfo.lineID"
            label="Line ID"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3">
        <v-btn :loading="updateLoad" color="primary" @click="updateUser"
          >ยืนยัน</v-btn
        >
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import getUser from '@/mixins/user'
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask
  },
  mixins: [getUser],
  data: () => ({
    mask: '###-#######',
    hostname: location.origin,
    switch1: true,
    loading: true,
    updateLoad: false,
    imageUrl: null,
    imageFile: '',
    user: {
      academicRank: '',
      avatar: 'default.jpg',
      personalInfo: {
        firstnameTH: '',
        lastnameTH: '',
        nickname: '',
        email: '',
        facebook: '',
        lineID: '',
        phone: '',
        showPhone: true
      }
    },
    academicPos: [
      '',
      'ศาสตราจารย์',
      'รองศาสตราจารย์',
      'ผู้ช่วยศาสตราจารย์',
      'อาจารย์'
    ],
    divisionPos: ['1', '2', '3'],
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    openFileDialog() {
      document.getElementById('file-upload').click()
    },
    async handleChange(file) {
      if (!file) return
      const data = new FormData()
      data.append('avatar', file)
      try {
        const result = await this.$axios.$patch('/users/avatar', data)
        this.user.avatar = result.avatar + '#' + new Date().getTime()
        this.$toast.success('Succesfully change avatar')
      } catch (error) {}
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
