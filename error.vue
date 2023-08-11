<script setup>
defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="container mx-auto h-screen flex justify-center items-center">
    <div v-if="error.statusCode === 404" class="w-full lg:w-1/3 px-10 lg:px-0">
      <div class="flex justify-center items-center mx-auto mt-6 mb-8">
        <img src="/404-illustration.svg" alt="" class="w-full" />
      </div>
      <h2 class="font-medium mb-3 text-3xl text-center">
        Oops! Halaman Tidak Ditemukan.
      </h2>
      <p class="text-center font-light">
        Halaman yang anda akses saat ini
        <br />
        belum tersedia.
      </p>
      <div class="mb-4 mt-6">
        <div class="mb-3">
          <button
            class="block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 text-lg rounded-full"
            @click="$router.push({ path: '/' })"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
    <div
      v-else-if="error.statusCode === 403"
      class="w-full lg:w-1/3 px-10 lg:px-0"
    >
      <div class="flex justify-center items-center mx-auto mt-6 mb-8">
        <img src="/error.jpg" alt="" class="w-full" />
      </div>
      <h2 class="font-medium mb-3 text-3xl text-center">
        Oops! Akses Terbatas.
      </h2>
      <p class="text-center font-light">
        Anda tidak mendapatkan izin
        <br />
        untuk mengakses halaman ini.
      </p>
      <div class="mb-4 mt-6">
        <div class="mb-3">
          <button
            class="block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 text-lg rounded-full"
            @click="$router.push({ path: '/' })"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
    <div v-else class="w-full lg:w-1/3 px-10 lg:px-0">
      <div class="flex justify-center items-center mx-auto mt-6 mb-8">
        <img src="/error.jpg" alt="" class="w-full" />
      </div>
      <h2 class="font-medium mb-3 text-3xl text-center">
        Oops! Terjadi Kesalahan.
      </h2>
      <p class="text-center font-light">
        Ada kesalahan pada sistem kami
        <br />
        coba beberapa saat lagi.
      </p>
      <div class="mb-4 mt-6">
        <div class="mb-3">
          <button
            class="block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 text-lg rounded-full"
            @click="$router.push({ path: '/' })"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
