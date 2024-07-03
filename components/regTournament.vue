<template>
  <div>
    <Dialog class="p-dialog-big" v-model:visible="showRegModal" modal header="Выбрать команду">
      <div class="inner-wrapper">
        <div
          class="game-item__card"
          v-for="item in ifReferee === true ? teamsForeferee : teamsForReg"
        >
          <div class="">
            <NuxtLink
              :to="'/cabinet/team/' + item.ID"
              class="table-wrap game-item__title"
              @click="
                showRegModal = false;
                currentID = null;
              "
            >
              <img
                v-if="item.thumbnail_url"
                :src="`${item.thumbnail_url}`"
                alt="Avatar"
                class="team-img"
              />

              <img
                v-if="item.post_thumbnail"
                :src="`${item.post_thumbnail}`"
                alt="Avatar"
                class="team-img"
              />

              <span>{{ item.post_title || item.team.post_title }} </span>
              <span v-if="ratingData" class="p-badge"> 3 453 </span>
            </NuxtLink>
            <div class="table-wrap" v-if="ratingData">
              <div class="game-item__list">
                <div class="">678 матчей</div>
                <div class="success">479 (72%)</div>
                <div class="secondary">0</div>
                <div class="danger">112 (28%)</div>
              </div>
            </div>
          </div>
          <div class="btn-wrapper">
            <template v-if="!hideForm">
              <template v-if="ifReferee !== true">
                <Button
                  v-if="!item.Approved"
                  @click="tournamentStore.regToTournament(item.ID, currentID)"
                  style="width: 100px"
                  label="Выбрать"
                  class="btn-sm"
                />
                <Badge v-else size="large" severity="success">
                  <svg-icon name="check-white.svg" />
                </Badge>
              </template>
              <Button
                v-else
                @click="
                  refereeStore.addTeamToCouple(item.team.ID);
                  showRegModal = false;
                "
                style="width: 100px"
                label="Выбрать"
                class="btn-sm"
              />
            </template>
            <Skeleton v-else height="40px" width="100px" style="margin-left: auto"></Skeleton>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
// TODO: переделать на Store
const visibleShow = ref(false);
import { useTournamentStore } from '@/store/TournamentStore';
const tournamentStore = useTournamentStore();
import { useTeamStore } from '@/store/TeamStore';
const teamsStore = useTeamStore();
const { showRegModal, hideForm, currentID } = storeToRefs(tournamentStore);

import { useGlobalStore } from '@/store/globalStore';
const globalStore = useGlobalStore();

import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
const tournamentPageStore = useTournamentPageStore();
const { ifReferee, teamsForReg } = storeToRefs(tournamentPageStore);

import { useRefereeStore } from '@/modules/tournaments/store/RefereeStore';
const refereeStore = useRefereeStore();
const { teamsForeferee } = storeToRefs(refereeStore);

const route = useRoute();

const isRefereePage = ref(route.path.includes('/referee'));

console.log('isRefereePage', isRefereePage.value);

onMounted(async () => {
  if (ifReferee === true) {
    await tournamentPageStore.checkTeamForReferee();
  }
});

const props = defineProps({
  profileData: {
    type: Object,
    required: false,
  },
});
</script>

<style lang="scss">
.modal-tournament-reg {
  width: 100%;
  max-width: 837px;
}
/* Your component's styles here */
</style>
