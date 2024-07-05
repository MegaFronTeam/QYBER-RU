<template>
  <sFormPage v-bind="params">
    <form @submit.prevent="authStore.submitNewPassword">
      <InputGroup>
        <label for="password">Новый пароль</label>
        <Password
          id="password"
          v-model="dataFormNewPassword.password"
          aria-describedby="password-help"
          placeholder="Введите новый парол"
          :feedback="false"
          toggleMask
        />
      </InputGroup>

      <InputGroup>
        <label for="password">Повторите пароль</label>
        <Password
          id="passwordConfirm"
          v-model="dataFormNewPassword.passwordConfirm"
          aria-describedby="passwordConfirm-help"
          :feedback="false"
          placeholder="Повторите новый пароль"
          toggleMask
        />
      </InputGroup>

      <small
        class="p-error mb-2 d-block"
        v-if="errorsNewPassword.password"
        v-html="errorsNewPassword.password"
      >
      </small>
      <small
        class="p-error mb-2 d-block"
        v-if="errorsNewPassword.passwordConfirm"
        v-html="errorsNewPassword.passwordConfirm"
      ></small>
      <small
        class="p-error mb-2 d-block"
        v-if="errorsNewPassword.form"
        v-html="errorsNewPassword.form"
      ></small>
      <small
        class="p-error mb-2 d-block"
        v-if="serverErrorsNewPassword"
        v-html="serverErrorsNewPassword"
      ></small>

      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :label="params.btnName"
          class="w-100 btn-lg"
          :disabled="disabledFormNewPassword === true ? 'disabled' : false"
        />
      </div>
    </form>
  </sFormPage>
</template>

<script setup>
  import { useAuthStore } from '@/store/authStore';
  const authStore = useAuthStore();

  const {
    disabledFormNewPassword,
    errorsNewPassword,
    dataFormNewPassword,
    serverErrorsNewPassword,
  } = storeToRefs(authStore);
  const params = {
    title: 'Установите новый пароль',
    // text: 'Enter your credentials to access your account',
    bgImage: '/img/reg-bg-3.jpg',
    btnName: 'Подтвердить',
  };
  onMounted(() => {
    if (history.state && history.state.current.length > 1) {
      const getArr = history.state.current.split('?');
      const path = getArr[1] ? `?${getArr[1]}` : '';
      const key = path.match(/key=(\w+)/);
      authStore.dataFormNewPassword.key = key ? key[1] : '';
      const email = path.match(/email=([\w.@]+)/);
      authStore.dataFormNewPassword.email = email ? email[1] : '';
    }
  });
</script>
