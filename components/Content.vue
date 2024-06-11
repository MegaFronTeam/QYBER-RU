<template>
  <section class="sContent">
    <div ref="parent" class="container">
      <h2 class="sContent__title">{{ title }}</h2>
      <div class="sContent__wrap" v-html="content"></div>
      <Contacts class="contacts--center" />
      <div
        ref="stickyElement"
        :style="`--stickyTop: ${stickyTop}`"
        class="banner bg-wrap sticky-element"
      >
        <img class="picture-bg" src="/img/banner-bg-1.jpg" alt="bg" />
        <div class="h5">Подпишитесь на актуальные новости в наших соцсетях</div>
        <p>Все новости турнира, интервью, видео, аналитика и общение – в Telergram и Discord</p>
        <a :href="globalStore.contacts.socials[0].link" style="margin-top: auto" target="_blank">
          <Button>
            <svg-icon name="telegram" />
            Перейти в Telegram
          </Button>
        </a>

        <a :href="globalStore.contacts.discord[0].link" style="margin-top: auto" target="_blank">
          <Button>
            <svg-icon :name="globalStore.contacts.discord[0].social.value" />
            Перейти в {{ globalStore.contacts.discord[0].social.label }}
          </Button>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue';
  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  });
</script>

<script>
  export default {
    data() {
      return {
        parent: null,
        stickyElement: null,
        stickyTop: null,
      };
    },
    mounted() {
      this.parent = this.$refs.parent;
      this.stickyElement = this.$refs.stickyElement;
      this.calculateStickyTop();
      window.addEventListener('scroll', this.calculateStickyTop);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.calculateStickyTop);
    },
    methods: {
      calculateStickyTop() {
        const parentRect = this.parent.getBoundingClientRect();
        const stickyElementRect = this.stickyElement.getBoundingClientRect();

        this.stickyTop = `${parentRect.top}px`;

        if (stickyElementRect.top > 0) {
          this.stickyTop = `-${Math.abs(parentRect.top)}px`;
        } else {
          this.stickyTop = null;
        }
      },
    },
  };
</script>
