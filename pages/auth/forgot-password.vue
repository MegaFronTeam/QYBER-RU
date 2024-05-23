<template>
  <sFormPage v-bind="params"> 
    <form action="">
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
      <div class="mb-4 mt-4">
        <Button type="submit" disabled :label="params.btnName" class="w-100 btn-lg" />
      </div>
    </form>
  </sFormPage>
</template>

<script setup> 

const dataForm = ref({
  email: '', 
});
const errorsForm = ref({
  email: '',
});
const params = {
  title: 'Восстановление пароля',
  text: 'Введите электронный адрес и мы вышлем на него ссылку для установки нового пароля',
  bgImage: '/img/reg-bg-3.jpg',
  btnName: 'Продолжить'
}

definePageMeta({
  layout: 'auth',
});

</script>
