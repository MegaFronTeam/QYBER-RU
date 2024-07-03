<template>
  <div class="sTournamentOverview--participants">
    <div class="wrap-body">
      <div class="title-wrap" :style="{ '--countStages': stages_labelsLength }">
        <div
          class="title-wrap__place"
          v-for="stages_label in stages_labels"
          :key="stages_label.name"
          :style="{ '--countStage': stages_label.stageLength }"
        >
          <div class="title-span title-span_border">{{ stages_label.name }}</div>
          <div class="buttons">
            <!-- TODO: условие для блокировки кнопок -->
            <Button
              v-for="(item, index) in stages_label.items"
              :key="item.index"
              :class="active !== item.index ? 'secondary' : ''"
              @click="active = item.index"
              rounded
              :label="item.index"
              :outlined="active !== item.index"
              :disabled="!formattedMatches[item.index]"
              >{{ item.name }}<br />{{ item.date }}</Button
            >
          </div>
        </div>
      </div>
      <div class="template table--schedule">
        <TabView v-model:activeIndex="active">
          <TabPanel v-if="data" v-for="(item, index) in formattedMatches" :key="index">
            <DataTable
              :value="item"
              paginator
              :rows="tableRows"
              :rowsPerPageOptions="[5, 10, 20, 50]"
            >
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="registration"
                header="Дата"
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
                  <span class="rating">{{ slotProps.data.date }} </span>
                </template>
              </Column>
              <Column field="team1" header="">
                <template #body="slotProps">
                  <div class="table-wrap">
                    <span style="text-align: right"
                      >{{ slotProps.data.a.command.post_title }}
                      <br />
                      <small>
                        {{
                          slotProps.data.a.command.company ||
                          slotProps.data.a.command.educational_institution.abbreviation
                        }}
                      </small>
                    </span>
                    <img
                      v-if="slotProps.data.a.command.post_thumbnail !== false"
                      :src="slotProps.data.a.command.post_thumbnail"
                      alt="Avatar"
                    />
                  </div>
                </template>
              </Column>
              <Column field="score" header="Матч">
                <template #body="slotProps">
                  <span class="rating">
                    {{ slotProps.data.a.counter }}
                    :
                    {{ slotProps.data.b.counter }}
                  </span>
                </template>
              </Column>
              <Column field="team2" header="">
                <template #body="slotProps">
                  <div class="table-wrap" v-if="slotProps.data.b.command !== false">
                    <img
                      v-if="slotProps.data.b.command.post_thumbnail !== false"
                      :src="slotProps.data.b.command.post_thumbnail"
                      alt="Avatar"
                    />
                    <span
                      >{{ slotProps.data.b.command.post_title }}
                      <br />
                      <small>
                        {{
                          slotProps.data.b.command.post_title ||
                          slotProps.data.b.command.educational_institution.abbreviation
                        }}
                      </small>
                    </span>
                  </div>
                </template>
              </Column>
              <Column>
                <template #body="slotProps">
                  <!-- TODO: add link to detail -->
                  <NuxtLink disabled :to="path + '/' + slotProps.data.id">
                    <span class="p-badge"> Подробнее </span>
                  </NuxtLink>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
    <div class="wrap-footer" v-if="pag">
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
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { data, stages_labels, stages_labelsLength, formattedMatches, formattedMatchesLength } =
    storeToRefs(tournamentPageStore);

  import { useGlobalStore } from '~/store/globalStore';
  const globalStore = useGlobalStore();
  const { tableRows } = storeToRefs(globalStore);
  const router = useRouter();
  const path = router.currentRoute.value.path;

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);

  const active = ref(formattedMatchesLength);
</script>
