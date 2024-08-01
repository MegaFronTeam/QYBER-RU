<template>
  <section class="sWelcome">
    <div class="container">
      <div class="sWelcome__wrap">
        <div class="sWelcome__img-wrap">
          <div class="img-wrap-center">
            <img src="/img/sContent-img-1.jpg" class="object-fit-js" alt="Img" />
          </div>
        </div>
        <div>
          <h2 class="h1">Добро пожаловать на турнир QYBER.ru</h2>
          <div v-html="welcomeBannerContent"></div>
          <!-- <Button label="Подробнее о турнире" class="btn-lg" /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGlobalStore } from '~/store/globalStore';

const globalStore = useGlobalStore();
const { welcomeBannerContent } = storeToRefs(globalStore);
</script>
