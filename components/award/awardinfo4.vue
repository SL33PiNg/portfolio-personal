<template>
  <v-container>
    <h3>
      อื่นๆ
    </h3>
    <v-row justify="center">
      <v-col cols="12" md="4" xs="12">
        <v-img
          v-if="imageUrl"
          :src="imageUrl"
          aspect-ratio="1.7"
          width="200"
          height="200"
          class="ma-2"
        ></v-img>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4" xs="6">
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="เลือกภาพปก"
          prepend-icon="mdi-camera"
          label="ภาพปก"
          @change="handleChange"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" xs="12">
        <v-text-field label="อื่นๆ" disabled />
      </v-col>

      <v-col cols="12" md="6" xs="12">
        <v-text-field label="ชื่อ" clearable />
      </v-col>

      <v-col cols="12" md="3" xs="12">
        <v-text-field label="ปี" clearable placeholder="พ.ศ." />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" xs="12">
        <wysiwyg v-model="content"></wysiwyg>
      </v-col>
    </v-row>
    <v-row justify="end" class="ma-3 ">
      <v-btn class="mx-0 font-weight-light" color="success">
        เพิ่มข้อมูล
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    content: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!'
    ],
    imageUrl: '',
    imageFile: ''
  }),
  methods: {
    handleChange(e) {
      const fr = new FileReader()
      fr.readAsDataURL(e)
      fr.addEventListener('load', () => {
        this.imageUrl = fr.result
        this.imageFile = e
        // eslint-disable-next-line no-console
        console.log(fr)
      })
    }
  }
}
</script>
