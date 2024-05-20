<template>
  <div>

    <Dialog class="modal-tournament-reg" v-model:visible="tournamentStore.showRegModal" modal header="Выбрать команду">
      <div class="form-wrap">
        <transition name="fade">
          <form @submit.prevent="" >
            <div style="color: var(--body-color)" class="h4 text-center mb-3"  v-if="tournamentStore.hideForm">    Команда успешно зарегистрирована    <br> <br>  </div>
            <DataTable :value="teamsStore.myTeams">
              <Column
                
                field="nickname"
                header="Название команды" 
              >
                <template #body="slotProps">
                  <div class="table-wrap">
                    <NuxtImg
                      v-if="slotProps.data.thumbnail_url"
                      :src="`${slotProps.data.thumbnail_url}`"
                      alt="Avatar"
                    />
                    <span>{{ slotProps.data.post_title }}</span>
                  </div>
                </template>
              </Column>
              <Column
                class="text-right"
                field="role" 
              >
                <template #body="slotProps"> 
                  <div>
                  </div>
                 <!-- TODO: убрать если  уже зарегистрирован ловить со стора -->
                      <Button 
                      @click=" tournamentStore.regToTournament(slotProps.data.ID, tournamentStore.currentID);"
                      style="width: 100px;"
                      label="Выбрать"
                      class="btn-sm"
                      /> 
                      <!-- disabled="false" -->
                </template>
              </Column>
            </DataTable>
          </form>
        </transition>
      </div>
    </Dialog> 
  </div>
</template>

<script setup>
// TODO: переделать на Store
const visibleShow = ref(false); 
import {useTournamentStore} from '@/store/TournamentStore';
const  tournamentStore = useTournamentStore(); 
import { useTeamStore } from '@/store/TeamStore';
import { useGlobalStore } from '~/store/globalStore';
const teamsStore = useTeamStore();

onMounted(async () => {
  await teamsStore.fetchMyTeams();

  console.log(teamsStore.myTeams);
});


const props = defineProps({
  profileData: {
    type: Object,
    required: false,
  },
});
 

</script>

<style lang="scss" >
.modal-tournament-reg{
  width: 100%;
  max-width: 837px;
}
/* Your component's styles here */
</style>
