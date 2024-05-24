<template>
  <sFormPage v-bind="params">
    <form @submit.prevent="authStore.submitSingUp">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataFormSingUp.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
        />
      </InputGroup>
      <InputGroup>
        <label for="password">Пароль</label>
        <Password
          id="password"
          v-model="dataFormSingUp.password"
          aria-describedby="password-help"
          placeholder="Введите пароль"
          :feedback="false"
          toggleMask
        />
      </InputGroup>

      <InputGroup>
        <label for="password">Повторите пароль</label>
        <Password
          id="passwordConfirm"
          v-model="dataFormSingUp.passwordConfirm"
          aria-describedby="passwordConfirm-help"
          :feedback="false"
          placeholder="Повторите пароль"
          toggleMask
        />
      </InputGroup>

      <small class="p-error mb-2 d-block" v-if="errorsSingUp.email" v-html="errorsSingUp.email">
      </small>
      <small
        class="p-error mb-2 d-block"
        v-if="errorsSingUp.password"
        v-html="errorsSingUp.password"
      >
      </small>
      <small
        class="p-error mb-2 d-block"
        v-if="errorsSingUp.passwordConfirm"
        v-html="errorsSingUp.passwordConfirm"
      ></small>
      <small
        class="p-error mb-2 d-block"
        v-if="errorsSingUp.form"
        v-html="errorsSingUp.form"
      ></small>
      <small
        class="p-error mb-2 d-block"
        v-if="serverErrorsSingUp"
        v-html="serverErrorsSingUp"
      ></small>

      <AgreementForm />
      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :label="params.btnName"
          class="w-100 btn-lg"
          :disabled="disabledFormSingUp === true ? 'disabled' : false"
        />
      </div>
      <div class="mb-3 text-center" style="font-size: 14px">
        Уже есть аккаунт?
        <NuxtLink to="/auth/login" class="text-primary">Войти</NuxtLink>
      </div>
    </form>
  </sFormPage>
</template>

<script setup>
  import AgreementForm from '@/components/share/AgreementForm.vue';
  definePageMeta({
    layout: 'auth',
  });

  import { useAuthStore } from '@/store/authStore';
  const authStore = useAuthStore();

  const { disabledFormSingUp, errorsSingUp, dataFormSingUp, serverErrorsSingUp } =
    storeToRefs(authStore);
  const params = {
    title: 'Регистрация',
    // text: 'Enter your credentials to access your account',
    bgImage: '/img/reg-bg-1.jpg',
    btnName: 'Зарегистрироваться',
  };
</script>
