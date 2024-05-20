<template>
  <Card class="sNewsCard">
    <template #header>
      <div class="sNewsCard__img-wrap">
        <div class="img-wrap-center">
          <Skeleton v-if="skeleton === true" height="100%" width="100%"></Skeleton>
          <img v-else class="object-fit-js" alt="user header" :src="newsData.thumbnail" />
        </div>
      </div>
    </template>
    <template #title>
      <Skeleton v-if="skeleton === true" height="24px" width="91px" class="mb-2"></Skeleton>
      <!-- <div v-else class="date">{{ formattedDate }}</div> -->
      <Skeleton v-if="skeleton === true" height="30px" width="160px"></Skeleton>
      <h5 v-else>{{ newsData.title }}</h5>
    </template>
    <template #content>
      <Skeleton v-if="skeleton === true" height="40px" width="100%"></Skeleton>
      <template v-else>
        <div class="row">
          <div class="col-6">
            <div class="card-panel-inner">Призовой фонд
              
            <strong>{{prize_fund }}</strong></div>
          </div>
          <div class="col-6">
            <div class="card-panel-inner"> Команды

              <strong>{{teamCount}}/{{maxTeamCount || 5}}</strong>
            </div>
          </div>
        </div>
        <div  v-html="newsData.excerpt"></div>
      </template>
    </template>
    <template #footer>
      <Skeleton v-if="skeleton === true" height="44px" width="100%"></Skeleton>
      <template v-else >
        <div class="data-start">
          <span>До начала:</span>
           <!-- TODO: add formatted date -->
          <!-- <strong>{{formattedDate || ' '}}</strong> -->
        </div>
        <NuxtLink to="/login"   v-if="!globalStore.isUserAuth"  >
          <Button label="Регистрация" class="w-full" />
        </NuxtLink>
        <Button  v-else @click="" label="Регистрация Модалка" class="w-full" />
    </template>
    </template>
  </Card>
</template>

<script setup>
import {useGlobalStore} from '~/store/globalStore';
const   globalStore = useGlobalStore();
const props = defineProps({
  newsData: {
    type: Object,
    required: false,
  },
  skeleton: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const { newsData } = props;

const  prize_fund = ref(newsData.prize_fund);
const teamCount = ref(newsData.teamCount);
// let img = 'https://primefaces.org/cdn/primevue/images/usercard.png';
// if (newsData.thumbnail) {
//   img = newsData.thumbnail;
// }

const date = new Date(newsData.date);
const formattedDate = date
  .toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  .slice(0, -2);
</script>

<style>
  .sNewsCard{
    text-align: center;
    .col-6{
      width: 50%;
      /* width: ; */
    }
  } 
  .card-panel-inner{
    border-radius: var(--S, 10px);
background: var(--bg-colorPrimary, #FFF);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 4rem;
    font-size: 12px;
    color: var(--text-colorTertiary, #9E9FA3);
    strong{
      color: var(--text-colorPrimary, #292D36);
      margin-top: .2rem;
      font-size: 1rem;
    }
  }
  .data-start{
    span{
      font-size: 14px;
      margin-bottom: 3px;
    }
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 12px;
  }
</style>