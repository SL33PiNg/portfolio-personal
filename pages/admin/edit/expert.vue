<template>
  <v-card outlined>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="expertists"
        :expanded.sync="expanded"
        item-key="_id"
        show-expand
        hide-default-footer
        @click:row="clickrow"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ความเชี่ยวชาญ </v-toolbar-title>
            <v-spacer></v-spacer>
            <add-expert-dialog @refetch="getExpertist"></add-expert-dialog>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="100">
            <sub-expert-table
              :items="item"
              @refetch="getExpertist"
            ></sub-expert-table>
          </td>
        </template>
        <template v-slot:item.action="{ item }">
          <add-sub-expert-dialog
            :item="item"
            @refetch="getExpertist"
          ></add-sub-expert-dialog>
          <edit-expert-dialog
            :item="item"
            @refetch="getExpertist"
          ></edit-expert-dialog>
          <del-expert-dialog
            :item="item"
            @refetch="getExpertist"
          ></del-expert-dialog>
        </template>
        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
          <v-btn icon @click="expand(!isExpanded)">
            <v-icon>{{ isExpanded ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import editExpertDialog from '@/components/admin/edit/editExpertistDialog'
import addExpertDialog from '@/components/admin/edit/addExpertistDialog'
import delExpertDialog from '@/components/admin/edit/delExpertistDialog'
import subExpertTable from '@/components/admin/edit/subExpertistTable'
import addSubExpertDialog from '@/components/admin/edit/addsubExpertistDialog'
export default {
  components: {
    addExpertDialog,
    editExpertDialog,
    delExpertDialog,
    subExpertTable,
    addSubExpertDialog,
  },
  data() {
    return {
      nameDialog: false,
      loading: true,
      name: '',
      headers: [
        { text: 'ความเชี่ยวชาญ', align: 'start', value: 'name', width: '80%' },
        {
          text: 'การจัดการ',
          align: 'center',
          value: 'action',
          sortable: false,
          width: '15%',
        },
        { text: '', value: 'data-table-expand', width: '5%' },
      ],
      expertists: [],
      expanded: [],
    }
  },
  created() {
    this.getExpertist()
  },
  methods: {
    clickrow(_, { expand, isExpanded }) {
      expand(!isExpanded)
    },
    async getExpertist() {
      this.loading = true
      try {
        const result = await this.$axios.$get('/select/expertist')
        this.expertists = result
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="css">
.v-data-table td,
.v-data-table th {
  padding: 0 0px;
}
.v-data-table__wrapper {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
