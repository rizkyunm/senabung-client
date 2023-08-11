<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Field, Form } from 'vee-validate'
import ErrorModal from '~/components/ErrorModal.vue'
import { Role } from '~/types/auth'
import { definePageMeta } from '#imports'

const { $api } = useNuxtApp()
const { signIn } = useAuth()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const form = reactive({
  name: '',
  email: '',
  phone_number: '',
  password: '',
  role: Role.Client,
})

const schema = {
  name: 'required|minLength:5|maxLength:30',
  email: 'required|email',
  phone_number: 'required|minLength:8|maxLength:15|number',
  password: 'required|password',
  confirmation_password: 'required|confirmed:password',
}

const userRegister = async () => {
  try {
    let response = await $api.auth.create(form)
    console.log(response)
  } catch (error) {
    errorResponse.value = 'Terjadi kesalahan saat pendaftaran akun'
    showModal.value = true
  }
}

const confirmation_password = ref<string>('')
const errorResponse = ref<string>('')
const showModal = ref<boolean>(false)
</script>

<template>
  <nuxt-layout name="auth" class="auth-background">
    <div class="flex justify-center items-center">
      <div class="w-full flex md:h-screen h-fit justify-center items-center">
        <Form
          v-slot="{ errors, meta }"
          :validation-schema="schema"
          class="w-auto lg:w-3/4 p-10 pt-3 bg-green-progress bg-opacity-60 rounded-3xl"
          @submit="userRegister"
        >
          <nuxt-link
            to="/"
            class="no-underline -ml-5 text-l text-orange-button hover:text-orange-hover"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" /> kembali
          </nuxt-link>
          <h2 class="font-normal mt-7 mb-6 text-3xl text-white">
            Buat Akun Baru
          </h2>
          <div class="mb-6 w-full">
            <div class="mb-4">
              <label class="font-normal text-lg text-white block mb-3"
                >Nama Lengkap</label
              >
              <Field
                v-model="form.name"
                type="text"
                name="name"
                :class="errors.name ? 'border-2 border-rose-600' : ''"
                class="auth-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="Masukkan nama lengkap anda"
              />
              <span class="text-rose-500 text-sm ml-5">{{ errors.name }}</span>
            </div>
          </div>
          <div class="mb-6 w-full">
            <div class="mb-4 w-1/2 inline-block">
              <label class="font-normal text-lg text-white block mb-3"
                >Email</label
              >
              <Field
                v-model="form.email"
                type="email"
                name="email"
                :class="errors.email ? 'border-2 border-rose-600' : ''"
                class="register-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="masukkan alamat email anda"
              />
              <span class="text-rose-500 ml-5">{{ errors.email }}</span>
            </div>
            <div class="mb-4 pl-5 w-1/2 inline-block">
              <label class="font-normal text-lg text-white block mb-3"
                >Nomor Handphone</label
              >
              <Field
                v-model="form.phone_number"
                type="text"
                name="phone_number"
                :class="errors.phone_number ? 'border-2 border-rose-600' : ''"
                class="register-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="Masukkan nomor telepon anda"
              />
              <span class="text-rose-500 text-sm ml-5">{{ errors.phone_number }}</span>
            </div>
          </div>
          <div class="mb-6 w-full">
            <div class="mb-4 w-1/2 inline-block">
              <label class="font-normal text-lg text-white block mb-3"
                >Password</label
              >
              <Field
                v-model="form.password"
                name="password"
                type="password"
                :class="errors.password ? 'border-2 border-rose-600' : ''"
                class="register-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="Masukkan password anda"
              />
              <span class="text-rose-500 text-sm ml-5">{{ errors.password }}</span>
            </div>
            <div class="mb-4 pl-5 w-1/2 inline-block">
              <label class="font-normal text-lg text-white block mb-3"
                >Confirmation Password</label
              >
              <Field
                v-model="confirmation_password"
                name="confirmation_password"
                type="password"
                :class="
                  errors.confirmation_password ? 'border-2 border-rose-600' : ''
                "
                class="register-form focus:outline-none focus:bg-orange-200 focus:shadow-outline focus:border-orange-button-hover focus:text-green-progress"
                placeholder="Konfirmasi password anda"
                @keyup.enter="userRegister"
              />
              <span class="text-rose-500 text-sm ml-5">{{
                errors.confirmation_password
              }}</span>
            </div>
          </div>
          <div class="mb-6">
            <div class="mb-4">
              <button
                class="block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 text-lg rounded-full disabled:bg-orange-disable"
                :disabled="!meta.valid"
              >
                Lanjutkan pendaftaran
              </button>
            </div>
          </div>
          <div class="text-center">
            <p class="text-white text-md">
              Sudah punya akun?
              <nuxt-link
                to="/masuk"
                class="no-underline text-orange-button hover:text-orange-hover"
                >Masuk</nuxt-link
              >.
            </p>
          </div>
        </Form>
      </div>
    </div>
    <Teleport to="body">
      <ErrorModal :show="showModal" @close="showModal = false">
        <template #header>
          <h3 class="font-bold text-lg text-rose-800">Gagal Daftar !</h3>
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
  background-image: url('/signup.jpeg');
}
</style>
