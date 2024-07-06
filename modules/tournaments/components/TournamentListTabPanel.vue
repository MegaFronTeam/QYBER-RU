<template>
  <DataTable v-if="checked" :value="tournamentsList" removableSort>
    <Column field="tournament" header="Турнир">
      <template #body="slotProps">
        <NuxtLink class="text-link" :to="'/tournaments/' + slotProps.data.id">
          {{ slotProps.data.title }}
        </NuxtLink>
      </template>
    </Column>
    <Column field="tournament" header="Начало">
      <template #body="slotProps">
        {{ slotProps.data.date }}
      </template>
    </Column>
    <Column field="tournament" header="Лига">
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
    <Column field="tournament" header="Дисциплина">
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
    <Column field="tournament" header="Участники">
      <template #body="slotProps">
        {{ slotProps.data.teamLength || 0 }}
      </template>
    </Column>
    <Column field="tournament" header="Фонд">
      <template #body="slotProps">
        <div class="d-flex align-items-center">
          {{ slotProps.data.prize_fund }}
          <NuxtLink class="ms-auto" :to="'/tournaments/' + slotProps.data.id">
            <Button class="btn-sm" label="Регистрация" />
          </NuxtLink>
        </div>
      </template>
    </Column>
  </DataTable>
  <div v-else class="sMainContentBlock__row row">
    <TournamentsCard v-for="item of tournamentsList" :newsData="item" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    checked: boolean;
    tournamentsList: [];
  }>();
</script>
