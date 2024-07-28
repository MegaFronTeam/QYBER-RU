<template>
  <div class="sGridCardItem">
    <!-- <div
    class="sGridCardItem"
    :class="{
      'sGridCardItem--empty': item.b.command === false,
    }"
  > -->
    <!-- <template v-if="item.b.command !== false"> -->
    <template v-if="item.a">
      <div class="sGridCardItem__order">
        {{ item.indexPlus }}
        <div v-if="isReferee && item.id && item.b.command !== false">
          <MatchModal :item="item" />
        </div>
      </div>
      <div class="teams-group">
        <div
          class="sGridCard sGridCard__team"
          :class="
            item.status.value === 'done' && item.a.counter > item.b.counter ? 'team-success' : ''
          "
        >
          <!-- :class="{ 'team-success': product.team.success }" -->
          <CardITeam :item="item.a" />
          <div class="sGridCard__score">
            {{ item.a.counter }}
            <!-- {{ product.b.team.success ? 1 : 0 }} -->
          </div>
        </div>

        <div
          class="sGridCard sGridCard__team"
          :class="
            item.status.value === 'done' && item.a.counter < item.b.counter ? 'team-success' : ''
          "
        >
          <!-- :class="{ 'team-success': product.team.success }" -->
          <CardITeam :item="item.b" />
          <div class="sGridCard__score">
            <!-- {{ product.b.team.success ? 1 : 0 }} -->

            {{ item.b.counter }}
          </div>
        </div>
        <!-- <Button v-if="isPlayerInMatch">Присоединиться</Button> -->
        <JoinGameModal v-if="isPlayerInMatch" btnLabel="Присоединиться" :id="item.id" />
      </div>
    </template>
  </div>
</template>

<script setup>
  import JoinGameModal from '../Match/JoinGameModal.vue';
  import MatchModal from './MatchModal.vue';
  import { useGlobalStore } from '~/store/globalStore';
  import CardITeam from './CardITeam.vue';

  const props = defineProps({
    item: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });

  const { item } = props;

  const globalStore = useGlobalStore();
  const { isReferee, isUserAuth } = storeToRefs(globalStore);

  // const isAccessRole = computed(() => {
  //   if (globalStore.isUserAuth) {
  //     if (globalStore.userData.roles.includes('administrator')) return true;
  //     if (globalStore.userData.roles.includes('judge')) return true;

  //     return false;
  //   }
  //   return false;
  // });

  const isPlayerInMatch = computed(() => {
    if (item.status.value === 'done') return false;

    if (item.a.members && item.a.members.find((member) => member.id === globalStore.userData.ID))
      return true;
    if (item.b.members && item.b.members.find((member) => member.id === globalStore.userData.ID))
      return true;

    return false;
  });
</script>
