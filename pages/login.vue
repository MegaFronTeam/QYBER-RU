<template>
  <sFormPage v-bind="params">
    <form @submit.prevent="loginStore.submit">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataForm.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
          :invalid="errors.email.length > 0"
        />
        <!-- <small class="p-error" id="password-help">{{ errorsForm.email }}</small> -->
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
          :invalid="errors.password.length > 0"
        />
        <!-- <small class="p-error" id="password-help">{{ errorsForm.password }}</small> -->
      </InputGroup>

      <!-- <AgreementForm :agreement="agreement" /> -->
      <small class="p-error mb-2 d-block" v-if="errors.email" v-html="errors.email"> </small>
      <small class="p-error mb-2 d-block" v-if="errors.password" v-html="errors.password"> </small>
      <small class="p-error mb-2 d-block" v-if="errors.form" v-html="errors.form"></small>
      <small class="p-error mb-2 d-block" v-if="serverErrors" v-html="serverErrors"></small>

      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :label="params.btnName"
          class="w-100 btn-lg"
          :disabled="disabledForm === true ? 'disabled' : false"
        />
      </div>

      <div class="mb-3 text-center" style="font-size: 14px">
        Еще нет аккаунта?
        <NuxtLink to="/registration" class="text-primary">Регистрация</NuxtLink>
      </div>
    </form>
  </sFormPage>
</template>

<script setup>
  // import Auth from '@/services/auth';

  import { useLoginStore } from '@/store/loginStore';
  const loginStore = useLoginStore();
  const { disabledForm, errors, dataForm, serverErrors } = storeToRefs(loginStore);

  if (dataForm.email !== '' && dataForm.password !== '') {
    loginStore.validate();
  }
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
