<template>
  <section class="sTournamentList">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="clickOnTab(0)" :class="active === 0 ? 'active' : ''">
            Предстоящие
          </Button>
          <Button @click="clickOnTab(1)" :class="active === 1 ? 'active' : ''">
            Текущие
            <!-- <Badge v-if="currentTournaments.length > 0" :value="currentTournaments.length" /> -->
          </Button>
          <Button @click="clickOnTab(2)" :class="active === 2 ? 'active' : ''">
            Завершенные
          </Button>
        </div>
      </div>
      <div class="template">
        <TabView v-model:activeIndex="active">
          <TabPanel>
            <DataTable :value="JSonData">
              <Column field="place" header="Место" sortable>
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
                <template #body="slotProps">{{ slotProps.data.place }} </template>
              </Column>
              <Column field="post_title" header="Название команды" sortable>
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
                    <img
                      v-if="slotProps.data.thumbnail_url"
                      :src="`${slotProps.data.thumbnail_url}`"
                      alt="Avatar"
                    />
                    <span>{{ slotProps.data.post_title }}</span>
                  </div>
                </template>
              </Column>
              <Column field="discipline.name" header="Дисциплина">
                <template #body="slotProps">
                  <span
                    v-if="slotProps.data.discipline"
                    v-for="discipline in slotProps.data.discipline"
                    class="p-badge p-badge-gray"
                  >
                    {{ discipline.name }}
                  </span>
                </template>
              </Column>
              <Column field="league" header="Лига">
                <template #body="slotProps">
                  <Badge
                    v-if="slotProps.data.leagues"
                    v-for="league in slotProps.data.leagues"
                    :severity="league.name == 'QYBER Атланты' ? 'secondary' : 'danger'"
                    class="p-badge-outline"
                    :value="league.name"
                  />
                </template>
              </Column>
              <Column field="rating" header="Рейтинг" sortable>
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
                <template #body="slotProps">{{ slotProps.data.rating }}</template>
              </Column>
            </DataTable>
          </TabPanel>
          <TabPanel>2</TabPanel>
          <TabPanel>3</TabPanel>
        </TabView>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const active = ref(route.query.tab ? Number(route.query.tab) : 1);

const clickOnTab = (id) => {
  active.value = id;
  router.push({
    query: { ...route.query, tab: id },
  });
};

const JSonData = [
  {
    place: 1,
    thumbnail_url: 'test',
    post_title: 'Title',
    discipline: [
      {
        name: 'a',
      },
    ],
    leagues: [
      {
        name: 'QYBER Атланты',
      },
    ],
    rating: 1000,
  },
  {
    place: 2,
    thumbnail_url: 'test2',
    post_title: 'Title2',
    discipline: [
      {
        name: 'b',
      },
    ],
    leagues: [
      {
        name: 'QYBER Таланты',
      },
    ],
    rating: 2000,
  },
];
</script>
