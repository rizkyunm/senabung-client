<script setup lang="ts">
const { status, data, signOut } = useAuth()
</script>

<template>
  <header class="flex items-center inline-block">
    <div style="height: 54px" class="pr-5">
      <nuxt-link to="/">
        <img src="/logo-footer.png" alt="logo" class="h-full" />
      </nuxt-link>
    </div>
    <ul class="flex items-center">
      <li>
        <nuxt-link
          class="text-white hover:text-orange-button font-semibold text-lg px-4 py-3"
          to="/donasi"
          >Donasi</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="text-white hover:text-orange-button font-semibold text-lg px-4 py-3"
          to="/galang-dana"
        >Galang Dana</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="text-white hover:text-orange-button font-semibold text-lg px-4 py-3"
          to="/tentang-kami"
          >Tentang Kami</nuxt-link
        >
      </li>
    </ul>
    <div v-if="status === 'authenticated'" class="flex ml-auto">
      <div class="dropdown inline-block relative z-10">
        <button
          class="bg-orange-button bg-opacity-80 text-white font-bold py-4 px-6 rounded inline-flex items-center"
        >
          <img
            v-if="data.image_url"
            :src="data.image_url"
            alt=""
            class="h-8 rounded-full mr-2"
          />
          <span class="mr-1">{{ data.name }}</span>
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </button>
        <ul
          class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow w-full -mt-2"
        >
          <li class="">
            <nuxt-link
              class="bg-gray-100 hover:bg-orange-hover hover:text-white hover:text-orange-500 py-2 px-4 block whitespace-no-wrap"
              to="/dashboard/transaksi"
              >Transaksi Saya</nuxt-link
            >
          </li>
          <li class="">
            <nuxt-link
              class="bg-gray-100 hover:bg-orange-hover hover:text-white border-t py-2 px-4 block whitespace-no-wrap"
              to="/dashboard/profil"
              >Profil Saya</nuxt-link
            >
          </li>
          <li class="">
            <nuxt-link
              class="cursor-pointer rounded-b bg-gray-100 hover:bg-orange-hover hover:text-white border-t py-2 px-4 block whitespace-no-wrap"
              @click="signOut()"
              >Keluar</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <ul v-else class="flex ml-auto items-center mt-2">
      <li>
        <nuxt-link
          to="/daftar"
          class="inline-block bg-orange-button hover:bg-orange-hover text-white font-light w-40 text-center px-6 py-1 text-lg rounded-full mr-4"
        >
          Daftar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/masuk"
          class="inline-block bg-orange-button hover:bg-orange-hover text-white font-light w-40 text-center px-6 py-1 text-lg rounded-full mr-4"
        >
          Masuk
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
