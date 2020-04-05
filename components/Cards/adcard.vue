<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5" offset="2">
        <v-text-field v-if="start.fieldname === 'name'" outlined>
        </v-text-field>
        <treeselect
          v-else-if="start.fieldname === 'ocscId'"
          :options="ocsc"
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          placeholder="ตำแหน่งสายงาน ก.พ."
          outlined
        />
        <treeselect
          v-else-if="start.fieldname === 'expId'"
          :options="expert"
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          placeholder="ความเชี่ยวชาญ"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="start.fieldname"
          :items="items"
          item-text="name"
          item-value="fieldname"
          label=""
          outlined
        ></v-select>
      </v-col>

      <v-col cols="auto" class="text-center">
        <v-btn large class="mt-2" color="primary" icon @click="add">
          <v-icon size="50"> mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-for="(i, index) in search" :key="i.num">
      <v-col cols="2" offset="2">
        <v-select
          v-model="i.condition"
          :items="condition"
          item-text="text"
          item-value="value"
          outlined
        >
        </v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field v-if="i.fieldname === 'name'" outlined> </v-text-field>
        <treeselect
          v-else-if="i.fieldname === 'ocscId'"
          :options="ocsc"
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          placeholder="ตำแหน่งสายงาน ก.พ."
          outlined
        />
        <treeselect
          v-else-if="i.fieldname === 'expId'"
          :options="expert"
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          placeholder="ความเชี่ยวชาญ"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="i.fieldname"
          :items="items"
          item-text="name"
          item-value="fieldname"
          label=""
          outlined
        ></v-select>
      </v-col>
      <v-col cols="auto" class="text-center">
        <v-btn class="mt-2" color="error" large icon @click="del(index)">
          <v-icon size="50"> mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <!-- <v-col v-if="i === count" cols="auto" class="text-center">
        <v-btn large class="mt-2" icon color="Primary" @click="count++">
          <v-icon size="50"> mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      normalizer(node) {
        return {
          id: node._id,
          label: node.name,
          children: node.sub,
        }
      },
      a: undefined,
      start: { condition: 'and', data: undefined, fieldname: 'name' },
      search: [],
      items: [
        { name: 'ชื่อ', fieldname: 'name' },
        { name: 'ความเชี่ยวชาญ', fieldname: 'expId' },
        { name: 'ตำแหน่งสายงาน ก.พ.', fieldname: 'ocscId' },
      ],
      condition: [
        { text: 'และ', value: 'and' },
        { text: 'หรือ', value: 'or' },
      ],
      count: 1,
    }
  },
  computed: {
    expert() {
      return this.$store.state.select.expert
    },
    ocsc() {
      return this.$store.state.select.ocsc
    },
  },
  methods: {
    add() {
      this.search.push({
        num: this.count++,
        condition: 'and',
        data: undefined,
        fieldname: 'name',
      })
    },
    del(index) {
      console.log(index)
      this.search.splice(index, 1)
    },
  },
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
