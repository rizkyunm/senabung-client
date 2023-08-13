<script setup lang="ts">
import { definePageMeta, useAuth } from '#imports'
import { Field, Form } from 'vee-validate'
import ErrorModal from '~/components/ErrorModal.vue'

const route = useRoute()
const { signIn } = useAuth()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const form = reactive({
  email: '',
  password: '',
})

const schema = {
  email: 'required|email',
  password: 'required',
}

const errorResponse = ref<string>('')
const callback = ref<string>('/')

if (route.query?.callbackUrl) {
  callback.value = route.query.callbackUrl
}

const submit = async () => {
  try {
    await signIn(
      { email: form.email, password: form.password },
      { callbackUrl: callback?.value }
    )
  } catch (e) {
    console.log(e)
    errorResponse.value = 'Periksa kembali email dan password anda'
    showModal.value = true
  }
}

const showModal = ref(false)
</script>

<template>
  <nuxt-layout name="auth" class="auth-background">
    <div class="h-screen flex justify-center items-center">
      <div class="w-full lg:w-1/2 flex justify-center items-center">
        <Form
          v-slot="{ errors, meta }"
          :validation-schema="schema"
          class="w-auto lg:w-1/2 p-10 pt-3 bg-green-progress bg-opacity-60 rounded-3xl"
          @submit="submit"
        >
          <nuxt-link
            to="/"
            class="no-underline -ml-5 text-lg text-orange-button hover:text-orange-hover"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" /> kembali
          </nuxt-link>
          <h2 class="font-normal my-6 text-3xl text-white">
            Masuk ke Akun Anda
          </h2>
          <div class="md:mb-6 mb-2">
            <div class="md:mb-4 mb-1">
              <label class="font-normal text-white block mb-3">Email</label>
              <Field
                v-model="form.email"
                name="email"
                type="email"
                :class="errors.email ? 'border-2 border-rose-600' : ''"
                class="auth-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="masukkan alamat email anda"
              />
              <span class="text-rose-800 text-sm ml-5">{{ errors.email }}</span>
            </div>
          </div>
          <div class="mb-6">
            <div class="mb-4">
              <label class="font-normal text-white block mb-3">Password</label>
              <Field
                v-model="form.password"
                name="password"
                type="password"
                :class="errors.password ? 'border-2 border-rose-600' : ''"
                class="auth-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="masukkan password anda"
                @keyup.enter="submit"
              />
              <span class="text-rose-800 text-sm ml-5">{{ errors.password }}</span>
            </div>
          </div>
          <div class="mb-6">
            <div class="mb-4">
              <button
                class="block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 mb-5 rounded-full disabled:bg-orange-disable"
                :disabled="!meta.valid"
              >
                Masuk
              </button>
            </div>
          </div>
          <div class="text-center">
            <p class="text-white font-light text-md">
              belum punya akun?
              <nuxt-link
                to="/daftar"
                class="no-underline text-orange-button hover:text-orange-hover"
              >
                Daftar
              </nuxt-link>
            </p>
          </div>
        </Form>
      </div>
    </div>
    <Teleport to="body">
      <ErrorModal :show="showModal" @close="showModal = false">
        <template #header>
          <h3 class="font-bold text-lg text-rose-800">Gagal Masuk !</h3>
        </template>
        <template #body>
          <p class="py-4">{{ errorResponse }}</p>
        </template>
      </ErrorModal>
    </Teleport>
  </nuxt-layout>
</template>

<style scoped>
.auth-background {
  background-image: url('/login.png');
}
</style>
