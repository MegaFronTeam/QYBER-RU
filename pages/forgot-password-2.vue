<template>
  <sFormPage v-bind="params"> 
    <form action="">
      <div class="mb-4 mt-4">
        <Button type="submit" disabled  class="w-100 btn-lg" >
          Отправить повторно через  {{timerInButton}} c 
        </Button>
      </div>
    </form>
  </sFormPage>
</template>

<script setup> 

const params = {
  title: 'Письмо отправлено',
  text: 'Перейдите по ссылке из письма и установите новый пароль для аккаунта',
  bgImage: '/img/reg-bg-3.jpg'
}

const timerInButton = ref(60);

const countDownTimer = () => {
  
  if (timerInButton.value > 0) {

    setTimeout(() => {
      timerInButton.value -= 1;
      localStorage.setItem('timerInButton', timerInButton.value);
      countDownTimer();
    }, 1000);
  }
};

onMounted(() => {
  const storedTimer = localStorage.getItem('timerInButton');
  if (storedTimer) {
    timerInButton.value = parseInt(storedTimer);
    countDownTimer();
  }
  else {
    countDownTimer();
  }
});


definePageMeta({
  layout: 'auth',
});

</script>
