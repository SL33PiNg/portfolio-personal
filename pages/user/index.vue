<template>
  <v-card class="mx-auto ma-8" max-width="80%">
    <v-container>
      <v-row justify="center">
        <v-sheet color="primary" width="90%" elevation="8" class="mt-n8 ">
          <h1 class="ma-2 white--text">
            <v-icon large color="white">mdi-account</v-icon> ข้อมูลส่วนตัว
          </h1>
        </v-sheet>
      </v-row>
      <v-row justify="center" class="mt-8">
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
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <!-- <label>ตำแหน่งสายงาน ก.พ.</label> -->
          <treeselect
            v-model="user.ocscId"
            :options="positionocsc"
            :normalizer="normalizer"
            :disable-branch-nodes="true"
            clear-on-select
            multiple
            placeholder="ตำแหน่งสายงาน ก.พ."
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.firstnameTH"
            label="ชื่อภาษาไทย"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.lastnameTH"
            label="นามสกุลภาษาไทย"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.nicknameTH"
            label="ชื่อเล่นภาษาไทย"
            outlined
          ></v-text-field> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.firstnameEN"
            label="ชื่อภาษาอังกฤษ"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.lastnameEN"
            label="นามสกุลภาษาอังกฤษ"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.nicknameEN"
            label="ชื่อเล่นภาษาอังกฤษ"
            outlined
          ></v-text-field> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="user.personalInfo.phone"
            v-mask="mask"
            label="เบอร์ติดต่อ"
            outlined
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
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="user.personalInfo.facebook"
            label="Facebook"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="user.personalInfo.lineID"
            label="Line ID"
            outlined
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
import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  directives: {
    mask
  },
  components: {
    Treeselect
  },
  mixins: [getUser],
  data: () => ({
    multiple: true,
    clearOnSelect: false,
    mask: '###-#######',
    hostname: location.origin,
    switch1: true,
    loading: true,
    updateLoad: false,
    imageUrl: null,
    imageFile: '',
    ocscId: [],
    user: {
      academicRank: '',
      avatar: 'default.jpg',
      personalInfo: {
        firstnameTH: '',
        lastnameTH: '',
        nicknameTH: '',
        firstnameEN: '',
        lastnameEN: '',
        nicknameEN: '',
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
    positionocsc: [],
    pValue: null,
    normalizer(node) {
      return {
        id: node._id,
        label: node.name,
        children: node.sub
      }
    },
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  watch: {
    'user.ocscId'(newVal) {
      this.positionocsc.forEach((doc) => {
        if (doc.sub.find((ds) => ds._id === newVal)) {
          this.pValue = doc._id
        }
      })
      console.log(this.positionocsc)
      console.log(this.pValue)
      console.log(newVal)
    }
  },
  created() {
    this.getPositionOcsc()
  },

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
        this.$toast.success('อัพโหลดรูปโปรไฟล์ "สำเร็จ"')
      } catch (error) {}
    },
    async getPositionOcsc() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/positionOcsc')
        this.positionocsc = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.css"></style>
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
