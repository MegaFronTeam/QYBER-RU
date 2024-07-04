<template>
  <div v-if="showInvites" class="container head-messages">
    <CabinetShowInvite />
    <CabinetAcredition />
  </div>
  <section class="sProfileHead">
    <div class="container">
      <div class="sProfileHead__wrap bg-wrap">
        <ShareBreadcrumbs />
        <img src="/img/profile-bg-1.jpg" class="picture-bg" />
        <div class="sProfileHead__row row">
          <div class="sProfileHead__img-wrap">
            <div class="img-wrap-center">
              <img v-if="img !== false && img" :src="img" alt="avatar" />
              <template v-else>
                <span v-if="avatarText" class="letter">{{ avatarText }}</span>
              </template>
            </div>
          </div>

          <div class="sProfileHead__content">
            <slot> </slot>
          </div>
          <!-- TODO: need info -->
          <div class="sProfileHead__games-played" v-if="info">
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
const props = defineProps({
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
  showInvites: {
    type: Boolean,
    required: false,
    default: true,
  },
});
const { img, avatarText } = toRefs(props);

const home = ref({
  label: 'Главная',
  route: '/',
});

// const imgRef = ref(img);
// const avatarTextRef = ref(avatarText);
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
