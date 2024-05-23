<template>
  <sFormPage v-bind="params"> 
    <form action=""> 
      <InputGroup>
        <label for="password">Новый пароль</label>
        <Password
          id="password"
          v-model="dataForm.password"
          aria-describedby="password-help"
          placeholder="Введите новый пароль"
          :feedback="false"
          toggleMask
        />
        <small class="p-error" id="password-help">{{ errorsForm.password }}</small>
      </InputGroup>

      <InputGroup  >
        <label for="password">Повторите пароль</label>
        <Password
          id="passwordConfirm"
          v-model="dataForm.passwordConfirm"
          aria-describedby="password-help"
          :feedback="false"
          placeholder="Повторите новый пароль"
          toggleMask
        />
        <small class="p-error" id="password-help">{{ errorsForm.passwordConfirm }}</small>
      </InputGroup>
 
      <div class="mb-4 mt-4">
        <Button type="submit" disabled :label="params.btnName" class="w-100 btn-lg" />
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
  // text: 'Enter your credentials to access your account',
  bgImage: '/img/reg-bg-3.jpg',
  btnName: 'Подтвердить'
}

definePageMeta({
  layout: 'auth',
});

</script>
