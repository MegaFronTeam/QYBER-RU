<template>
  <section class="sAboutBody">
    <div class="container">
      <div class="sAboutBody__wrap">
        <div class="sAboutBody__members">
          <h2 class="h1">Наши участники</h2>
          <div class="row">
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-1.svg" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-3.png" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-4.svg" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-5.png" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-6.png" />
                </div>
              </div>
            </div>
            <!-- <d> -->

            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-8.png" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" loading="lazy" src="/img/logo-9.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sAboutBody__tournaments">
          <div class="row">
            <div class="col">
              <div class="sAboutBody__tournaments-item bg-wrap">
                <img src="/img/sAboutBody-bg-1.jpg" class="picture-bg" alt="bg" />
                <img src="/img/atlants.svg" class="sAboutBody__logo" alt="logo" />
                <h2 class="h1">Кибер Атланты</h2>
                <p>
                  Вы готовы испытать свои навыки, погрузиться в мир виртуального соперничества и
                  завоевать славу среди лучших игроков любительского уровня, студентов и
                  корпоративных сотрудников? Тогда этот кибертурнир создан специально для вас!npm
                </p>
                <!--
                  TODO: сделать страницу со всеми турнирами
                -->
                <NuxtLink to="/tournaments">
                  <Button severity="secondary" class="btn-lg">
                    Смотреть турниры
                    <svg-icon name="chevron-right.svg" />
                  </Button>
                </NuxtLink>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__tournaments-item bg-wrap">
                <img src="/img/sAboutBody-bg-2.jpg" class="picture-bg" alt="bg" />
                <img src="/img/talents.svg" class="sAboutBody__logo" alt="logo" />
                <h2 class="h1">Кибер Таланты</h2>
                <p>
                  Турнир Qyber.ru - это уникальное соревнование, объединяющее игроков различных
                  профессиональных и образовательных сфер, чтобы они могли помериться силами в
                  виртуальном мире разнообразных игровых дисциплин.
                </p>
                <!--
                  TODO: сделать страницу со всеми турнирами
                -->
                <NuxtLink to="/tournaments">
                  <Button severity="danger" class="btn-lg">
                    Смотреть турниры
                    <svg-icon name="chevron-right.svg" />
                  </Button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
