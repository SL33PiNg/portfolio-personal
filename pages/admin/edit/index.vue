<template>
  <v-card outlined>
    <v-container fluid>
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="departments"
        item-key="_id"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>หน่วยงาน</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="name"
              label="เพิ่มหน่วยงาน"
              hide-details
              single-line
              class="mr-3"
            ></v-text-field>
            <v-btn @click="addDepartment">เพิ่ม</v-btn>
          </v-toolbar>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title
                ><span class="headline">edit department</span></v-card-title
              >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editDialog.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="save">บันทึก</v-btn>
                <v-btn color="primary" @click="close">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }"
              ><v-icon class="mr-2" @click="editItem(item)" v-on="on">
                mdi-pencil
              </v-icon></template
            ><span>แก้ไข</span></v-tooltip
          >
          <del-department-dialog :item="item" @refetch="getDepartment">
          </del-department-dialog>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import delDepartmentDialog from '@/components/admin/edit/delDepartment'
export default {
  components: {
    delDepartmentDialog,
  },
  data() {
    return {
      dialog: false,
      editDialog: {},
      loading: true,
      name: '',
      departments: [],
      loadBtn: false,
      headers: [
        { text: 'หน่วยงาน', align: 'start', value: 'name', width: '90%' },
        {
          text: 'การจัดการ',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '10%',
        },
      ],
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    editItem(item) {
      this.editDialog = { ...item }
      this.dialog = true
    },
    async getDepartment() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/department')
        this.departments = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    async addDepartment() {
      if (!this.name) return
      this.loadBtn = true
      try {
        await this.$axios.$post('/select/department', {
          name: this.name,
        })
        this.getDepartment()
      } catch (error) {
        this.$toast.error(`ชื่อหน่วยงาน : ${this.name} มีอยู่แล้ว`)
      } finally {
        this.name = ''
        this.loadBtn = false
      }
    },
    async remove(item) {
      try {
        await this.$axios.$delete(`/select/department/${item._id}`)
      } catch (error) {
      } finally {
        this.getDepartment()
      }
    },
    close() {
      this.dialog = false
    },
    async save() {
      try {
        await this.$axios.$patch('/select/department', {
          ...this.editDialog,
        })
      } catch (error) {
      } finally {
        this.getDepartment()
        this.close()
      }
    },
  },
}
</script>

<style></style>
