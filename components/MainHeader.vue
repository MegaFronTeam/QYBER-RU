<template>
  <section class="sMainHeader">
    <div class="container">
      <div class="sMainHeader__row row">
        <div class="col">
          <ShareFancybox
            :options="{
              width: '100%',
              autoStart: true,
            }"
          >
            <div class="sMainHeader__wrap bg-wrap">
              <a
                data-fancybox="gallery"
                :href="'https://www.youtube.com/watch?v=' + BroadCast"
                class="iframe-wrap"
                v-if="BroadCast"
              >
                <iframe
                  width="560"
                  height="315"
                  :src="
                    'https://www.youtube.com/embed/' +
                    BroadCast +
                    '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0'
                  "
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </a>
              <img v-else src="/img/mainHeader-bg-1.jpg" class="picture-bg" alt="Bg" />

              <h1>Корпоративный и студенческий турнир <span>по киберспорту</span></h1>
              <p>
                Киберспортивные турниры в дисциплинах Counter Strike 2, Dota 2 и Спортивное
                программирование
              </p>
              <!-- TODO: узнать что здесь выводить сейчас  Т к турнир сразу на несколько игр- у нас это не предусмотрено -->
              <!-- <Button severity="primary" label="Кнопка если нужна" outlined /> -->
              <NuxtLink class="sMainHeader__link" to="/about-project">
                <svg-icon name="arrow-down.svg" />
                Подробнее о проекте
              </NuxtLink>
            </div>
          </ShareFancybox>
        </div>
        <div class="sMainHeader__col col">
          <div class="sMainHeader__tournament bg-wrap">
            <img :src="lastOne.post_thumbnail" class="picture-bg" alt="bg" />

            <div class="sMainHeader__head">
              <h6>Ближайший турнир</h6>
              <!-- TODO:  сделать страницу со всеми турнирами -->
              <NuxtLink class="sMainHeader__link ms-auto" :to="'/tournaments'">
                Все
                <svg-icon name="chevron-right.svg" />
              </NuxtLink>
            </div>
            <h5 class="sMainHeader__tournament-title">
              <!-- <svg-icon name="dota.svg" /> -->
              {{ lastOne.title }}
            </h5>
            <div class="sMainHeader__tournament-row row">
              <Badge
                severity="secondary"
                class="p-badge-outline"
                :value="lastOne.teamCount + ' команд'"
              />
              <Badge severity="secondary" class="p-badge-outline" :value="lastOne.format" />
            </div>
            <div class="sMainHeader__tournament-foundation">
              <span>Призовой фонд</span>
              <h5>
                <svg-icon name="bank.svg" />
                {{ lastOne.prize_fund }}
              </h5>
            </div>
            <div class="sMainHeader__tournament-bottom-row row">
              <NuxtLink class="sMainHeader__link" :to="'/tournaments/' + lastOne.id">
                <Button label="К турниру" class="w-full" />
              </NuxtLink>
              <div class="sMainHeader__timer">
                <!-- <span>До начала:</span> -->

                <!-- TODO: сделать таймер- для каждой карточки свой -->
                <!-- 1 д 15 ч 49 м -->
              </div>
            </div>
          </div>
          <div class="sMainHeader__news">
            <div class="sMainHeader__head">
              <h6>Последние новости</h6>
              <NuxtLink class="sMainHeader__link ms-auto" to="/news">
                Все
                <svg-icon name="chevron-right.svg" />
              </NuxtLink>
            </div>
            <div class="sMainHeader__news-wrap">
              <NuxtLink
                v-for="item of dataLast"
                :to="`/news/${item.id}`"
                class="sMainHeader__news-item"
              >
                <div class="sMainHeader__img-wrap">
                  <div class="img-wrap-center">
                    <img :src="item.post_thumbnail" alt="image" class="object-fit-js" />
                  </div>
                </div>
                <div>
                  <p>{{ item.title.rendered }}</p>
                  <span>{{ item.date }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useNewsStore } from '@/store/NewsStore';
  const newsStore = useNewsStore();
  const { dataLast } = storeToRefs(newsStore);

  import { useTournamentStore } from '@/store/TournamentStore';
  const tournamentStore = useTournamentStore();
  const { lastOne, BroadCast } = storeToRefs(tournamentStore);

  tournamentStore.getBroadCast();
</script>

<style>
  .fancybox__slide.has-youtube .fancybox__content {
    width: 80% !important;
    height: auto !important;
    /* height: 100% !important; */
  }
</style>
