<template>
  <sFormPage v-bind="params">
    <form action="">
      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :disabled="timerInButton > 0 ? 'disabled' : false"
          class="w-100 btn-lg"
          @click="updateTimer()"
        >
          Отправить повторно через {{ timerInButton }} c
        </Button>
      </div>
    </form>
  </sFormPage>
</template>

<script setup>
  import { useAuthStore } from '@/store/authStore';
  import { ref } from 'vue'; // Add this import statement

  const authStore = useAuthStore();

  const params = {
    title: 'Письмо отправлено',
    text: 'Перейдите по ссылке из письма и установите новый пароль для аккаунта',
    bgImage: '/img/reg-bg-3.jpg',
  };

  const timerInButton = ref(60);

  const countDownTimer = () => {
    if (timerInButton.value > 0 && authStore.isSendEmail === true) {
      setTimeout(() => {
        timerInButton.value -= 1;
        localStorage.setItem('timerInButton', timerInButton.value);
        countDownTimer();
      }, 1000);
    }
  };

  const updateTimer = () => {
    timerInButton.value = 60;
    localStorage.setItem('timerInButton', timerInButton.value);
    authStore.setIsSendEmail();
  };

  // onMounted(() => {

  const storedTimer = localStorage.getItem('timerInButton');
  if (storedTimer) {
    timerInButton.value = parseInt(storedTimer);
    countDownTimer();
  } else {
    countDownTimer();
  }

  // });
</script>
