<template>
  <v-card class="mx-auto ma-3" max-width="80%">
    <v-container>
      <v-row class="ma-3">
        <h1>
          <v-icon large color="black">mdi-briefcase-outline</v-icon>
          ข้อมูลประวัติการทำงาน
        </h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="5" xs="12">
          <v-text-field v-model="work.start" label="ปีที่เข้าทำงาน (พ.ศ.)" />
        </v-col>

        <v-col cols="12" md="5" xs="12">
          <v-text-field v-model="work.end" label="ปีที่ออกจากงาน (พ.ศ.)" />
        </v-col>

        <v-col cols="12" md="2" xs="12">
          <v-checkbox
            v-model="work.status"
            class="mx-2"
            label="กำลังทำงาน"
          ></v-checkbox> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-text-field v-model="work.department" label="แผนก" />
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-text-field v-model="work.position" label="ตำแหน่ง" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" md="9">
          <v-text-field v-model="work.company" label="ชื่อองค์กร" />
        </v-col>
        <v-col cols="12" xs="12" md="3">
          <v-select :items="items" label="ประเทศ"></v-select>
        </v-col>
      </v-row>
      <v-row justify="end" class="ma-3 ">
        <v-btn class="mx-0 font-weight-light" color="primary" @click="addWork">
          เพิ่มข้อมูล
        </v-btn>
      </v-row>
      <template>
        <v-card outlined>
          <v-data-table
            :headers="headers"
            :items="user.workinfo"
            hide-default-footer
          >
            <template v-slot:item.status="{ item }">
              <p>{{ item.status ? 'work' : 'not work' }}</p>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn icon @click="delWork(item._id)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import UserMix from '@/mixins/user'
export default {
  mixins: [UserMix],
  data() {
    return {
      loadBtn: false,
      work: {
        start: '',
        end: '',
        status: null,
        department: '',
        company: '',
        position: ''
      },
      user: {},
      headers: [
        {
          text: 'ตำแหน่ง',
          align: 'left',
          value: 'position'
        },
        {
          text: 'ชื่อองค์กร',
          align: 'left',
          value: 'company'
        },
        {
          text: 'สถานะ',
          align: 'left',
          value: 'status'
        },
        {
          text: 'action',
          align: 'center',
          value: 'action'
        }
      ],
      items: ['ไทย', 'อังกฤษ', 'ลาว', 'พม่า', 'จีน']
    }
  },
  methods: {
    async addWork() {
      try {
        this.loadBtn = true
        await this.$axios.$post('/users/workinfo', {
          ...this.work
        })
      } catch (error) {
      } finally {
        this.loadBtn = false
        this.getUser()
      }
    },
    async delWork(id) {
      try {
        await this.$axios.$delete(`/users/workinfo/${id}`)
      } catch (error) {
      } finally {
        this.getUser()
      }
    }
  }
}
</script>
