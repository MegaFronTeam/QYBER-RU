<template>
  <section class="sMainHeader">
    <div class="container">
      <div class="sMainHeader__row row">
        <div class="col">
          <div class="sMainHeader__wrap bg-wrap">
            <img src="/img/mainHeader-bg-1.jpg" class="picture-bg" alt="Bg" />
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
        </div>
        <div class="sMainHeader__col col">
          <div class="sMainHeader__tournament bg-wrap">
            <img src="/img/mainHeader-bg-2.jpg" class="picture-bg" alt="bg" />
            <div class="sMainHeader__head">
              <h6>Ближайший турнир</h6>
              <!-- TODO:  сделать страницу со всеми турнирами -->
              <NuxtLink class="sMainHeader__link ms-auto" to="#tournaments">
                Все
                <svg-icon name="chevron-right.svg" />
              </NuxtLink>
            </div>
            <h5 class="sMainHeader__tournament-title">
              <!-- <svg-icon name="dota.svg" /> -->
              QYBER Атланты Лето 2024
            </h5>
            <div class="sMainHeader__tournament-row row">
              <Badge severity="secondary" class="p-badge-outline" value="8 команд" />
              <Badge severity="secondary" class="p-badge-outline" value="5x5" />
            </div>
            <div class="sMainHeader__tournament-foundation">
              <span>Призовой фонд</span>
              <h5>
                <svg-icon name="bank.svg" />
                200 000 ₽
              </h5>
            </div>
            <div class="sMainHeader__tournament-bottom-row row">
              <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
                <Button label="Регистрация" class="w-full" />
              </NuxtLink>
              <Button
                v-else
                @click="
                  tournamentStore.showRegModal = true;
                  tournamentStore.currentID = '836';
                "
                label="Регистрация "
                class="w-full"
              />
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
            <div v-if="pending === false" class="sMainHeader__news-wrap">
              <NuxtLink
                v-for="item of data.slice(0, 3)"
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
                  <span>17:50, 30 января 2024</span>
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
  import { useTournamentStore } from '@/store/TournamentStore';
  const tournamentStore = useTournamentStore();
  import { useTeamStore } from '@/store/TeamStore';
  const teamsStore = useTeamStore();

  import { useGlobalStore } from '~/store/globalStore';
  const globalStore = useGlobalStore();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, pending } = await useLazyFetch(`${BASE_URL}/wp/v2/posts`);
</script>
