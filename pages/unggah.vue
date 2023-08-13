<script setup lang="ts">
import { definePageMeta } from '#imports'

const { token, data } = useAuth()
const router = useRouter()
const { $api } = useNuxtApp()
const form = reactive({
  url: '/avatar.jpg',
  selectedFiles: undefined,
})

definePageMeta({
  auth: {
    authenticatedOnly: true,
    navigateUnauthenticatedTo: '/masuk',
  },
})

const file = ref(null)

const onFileChange = (e: any) => {
  const file = e.target.files[0]
  form.url = URL.createObjectURL(file)
  form.selectedFiles = file
}

const upload = async () => {
  let formData = new FormData()
  formData.append('avatar', form?.selectedFiles)

  try {
    const res = await $api.user.avatar(token.value, formData)
    if (res.is_uploaded) {
      await router.push('/daftar-sukses')
    }
  } catch (error) {
    errorResponse.value = 'Gagal upload foto'
    showModal.value = true
  }
}

const errorResponse = ref<string>('')
const showModal = ref(false)
</script>

<template>
  <nuxt-layout name="auth">
    <div class="container mx-auto h-screen flex justify-center items-center">
      <div class="w-full lg:w-1/3 px-10 lg:px-0">
        <div class="flex justify-center items-center mx-auto mb-4 w-40">
          <div class="relative">
            <div class="cursor-pointer" @click="file?.click()">
              <img
                :src="form.url"
                alt=""
                class="rounded-full border-white border-4"
              />
              <img
                src="/icon-avatar-add.svg"
                alt=""
                class="absolute right-0 bottom-0 pb-2"
              />
              <input
                ref="file"
                type="file"
                style="display: none"
                accept="image/*"
                @change="onFileChange"
              />
            </div>
          </div>
        </div>
        <h2 class="font-normal mb-3 text-3xl text-white text-center">
          Hi, {{ data?.name }}
        </h2>
        <p class="text-white text-center font-light">
          Silahkan unggah foto diri anda
        </p>
        <div class="mb-4 mt-6">
          <div class="mb-3">
            <button
              :disabled="form.selectedFiles === undefined"
              :class="
                form.selectedFiles === undefined
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              "
              class="block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 text-lg rounded-full"
              @click="upload"
            >
              Daftar
            </button>
          </div>
        </div>
        <div>
          <div class="mb-4">
            <button
              class="block w-full bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light px-6 py-4 text-lg rounded-full"
              @click="router.push({ path: '/daftar-sukses' })"
            >
              Lewati
            </button>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ErrorModal :show="showModal" @close="showModal = false">
        <template #header>
          <h3 class="font-bold text-lg text-rose-800">Gagal Upload !</h3>
        </template>
        <template #body>
          <p class="py-4">{{ errorResponse }}</p>
        </template>
      </ErrorModal>
    </Teleport>
  </nuxt-layout>
</template>
