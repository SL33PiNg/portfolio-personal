<template>
  <v-card outlined>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="positionocsc"
        :expanded.sync="expanded"
        hide-default-footer
        item-key="_id"
        show-expand
        @click:row="clickrow"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ตำแหน่งสายงานก.พ. </v-toolbar-title>
            <v-spacer></v-spacer>
            <add-positionocsc-dialog
              @refetch="getPositionOcsc"
            ></add-positionocsc-dialog>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="100">
            <sub-positionocsc-table
              :items="item"
              @refetch="getPositionOcsc"
            ></sub-positionocsc-table>
          </td>
        </template>
        <template v-slot:item.action="{ item }">
          <add-sub-positionocsc-dialog
            :item="item"
            @refetch="getPositionOcsc"
          ></add-sub-positionocsc-dialog>
          <edit-positionocsc-dialog :item="item" @refetch="getPositionOcsc">
          </edit-positionocsc-dialog>
          <del-positionocsc-dialog
            :item="item"
            @refetch="getPositionOcsc"
          ></del-positionocsc-dialog>
        </template>
        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
          <v-btn icon @click="expand(!isExpanded)">
            <v-chip color="primary"
              ><v-icon small>{{
                isExpanded ? 'mdi-folder-open' : 'mdi-folder'
              }}</v-icon></v-chip
            >
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import editPositionocscDialog from '@/components/admin/edit/editPositionOcscDialog'
import addPositionocscDialog from '@/components/admin/edit/addPositionOscsDialog'
import delPositionocscDialog from '@/components/admin/edit/delPositionOcscDialog'
import subPositionocscTable from '@/components/admin/edit/subPositionOcscTable'
import addSubPositionocscDialog from '@/components/admin/edit/addSubPositionOcscDialog'
export default {
  components: {
    addPositionocscDialog,
    editPositionocscDialog,
    delPositionocscDialog,
    subPositionocscTable,
    addSubPositionocscDialog,
  },
  data() {
    return {
      nameDialog: false,
      loading: true,
      name: '',
      headers: [
        {
          text: 'ตำแหน่งสายงานก.พ.',
          align: 'start',
          value: 'name',
          width: '77%',
        },
        {
          text: 'การจัดการ',
          align: 'center',
          value: 'action',
          sortable: false,
          width: '18%',
        },
        { text: '', value: 'data-table-expand', width: '5%' },
      ],
      positionocsc: [],
      expanded: [],
    }
  },
  created() {
    this.getPositionOcsc()
  },
  methods: {
    clickrow(_, { expand, isExpanded }) {
      expand(!isExpanded)
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
