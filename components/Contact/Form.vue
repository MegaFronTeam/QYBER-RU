<template>
  <div class="form-wrap">
    <h2 class="h1">Напишите нам</h2>
    <form>
      <InputGroup>
        <label for="name">Имя</label>
        <InputText id="name" type="text" v-model="textValue" placeholder="Введите имя" />
      </InputGroup>
      <InputGroup>
        <label for="tel">Телефон</label>
        <InputMask
          id="tel"
          type="tel"
          v-model="telValue"
          mask="+7 (999) 999-99-99"
          placeholder="+7 (___) ___-__-__"
        />
      </InputGroup>
      <InputGroup>
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="emailValue" placeholder="Введите ваш Email" />
      </InputGroup>
      <InputGroup>
        <label for="textarea">Ваше сообщение</label>
        <Textarea
          id="textarea"
          v-model="textAreaValue"
          placeholder="Введите ваше сообщение"
          autoResize
        />
      </InputGroup>
      <ShareAgreementForm />
      <Button type="submit" class="btn-lg">Отправить</Button>
    </form>
  </div>
</template>

<script setup>
  const textValue = ref(null);
  const telValue = ref(null);
  const emailValue = ref(null);
  const textAreaValue = ref(null);
</script>
