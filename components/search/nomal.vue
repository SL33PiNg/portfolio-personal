<template>
  <v-card class="my-2" width="100%">
    <v-row justify="center"> <h2 class="mt-5">ค้นหา</h2></v-row>
    <v-row justify="center" class="mt-5 ma-2">
      <v-col cols="12" md="3" xs="12">
        <v-text-field label="ชื่อ-นามสกุล,ชื่อเล่น" outlined class="">
        </v-text-field>
      </v-col>

      <v-col cols="12" md="3" xs="12">
        <treeselect
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          multiple
          placeholder="หน่วยงาน"
          outlined
        />
      </v-col>
      <v-col cols="12" md="3" xs="12">
        <treeselect
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          multiple
          placeholder="ความเชี่ยวชาญ"
          outlined
        />
      </v-col>
      <v-col cols="12" md="3" xs="12">
        <treeselect
          :normalizer="normalizer"
          :disable-branch-nodes="true"
          clear-on-select
          multiple
          placeholder="ตำแหน่งสายงาน ก.พ."
          outlined
        />
      </v-col>
      <v-col cols="12" xs="12">
        <v-row>
          <v-btn block class="success"
            >ค้นหา <v-icon>mdi-magnify</v-icon>
          </v-btn></v-row
        >
      </v-col>
      <!-- <v-col cols="12" xs="12">
        <v-row justify="end">
          <v-btn class="secondary" to="/advanceSearch"
            >การค้นหาขั้นสูง</v-btn
          ></v-row
        ></v-col -->
    </v-row>
  </v-card>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
export default {
  components: {
    Treeselect,
  },
  data: () => ({
    multiple: true,
    clearOnSelect: false,
  }),
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
