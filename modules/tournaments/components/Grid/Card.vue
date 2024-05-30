<template>
  <div class="sGridCardItem">
    <div class="sGridCardItem__order">
      {{ +index + 1 }}
      <template v-if="referee">
        <svg-icon name="star.svg" />
      </template>
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
          <img :src="item.a.post_thumbnail" alt="Avatar" class="img" />
          <span>{{ item.a.command.post_name }}</span>
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
          <img :src="item.b.post_thumbnail" alt="Avatar" class="img" />
          <span>{{ item.b.command.post_name }}</span>
        </div>
        <div class="sGridCard__score">
          <!-- {{ product.b.team.success ? 1 : 0 }} -->
          {{ item.b.counter }}
        </div>
      </div>
      <Button v-if="referee">Присоединиться</Button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
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
  const products = ref([
    {
      team: {
        avatar: 'teamGrid-1.png',
        text: 'Команда 1',
        success: 1,
      },
    },
    {
      team: {
        avatar: 'teamGrid-2.png',
        text: 'Команда 2',
        success: 0,
      },
    },
  ]);

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
