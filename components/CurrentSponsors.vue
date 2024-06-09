<template>
  <Dialog class="sponsors-modal" v-model:visible="visible" modal>
    <div class="sCurrentSponsors__img-wrap">
      <div class="img-wrap-center">
        <img
          v-if="sponsorsStore.sponsors[sponsorsStore.ids].post_thumbnail"
          :src="sponsorsStore.sponsors[sponsorsStore.ids].post_thumbnail"
        />
      </div>
    </div>
    <div class="sCurrentSponsors__content">
      <h3>{{ sponsorsStore.sponsors[sponsorsStore.ids].title.rendered }}</h3>
      <Badge
        v-if="sponsorsStore.sponsors[sponsorsStore.ids].sponsor_type !== undefined"
        severity="secondary"
        :value="
          sponsorsStore.sponsors[sponsorsStore.ids].sponsor_type === null
            ? 'Спонсор'
            : sponsorsStore.sponsors[sponsorsStore.ids].sponsor_type
        "
      />
      <div v-html="sponsorsStore.sponsors[sponsorsStore.ids].content.rendered"></div>
    </div>
  </Dialog>
  <section class="sCurrentSponsors">
    <div class="container">
      <h2 class="h1">Наши действующие спонсоры</h2>
      <div class="sCurrentSponsors__row row">
        <div
          v-for="(item, index) in sponsorsStore.sponsors"
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
              <Badge
                v-if="item.sponsor_type !== undefined"
                severity="secondary"
                :value="item.sponsor_type === null ? 'Спонсор' : item.sponsor_type"
              />
              <div v-html="item.excerpt.rendered"></div>
              <Button @click="(visible = true), (sponsorsStore.ids = index)" label="Подробнее" />
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
const visible = ref(false);

sponsorsStore.getSponsors();
</script>
