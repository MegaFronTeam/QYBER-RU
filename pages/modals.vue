<template>
  <div class="container">
    <div class="template">
      <Button label="Оставить заявку" @click="visibleShow = true" />
      <Button label="Спасибо за обращение" @click="visible = true" />
      <Button label="Выбрать команду" @click="visibleTeam = true" />
      <Button label="Подтвердите действие(дисквалификация)" @click="visibleDisqualification = true" />
    </div>
  </div>
  <Dialog v-model:visible="visibleShow" modal header="Оставить заявку">
    <div class="form-wrap">
      <form>
        <InputGroup>
          <label for="name">Имя</label>
          <InputText id="name" type="text" v-model="textValue" placeholder="Введите ваше имя" />
        </InputGroup>
        <InputGroup>
          <label for="name">Организация</label>
          <InputText id="name" type="text" v-model="orgValue" placeholder="Название организации" />
        </InputGroup>
        <InputGroup>
          <label for="name">Должность</label>
          <InputText id="name" type="text" v-model="statusValue" placeholder="Должность" />
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
        <div class="checkbox">
          <Checkbox v-model="agreement" inputId="agreement" name="agreement" value="Onion" />
          <label for="agreement">
            Даю согласие на обработку и хранение моих персональных данных в соответствии с
            <a href="#">условиями политики конфиденциальности</a>
          </label>
        </div>
        <Button type="submit" class="btn-lg">Отправить</Button>
      </form>
    </div>
  </Dialog>
  <Dialog v-model:visible="visible" modal header="Спасибо за обращение">
    <p>Мы свяжемся с Вами в ближайшее время</p>
    <Button class="btn-lg" @click="visible = false">Закрыть</Button>
  </Dialog>
  <Dialog v-model:visible="visibleTeam" modal header="Выбрать команду" class="p-dialog-big">
    <div class="inner-wrapper">
      <div class="game-item__card">
        <div class="">
          <div class="table-wrap game-item__title">
            <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" class="team-img" />
            <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
          </div>
          <div class="table-wrap">
            <div class="game-item__list">
              <div class="" >678 матчей</div>
              <div class="success" >479 (72%)</div>
              <div class="secondary" >0</div>
              <div class="danger" >112 (28%)</div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <Button class="btn-sm">Выбрать</Button>
        </div>
      </div>
      <div class="game-item__card">
        <div class="">
          <div class="table-wrap game-item__title">
            <NuxtImg :src="`/img/team-img-1.png`" alt="Avatar" class="team-img" />
            <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
          </div>
          <div class="table-wrap">
            <div class="game-item__list">
              <div class="" >678 матчей</div>
              <div class="success" >479 (72%)</div>
              <div class="secondary" >0</div>
              <div class="danger" >112 (28%)</div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <Button class="btn-sm">Выбрать</Button>
        </div>
      </div>
      <div class="game-item__card">
        <div class="">
          <div class="table-wrap game-item__title">
            <NuxtImg :src="`/img/team-img-1.png`" alt="Avatar" class="team-img" />
            <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
          </div>
          <div class="table-wrap">
            <div class="game-item__list">
              <div class="" >678 матчей</div>
              <div class="success" >479 (72%)</div>
              <div class="secondary" >0</div>
              <div class="danger" >112 (28%)</div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <Button class="btn-sm">Выбрать</Button>
        </div>
      </div>
      <div class="game-item__card">
        <div class="">
          <div class="table-wrap game-item__title">
            <NuxtImg :src="`/img/team-img-1.png`" alt="Avatar" class="team-img" />
            <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
          </div>
          <div class="table-wrap">
            <div class="game-item__list">
              <div class="" >678 матчей</div>
              <div class="success" >479 (72%)</div>
              <div class="secondary" >0</div>
              <div class="danger" >112 (28%)</div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <Button class="btn-sm">Выбрать</Button>
        </div>
      </div>
      <div class="game-item__card">
        <div class="">
          <div class="table-wrap game-item__title">
            <NuxtImg :src="`/img/team-img-1.png`" alt="Avatar" class="team-img" />
            <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
          </div>
          <div class="table-wrap">
            <div class="game-item__list">
              <div class="" >678 матчей</div>
              <div class="success" >479 (72%)</div>
              <div class="secondary" >0</div>
              <div class="danger" >112 (28%)</div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <Button class="btn-sm">Выбрать</Button>
        </div>
      </div>
      <div class="game-item__card">
        <div class="">
          <div class="table-wrap game-item__title">
            <NuxtImg :src="`/img/team-img-1.png`" alt="Avatar" class="team-img" />
            <span>Team Rogue </span> <span class="p-badge"> 3 453 </span>
          </div>
          <div class="table-wrap">
            <div class="game-item__list">
              <div class="" >678 матчей</div>
              <div class="success" >479 (72%)</div>
              <div class="secondary" >0</div>
              <div class="danger" >112 (28%)</div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <Button class="btn-sm">Выбрать</Button>
        </div>
      </div>
    </div>
  </Dialog>
  <Dialog v-model:visible="visibleDisqualification" modal header="Подтвердите действие">
    <p>Вы уверены, что хотите дисквалифицировать команду?</p>
    <div class="d-flex btn-flex">
      <Button class="btn-lg" @click="visibleDisqualification = false">Подтвердить</Button>
      <Button class="btn-lg" severity='contrast' @click="visibleDisqualification = false">Отмена</Button>
    </div>

  </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const visibleShow = ref(false);
const visible = ref(false);
const visibleTeam = ref(false);
const visibleDisqualification = ref(false);

const textValue = ref(null);
const orgValue = ref(null);
const statusValue = ref(null);
const telValue = ref(null);
const emailValue = ref(null);
const textAreaValue = ref(null);
const agreement = ref('');
</script>
