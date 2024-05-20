<template>
  <ul class="contacts">
    <li v-if="linkArr.youtube">
      <a href="https://www.youtube.com/@RUqyber" class="contacts__link" target="_blank">
        <svg-icon name="youtube" />
      </a>
    </li>
    <li v-if="linkArr.twitch">
      <a href="https://www.twitch.tv/" class="contacts__link" target="_blank">
        <svg-icon name="twitch" />
      </a>
    </li>
    <li v-if="linkArr.vk">
      <a href="https://vk.com/ruqyber" class="contacts__link" target="_blank">
        <svg-icon name="vk.svg" />
      </a>
    </li>
    <li v-if="linkArr.telegram">
      <a href="https://t.me/RUqyber" class="contacts__link" target="_blank">
        <svg-icon name="telegram" />
      </a>
    </li>
    <li v-if="linkArr.discord">
      <a href="http://discord.gg/qyber" class="contacts__link" target="_blank">
        <svg-icon name="discord" />
      </a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  linkArr: {
    type: Object,
    default: {
      youtube: false,
      twitch: false,
      vk: false,
      telegram: false,
      discord: false,
    },
  },
});

const { linkArr } = props;
</script>
