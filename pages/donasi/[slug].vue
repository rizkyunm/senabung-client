<script setup lang="ts">
import { ICampaignDetail } from '~/types/campaign'
import { ICreateTransactionInput, ITransaction } from '~/types/transaction'
import { definePageMeta } from '#imports'
import { convertTimestamp } from '~/utils/date'

const router = useRouter()
const { token, status } = useAuth()
const { $api } = useNuxtApp()
const route = useRoute()
const params = route.params.slug
const slug: string | string[] = params

definePageMeta({ auth: false })

let campaign = reactive<ICampaignDetail>({
  id: 0,
  name: '',
  short_description: '',
  description: '',
  campaign_image: '',
  goal_amount: 0,
  current_amount: 0,
  slug: '',
  user_id: 0,
  backer_count: 0,
  status: '',
})

let transactions = reactive<ITransaction[]>([])

let transaction = reactive<ICreateTransactionInput>({
  amount: 0,
  campaign_id: 0,
})

let distributions = ref([])

const fund = async () => {
  try {
    if (status.value !== 'authenticated') {
      router.push('/masuk?callbackUrl=' + route.path)
    } else {
      let response = await $api.transaction.create(token.value, transaction)
      window.location.href = response.payment_url
    }
  } catch (error) {
    errorResponse.value =
      'Transaksi belum dapat proses silahkan coba lagi nanti'
    showModal.value = true
  }
}

const errorResponse = ref<string>('')
const showModal = ref(false)
const tab = ref('detail')
const isLoaded = ref<boolean>(false)

const setTab = (value: string) => {
  tab.value = value
}

onMounted(async () => {
  try {
    campaign = await $api.campaign.getBySlug(
      typeof slug === 'string' ? slug : slug[0]
    )
    transactions = await $api.transaction.listByCampaign(campaign.id)
    transaction.campaign_id = campaign.id
    isLoaded.value = true
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="project-header">
    <section class="project-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section v-if="!isLoaded" class="container mx-auto relative">
      <div class="flex justify-center mt-3 h-96">
        <span class="loading loading-spinner loading-lg align-middle"></span>
      </div>
    </section>
    <section v-if="isLoaded" class="container mx-auto relative mt-10">
      <div class="flex justify-center mt-3">
        <div class="w-3/4 lg:w-1/2 mx-auto">
          <div
            class="w-1/2 bg-white mb-3 border border-gray-400 rounded-20 inline-block"
          >
            <figure class="">
              <img
                :src="campaign.campaign_image"
                alt=""
                class="rounded-20 w-full"
              />
            </figure>
          </div>
          <div class="w-1/2 inline-block pl-5 align-top">
            <h2 class="text-2xl text-orange-button mb-10 font-medium">
              {{ campaign.name }}
            </h2>
            <div class="font-light text-md text-gray-400">
              <div class="w-1/2 inline-block">Terkumpul</div>
              <div class="w-1/2 inline-block text-right">Tersalurkan</div>
            </div>
            <div class="text-md text-green-button">
              <div class="w-1/2 inline-block">Rp 20,000,000</div>
              <div class="w-1/2 inline-block text-right">Rp 10,000,000</div>
            </div>
            <div class="font-light mt-8 text-md text-gray-400">
              <div class="w-1/2 inline-block">
                {{ campaign.backer_count }} donatur
              </div>
              <div class="w-1/2 inline-block text-right"></div>
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
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-progress progress-striped"
                ></div>
              </div>
            </div>
            <div class="flex progress-info mb-6 text-green-button">
              <div class="text-xl">
                {{
                  (
                    (campaign.current_amount / campaign.goal_amount) *
                    100
                  ).toFixed(2)
                }}%
              </div>
              <div class="ml-auto font-semibold text-xl">
                Rp {{ new Intl.NumberFormat().format(campaign.goal_amount) }}
              </div>
            </div>
            <input
              v-model.number="transaction.amount"
              type="number"
              class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              placeholder="Jumlah dalam rupiah (min Rp 10.000)"
              @keyup.enter="fund"
            />
            <button
              :disabled="transaction.amount < 10000"
              class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full disabled:bg-orange-disable"
              @click="fund"
            >
              Donasi Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
    <section v-if="isLoaded" class="container mx-auto relative pt-8 mb-20">
      <div class="flex justify-center">
        <div class="w-3/4 lg:w-1/2">
          <div class="tabs">
            <a
              :class="tab === 'detail' ? 'tab-active' : ''"
              class="tab tab-bordered"
              @click="setTab('detail')"
              >Detail</a
            >
            <a
              :class="tab === 'masuk' ? 'tab-active' : ''"
              class="tab tab-bordered"
              @click="setTab('masuk')"
              >Donasi Masuk</a
            >
            <a
              :class="tab === 'keluar' ? 'tab-active' : ''"
              class="tab tab-bordered"
              @click="setTab('keluar')"
              >Donasi Tersalurkan</a
            >
          </div>
          <hr class="mb-5" />
          <div v-if="tab === 'detail'">
            <p class="font-bold text-xl mb-5">
              {{ campaign.short_description }}
            </p>
            <p class="font-light text-justify text-xl mb-5">
              {{ campaign.description }}
            </p>
          </div>
          <div v-if="tab === 'masuk'">
            <div v-if="transactions.length === 0">
              <h2 class="h-56">Belum ada transaksi</h2>
            </div>
            <div v-if="transactions.length > 0">
              <div v-for="transaction in transactions" :key="transaction.id">
                <hr class="my-3" />
                <h2>{{ transaction.donor }}</h2>
                <p class="text-green-progress">
                  Rp {{ new Intl.NumberFormat().format(transaction.amount) }}
                </p>
                <p class="text-light text-xs">
                  {{ convertTimestamp(transaction.created_at) }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="tab === 'keluar'">
            <div v-if="distributions.length === 0">
              <h2 class="h-56">Belum ada donasi tersalurkan</h2>
            </div>
            <div v-if="distributions.length > 0">
              <div>Ada donasi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
  <Teleport to="body">
    <ErrorModal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 class="font-bold text-lg text-rose-800">Transaksi Gagal !</h3>
      </template>
      <template #body>
        <p class="py-4">{{ errorResponse }}</p>
      </template>
    </ErrorModal>
  </Teleport>
</template>
