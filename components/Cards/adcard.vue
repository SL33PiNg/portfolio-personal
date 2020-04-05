<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5" offset="2">
        <v-text-field outlined> </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select :items="items" label="" outlined></v-select>
      </v-col>
    </v-row>
    <v-row v-for="i in count" :key="i">
      <v-col cols="1" offset="2">
        <v-select :items="condition" outlined> </v-select>
      </v-col>
      <v-col cols="4">
        <v-text-field outlined> </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select :items="items" label="" outlined></v-select>
      </v-col>
      <v-col cols="auto" class="text-center">
        <v-btn class="mt-2" large icon color="Primary" @click="count--">
          <v-icon size="50"> mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="i === count" cols="auto" class="text-center">
        <v-btn large class="mt-2" icon color="Primary" @click="count++">
          <v-icon size="50"> mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: ['1', '2'],
      condition: ['OR', 'AND'],
      count: 1,
    }
  },
}
</script>

<style></style>
