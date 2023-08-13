<script setup lang="ts">
import { definePageMeta } from '#imports'
import { ITransaction } from '~/types/transaction'
import { convertTimestamp } from '~/utils/date'

const { token } = useAuth()
const { $api } = useNuxtApp()

definePageMeta({
  auth: {
    authenticatedOnly: true,
    navigateUnauthenticatedTo: '/masuk',
  },
})

let transactions = reactive<ITransaction[]>([])

const isLoaded = ref<boolean>(false)

onMounted(async () => {
  try {
    transactions = await $api.transaction.listByUser(token.value)
    isLoaded.value = true
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div class="project-page">
    <section class="dashboard-header bg-green-progress pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section v-if="!isLoaded" class="container mx-auto relative">
      <div class="flex justify-center mt-3 h-96">
        <span class="loading loading-spinner loading-lg align-middle"></span>
      </div>
    </section>
    <section v-if="isLoaded" class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            Daftar Transaksi Saya
          </h2>
        </div>
      </div>
      <hr />
      <div class="block mb-2 min-h-96">
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="w-full lg:max-w-full lg:flex mb-4"
        >
          <div
            class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            :style="
              'background-color: #bbb; background-position: center; background-image: url(\'' +
              transaction.campaign.campaign_image +
              '\')'
            "
          ></div>
          <div
            :class="
              transaction.status === 'paid'
                ? 'border-green-button'
                : 'border-orange-button'
            "
            class="w-full border-r border-b border-l border-5 lg:border-t bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal"
          >
            <div>
              <div class="text-orange-button font-bold text-xl mb-1">
                {{ transaction.campaign.name }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                Rp.
                {{ new Intl.NumberFormat().format(transaction.amount) }}
                &middot;
                {{ convertTimestamp(transaction?.created_at) }} &middot;
                <span
                  :class="
                    transaction.status === 'paid'
                      ? 'text-green-button'
                      : 'text-orange-button'
                  "
                >
                  {{ transaction.status }}
                </span>
              </p>
              <div v-if="transaction.status === 'pending'">
                <NuxtLink :to="transaction.payment_url">
                  <button
                    class="bg-orange-button hover:bg-green-button text-white py-1 px-2 rounded"
                  >
                    Bayar
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
