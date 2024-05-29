<template>
  <section class="sCurrentSponsors">
    <div class="container">
      <h2 class="h1">Наши действующие спонсоры</h2>
      <div class="sCurrentSponsors__row row">
        <div
          v-for="item in sponsorsStore.sponsors"
          :key="item.id"
          class="sCurrentSponsors__col col"
        >
          <div class="sCurrentSponsors__card">
            <div class="sCurrentSponsors__img-wrap">
              <div class="img-wrap-center">
                <img v-if="item.post_thumbnail" :src="item.post_thumbnail" />
              </div>
            </div>
            <div class="sCurrentSponsors__content">
              <h3>{{ item.title.rendered }}</h3>
              <Badge severity="secondary" value="Генеральный спонсор турнира" />
              <div v-html="item.content.rendered"></div>
              <Button label="Подробнее" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSponsorsStore } from '@/store/sponsorsStore';

const sponsorsStore = useSponsorsStore();

sponsorsStore.getSponsors();
</script>
