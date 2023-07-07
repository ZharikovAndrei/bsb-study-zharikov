<template>
  <v-container class="sign-in">
    <v-row class="text-center">

      <v-col class="my-4">
        <h1 class="display-2 mb-3">
          Sign In
        </h1>

        <router-link
          to="/sign-up"
          class="router-link sign-in-router-link"
        >
          Need an account?
        </router-link>
      </v-col>
    </v-row>

    <form>
      <v-text-field
        v-model="signInData.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.signInData.email.$touch()"
        @blur="$v.signInData.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="signInData.password"
        :error-messages="passwordErrors"
        :counter="20"
        label="Password"
        required
        @input="$v.signInData.password.$touch()"
        @blur="$v.signInData.password.$touch()"
      ></v-text-field>

      <v-btn
        class="mr-4"
        @click="submit"
        color="success"
      >
        submit
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import {defineComponent} from 'vue'
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'
import {mapActions} from "vuex";
import {authService} from "@/main";

export default defineComponent({
  name: "SignIn",
  mixins: [validationMixin],

  validations: {
      signInData: {
        email: {required, email},
        password: {required, maxLength: maxLength(20)},
      }
  },

  data: () => ({
    signInData: {
      email: '',
      password: '',
    },
    auth: authService,
  }),

  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.signInData.password.$dirty) return errors
      !this.$v.signInData.password.maxLength && errors.push('Password must be at most 10 characters long')
      !this.$v.signInData.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.signInData.email.$dirty) return errors
      !this.$v.signInData.email.email && errors.push('Must be valid e-mail')
      !this.$v.signInData.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    ...mapActions([
      'GET_EXISTING_USER_DATA_FROM_API',
    ]),
    submit() {
      this.$v.$touch()
      console.log('Карыстальнік увеў', this.signInData.email, this.signInData.password)
      this.GET_EXISTING_USER_DATA_FROM_API(this.signInData)
        .then(response => {
          if (response) {
            console.log("З АПІ прыйшла юзер дата: ", response)
            this.$router.push('/')
            this.auth.isLoggedIn = true
          }
        })
    },
  },
})
</script>

<style>
.sign-in {
  width: 30%;
}
</style>
