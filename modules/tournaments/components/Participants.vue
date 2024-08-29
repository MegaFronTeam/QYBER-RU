<template>
  <div class="sTournamentOverview--participants">
    <div class="wrap-body">
      <div class="template">
        <DataTable
          :value="data.comand_list"
          paginator
          :rows="tableRows"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <Column
            :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
            field="team"
            header="Команда"
          >
            <template #body="slotProps">
              <NuxtLink
                class="mx-max-contnet d-block"
                :to="`/ratings/team-${slotProps.data.team.ID}`"
              >
                <div class="table-wrap">
                  <img
                    v-if="slotProps.data.post_thumbnail"
                    :src="slotProps.data.post_thumbnail"
                    alt="Avatar"
                  />
                  <span v-html="slotProps.data.team.post_title"></span>
                </div>
              </NuxtLink>
            </template>
          </Column>
          <Column
            :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
            field="organisation"
            header="Организация"
          >
            <template #body="slotProps">
              <span class="rating">
                {{
                  slotProps.data.company_name || slotProps.data.educational_institution_abbreviation
                }}
              </span>
            </template>
          </Column>
          <Column
            :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
            field="registration"
            header="Дата регистрации"
          >
            <template #body="slotProps">
              <span class="rating">{{ slotProps.data.created_at }} </span>
            </template>
          </Column>
          <!-- TODO: Tournament need data -->
          <Column>
            <template #body="slotProps">
              <span class="p-badge" v-if="slotProps.data.exit.length === 0">
                Зарегистрирована
              </span>
              <!-- Выбыла в 1/32  -->
              <span class="p-badge p-badge-gray" v-else>
                Выбыла в раунде {{ slotProps.data.exit }}</span
              >
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="wrap-footer" v-if="Paginator">
      <div class="template template--footer">
        <Paginator
          :rows="rowsPerPage[0]"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="rowsPerPage"
          :pageLinkSize="4"
        >
          <template #start="slotProps">
            Показано от {{ slotProps.state.page * slotProps.state.rows + 1 }} до
            {{
              slotProps.state.first + slotProps.state.rows > totalRecords
                ? totalRecords
                : slotProps.state.first + slotProps.state.rows
            }}
            из {{ totalRecords }} данных
          </template>
        </Paginator>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useGlobalStore } from '~/store/globalStore';
  const globalStore = useGlobalStore();
  const { tableRows } = storeToRefs(globalStore);

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { data } = storeToRefs(tournamentPageStore);

  const active = ref(1);

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
