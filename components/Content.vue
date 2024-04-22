<template>
  <section class="sContent">
    <div class="container">
      <div class="sContent__wrap">
        <h2>Начались отборочные игры на турнир Кибер Атланты Осень 2024 по Dota 2</h2>
        <p>
          Учитывая ключевые сценарии поведения, выбранный нами инновационный путь играет
          определяющее значение для существующих финансовых и административных условий. А ещё
          предприниматели в сети интернет описаны максимально подробно. Приятно, граждане,
          наблюдать, как действия представителей оппозиции, инициированные исключительно
          синтетически, функционально разнесены на независимые элементы.
        </p>
        <h3>Какие команды могут участвовать в турнире?</h3>
        <ul>
          <li>Команды корпоративных компаний</li>
          <li>Команды студентов ВУЗов</li>
        </ul>
        <NuxtImg src="img/sContent-img-1.jpg" alt="content img" />
        <h4>Процесс записи на турнир</h4>
        <ol>
          <li>Команды корпоративных компаний</li>
          <li>Команды студентов ВУЗов</li>
        </ol>
      </div>
      <DataTable :value="products">
        <Column
          :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
          field="nickname"
          header="Никнейм"
          sortable
        >
          <template #sorticon="slotProps">
            <svg
              :class="slotProps.sortOrder == 1 ? `sorted` : ``"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                fill="#9E9FA3"
              />
            </svg>
          </template>
          <template #body="slotProps">
            <div class="table-wrap">
              <NuxtImg :src="`/img/${slotProps.data.nickname.avatar}`" src="Avatar" />
              <span>{{ slotProps.data.nickname.text }}</span>
            </div>
          </template>
        </Column>
        <Column class="name" field="name" header="Имя" sortable>
          <template #sorticon="slotProps">
            <svg
              :class="slotProps.sortOrder == 1 ? 'sorted' : ''"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                fill="#9E9FA3"
              />
            </svg>
          </template>
        </Column>
        <Column field="btn" header="">
          <template #body="slotProps">
            <Button label="Пригласить в команду" />
          </template>
        </Column>
      </DataTable>
      <Contacts class="contacts--center" />
      <div class="banner bg-wrap">
        <NuxtImg class="picture-bg" src="img/banner-bg-1.jpg" />
        <div class="h5">Подпишитесь на актуальные новости в нашем Telelgram-канале</div>
        <p>Узнавайте о новостях одним из первых</p>
        <Button>
          <svg-icon name="telegram" />
          Перейти в Telegram
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  {
    nickname: {
      avatar: 'avatar-img-1.jpg',
      text: 'Piracle',
    },
    name: 'Иван Петров',
  },
  {
    nickname: {
      avatar: 'avatar-img-2.jpg',
      text: 'MuroMy',
    },
    name: 'Иван Петров',
  },
  {
    nickname: {
      avatar: 'avatar-img-2.jpg',
      text: 'yolo322',
    },
    name: 'Константин Завгородний',
  },
]);
</script>
