<template>
  <div class="sTournamentOverview--referee">
    <div class="wrap-body">
      <div class="wrap-body__item">
        <Button
          v-if="matchesReferee.length <= 0"
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
            <p>{{ comand_listLength > 0 ? gamesLength : 0 }}</p>
          </div>
          <div class="head-item">
            <p><span>Свободных команд</span></p>
            <p>{{ matchesReferee.length > 0 ? 0 : teamsForefereeLength }}</p>
          </div>
        </div>
      </div>

      <div class="wrap-body__item">
        <div>
          <Game
            v-for="(item, index) in matchesReferee[0] || dataGames"
            :key="item.id"
            :item="item"
            :index="index + 1"
          />
        </div>

        <!-- TODO: add addMethod -->
        <div class="game" v-if="added">
          <Button label="+ Добавить пару" outlined class="w-full btn-small" />
        </div>
        <div class="game" v-if="matchesReferee.length <= 0">
          <Button label="Опубликовать" class="w-full active-btn" @click="refereeStore.sendGames" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Game from './Game.vue';

  import { useTournamentPageStore } from '~/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { matchesReferee } = storeToRefs(tournamentPageStore);

  import { useRefereeStore } from '@/modules/tournaments/store/RefereeStore';
  const refereeStore = useRefereeStore();
  const { comand_listLength, gamesLength, teamsForefereeLength, dataGames } =
    storeToRefs(refereeStore);
</script>
