<template>
  <sFormPage v-bind="params">
    <form @submit.prevent="authStore.submitResetPassword">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataFormResetPassword.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
        />
      </InputGroup>

      <small
        class="p-error mb-2 d-block"
        v-if="errorsResetFormPassword.email"
        v-html="errorsResetFormPassword.email"
      >
      </small>
      <small
        class="p-error mb-2 d-block"
        v-if="errorsResetFormPassword.form"
        v-html="errorsResetFormPassword.form"
      ></small>
      <small
        class="p-error mb-2 d-block"
        v-if="serverErrorsFormResetPassword"
        v-html="serverErrorsFormResetPassword"
      ></small>
      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :disabled="disabledFormResetPassword === true ? 'disabled' : false"
          :label="params.btnName"
          class="w-100 btn-lg"
        />
      </div>
    </form>
  </sFormPage>
</template>

<script setup>
  import { useAuthStore } from '@/store/authStore';
  const authStore = useAuthStore();

  const {
    disabledFormResetPassword,
    errorsResetFormPassword,
    dataFormResetPassword,
    serverErrorsFormResetPassword,
  } = storeToRefs(authStore);

  // validateResetPassword,
  // submitResetPassword,
  const params = {
    title: 'Восстановление пароля',
    text: 'Введите электронный адрес и мы вышлем на него ссылку для установки нового пароля',
    bgImage: '/img/reg-bg-3.jpg',
    btnName: 'Продолжить',
  };

  definePageMeta({
    layout: 'auth',
  });
</script>
