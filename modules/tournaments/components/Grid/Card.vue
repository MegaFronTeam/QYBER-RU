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
        <div v-if="isAccessRole">
          <MatchModal v-if="item.id && item.b.command !== false" :item="item" />
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
          <div class="sGridCard__wrap">
            <img
              v-if="item.a.command.post_thumbnail && item.a.command.post_thumbnail !== false"
              :src="item.a.command.post_thumbnail"
              alt="Avatar"
              class="img"
            />
            <span>
              {{ item.a.prevText || item.a.command.post_title }}
              <small v-if="item.a.command.company || item.a.command.educational_institution">
                <br />
                {{ item.a.command.company || item.a.command.educational_institution.abbreviation }}
              </small>
            </span>
          </div>
          <div class="sGridCard__score">
            <!-- {{ product.b.team.success ? 1 : 0 }} -->
            {{ item.a.counter }}
          </div>
        </div>

        <div
          class="sGridCard sGridCard__team"
          :class="
            item.status.value === 'done' && item.a.counter < item.b.counter ? 'team-success' : ''
          "
        >
          <!-- :class="{ 'team-success': product.team.success }" -->
          <div class="sGridCard__wrap">
            <img
              v-if="item.b.command.post_thumbnail && item.b.command.post_thumbnail !== false"
              :src="item.b.command.post_thumbnail"
              alt="Avatar"
              class="img"
            />
            <span
              >{{ item.b.prevText || item.b.command.post_title }}

              <small v-if="item.b.command.company || item.b.command.educational_institution">
                <br />
                {{ item.b.command.company || item.b.command.educational_institution.abbreviation }}
              </small>
            </span>
          </div>
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

const isAccessRole = computed(() => {
  if (globalStore.isUserAuth) {
    if (globalStore.userData.roles.includes('administrator')) return true;
    if (globalStore.userData.roles.includes('judge')) return true;

    return false;
  }
  return false;
});

const isPlayerInMatch = computed(() => {
  if (item.status.value === 'done') return false;

  if (item.a.members && item.a.members.find((member) => member.id === globalStore.userData.ID))
    return true;
  if (item.b.members && item.b.members.find((member) => member.id === globalStore.userData.ID))
    return true;

  return false;
});
</script>
