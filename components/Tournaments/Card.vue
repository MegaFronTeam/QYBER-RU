<template>
  <Card class="sNewsCard">
    <template #header>
      <div class="sNewsCard__img-wrap">
        <NuxtLink :to="'/tournaments/' + newsData.id">
          <div class="img-wrap-center">
            <Skeleton v-if="skeleton === true" height="100%" width="100%"></Skeleton>
            <img v-else class="object-fit-js" alt="user header" :src="newsData.post_thumbnail" />
          </div>
        </NuxtLink>
      </div>
    </template>
    <template #title>
      <Skeleton v-if="skeleton === true" height="24px" width="91px" class="mb-2"></Skeleton>
      <div v-else-if="newsData.teamCount" class="date">{{ newsData.teamCount }} команд</div>
      <Skeleton v-if="skeleton === true" height="24px" width="91px" class="mb-2"></Skeleton>
      <div v-else-if="newsData.format" class="date">{{ newsData.format }}</div>
      <Skeleton v-if="skeleton === true" height="30px" width="160px"></Skeleton>
      <h5 v-else>{{ newsData.title }}</h5>
    </template>
    <template #content>
      <Skeleton v-if="skeleton === true" height="40px" width="100%"></Skeleton>
      <template v-else>
        <div class="row">
          <div class="col-6">
            <div class="card-panel-inner">
              Призовой фонд

              <strong>{{ newsData.prize_fund }}</strong>
            </div>
          </div>
          <div class="col-6">
            <div class="card-panel-inner">
              Команды

              <strong>{{ newsData.teamLength || 0 }}</strong>
            </div>
          </div>
        </div>
        <div v-html="newsData.excerpt"></div>
      </template>
    </template>
    <template #footer>
      <Skeleton v-if="skeleton === true" height="44px" width="100%"></Skeleton>
      <template v-else>
        <div class="data-start">
          <span>До начала:</span>
          <!-- TODO: Потмо поменять пропс на то что дается с сервера -->
          <CountDown :targetDate="date" />
        </div>
        <NuxtLink :to="'/tournaments/' + newsData.id">
          <Button label="Регистрация на турнир" class="w-full" />
        </NuxtLink>
      </template>
    </template>
  </Card>
</template>

<script setup>
import { useGlobalStore } from '~/store/globalStore';
import { useTournamentStore } from '@/store/TournamentStore';
const tournamentStore = useTournamentStore();
const globalStore = useGlobalStore();

import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
const tournamentStorePage = useTournamentPageStore();

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

const { newsData } = toRefs(props);

const prize_fund = ref(newsData.prize_fund);
const teamCount = ref(newsData.teamCount);

const date = ref(new Date('2024-07-07T00:00:00'));
// console.log(newsData.value);
</script>

<style>
.sNewsCard {
  text-align: center;
  .col-6 {
    width: 50%;
    /* width: ; */
  }
}
.card-panel-inner {
  border-radius: var(--S, 10px);
  background: var(--bg-colorPrimary, #fff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 4rem;
  font-size: 12px;
  color: var(--text-colorTertiary, #9e9fa3);
  strong {
    color: var(--text-colorPrimary, #292d36);
    margin-top: 0.2rem;
    font-size: 1rem;
  }
}
.data-start {
  span {
    font-size: 14px;
    margin-bottom: 3px;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 12px;
}
</style>
