<template>
  <DataTable
    :value="teamData.tournaments ? teamData.tournaments : raitingTeamStore.teamData.tournaments"
  >
    <Column :header-props="{ 'sort-icon': 'mdi-triangle-down' }" field="post_title" header="Турнир">
      <template #body="slotProps">
        <div class="table-wrap">
          <NuxtLink :to="'/tournaments/' + slotProps.data.ID">
            <span> {{ slotProps.data.post_title }} </span>
          </NuxtLink>
        </div>
      </template>
    </Column>

    <Column :header-props="{ 'sort-icon': 'mdi-triangle-down' }" field="post_title" header="Начало">
      <template #body="slotProps">
        <div class="table-wrap">{{ slotProps.data.date }}</div>
      </template>
    </Column>

    <Column :header-props="{ 'sort-icon': 'mdi-triangle-down' }" field="post_title" header="Формат">
      <template #body="slotProps"> {{ slotProps.data.format }} </template>
    </Column>

    <Column
      :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
      field="post_title"
      header="Участники"
    >
      <template #body="slotProps"> {{ slotProps.data.count_commands }} команд </template>
    </Column>

    <Column :header-props="{ 'sort-icon': 'mdi-triangle-down' }" field="post_title" header="Фонд">
      <template #body="slotProps"> {{ slotProps.data.prize_fund }} </template>
    </Column>

    <!-- <Column
      style="width: 33%"
      :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
      field="name"
      header="Имя"
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
        <span class="small-text">
          {{ slotProps.data.name }}
        </span>
      </template>
    </Column>
    <Column
      style="width: 33%"
      :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
      field="role"
      header="Роль"
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
        <span class="small-text">
          {{ slotProps.data.role }}
        </span>
      </template>
    </Column> -->
  </DataTable>
</template>

<script setup>
import { useRaitingTeamStore } from '~/modules/ratings/store/RaitingTeamStore';
import { useTeamStore } from '~/store/TeamStore';

const teamStore = useTeamStore();
const raitingTeamStore = useRaitingTeamStore();

const { teamData } = storeToRefs(teamStore);
</script>

<style></style>
