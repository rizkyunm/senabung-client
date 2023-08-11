<script setup lang="ts">
import { ICampaign } from 'types/campaign'
import { useRuntimeConfig } from '#app'
// const { session } = await useSession()

const { $api } = useNuxtApp()

// console.log(session.value)

let campaigns = ref<ICampaign[]>([])
const apiBase = useRuntimeConfig().public.apiBase

onMounted(async () => {
  try {
    campaigns.value = await $api.campaign.list()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="landing-page">
    <section class="hero-section py-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
      <div class="flex flex-col items-center text-center py-5 lg:py-20 px-5">
        <h1
          class="md:text-4xl text-lg text-orange-button font-bold md:mb-5 mb-2"
        >
          Bersama Senabung Indonesia <br />
          Kurangi Kelaparan dan Tebarkan Kebahagiaan
        </h1>
        <p
          class="text-white text-sm md:text-xl font-medium md:mb-8 mb-2 italic"
        >
          "Dan sedekah akan memadamkan kesalahan <br />
          sebagaimana air memadamkan api.”
        </p>
        <button
          class="block bg-orange-button hover:bg-orange-hover text-white font-semibold px-12 py-3 md:text-xl text-md rounded-full"
          @click="$router.push({ path: '/' })"
        >
          Mulai Berdonasi
        </button>
      </div>
    </section>
    <section v-if="campaigns" class="container mx-auto pt-20">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <h2 class="text-3xl font-bold text-teal-800 mb-8">
            Mari bantu ringankan beban mereka.
          </h2>
        </div>
        <div class="w-auto mt-5">
          <a class="text-teal-800 hover:underline text-md font-semibold" href=""
            >Lihat Semua</a
          >
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-3">
        <div
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="card border border-gray-500 rounded-20"
        >
          <figure class="h-56">
            <img :src="apiBase + '/' + campaign.image_url" alt="" class="" />
          </figure>
          <div class="card-body">
            <h4 class="card-title text-3xl font-medium text-gray-900 mt-5">
              {{ campaign.name }}
            </h4>
            <p class="text-md font-light text-gray-900 h-12">
              {{ campaign.short_description }}
            </p>
            <div class="relative pt-4 progress-bar">
              <div
                class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 h-3 rounded-lg"
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
            <div class="flex progress-info">
              <div>
                {{ (campaign.current_amount / campaign.goal_amount) * 100 }}%
              </div>
              <div class="ml-auto font-semibold">
                Rp {{ new Intl.NumberFormat().format(campaign.goal_amount) }}
              </div>
            </div>
            <button
              class="text-center mt-5 button-cta block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-2 text-lg rounded-full"
              @click="
                $router.push({
                  name: 'donasi-id',
                  params: { id: campaign.id },
                })
              "
            >
              Donasi Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <section class="container mx-auto py-24">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <h2 class="text-3xl text-teal-800 font-bold mb-8">
            Lihat do'a dari para <br />
            orang baik
          </h2>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="w-2/12 flex justify-center items-start">
          <img src="/testimonial-line.svg" alt="" />
        </div>
        <div class="w-8/12 mt-16">
          <h2 class="text-3xl text-gray-900 font-light">
            “Bismillah semoga Allah selalu memudahkan segala urusan kami, semoga
            kami selalu berada dalam lindungan-Nya.”
          </h2>
          <div class="testimonial-info mt-8">
            <div class="name text-xl font-semibold">Hamba Allah</div>
            <div class="title text-xl font-light text-gray-400">Depok</div>
          </div>
          <div class="testimonial-icon mt-10">
            <img
              src="/testimonial-1-icon.png"
              alt=""
              class="w-20 mr-5 inline-block testimonial-user rounded-full"
            />
            <img
              src="/testimonial-2-icon.png"
              alt=""
              class="w-20 mr-5 inline-block testimonial-user rounded-full"
            />
            <img
              src="/testimonial-3-icon.png"
              alt=""
              class="w-20 mr-5 inline-block testimonial-user active rounded-full"
            />
          </div>
        </div>
        <div class="w-2/12"></div>
      </div>
    </section>
    <Footer />
  </div>
</template>
