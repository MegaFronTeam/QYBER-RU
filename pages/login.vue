<template>
  <sFormPage v-bind="params" >  
    <form  @submit="submit">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataForm.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
        />
        <small class="p-error" id="password-help">{{ errorsForm.email }}</small>
      </InputGroup>

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

      <AgreementForm :agreement="agreement" />
      <div class="mb-4 mt-4">
        <Button type="submit"  :label="params.btnName" class="w-100 btn-lg" />
      </div>
      <div class="mb-3 text-center" style="font-size: 14px">
        Еще нет аккаунта?
        <NuxtLink to="/registration" class="text-primary">Регистрация</NuxtLink>
      </div> 
    </form>
  </sFormPage>
</template>

<script setup> 

import Auth from '@/services/auth';
const {$locally} = useNuxtApp();
const router = useRouter();

definePageMeta({
  layout: 'auth',
});
import { ref } from 'vue'
const dataForm = ref({
  email: 'wol1414@gmail.com',
  password: 'Qwerty1414;',
  agreement: true
});
const errorsForm = ref({
  email: '',
  password: '',
  passwordConfirm: ''
});
const params = {
  title: 'Авторизация',
  // text: 'E-nter your credentials to access your account',
  bgImage: '/img/reg-bg-2.jpg',
  btnName: 'Войти'
}


 
const submit = (event) => { 
  event.preventDefault();
  Auth.login(dataForm.value.email, dataForm.value.password)
  .then((response) => {
    $locally.setItem('token', response[0]);
    $locally.setItem('email', dataForm.value.email);
    router.push('/Myprofile');
    console.log(dataForm.value.email);
  }).catch((error) => {
    console.log(error);
  });
  // console.log(data());
}

</script>
