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
        <MatchModal v-if="item.id && item.b.command !== false" :item="item" />
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
        <Button v-if="referee">Присоединиться</Button>
      </div>
    </template>
  </div>
</template>

<script setup>
  import MatchModal from './MatchModal.vue';

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
</script>
