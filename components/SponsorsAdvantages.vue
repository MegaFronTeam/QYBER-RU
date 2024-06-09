<template>
  <section class="sSponsorsAdvantages">
    <div class="container">
      <h2 class="h1">Преимущества сотрудничества с нами</h2>
      <div class="sSponsorsAdvantages__wrap">
        <div v-for="block in sponsorsStore.sponsorsPage.bloks" class="sSponsorsAdvantages__card">
          <div class="sSponsorsAdvantages__img-wrap">
            <div class="img-wrap-center">
              <img
                v-if="block.image"
                :src="block.image.url"
                class="object-fit-js"
                :alt="block.alt"
              />
            </div>
          </div>
          <div class="sSponsorsAdvantages__content">
            <svg-icon name="users-medical.svg" />
            <h4>{{ block.heading }}</h4>
            <div v-html="block.text"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSponsorsStore } from '@/store/sponsorsStore';

const sponsorsStore = useSponsorsStore();
</script>
