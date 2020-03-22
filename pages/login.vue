<template>
  <v-row justify="center">
    <v-card class="ma-3 mt-8" max-width="100%" width="800" outlined>
      <v-container>
        <v-form id="login-form" @submit.prevent="login">
          <v-row justify="center" class="mt-5">
            <v-card-title>
              <h3>ลงชื่อเข้าใช้งาน</h3>
            </v-card-title>
          </v-row>
          <v-row
            v-if="error"
            xs12
            md12
            justify="center"
            class="text-center red--text"
          >
            {{ error }}
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" xs="12">
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                label="Username"
                outlined
                clearable
                autofocus
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" xs="12">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-8">
            <v-btn
              type="submit"
              class="mx-auto font-weight-light text-center"
              color="success"
              style="width: 200px;"
              form="login-form"
            >
              ลงชื่อเข้าใช้
            </v-btn>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      show1: false,
      username: '',
      password: '',
      error: null,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 3 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match",
      },
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
      } catch (e) {
        if (e.message.search('401') !== -1)
          this.error = 'Invalid username or password'
        else if (e.message.search('450') !== -1)
          this.error = 'user has been disable!! call to 085-531-0522'
        else {
          this.error = e.message + ''
        }
      }
    },
  },
}
</script>
