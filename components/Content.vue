<template>
  <section class="sContent">
    <div ref="parent" class="container">
      <h2 class="sContent__title">{{ title }}</h2>
      <div class="sContent__wrap" v-html="content"></div>
      <DataTable :value="products">
        <Column
          :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
          field="nickname"
          header="Никнейм"
          sortable
        >
          <template #sorticon="slotProps">
            <svg
              :class="slotProps.sortOrder == 1 ? `sorted` : ``"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                fill="#9E9FA3"
              />
            </svg>
          </template>
          <template #body="slotProps">
            <div class="table-wrap">
              <NuxtImg :src="`/img/${slotProps.data.nickname.avatar}`" src="Avatar" />
              <span>{{ slotProps.data.nickname.text }}</span>
            </div>
          </template>
        </Column>
        <Column class="name" field="name" header="Имя" sortable>
          <template #sorticon="slotProps">
            <svg
              :class="slotProps.sortOrder == 1 ? 'sorted' : ''"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                fill="#9E9FA3"
              />
            </svg>
          </template>
        </Column>
        <Column field="btn" header="">
          <template #body="slotProps">
            <Button label="Пригласить в команду" />
          </template>
        </Column>
      </DataTable>
      <Contacts class="contacts--center" />
      <div
        ref="stickyElement"
        :style="`--stickyTop: ${stickyTop}`"
        class="banner bg-wrap sticky-element"
      >
        <NuxtImg class="picture-bg" src="img/banner-bg-1.jpg" alt="bg" />
        <div class="h5">Подпишитесь на актуальные новости в нашем Telelgram-канале</div>
        <p>Узнавайте о новостях одним из первых</p>
        <Button>
          <svg-icon name="telegram" />
          Перейти в Telegram
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

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

const products = ref([
  {
    nickname: {
      avatar: 'avatar-img-1.jpg',
      text: 'Piracle',
    },
    name: 'Иван Петров',
  },
  {
    nickname: {
      avatar: 'avatar-img-2.jpg',
      text: 'MuroMy',
    },
    name: 'Иван Петров',
  },
  {
    nickname: {
      avatar: 'avatar-img-2.jpg',
      text: 'yolo322',
    },
    name: 'Константин Завгородний',
  },
]);
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
