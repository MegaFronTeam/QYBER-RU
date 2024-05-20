<template>
  <section class="sSubscribe">
    <div class="container">
      <div class="sSubscribe__wrap bg-wrap">
        <NuxtImg src="/img/sSubscribe-bg-1.jpg" alt="bg" class="picture-bg sSubscribe__bg" />
        <div class="row">
          <div class="sSubscribe__col-img col">
            <NuxtImg src="/img/sSubscribe-img-1.png" alt="Juggernaut" class="sSubscribe__img" />
          </div>
          <div class="sSubscribe__col col">
            <div class="h1">Подпишитесь на актуальные новости в нашем телеграм канале</div>
            <p>
              Все новости турнира, интервью, видео, аналитика и общение – все это в телеграм канале
            </p>
            <a href="https://t.me/manager_qyber" target="_blank">
              <Button severity="secondary">
                <span> Перейти в Telegram</span>
                <svg-icon name="telegram.svg" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
