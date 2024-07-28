<template>
  <RouterLink
    v-if="item.command.ID"
    :to="'/ratings/team-' + item.command.ID"
    class="sGridCard__wrap"
  >
    <img
      v-if="item.command.post_thumbnail && item.command.post_thumbnail !== false"
      :src="item.command.post_thumbnail"
      alt="Avatar"
      class="img"
    />
    <span>
      {{ item.command.post_title }}
      <small v-if="item.command.company || item.command.educational_institution">
        <br />
        {{ item.command.company || item.command.educational_institution.abbreviation }}
      </small>
    </span>
  </RouterLink>

  <div v-else class="sGridCard__wrap">{{ item.prevText }}</div>
</template>

<script setup>
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
</script>
