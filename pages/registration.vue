<template>
  <sFormPage v-bind="params"> 
    <form  @submit="submit">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataForm.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
        />
        <small class="p-error" id="email-help">{{ errorsForm.email }}</small>
      </InputGroup>
      <!-- <InputGroup>
        <label for="steamNick">Никнейм в Steam</label>
        <InputText
          id="steamNick"
          v-model="dataForm.steamNick"
          aria-describedby="steamNick-help"
          placeholder="Никнейм в Steam"
        />
        <small class="p-error" id="steamNick-help">{{ errorsForm.steamNick }}</small>
      </InputGroup> -->

      <InputGroup>
        <label for="password">Пароль</label>
        <Password
          id="password"
          v-model="dataForm.password"
          aria-describedby="password-help"
          placeholder="Введите пароль"
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
          aria-describedby="passwordConfirm-help"
          :feedback="false"
          placeholder="Повторите пароль"
          toggleMask
        />
        <small class="p-error" id="passwordConfirm-help">{{ errorsForm.passwordConfirm }}</small>
      </InputGroup>

      <AgreementForm :agreement="agreement" />
      <div class="mb-4 mt-4">
        <Button type="submit"  :label="params.btnName" class="w-100 btn-lg" />
      </div>
      <div class="mb-3 text-center" style="font-size: 14px">
        Уже есть аккаунт? 
        <NuxtLink to="/login" class="text-primary">Войти</NuxtLink>
      </div>
    </form>
  </sFormPage>
</template>

<script setup> 
definePageMeta({
  layout: 'auth',
});

import Auth from '@/services/auth';
const {$locally} = useNuxtApp();
const router = useRouter();

const dataForm = ref({
  email: 'wol12414@gmail.com',
  password: 'Qwerty1414;',
  passwordConfirm: 'Qwerty1414;',
  agreement: true
});
const errorsForm = ref({
  email: '',
  // steamNick: '',
  password: '',
  passwordConfirm: ''
});
const params = {
  title: 'Регистрация',
  // text: 'Enter your credentials to access your account',
  bgImage: '/img/reg-bg-1.jpg',
  btnName: 'Зарегистрироваться'
}

const submit = (event) => { 
  event.preventDefault();
  Auth.singUp(dataForm.value.email, dataForm.value.password)
  .then((response) => {
    $locally.setItem('token', response[0]);
    router.push('/profile');
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
  // console.log(data());
}



</script>
