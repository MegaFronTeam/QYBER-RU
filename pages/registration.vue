<template>
  <sFormPage v-bind="params">
    <form @submit.prevent="singUpStore.submit">
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="dataForm.email"
          aria-describedby="email-help"
          placeholder="Введите Email"
          :invalid="errors.email.length > 0"
        />
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
      </InputGroup>

      <InputGroup>
        <label for="password">Повторите пароль</label>
        <Password
          id="passwordConfirm"
          v-model="dataForm.passwordConfirm"
          aria-describedby="passwordConfirm-help"
          :feedback="false"
          placeholder="Повторите пароль"
          :invalid="errors.passwordConfirm.length > 0"
          toggleMask
        />
      </InputGroup>

      <small class="p-error mb-2 d-block" v-if="errors.email" v-html="errors.email"> </small>
      <small class="p-error mb-2 d-block" v-if="errors.password" v-html="errors.password"> </small>
      <small
        class="p-error mb-2 d-block"
        v-if="errors.passwordConfirm"
        v-html="errors.passwordConfirm"
      ></small>
      <small class="p-error mb-2 d-block" v-if="errors.form" v-html="errors.form"></small>
      <small class="p-error mb-2 d-block" v-if="serverErrors" v-html="serverErrors"></small>

      <AgreementForm :agreement="agreement" />
      <div class="mb-4 mt-4">
        <Button
          type="submit"
          :label="params.btnName"
          class="w-100 btn-lg"
          :disabled="disabledForm === true ? 'disabled' : false"
        />
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

  import { useSingUpStore } from '@/store/singUpStore';
  const singUpStore = useSingUpStore();
  const { disabledForm, errors, dataForm, serverErrors } = storeToRefs(singUpStore);

  if (dataForm.email !== '' && dataForm.password !== '') {
    singUpStore.validate();
  }

  const params = {
    title: 'Регистрация',
    // text: 'Enter your credentials to access your account',
    bgImage: '/img/reg-bg-1.jpg',
    btnName: 'Зарегистрироваться',
  };
</script>
