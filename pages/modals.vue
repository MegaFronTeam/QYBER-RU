<template>
  <div class="container">
    <div class="template">
      <Button label="Оставить заявку" @click="visibleShow = true" />
      <Button label="Спасибо за обращение" @click="visible = true" />
      <Button label="Выбрать команду" @click="visibleTeam = true" />
      <Button label="Игра 6" @click="visibleGame = true" />
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
  <Dialog v-model:visible="visibleGame" modal header="Игра 6">
    <div class="d-flex switch-wrap">
        <InputSwitch v-model="checked" />
        <span class="">В процессе</span>
    </div>
    <TabView>
      <TabPanel header="Настройки">
        <div class="form-wrap">
          <InputGroup>
            <label for="name">Формат</label>
            <Dropdown v-model="selectedFormat" :options="formats" optionLabel="name" placeholder="5x5" class="w-full md:w-14rem" />
          </InputGroup>
          <InputGroup>
            <label for="calendar">Начало игры (мск)</label>
            <div class="d-flex date-flex">
              <Calendar
                id="calendar"
                v-model="date"
                showIcon
                iconDisplay="input"
                dateFormat="dd.mm.yy"
                placeholder="__.__.____">
                  <template #inputicon="{ clickCallback }">
                    <div @click="clickCallback" class='icon-wrap' >
                      <svg-icon name="calendar.svg" />
                    </div>
                  </template>
                </Calendar>
              <Calendar id="calendar-timeonly"
              v-model="time"
              timeOnly
              placeholder="00:00"/>
            </div>
          </InputGroup>
            <label for="discord">Сервер Discord</label>
          <InputGroup>
            <div class="input-icon-wrap">
              <InputGroupAddon>
                <svg-icon name="discord.svg" />
              </InputGroupAddon>
              <InputText
                id="discord"
                type="text"
                v-model="discord"
                placeholder="Ссылка с https://" />
            </div>
          </InputGroup>
          <InputGroup>
            <label for="IP">Сервер</label>
            <InputText id="IP" type="text" v-model="IP" placeholder="IP адрес" />
          </InputGroup>
        </div>

        <Button class="btn-lg">Сохранить</Button>
      </TabPanel>
      <TabPanel header="Результаты">
        <div class="game-item__card game-item__card--center">
          <div class="">
            <div class="table-wrap game-item__title">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" class="team-img" />
              <span>Команда 1 </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game-item__list">
                <div class="secondary" >Дисквалифицировать</div>
              </div>
            </div>
          </div>
          <InputNumber v-model="valueTeam1" :min="0" :max="100" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1.00">
            <template #incrementbuttonicon>
              <span>+</span>
            </template>
            <template #decrementbuttonicon>
              <span>–</span>
            </template>
          </InputNumber>
        </div>
        <div class="game-item__card game-item__card--center">
          <div class="">
            <div class="table-wrap game-item__title">
              <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" class="team-img" />
              <span>Команда 2 </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game-item__list">
                <div class="secondary" >Дисквалифицировать</div>
              </div>
            </div>
          </div>
          <InputNumber v-model="valueTeam2" :min="0" :max="100" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1.00">
            <template #incrementbuttonicon>
              <span>+</span>
            </template>
            <template #decrementbuttonicon>
              <span>–</span>
            </template>
          </InputNumber>
        </div>
        <h5>Проверка победителя</h5>
        <div class="teams-check d-flex">
          <div class="team team--success">Команда 1</div>
          <div class="team">Команда 2</div>
        </div>
        <Button class="btn-lg">Завершить матч</Button>
      </TabPanel>
    </TabView>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import InputNumber from 'primevue/inputnumber';

const visibleShow = ref(false);
const visible = ref(false);
const visibleTeam = ref(false);
const visibleGame = ref(false);
const visibleDisqualification = ref(false);
const checked = ref(false);
const valueTeam1 = ref(0);
const valueTeam2 = ref(0);

const textValue = ref(null);
const orgValue = ref(null);
const statusValue = ref(null);
const telValue = ref(null);
const emailValue = ref(null);
const textAreaValue = ref(null);
const agreement = ref('');
const selectedFormat = ref();
const formats = ref([
    { name: '5x5'},
    { name: '5x5' },
    { name: '5x5' },
    { name: '5x5' },
    { name: '5x5' }
]);
</script>
