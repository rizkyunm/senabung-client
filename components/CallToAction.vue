<template>
  <section class="call-to-action bg-green-progress pt-60 pb-20">
    <div class="container mx-auto">
      <div class="w-full text-center">
        <h1 class="text-5xl text-white font-semibold">
          Bantu orang disekitarmu
          <br />
          dengan meringankan bebannya bersama
        </h1>
        <button
          class="inline-block bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 mt-8 text-lg rounded-full"
          @click="$router.push({ path: '/register' })"
        >
          Mulai Galang Dana
        </button>
      </div>
    </div>
  </section>
</template>
