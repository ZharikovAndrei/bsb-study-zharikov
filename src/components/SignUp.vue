<template>
  <v-container class="sign-in">

    <v-row class="text-center">
      <v-col class="my-4">
        <h1 class="display-2 mb-3">
          Sign Up
        </h1>
      </v-col>
    </v-row>

    <form>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Username"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :counter="20"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        :error-messages="confirmPasswordErrors"
        :counter="20"
        label="Confirm password"
        required
        @input="$v.confirmPassword.$touch()"
        @blur="$v.confirmPassword.$touch()"
      ></v-text-field>

      <v-row class="mt-2">
        <v-btn
          class="mr-4"
          color="success"
          @click="submit"
        >
          submit
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          @click="goBack"
        >
          back
        </v-btn>
      </v-row>
    </form>
  </v-container>
</template>

<script>
import {defineComponent} from 'vue'
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'

export default defineComponent({
  name: "SignIn",
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    password: {required, maxLength: maxLength(20)},
    confirmPassword: {required, maxLength: maxLength(20)},
  },

  data: () => ({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  }),

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('Password must be at most 10 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.maxLength && errors.push('Password must be at most 10 characters long')
      !this.$v.confirmPassword.required && errors.push('Password confirmation is required.')
      return errors
    },

  },

  methods: {
    submit() {
      this.$v.$touch()
    },
    goBack() {
      this.$router.go(-1)
    }
  },
})
</script>

<style>
.sign-in {
  width: 30%
}
</style>
