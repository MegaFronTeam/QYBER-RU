<template>
  <section class="sContactBlock">
    <div class="container">
      <div class="sContactBlock__row row">
        <div class="sContactBlock__col col">
          <div class="template">
            <div class="sContactBlock__profile">
              <div class="sContactBlock__img-wrap">
                <div class="img-wrap-center">
                  <NuxtImg src="img/avatar-img-3.jpg" class="object-fit-js" />
                </div>
              </div>
              <div class="sContactBlock__profile-info">
                <span>Организатор турнира</span>
                <h2 class="h1">Иванов Иван</h2>
              </div>
              <div class="sContactBlock__profile-info">
                <span>Позвонить</span>
                <a class="h4" href="tel:+79392993030" target="_blank" rel="noopener noreferrer"
                  >+7 (939) 299-30-30</a
                >
              </div>
              <div class="sContactBlock__profile-info">
                <span>Электронная почта</span>
                <a
                  class="h4"
                  href="mailto:qyber.info@mail.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  >qyber.info@mail.ru</a
                >
              </div>
              <div class="sContactBlock__profile-info">
                <Button class="sContactBlock__btn btn-lg p-button-gray">
                  <svg-icon name="telegram.svg" />
                  Написать в Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div class="sContactBlock__col col">
          <div class="template">
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
                  <InputText
                    id="email"
                    type="email"
                    v-model="emailValue"
                    placeholder="Введите ваш Email"
                  />
                </InputGroup>
                <InputGroup>
                  <label for="email">Ваше сообщение</label>
                  <Textarea
                    v-model="textAreaValue"
                    placeholder="Введите ваше сообщение"
                    autoResize
                  />
                </InputGroup>
                <div class="checkbox">
                  <Checkbox
                    v-model="agreement"
                    inputId="agreement"
                    name="agreement"
                    value="Onion"
                  />
                  <label for="agreement">
                    Даю согласие на обработку и хранение моих персональных данных в соответствии с
                    <a href="#">условиями политики конфиденциальности</a>
                  </label>
                </div>
                <Button type="submit" class="btn-lg">Отправить</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const textValue = ref(null);
const telValue = ref(null);
const emailValue = ref(null);
const textAreaValue = ref(null);
const agreement = ref();
</script>
