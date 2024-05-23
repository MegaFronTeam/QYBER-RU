<template>
  <sFormPage v-bind="params">
    <form @submit.prevent="authStore.submitLogin">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataFormLogin.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
        />
        <!-- <small class="p-error" id="password-help">{{ errorsForm.email }}</small> -->
      </InputGroup>

      <InputGroup>
        <label for="password">Пароль</label>
        <Password
          id="password"
          v-model="dataFormLogin.password"
          aria-describedby="password-help"
          placeholder="Введите пароль"
          :feedback="false"
          toggleMask
        />
        <!-- <small class="p-error" id="password-help">{{ errorsForm.password }}</small> -->
      </InputGroup>

      <!-- <AgreementForm :agreement="agreement" /> -->
      <small class="p-error mb-2 d-block" v-if="errorsLogin.email" v-html="errorsLogin.email">
      </small>
      <small class="p-error mb-2 d-block" v-if="errorsLogin.password" v-html="errorsLogin.password">
      </small>
      <small class="p-error mb-2 d-block" v-if="errorsLogin.form" v-html="errorsLogin.form"></small>
      <small
        class="p-error mb-2 d-block"
        v-if="serverErrorsLogin"
        v-html="serverErrorsLogin"
      ></small>

      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :label="params.btnName"
          class="w-100 btn-lg"
          :disabled="disabledFormLogin === true ? 'disabled' : false"
        />
      </div>

      <div class="mb-3 text-center" style="font-size: 14px">
        Еще нет аккаунта?
        <NuxtLink to="/auth/registration" class="text-primary">Регистрация</NuxtLink>
      </div>
    </form>
  </sFormPage>
</template>

<script setup>
  // import Auth from '@/services/auth';

  import { useAuthStore } from '@/store/authStore';
  const authStore = useAuthStore();
  const { disabledFormLogin, errorsLogin, dataFormLogin, serverErrorsLogin } =
    storeToRefs(authStore);

  // const dataForm = ref({
  //   email: '',
  //   password: '',
  // });

  // loginStore.validate();

  definePageMeta({
    layout: 'auth',
  });

  // const errorsForm = ref({
  //   email: '',
  //   password: '',
  // });

  const params = {
    title: 'Авторизация',
    bgImage: '/img/reg-bg-2.jpg',
    btnName: 'Войти',
  };
</script>
