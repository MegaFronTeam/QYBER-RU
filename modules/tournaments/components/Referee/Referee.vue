<template>
  <div class="sTournamentOverview--referee">
    <div class="wrap-body">
      <div class="wrap-body__item">
        <Button
          @click="refereeStore.setRandomGames"
          outlined
          label="Провести жеребьевку"
          class="w-full active-btn"
        />
      </div>
      <div class="wrap-body__item">
        <div class="sTournamentOverview__head sTournamentOverview__head--small">
          <div class="head-item">
            <p><span>Всего команд</span></p>
            <p>{{ comand_listLength }}</p>
          </div>
          <div class="head-item">
            <p><span>Всего игр</span></p>
            <p>{{ gamesLength }}</p>
          </div>
          <div class="head-item">
            <p><span>Свободных команд</span></p>
            <p>{{ teamsForefereeLength }}</p>
          </div>
        </div>
      </div>

      <div class="wrap-body__item">
        <div>
          <Game v-for="(item, index) in dataGames" :key="item.id" :item="item" :index="index + 1" />
        </div>

        <!-- <div class="game">
          <div class="game__title h6">
            Игра 1
            <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
          </div>
          <div class="game__card">
            <div class="table-wrap">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" />
              <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game__list">
                <div class="">Сыграно 678 матчей</div>
                <div class="success">Победы 479 (72%)</div>
                <div class="secondary">Ничья 0</div>
                <div class="danger">Поражения 112 (28%)</div>
              </div>
              <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
            </div>
          </div>
          <div class="game__card">
            <div class="table-wrap">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" />
              <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game__list">
                <div class="">Сыграно 678 матчей</div>
                <div class="success">Победы 479 (72%)</div>
                <div class="secondary">Ничья 0</div>
                <div class="danger">Поражения 112 (28%)</div>
              </div>
              <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
            </div>
          </div>
        </div>
        <div class="game">
          <div class="game__title h6">
            Игра 2
            <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
          </div>
          <div class="game__card">
            <div class="table-wrap">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" />
              <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game__list">
                <div class="">Сыграно 678 матчей</div>
                <div class="success">Победы 479 (72%)</div>
                <div class="secondary">Ничья 0</div>
                <div class="danger">Поражения 112 (28%)</div>
              </div>
              <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
            </div>
          </div>
          <Button outlined label="+ Выбрать команду" class="w-full active-btn dashed secondary" />
        </div>
        <div class="game">
          <div class="game__title h6">
            Игра 3
            <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
          </div>
          <div class="game__card">
            <div class="table-wrap">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" />
              <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game__list">
                <div class="">Сыграно 678 матчей</div>
                <div class="success">Победы 479 (72%)</div>
                <div class="secondary">Ничья 0</div>
                <div class="danger">Поражения 112 (28%)</div>
              </div>
              <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
            </div>
          </div>
          <Button outlined label="+ Выбрать команду" class="w-full active-btn dashed danger" />
        </div>
        <div class="game">
          <div class="game__title h6">
            Игра 4
            <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
          </div>
          <div class="game__card">
            <div class="table-wrap">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" />
              <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game__list">
                <div class="">Сыграно 678 матчей</div>
                <div class="success">Победы 479 (72%)</div>
                <div class="secondary">Ничья 0</div>
                <div class="danger">Поражения 112 (28%)</div>
              </div>
              <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
            </div>
          </div>
          <Button outlined label="+ Выбрать команду" class="w-full active-btn purple" />
        </div>
        <div class="game">
          <div class="game__title h6">
            Игра 5
            <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
          </div>
          <Button
            outlined
            label="+ Выбрать команду"
            class="btn-add-team w-full active-btn dashed secondary"
          />
          <Button
            outlined
            label="+ Выбрать команду"
            class="btn-add-team w-full active-btn dashed secondary"
          />
        </div>
        -->
        <!-- TODO: add addMethod -->
        <div class="game" v-if="added">
          <Button label="+ Добавить пару" outlined class="w-full btn-small" />
        </div>
        <div class="game">
          <Button label="Опубликовать" class="w-full active-btn" @click="refereeStore.sendGames" />
        </div>
      </div>
    </div>
    <div class="wrap-footer d-lg-none">
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
  import Game from './Game.vue';

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const {} = storeToRefs(tournamentPageStore);

  import { useRefereeStore } from '@/modules/tournaments/store/RefereeStore';
  const refereeStore = useRefereeStore();
  const { comand_listLength, gamesLength, teamsForefereeLength, dataGames } =
    storeToRefs(refereeStore);

  const active = ref(1);
  const products = ref([
    {
      team: {
        avatar: 'team-img-1.png',
        text: 'Team Rogue',
      },
      organisation: {
        label: 'ООО Датекс Софт',
      },
      registration: 'вт, 30 января в 15:34',
    },
    {
      team: {
        avatar: 'team-img-2.svg',
        text: 'INTZ Genesis',
      },
      organisation: {
        label: 'ООО Датекс Софт',
      },
      registration: 'вт, 30 января в 15:34',
    },
    {
      team: {
        avatar: 'team-img-1.png',
        text: 'Team Rogue',
      },
      organisation: {
        label: 'ООО Датекс Софт',
      },
      registration: 'вт, 30 января в 15:34',
    },
  ]);

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
