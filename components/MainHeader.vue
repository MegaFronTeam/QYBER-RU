<template>
  <section class="sMainHeader">
    <div class="container">
      <div class="sMainHeader__row row">
        <div class="col">
          <div class="sMainHeader__wrap bg-wrap">
            <NuxtImg src="/img/mainHeader-bg-1.jpg" class="picture-bg" alt="Bg" />
            <h1>Корпоративный и студенческий турнир <span>по киберспорту</span></h1>
            <p>
              Киберспортивные турниры в дисциплинах Counter Strike 2, Dota 2 и Спортивное
              программирование
            </p>
            <Button severity="primary" label="Кнопка если нужна" outlined />
            <NuxtLink class="sMainHeader__link" to="/about-project">
              <svg-icon name="arrow-down.svg" />
              Подробнее о проекте
            </NuxtLink>
          </div>
        </div>
        <div class="sMainHeader__col col">
          <div class="sMainHeader__tournament bg-wrap">
            <NuxtImg src="/img/mainHeader-bg-2.jpg" class="picture-bg" alt="bg" />
            <div class="sMainHeader__head">
              <h6>Ближайший турнир</h6>
              <NuxtLink class="sMainHeader__link ms-auto" to="/">
                Все
                <svg-icon name="chevron-right.svg" />
              </NuxtLink>
            </div>
            <h5 class="sMainHeader__tournament-title">
              <svg-icon name="dota.svg" />
              Кибер Атланты Осень 2024
            </h5>
            <div class="sMainHeader__tournament-row row">
              <Badge severity="secondary" class="p-badge-outline" value="8 команд" />
              <Badge severity="secondary" class="p-badge-outline" value="5x5" />
            </div>
            <div class="sMainHeader__tournament-foundation">
              <span>Призовой фонд</span>
              <h5>
                <svg-icon name="bank.svg" />
                250 000 ₽
              </h5>
            </div>
            <div class="sMainHeader__tournament-bottom-row row">
              <Button label="Регистрация" />
              <div class="sMainHeader__timer">
                <span>До начала:</span>
                1 д 15 ч 49 м
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
              <NuxtLink to="/news/64" class="sMainHeader__news-item">
                <div class="sMainHeader__img-wrap">
                  <div class="img-wrap-center">
                    <img src="/img/mainHeader-bg-3.jpg" alt="image" class="object-fit-js" />
                  </div>
                </div>
                <div>
                  <p>Начало турнира Кибер Атланты Осень 2024 по Dota 2</p>
                  <span>17:50, 30 января 2024</span>
                </div>
              </NuxtLink>
              <NuxtLink to="/news/66" class="sMainHeader__news-item">
                <div class="sMainHeader__img-wrap">
                  <div class="img-wrap-center">
                    <img src="/img/mainHeader-bg-4.jpg" alt="image" class="object-fit-js" />
                  </div>
                </div>
                <div>
                  <p>Результаты турниры Кибер Таланты Лето 2023 по CS2</p>
                  <span>17:50, 30 января 2024</span>
                </div>
              </NuxtLink>
              <NuxtLink to="/news/83" class="sMainHeader__news-item">
                <div class="sMainHeader__img-wrap">
                  <div class="img-wrap-center">
                    <img src="/img/mainHeader-bg-5.jpg" alt="image" class="object-fit-js" />
                  </div>
                </div>
                <div>
                  <p>Новая дисциплина киберспортивных игр на QYBER</p>
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

<script setup></script>
