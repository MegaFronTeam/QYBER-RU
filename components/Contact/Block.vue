<template>
  <section class="sContactBlock">
    <div class="container">
      <div class="sContactBlock__row row">
        <div class="sContactBlock__col col">
          <div class="template">
            <div class="sContactBlock__profile">
              <div class="sContactBlock__img-wrap">
                <div class="img-wrap-center">
                  <img
                    v-if="globalStore.contacts.image"
                    :src="globalStore.contacts.image.sizes.medium"
                    class="object-fit-js"
                    alt="avatar"
                  />
                </div>
              </div>
              <div class="sContactBlock__profile-info">
                <span>Организатор турнира</span>
                <h2 class="h1">{{ globalStore.contacts.name }}</h2>
              </div>
              <div v-if="globalStore.contacts.phone" class="sContactBlock__profile-info">
                <span>Позвонить</span>
                <a
                  class="h4"
                  href="tel:globalStore.contacts.phone"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ globalStore.contacts.phone }}</a
                >
              </div>
              <div class="sContactBlock__profile-info">
                <span>Электронная почта</span>
                <a
                  class="h4"
                  :href="'mailto:' + globalStore.contacts.email"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ globalStore.contacts.email }}</a
                >
              </div>
              <div class="sContactBlock__profile-info">
                <a :href="globalStore.contacts.discord[0].link" target="_blank">
                  <Button class="sContactBlock__btn btn-lg p-button-gray">
                    <svg-icon name="discord.svg" />
                    Написать в Discord
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="sContactBlock__col col">
          <div class="template">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();
</script>
