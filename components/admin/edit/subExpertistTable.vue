<template>
  <v-data-table
    :headers="headers"
    :items="items.sub"
    hide-default-header
    hide-default-footer
    class="mytable"
  >
    <template v-slot:top>
      <v-dialog v-model="openEditDialog" width="500">
        <v-card>
          <v-card-title>แก้ไขความเชี่ยวชาญ</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="editData.name"
                    label="ชื่อ"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="openEditDialog = false"
              >ยกเลิก</v-btn
            >
            <v-btn color="success" @click.stop="updateSubExpert">บันทึก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="openDelDialog" width="300">
        <v-card>
          <v-card-title>ต้องการลบ {{ editData.name }} ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="deleteExpertist">ตกลง</v-btn>
            <v-btn color="primary" @click.stop="openDelDialog = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item="{ item }">
      <v-card tile>
        <v-row style="height: 50px;" justify="start">
          <v-col offset="1" cols="9">{{ item.name }} </v-col>
          <v-col cols="auto">
            <v-chip class="warning"
              ><v-icon small @click.stop="openEdit(item)"
                >mdi-pencil</v-icon
              ></v-chip
            >
            <v-chip class="error"
              ><v-icon small @click.stop="openDel(item)"
                >mdi-delete</v-icon
              ></v-chip
            >
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      openEditDialog: false,
      openDelDialog: false,
      editData: '',
      name: '',
      headers: [
        { text: 'expertist', align: 'start', value: 'name', width: '80' },
        { text: 'action', align: 'center', value: 'action', width: '20' },
      ],
    }
  },
  methods: {
    openEdit(item) {
      this.editData = { ...item }
      this.openEditDialog = true
    },
    openDel(item) {
      this.editData = { ...item }
      this.openDelDialog = true
    },
    async updateSubExpert() {
      if (!this.editData.name) return
      try {
        await this.$axios.$patch('/select/expertist/sub', {
          _id: this.items._id,
          subId: this.editData._id,
          subName: this.editData.name,
        })
      } catch (error) {
      } finally {
        this.$emit('refetch')
        this.openEditDialog = false
      }
    },
    async deleteExpertist() {
      try {
        await this.$axios.$delete(
          `/select/expertist/${this.items._id}/${this.editData._id}`
        )
      } catch (error) {
      } finally {
        this.$emit('refetch')
        this.openDelDialog = false
      }
    },
  },
}
</script>
