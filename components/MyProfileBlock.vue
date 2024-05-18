<template>
  <section class="sMyProfileBlock">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="active = 0" :class="active === 0 ? 'active' : ''"> Мой профиль </Button>
          <Button
            v-if="teamsStore.myTeams.length > 0"
            @click="active = 1"
            :class="active === 1 ? 'active' : ''"
          >
            Мои команды
            <Badge :value="teamsStore.myTeams.length"></Badge>
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
                        v-model="profileData.user_nicename"
                        placeholder="Введите никнейм"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="name">Email</label>
                      <InputText
                        id="email"
                        type="email"
                        v-model="profileData.user_email"
                        placeholder="Введите почту"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="name">Имя и Фамилия</label>
                      <InputText
                        id="text"
                        type="text"
                        v-model="profileData.display_name"
                        placeholder="Введите имя и фамилию"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label for="name">Телефон</label>
                      <InputMask
                        id="tel"
                        type="tel"
                        v-model="profileData.user_phone"
                        placeholder="Введите телефон"
                        mask="+7 (999) 999-99-99"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Дата рождения</label>
                      <Calendar
                        v-model="profileData.user_birthday"
                        dateFormat="dd.mm.yy"
                        placeholder="__.__.____"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Пол</label>
                      <Dropdown
                        v-model="profileData.user_gender"
                        :options="genders"
                        optionLabel="name"
                        :placeholder="profileData.user_gender"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Telegram</label>
                      <InputText
                        type="text"
                        v-model="profileData.user_telegram"
                        placeholder="Введите свой Telegram"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Город</label>
                      <InputText
                        type="text"
                        v-model="profileData.user_city"
                        placeholder="Введите город"
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Учебное заведение</label>
                      <InputText
                        type="text"
                        v-model="profileData.user_educational_institution"
                        placeholder="Введите учебное заведение"
                        disabled
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>Компания</label>
                      <InputText
                        type="text"
                        v-model="profileData.user_company"
                        placeholder="Введите rомпанию"
                        disabled
                      />
                    </InputGroup>
                    <InputGroup>
                      <label>ИНН компании</label>
                      <InputText
                        type="text"
                        v-model="profileData.user_inn"
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
          <TabPanel v-if="teamsStore.myTeams.length > 0">
            <div class="sMyProfileBlock__head-row row">
              <div class="col">
                <h3>Мои команды</h3>
              </div>
              <div class="col-auto">
                <CreateTeam />
              </div>
            </div>
            <DataTable :value="teamsStore.myTeams">
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
                    <NuxtImg
                      v-if="slotProps.data.thumbnail_url"
                      :src="`${slotProps.data.thumbnail_url}`"
                      alt="Avatar"
                    />
                    <span>{{ slotProps.data.post_title }}</span>
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
                    <!-- <svg-icon :name="slotProps.data.game.icon" /> -->
                    {{ slotProps.data.discipline.name }}
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
                    :severity="
                      slotProps.data.leagues.name === 'Кибер таланты' ? 'secondary' : 'danger'
                    "
                    class="p-badge-outline"
                    :value="slotProps.data.leagues.name"
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
                  <span class="small-text">{{ slotProps.data.count_members }}</span>
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
                    <span class="small-text" style="margin-right: 1rem">{{
                      slotProps.data.post_author === profileData.ID ? 'Капитан' : 'Игрок'
                    }}</span>
                    <NuxtLink :to="`team/${slotProps.data.ID}`" class="ms-auto">
                      <Button
                        v-if="slotProps.data.post_author === profileData.ID"
                        label="Управлять"
                        class="btn-sm"
                      />
                      <Button v-else severity="gray" label="Перейти" class="btn-sm" />
                    </NuxtLink>
                  </div>
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
      <!-- <div v-if="active === 1 && teamsArr.length > 0" class="template template--footer">
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
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { useTeamStore } from '~/store/TeamStore';
import auth from '@/services/auth';

const teamsStore = useTeamStore();
onMounted(async () => {
  await teamsStore.fetchMyTeams();

  console.log(teamsStore.myTeams);
});

const { $locally } = useNuxtApp();
const props = defineProps({
  profileData: {
    type: Object,
    required: false,
  },
});

const { profileData } = props;
const active = ref(0);
// const totalRecords = ref(10);
// const rowsPerPage = ref([5, 10, 50, 100]);
const genders = ref([
  { name: 'Мужской', code: 'Male' },
  { name: 'Женский', code: 'Female' },
]);

const submitProfileData = (event) => {
  event.preventDefault();

  auth
    .updateMyProfileData(profileData)
    .then((response) => {
      // console.log(response);
      if (response) {
        Object.keys(profileData).forEach((key) => {
          if (key == 'user_gender') {
            // console.log(profileData[key]);
            $locally.setItem(key, profileData[key].name);
          } else {
            $locally.setItem(key, profileData[key]);
          }
        });
      }
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
      // console.log(response);
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
