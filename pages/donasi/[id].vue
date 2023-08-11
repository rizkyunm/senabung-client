<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ICampaignDetail } from '~/types/campaign'
import { ICreateTransactionInput } from '~/types/transaction'
import { useRuntimeConfig } from '#app'

const { $api } = useNuxtApp()
const apiBase = useRuntimeConfig().public.apiBase
const route = useRoute()
const params = route.params.id
const id: string = params.length > 0 ? params[0] : '0'

let campaign = ref<ICampaignDetail>({
  id: 0,
  name: '',
  short_description: '',
  description: '',
  image_url: '',
  goal_amount: 0,
  current_amount: 0,
  slug: '',
  user_id: 0,
  perks: [],
  backer_count: 0,
  images: [],
})
let defaultImage = ref<string>('')
let transaction = reactive<ICreateTransactionInput>({
  amount: 0,
  campaign_id: Number.parseInt(id),
})

const changeImage = (url: string) => {
  defaultImage.value = url
}

const fund = async () => {
  try {
    let response = await $api.transaction.create(transaction)
    window.location.href = response.payment_url
    console.log(response.payment_url)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  try {
    campaign.value = await $api.campaign.get(id)
    defaultImage.value =
      useRuntimeConfig().public.apiBase + '/' + campaign.value.image_url
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="project-page">
    <section class="project-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-56">
      <div class="flex mt-3">
        <div class="w-3/4 mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <figure class="item-image">
              <img :src="defaultImage" alt="" class="rounded-20 w-full" />
            </figure>
          </div>
          <div
            v-for="image in campaign.images"
            :key="image.image_url"
            class="flex -mx-2"
          >
            <div
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
            >
              <figure class="item-thumbnail">
                <img
                  :src="apiBase + '/' + image.image_url"
                  alt=""
                  class="rounded-20 w-full"
                  @click="changeImage(apiBase + '/' + image.image_url)"
                />
              </figure>
            </div>
          </div>
        </div>
        <div class="w-1/4">
          <div
            class="bg-white w-full p-5 border border-gray-400 rounded-20 sticky"
            style="top: 15px"
          >
            <h4 class="mt-5 font-semibold">Apa yang kamu dapatkan:</h4>
            <ul class="list-check mt-3">
              <li v-for="perk in campaign.perks" :key="perk">
                {{ perk }}
              </li>
            </ul>
            <input
              v-model.number="transaction.amount"
              type="number"
              class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              placeholder="Amount in Rp"
              @keyup.enter="fund"
            />
            <button
              class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-orange-hover text-white font-medium px-6 py-3 text-md rounded-full"
              @click="fund"
            >
              Donasi Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-8 mb-20">
      <div class="flex justify-between items-center">
        <div class="w-full md:w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            {{ campaign.name }}
          </h2>
          <p class="font-light text-xl mb-5">
            {{ campaign.short_description }}
          </p>
          <div class="font-light text-md text-gray-400">
            {{ campaign.backer_count }} donatur
          </div>
          <div class="relative progress-bar">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6"
            >
              <div
                :style="
                  'width: ' +
                  (campaign.current_amount / campaign.goal_amount) * 100 +
                  '%'
                "
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>
          <div class="flex progress-info mb-6">
            <div class="text-2xl">
              {{ (campaign.current_amount / campaign.goal_amount) * 100 }}%
            </div>
            <div class="ml-auto font-semibold text-2xl">
              Rp {{ campaign.goal_amount }}
            </div>
          </div>
          <p class="font-light text-xl mb-5">
            {{ campaign.description }}
          </p>
        </div>
        <div class="w-1/4 hidden md:block"></div>
      </div>
    </section>
    <Footer />
  </div>
</template>
