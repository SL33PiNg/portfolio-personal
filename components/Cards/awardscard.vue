<template>
  <v-card width="auto" height="auto" class="ma-3">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h3>
            <v-btn icon @click="award.fav = !award.fav">
              <v-icon :color="award.fav ? 'yellow' : 'grey'">mdi-star</v-icon>
            </v-btn>
            ชื่อ: {{ award.title }}
          </h3>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="150"
      width="auto"
    ></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle
          ><h4>ประเภทผลงาน: {{ award.catId }}</h4></v-list-item-subtitle
        >
        <v-list-item-subtitle
          ><v-chip class="error">
            ปี: {{ award.year }}</v-chip
          ></v-list-item-subtitle
        > </v-list-item-content
      ><v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-delete-outline</v-icon></v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    award: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fav: false
    }
  }
}
</script>

<style></style>
