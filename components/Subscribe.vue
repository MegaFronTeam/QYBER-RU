<template>
  <section class="sSubscribe">
    <div class="container">
      <div class="sSubscribe__wrap bg-wrap">
        <img src="/img/sSubscribe-bg-1.jpg" alt="bg" class="picture-bg sSubscribe__bg" />
        <div class="row">
          <div class="sSubscribe__col-img col">
            <img src="/img/sSubscribe-img-1.png" alt="Juggernaut" class="sSubscribe__img" />
          </div>
          <div class="sSubscribe__col col">
            <div class="h1">Подпишитесь на актуальные новости в нашем телеграм канале</div>
            <p>
              Все новости турнира, интервью, видео, аналитика и общение – все это в телеграм канале
            </p>
            <a :href="globalStore.contacts.socials[0].link" target="_blank">
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

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();
</script>
