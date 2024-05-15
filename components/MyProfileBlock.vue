<template>
  <section class="sMyProfileBlock">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="active = 0" :class="active === 0 ? 'active' : ''"> Мой профиль </Button>
          <Button v-if="false" @click="active = 1" :class="active === 1 ? 'active' : ''">
            Мои команды
            <Badge value="4"></Badge>
          </Button>
        </div>
      </div>
      <div class="template">
        <TabView v-model:activeIndex="active">
          <TabPanel>
            <h3>Мой профиль</h3>
            <div class="sMyProfileBlock__row row">
              <div class="col">
                <div class="sMyProfileBlock__head">Персональная информация</div>
                <div class="form-wrap">
                  <form @submit="submitProfileData">
                    <InputGroup>
                      <label for="name">Никнейм</label>
                      <InputText
                        id="name"
                        type="text"
                        v-model="textValue"
                        placeholder="Введите никнейм"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="name">Email</label>
                      <InputText
                        id="email"
                        type="email"
                        v-model="emailValue"
                        placeholder="Введите почту"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="name">Имя и Фамилия</label>
                      <InputText
                        id="text"
                        type="text"
                        v-model="nameValue"
                        placeholder="Введите имя и фамилию"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="name">Телефон</label>
                      <InputMask
                        id="tel"
                        type="tel"
                        v-model="telValue"
                        placeholder="Введите телефон"
                        mask="+7 (999) 999-99-99"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Дата рождения</label>
                      <Calendar v-model="date" dateFormat="dd.mm.yy" placeholder="__.__.____" />
                    </InputGroup>
                    <InputGroup>
                      <label>Пол</label>
                      <Dropdown
                        v-model="selectedGender"
                        :options="genders"
                        optionLabel="name"
                        placeholder="Выберите пол"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Telegram</label>
                      <InputText
                        type="text"
                        v-model="telegramValue"
                        placeholder="Введите свой Telegram"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Город</label>
                      <InputText type="text" v-model="cityValue" placeholder="Введите город" />
                    </InputGroup>
                    <InputGroup>
                      <label>Учебное заведение</label>
                      <InputText
                        type="text"
                        v-model="schoolValue"
                        placeholder="Введите учебное заведение"
                        disabled
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Компания</label>
                      <InputText
                        type="text"
                        v-model="companyValue"
                        placeholder="Введите rомпанию"
                        disabled
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>ИНН компании</label>
                      <InputText
                        type="text"
                        v-model="INNValue"
                        placeholder="Введите ИНН компании"
                        disabled
                      />
                    </InputGroup>
                    <Button label="Сохранить изменения" type="submit" />
                  </form>
                </div>
              </div>
              <div class="col">
                <div class="sMyProfileBlock__head">Сменить пароль</div>
                <div class="form-wrap">
                  <form @submit="submitNewPassword">
                    <InputGroup>
                      <label for="password">Текущий пароль</label>
                      <Password
                        id="password"
                        v-model="currentPassword"
                        aria-describedby="password-help"
                        placeholder="Введите текущий пароль"
                        :feedback="false"
                        toggleMask
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="password">Новый пароль</label>
                      <Password
                        id="password"
                        v-model="newPassword"
                        aria-describedby="password-help"
                        placeholder="Введите новый пароль"
                        :feedback="false"
                        toggleMask
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="password">Повторите пароль</label>
                      <Password
                        id="password"
                        v-model="confrimNewPassword"
                        aria-describedby="password-help"
                        placeholder="Повторите новый пароль"
                        :feedback="false"
                        toggleMask
                        required
                      />
                    </InputGroup>
                    <Button type="submit" label="Сохранить изменения" />
                  </form>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel v-if="false">
            <h3>Мои команды</h3>
            <DataTable :value="products">
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="nickname"
                header="Название"
                sortable
              >
                <template #sorticon="slotProps">
                  <svg
                    :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                      fill="#9E9FA3"
                    />
                  </svg>
                </template>
                <template #body="slotProps">
                  <div class="table-wrap">
                    <NuxtImg :src="`/img/${slotProps.data.nickname.avatar}`" alt="Avatar" />
                    <span>{{ slotProps.data.nickname.text }}</span>
                  </div>
                </template>
              </Column>
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="game"
                header="Дисциплина"
                sortable
              >
                <template #sorticon="slotProps">
                  <svg
                    :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                      fill="#9E9FA3"
                    />
                  </svg>
                </template>
                <template #body="slotProps">
                  <span class="p-badge p-badge-gray">
                    <svg-icon :name="slotProps.data.game.icon" />
                    {{ slotProps.data.game.label }}
                  </span>
                </template>
              </Column>
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="league"
                header="Лига"
                sortable
              >
                <template #sorticon="slotProps">
                  <svg
                    :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                      fill="#9E9FA3"
                    />
                  </svg>
                </template>
                <template #body="slotProps">
                  <Badge
                    :severity="slotProps.data.league.severity"
                    class="p-badge-outline"
                    :value="slotProps.data.league.label"
                  />
                </template>
              </Column>
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="playersCount"
                header="Количество игроков"
                sortable
              >
                <template #sorticon="slotProps">
                  <svg
                    :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                      fill="#9E9FA3"
                    />
                  </svg>
                </template>
                <template #body="slotProps">
                  <span class="small-text">{{ slotProps.data.playersCount }}</span>
                </template>
              </Column>
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="role"
                header="Роль"
                sortable
              >
                <template #sorticon="slotProps">
                  <svg
                    :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                      fill="#9E9FA3"
                    />
                  </svg>
                </template>
                <template #body="slotProps">
                  <div class="d-flex align-items-center">
                    <span class="small-text">{{ slotProps.data.role }}</span>
                    <Button
                      v-if="slotProps.data.role === 'Капитан'"
                      label="Управлять"
                      class="btn-sm ms-auto"
                    />
                    <Button v-else severity="gray" label="Перейти" class="btn-sm ms-auto" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
      <div v-if="active === 1 && false" class="template template--footer">
        <Paginator
          :rows="rowsPerPage[0]"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="rowsPerPage"
          :pageLinkSize="4"
        >
          <template #start="slotProps">
            Показано от {{ slotProps.state.page * slotProps.state.rows + 1 }} до
            {{
              slotProps.state.first + slotProps.state.rows > totalRecords
                ? totalRecords
                : slotProps.state.first + slotProps.state.rows
            }}
            из {{ totalRecords }} данных
          </template>
        </Paginator>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import auth from '~/services/auth';
