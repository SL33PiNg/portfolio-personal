<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }"
        ><v-btn color="warning" text v-on="on"> <h4>ร้องเรียน</h4></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          คำร้องเรียน
        </v-card-title>

        <v-text-field
          label="ชื่อผู้ร้องเรียน"
          class="ma-2"
          clearable
          outlined
        ></v-text-field>

        <froala :config="config" class="ma-1"></froala>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="dialog = false">
            บันทึก
          </v-btn>
          <v-btn color="error" @click="dialog = false">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        placeholderText: 'Edit Your Content Here!',
        charCounterMax: 3000,
        quickInsertEnabled: false,
        imageUploadURL: '/api/upload_image',
        toolbarButtons: {
          moreImage: {
            buttons: ['insertImage'],
          },
          moreText: {
            buttons: [
              'bold',
              'italic',
              'underline',
              'strikeThrough',
              'subscript',
              'superscript',
              'fontFamily',
              'fontSize',
              'textColor',
              'backgroundColor',
              'inlineClass',
              'inlineStyle',
              'clearFormatting',
            ],
          },
          moreParagraph: {
            buttons: [
              'alignLeft',
              'alignCenter',
              'formatOLSimple',
              'alignRight',
              'alignJustify',
              'formatOL',
              'formatUL',
              'paragraphFormat',
              'paragraphStyle',
              'lineHeight',
              'outdent',
              'indent',
              'quote',
            ],
          },
        },
      },

      dialog: false,
    }
  },
}
</script>
