<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5" offset="2">
        <v-text-field
          v-if="
            start.fieldname === 'firstname' ||
            start.fieldname === 'lastname' ||
            start.fieldname === 'nickname'
          "
          v-model="start.data"
          :label="mapLabel[start.fieldname]"
          outlined
        >
        </v-text-field>
        <treeselect
          v-else-if="start.fieldname === 'ocscId'"
          v-model="start.data"
          :options="ocsc"
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          placeholder="ตำแหน่งสายงาน ก.พ."
          outlined
        />
        <treeselect
          v-else-if="start.fieldname === 'expId'"
          v-model="start.data"
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
        <v-text-field
          v-if="
            i.fieldname === 'firstname' ||
            i.fieldname === 'lastname' ||
            i.fieldname === 'nickname'
          "
          v-model="i.data"
          :label="mapLabel[i.fieldname]"
          outlined
        >
        </v-text-field>
        <treeselect
          v-else-if="i.fieldname === 'ocscId'"
          v-model="i.data"
          :options="ocsc"
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          placeholder="ตำแหน่งสายงาน ก.พ."
          outlined
        />
        <treeselect
          v-else-if="i.fieldname === 'expId'"
          v-model="i.data"
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
          @change="change(index)"
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
    <v-row justify="center">
      <v-col cols="8">
        <v-btn block class="success" @click="advancedSearch"
          >ค้นหา
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
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
      start: { condition: 'and', data: undefined, fieldname: 'firstname' },
      search: [],
      items: [
        { name: 'ชื่อจริง', fieldname: 'firstname' },
        { name: 'นามสกุล', fieldname: 'lastname' },
        { name: 'ชื่อเล่น', fieldname: 'nickname' },
        { name: 'ความเชี่ยวชาญ', fieldname: 'expId' },
        { name: 'ตำแหน่งสายงาน ก.พ.', fieldname: 'ocscId' },
      ],
      condition: [
        { text: 'และ', value: 'and' },
        { text: 'หรือ', value: 'or' },
      ],
      count: 1,
      mapLabel: {
        firstname: 'ชื่อจริง',
        lastname: 'นามสกุล',
        nickname: 'ชื่อเล่น',
      },
      name: {
        firstname: 'personalInfo.firstnameTH',
        lastname: 'personalInfo.lastnameTH',
        nickname: 'personalInfo.nicknameTH',
        expId: 'expId',
        ocscId: 'ocscId',
      },
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
  watch: {
    'start.fieldname'(val) {
      this.start.data = undefined
    },
  },
  methods: {
    change(val) {
      this.search[val].data = undefined
    },
    add() {
      if (this.search.length >= 4) {
        return
      }
      this.search.push({
        num: this.count++,
        condition: 'and',
        data: undefined,
        fieldname: 'firstname',
      })
    },
    del(index) {
      console.log(index)
      this.search.splice(index, 1)
    },
    advancedSearch() {
      const result = {
        username: { $ne: 'admin' },
        $or: [],
      }
      const or = []
      const and = []
      and.push({
        [this.name[this.start.fieldname]]: this.check(
          this.start.data,
          this.start.fieldname
        ),
      })

      this.search.forEach((s) => {
        console.log(s)
        if (s.condition === 'or')
          or.push({ [this.name[s.fieldname]]: this.check(s.data, s.fieldname) })
        else
          and.push({
            [this.name[s.fieldname]]: this.check(s.data, s.fieldname),
          })
      })
      if (or.length !== 0) {
        result.$or.push({ $or: or })
      }
      if (and.length !== 0) {
        result.$or.push({ $and: and })
      }
      this.$emit('search', result)
    },
    check(s, f) {
      if (f === 'expId' || f === 'ocscId') {
        return s
      }
      return { $regex: s }
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
