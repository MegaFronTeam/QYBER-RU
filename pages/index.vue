<template>
  <Button label="Авторизация" severity="primary" />
  <InputSwitch @click="toggleTheme" v-model="checked" />
  <h1>Index page</h1>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, distinctio?</p>
</template>

<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      $locally: useNuxtApp(),
      checked: ref(false),
      currentTheme: this.$locally.getItem('theme'),
      newTheme: this.currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme',
    };
  },
  mounted() {
    if (this.currentTheme == 'dark-theme') {
      document.documentElement.setAttribute('data-theme', 'dark-theme');
      this.checked = true;
    } else {
      document.documentElement.setAttribute('data-theme', 'light-theme');
      this.checked = false;
    }
  },
  methods: {
    toggleTheme() {
      if (this.currentTheme === 'dark-theme') {
        document.documentElement.setAttribute('data-theme', 'light-theme');
        this.$locally.setItem('theme', 'light-theme');
        this.currentTheme = 'light-theme';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark-theme');
        this.$locally.setItem('theme', 'dark-theme');
        this.currentTheme = 'dark-theme';
      }
    },
  },
};
</script>
