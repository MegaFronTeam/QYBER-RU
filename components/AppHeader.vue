<template>
  <header class="header">
    <div class="container">
      <div class="header__row">
        <NuxtLink to="/" class="header__logo">
          <svg-icon class="icons-logo" :name="logo" />
        </NuxtLink>
        <Menubar :model="items">
          <template #item="{ item, props }">
            <NuxtLink v-slot="{ href, navigate }" :to="item.href" custom>
              <a
                :href="href"
                v-bind="props.action"
                :class="item.href == '/' + $route.name ? 'active' : ''"
                @click="navigate"
              >
                <svg-icon :name="`${item.icon}.svg`" />
                <span>{{ item.label }}</span>
              </a>
            </NuxtLink>
          </template>
        </Menubar>
        <InputSwitch @click="toggleTheme" v-model="checked" />
        <Button class="header__btn" variant="primary">
          <svg-icon name="rocket-lunch.svg" />
          <span class="p-button-label">Авторизация</span>
        </Button>
      </div>
    </div>
  </header>
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
      logo: '',
      items: ref([
        {
          label: 'О проекте',
          icon: 'rocket-lunch',
          href: '/about-project',
        },
        {
          label: 'Турниры',
          icon: 'star',
          href: '/tournaments',
        },
        {
          label: 'Рейтинги',
          icon: 'cup',
          href: '/rating',
        },
        {
          label: 'Спонсоры',
          icon: 'handshake',
          href: '/sponsor',
        },
        {
          label: 'Новости',
          icon: 'newspaper',
          href: '/news',
        },
        {
          label: 'Контакты',
          icon: 'user',
          href: '/contacts',
        },
      ]),
    };
  },
  mounted() {
    if (this.currentTheme == 'dark-theme') {
      document.documentElement.setAttribute('data-theme', 'dark-theme');
      this.checked = true;
      this.logo = 'logo-dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light-theme');
      this.checked = false;
      this.logo = 'logo';
    }
  },
  methods: {
    toggleTheme() {
      if (this.currentTheme === 'dark-theme') {
        document.documentElement.setAttribute('data-theme', 'light-theme');
        this.$locally.setItem('theme', 'light-theme');
        this.currentTheme = 'light-theme';
        this.logo = 'logo';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark-theme');
        this.$locally.setItem('theme', 'dark-theme');
        this.currentTheme = 'dark-theme';
        this.logo = 'logo-dark';
      }
    },
  },
};
</script>
