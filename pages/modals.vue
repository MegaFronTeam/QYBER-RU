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
                      <svg   width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4625_32251)">
                          <path d="M12.6667 1.33333H12V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.489856 5.2631 0.320286 5.13807 0.195262C5.01305 0.0702379 4.84348 0 4.66667 0C4.48986 0 4.32029 0.0702379 4.19526 0.195262C4.07024 0.320286 4 0.489856 4 0.666667V1.33333H3.33333C2.4496 1.33439 1.60237 1.68592 0.97748 2.31081C0.352588 2.93571 0.00105857 3.78294 0 4.66667L0 12.6667C0.00105857 13.5504 0.352588 14.3976 0.97748 15.0225C1.60237 15.6474 2.4496 15.9989 3.33333 16H12.6667C13.5504 15.9989 14.3976 15.6474 15.0225 15.0225C15.6474 14.3976 15.9989 13.5504 16 12.6667V4.66667C15.9989 3.78294 15.6474 2.93571 15.0225 2.31081C14.3976 1.68592 13.5504 1.33439 12.6667 1.33333ZM1.33333 4.66667C1.33333 4.13623 1.54405 3.62753 1.91912 3.25245C2.29419 2.87738 2.8029 2.66667 3.33333 2.66667H12.6667C13.1971 2.66667 13.7058 2.87738 14.0809 3.25245C14.456 3.62753 14.6667 4.13623 14.6667 4.66667V5.33333H1.33333V4.66667ZM12.6667 14.6667H3.33333C2.8029 14.6667 2.29419 14.456 1.91912 14.0809C1.54405 13.7058 1.33333 13.1971 1.33333 12.6667V6.66667H14.6667V12.6667C14.6667 13.1971 14.456 13.7058 14.0809 14.0809C13.7058 14.456 13.1971 14.6667 12.6667 14.6667Z" fill="#6D7076" />
                          <path d="M8 11C8.55228 11 9 10.5523 9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11Z" fill="#6D7076" />
                          <path d="M4.66602 11C5.2183 11 5.66602 10.5523 5.66602 10C5.66602 9.44772 5.2183 9 4.66602 9C4.11373 9 3.66602 9.44772 3.66602 10C3.66602 10.5523 4.11373 11 4.66602 11Z" fill="#6D7076" />
                          <path d="M11.334 11C11.8863 11 12.334 10.5523 12.334 10C12.334 9.44772 11.8863 9 11.334 9C10.7817 9 10.334 9.44772 10.334 10C10.334 10.5523 10.7817 11 11.334 11Z" fill="#6D7076" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4625_32251">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </template>
                </Calendar>
              <Calendar id="calendar-timeonly"
              v-model="time"
              timeOnly
              placeholder="00:00"/>
            </div>
          </InputGroup>
          <InputGroup>
            <label for="discord">Сервер Discord</label>
            <InputText
              id="discord"
              showIcon
              iconDisplay="input"
              type="text"
              v-model="discord"
              placeholder="Ссылка с https://" >
              <template>
                <svg-icon name="calendar.svg" />
              </template>
            </InputText>

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
          <div class="">
            <Button class="btn-sm">counter</Button>
          </div>
        </div>
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
          <div class="">
            <Button class="btn-sm">counter</Button>
          </div>
        </div>
        <h5 class="text-center" >Проверка победителя</h5>
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

const visibleShow = ref(false);
const visible = ref(false);
const visibleTeam = ref(false);
const visibleGame = ref(false);
const visibleDisqualification = ref(false);
const checked = ref(false);

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
