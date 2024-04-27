<template>
  <section class="sError">
    <div class="container">
      <span>Добро пожаловать на страницу {{ errorMsg }}!</span>
      <h1>К сожалению запрашиваемая страница не найдена</h1>
      <p>
        Скорее всего, это случилось по одной из следующих причин: страница переехала, страницы
        больше нет или возможно, вы допустили небольшую опечатку при вводе адреса.
      </p>
      <NuxtLink to="/">
        <Button class="btn-lg"> Вернуться на главную </Button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const defineProps = defineProps({
  errorMsg: {
    type: String,
    required: false,
  },
});
const { errorMsg } = defineProps;
</script>
