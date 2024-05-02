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
                  <img alt="logo" src="/img/logo-1.svg" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" src="/img/logo-3.png" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" src="/img/logo-4.svg" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" src="/img/logo-1.svg" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" src="/img/logo-3.png" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__img-wrap">
                <div class="img-wrap-center">
                  <img alt="logo" src="/img/logo-4.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sAboutBody__tournaments">
          <div class="row">
            <div class="col">
              <div class="sAboutBody__tournaments-item bg-wrap">
                <NuxtImg src="/img/sAboutBody-bg-1.jpg" class="picture-bg" alt="bg" />
                <NuxtImg src="/img/atlants.svg" class="sAboutBody__logo" alt="logo" />
                <h2 class="h1">Кибер Атланты</h2>
                <p>
                  Вы готовы испытать свои навыки, погрузиться в мир виртуального соперничества и
                  завоевать славу среди лучших игроков любительского уровня, студентов и
                  корпоративных сотрудников? Тогда этот кибертурнир создан специально для вас!npm
                </p>
                <Button severity="secondary" class="btn-lg">
                  Смотреть турниры
                  <svg-icon name="chevron-right.svg" />
                </Button>
              </div>
            </div>
            <div class="col">
              <div class="sAboutBody__tournaments-item bg-wrap">
                <NuxtImg src="/img/sAboutBody-bg-2.jpg" class="picture-bg" alt="bg" />
                <NuxtImg src="/img/talents.svg" class="sAboutBody__logo" alt="logo" />
                <h2 class="h1">Кибер Таланты</h2>
                <p>
                  Турнир Qyber.ru - это уникальное соревнование, объединяющее игроков различных
                  профессиональных и образовательных сфер, чтобы они могли помериться силами в
                  виртуальном мире разнообразных игровых дисциплин.
                </p>
                <Button severity="danger" class="btn-lg">
                  Смотреть турниры
                  <svg-icon name="chevron-right.svg" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
