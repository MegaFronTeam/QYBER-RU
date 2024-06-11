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
            <div class="h1">Подпишитесь на актуальные новости в наших соцсетях</div>
            <p>Все новости турнира, интервью, видео, аналитика и общение – в Telergram и Discord</p>
            <div style="margin-top: auto; display: flex; flex-wrap: wrap; gap: 10px">
              <a :href="contacts.socials[0].link" target="_blank">
                <Button severity="secondary">
                  <span> Перейти в Telegram</span>
                  <svg-icon name="telegram.svg" />
                </Button>
              </a>
              <a :href="globalStore.contacts.discord[0].link" target="_blank">
                <Button severity="secondary">
                  Перейти в {{ globalStore.contacts.discord[0].social.label }}
                  <svg-icon :name="globalStore.contacts.discord[0].social.value" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';

  const globalStore = useGlobalStore();
  const { contacts } = storeToRefs(globalStore);
</script>
