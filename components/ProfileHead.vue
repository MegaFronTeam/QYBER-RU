<template>
  <div class="container head-messages">
      <!-- <ShowInvite /> -->
      <Acredition  />
    </div>
  <section class="sProfileHead">
    <div class="container">
      <div class="sProfileHead__wrap bg-wrap">
        <Breadcrumb :home="home" :model="items">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate">
                <span class="">{{ item.label }}</span>
              </a>
            </router-link>
            <span v-else> {{ item.label }} </span>
          </template>
          <template #separator="">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.1689 11.8281L6.32739 10.9848L9.48171 7.82812L6.32739 4.67142L7.17129 3.82812L10.3232 6.98483C10.5468 7.20851 10.6724 7.51184 10.6724 7.82812C10.6724 8.14441 10.5468 8.44774 10.3232 8.67142L7.1689 11.8281Z"
                fill="currentColor"
              />
            </svg>
          </template>
        </Breadcrumb>
        <NuxtImg src="/img/profile-bg-1.jpg" class="picture-bg" />
        <div class="sProfileHead__row row">
          <div class="sProfileHead__img-wrap">
            <div class="img-wrap-center">
              <img v-if="img" :ref="img" :src="img" alt="avatar" />
              <template v-else>
              <span  v-if="avatarText" class="letter">{{ avatarText }}</span>
              </template>
            </div> 
          </div>
          <div class="sProfileHead__content">
            <slot> </slot>
          </div>
          <div class="sProfileHead__games-played">
            <div class="sProfileHead__games-title">Сыграно {{ allMaches }} матчей</div>
            <div class="sProfileHead__games-info">
              <div class="sProfileHead__games-text">
                <span>Победы</span>
                {{ winMaches }} ({{ Math.floor((winMaches / allMaches) * 100).toFixed(0) }}%)
              </div>
              <div class="sProfileHead__games-text">
                <span>Ничья</span>
                {{ drawMaches }} ({{ ((drawMaches / allMaches) * 100).toFixed(0) }}%)
              </div>
              <div class="sProfileHead__games-text">
                <span>Поражения</span>
                {{ looseMaches }} ({{ Math.ceil((looseMaches / allMaches) * 100).toFixed(0) }}%)
              </div>
            </div>
            <div class="sProfileHead__games-progressbar" :style="progressBarStyle"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
  breadcrumbArr: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  profileData: {
    type: Object,
    required: '',
  },
  avatarText: {
    type: String,
    required: '',
  },
  isOnline: {
    type: String,
    required: '',
  },
});
const { breadcrumbArr, img, profileData, avatarText } = toRefs(props);

const home = ref({
  label: 'Главная',
  route: '/',
});

// const imgRef = ref(img);
// const avatarTextRef = ref(avatarText);
const items = ref(breadcrumbArr);
const allMaches = 678;
const winMaches = 479;
const looseMaches = 112;
const drawMaches = 87;
const progressBarStyle = computed(() => {
  const winRate = (winMaches / allMaches) * 100;
  const loseRate = (looseMaches / allMaches) * 100;
  return {
    '--winRate': `${winRate}`,
    '--loseRate': `${loseRate}`,
  };
});

</script>
