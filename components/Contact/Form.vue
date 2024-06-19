<template>
  <!-- <Toast /> -->
  <div class="form-wrap">
    <h2 class="h1">Напишите нам</h2>
    <form @submit.prevent="contactStore.submit">
      <InputGroup>
        <label for="name">Имя</label>
        <InputText id="name" type="text" v-model="dataForm.name" placeholder="Введите имя" />
      </InputGroup>
      <InputGroup>
        <label for="tel">Телефон</label>
        <InputMask
          id="tel"
          type="tel"
          v-model="dataForm.phone"
          mask="+7 (999) 999-99-99"
          placeholder="+7 (___) ___-__-__"
        />
      </InputGroup>
      <InputGroup>
        <label for="email">Email</label>
        <InputText
          id="email"
          type="email"
          v-model="dataForm.email"
          placeholder="Введите ваш Email"
        />
      </InputGroup>
      <InputGroup>
        <label for="textarea">Ваше сообщение</label>
        <Textarea
          id="textarea"
          v-model="dataForm.message"
          placeholder="Введите ваше сообщение"
          autoResize
        />
      </InputGroup>
      <ShareAgreementForm />
      <Button type="submit" class="btn-lg" :disabled="disabledForm === true ? 'disabled' : false"
        >Отправить</Button
      >
    </form>
    <!-- <Toast /> -->
  </div>
</template>

<script setup>
  import { useContactStore } from '@/store/contactFormStore';
  const contactStore = useContactStore();
  const { disabledForm, dataForm } = storeToRefs(contactStore);
</script>
