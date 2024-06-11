<template>
  <div>
    <h5 v-if="days > 0 && hours > 0 && minutes > 0">{{ days }} д {{ hours }} ч {{ minutes }} м</h5>
    <h5 v-else>Таймер истек</h5>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    targetDate: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    let timer = null;

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = props.targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(timer);
        return;
      }

      days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      hours.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
    };

    watch(
      () => props.targetDate,
      (newDate) => {
        if (timer) {
          clearInterval(timer);
        }
        updateCountdown();
        timer = setInterval(updateCountdown, 1000);
      },
      { immediate: true },
    );

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
};
</script>

<style scoped>
h5 {
  font-size: 1.5rem;
  text-align: center;
}
</style>