const { $locally } = useNuxtApp();
const props = defineProps({
  profileData: {
    type: Object,
    required: false,
  },
});

const { profileData } = props;

console.log(profileData);

const active = ref(0);
const products = ref([
  {
    nickname: {
      avatar: 'avatar-img-1.jpg',
      text: 'INTZ Genesis',
    },
    game: {
      icon: 'dota.svg',
      label: 'Dota 2',
    },
    league: {
      severity: 'secondary',
      label: 'Кибер Атланты',
    },
    playersCount: '5',
    role: 'Капитан',
  },
  {
    nickname: {
      avatar: 'avatar-img-1.jpg',
      text: 'Dando',
    },
    game: {
      icon: 'csFilled.svg',
      label: 'Counter Strike 2',
    },
    league: {
      severity: 'danger',
      label: 'Кибер Таланты',
    },
    playersCount: '5',
    role: 'Игрок',
  },
]);

const totalRecords = ref(10);
const rowsPerPage = ref([5, 10, 50, 100]);
const genders = ref([
  { name: 'Мужской', code: 'Male' },
  { name: 'Женский', code: 'Female' },
]);

const textValue = ref(profileData.user_nicename);
const emailValue = ref(profileData.user_email);
const nameValue = ref(profileData.display_name);
const telValue = ref(profileData.user_phone);
const date = ref(profileData.user_birthday);
const selectedGender = ref(profileData.user_gender);
const telegramValue = ref(profileData.user_telegram);
const cityValue = ref(profileData.user_city);
const schoolValue = ref(profileData.user_educational_institution);
const companyValue = ref(profileData.user_company);
const INNValue = ref(profileData.user_inn);

const submitProfileData = (event) => {
  event.preventDefault();

  auth
    .updateMyProfileData({
      first_name: nameValue.value.split(' ')[0],
      last_name: nameValue.value.split(' ')[1],
      email: emailValue.value,
      display_name: textValue.value,
      phone: telValue.value,
      birthday: date.value,
      gender: selectedGender.value.name,
      telegram: telegramValue.value,
      city: cityValue.value,
      educational_institution: schoolValue.value,
      company: companyValue.value,
      inn: INNValue.value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Pass
const currentPassword = ref(null);
const newPassword = ref(null);
const confrimNewPassword = ref(null);

const submitNewPassword = (event) => {
  event.preventDefault();

  auth
    .updatePassword({
      current_password: currentPassword.value,
      new_password: newPassword.value,
      repeat_password: confrimNewPassword.value,
    })
    .then((response) => {
      console.log(response);
      $locally.setItem('token', response[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped lang="scss">
.sMyProfileBlock {
  padding-bottom: 6px;
  @media screen and (min-width: 992px) {
    padding-bottom: 12px;
  }
}
</style>
