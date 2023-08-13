<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  auth: {
    authenticatedOnly: true,
    navigateUnauthenticatedTo: '/masuk',
  },
})
</script>

<template>
  <nuxt-layout name="success">
    <div class="container mx-auto h-screen flex justify-center items-center">
      <div class="w-full lg:w-1/3 px-10 lg:px-0">
        <div class="flex justify-center items-center mx-auto mt-6 mb-8">
          <img src="/Person-sending-money-using-phone-flat-vector-illustration.jpg" alt="" class="w-full" />
        </div>
        <h2 class="font-medium mb-3 text-3xl text-center">
          Terimakasih sudah berdonasi
        </h2>
        <p class="text-center font-light">
          Donasi anda telah kami terima
          <br />
        </p>
        <div class="mb-4 mt-6">
          <div class="mb-3">
            <button
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
              @click="$router.push({ path: '/donasi' })"
            >
              Mulai Donasi Lagi
            </button>
          </div>
          <div class="mb-4">
            <button
              class="block w-full bg-transparent border border-gray-500 text-gray-500 hover:bg-green-button hover:border-green-button hover:text-white font-light px-6 py-4 text-lg rounded-full"
              @click="$router.push({ path: '/dashboard/transaksi' })"
            >
              Lihat Daftar Transaksi
            </button>
          </div>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>
