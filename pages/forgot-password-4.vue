<template>
  <sFormPage v-bind="params"> 
    <form action=""> 
      

      <div class="mb-4 mt-4">
        <NuxtLink to="/profile" class="text-primary">
          <Button   :label="params.btnName" class="w-100 btn-lg" />
        </NuxtLink>
      </div> 
    </form>
  </sFormPage>
</template>

<script setup> 

const dataForm = ref({
  email: '',
  steamNick: '',
  password: '',
  passwordConfirm: '',
  agreement: true
});
const errorsForm = ref({
  email: '',
  password: '',
  passwordConfirm: ''
});
const params = {
  title: 'Установите новый пароль',
  text: 'Пароль успешно изменен',
  bgImage: '/img/reg-bg-3.jpg',
  btnName: 'Войти',
  success: true
}

definePageMeta({
  layout: 'auth',
});

</script>
