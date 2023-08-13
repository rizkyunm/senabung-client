<script setup lang="ts">
import { ICampaign } from '~/types/campaign'
import { definePageMeta } from '#imports'

const { $api } = useNuxtApp()

definePageMeta({
  auth: false,
})

let campaigns = reactive<ICampaign[]>([])
const isLoaded = ref<boolean>(false)

onMounted(async () => {
  try {
    campaigns = await $api.campaign.list()
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
      <hr />
      <div class="block mb-2">
        <div
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="w-full lg:max-w-full lg:flex mb-4"
        >
          <div
            class="border h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            :style="
              'background-color: #bbb; background-position: center; background-image: url(\'' +
              campaign.campaign_image +
              '\')'
            "
          ></div>
          <nuxt-link
            :to="'/donasi/' + campaign.slug"
            class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal"
          >
            <div class="mb-8">
              <div class="text-orange-button font-bold text-xl mb-1">
                {{ campaign.name }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                Rp
                {{ new Intl.NumberFormat().format(campaign.goal_amount) }}
                &middot;
                {{ ((campaign.current_amount / campaign.goal_amount) * 100).toFixed(2) }}%
              </p>
              <p class="text-gray-700 text-base">
                {{ campaign.short_description }}
              </p>
            </div>
            <div class="flex items-center">
              <button class="bg-orange-button hover:bg-green-button text-white py-2 px-4 rounded">
                Lihat Detail
              </button>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
