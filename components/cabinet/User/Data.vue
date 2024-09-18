<template>
  <div class="sMyProfileBlock__row row">
    <div class="col">
      <div class="sMyProfileBlock__head">Персональная информация</div>
      <div class="form-wrap">
        <form @submit.prevent="userStore.updateMyProfileData">
          <!-- TODO: доделать отпарвку аватара кабинета -->
          <InputGroup>
            <label for="textarea"
              >Загрузить аватар <span style="color: var(--red-500)">*</span></label
            >
            <div>
              <FileUpload
                mode="basic"
                name="logo"
                id="logo"
                accept="image/*"
                maxFileSize="5000000"
                url="/api/upload"
                @select="customBase64Uploader"
                chooseLabel="Загрузить аватар "
              >
              </FileUpload>
            </div>
          </InputGroup>
          <InputGroup>
            <label for="nickname">Никнейм <span style="color: var(--red-500)">*</span></label>
            <InputText
              id="nickname"
              type="text"
              v-model="userData.user_nickname"
              placeholder="Введите никнейм"
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>
          <InputGroup>
            <label for="steam">Steam <span style="color: var(--red-500)">*</span></label>
            <Button
              label="Подключить Steam"
              type="button"
              @click="sendSteamID"
              v-if="!userData.user_steam"
            />
            <InputText
              v-else
              readonly=""
              id="steam"
              type="text"
              v-model="userData.user_steam"
              placeholder="Введите Steam"
            />
          </InputGroup>

          <br />
          <br />
          <div class="sMyProfileBlock__head">Данные для аккредитации</div>

          <InputGroup>
            <label for="name">Email <span style="color: var(--red-500)">*</span></label>
            <InputText
              id="email"
              type="email"
              v-model="userData.user_email"
              placeholder="Введите почту"
              required
            />
          </InputGroup>
          <InputGroup>
            <label for="name">Имя <span style="color: var(--red-500)">*</span></label>
            <InputText
              id="text"
              type="text"
              v-model="userData.user_first_name"
              placeholder="Введите имя "
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>
          <InputGroup>
            <label for="name">Отчество <span style="color: var(--red-500)">*</span></label>
            <InputText
              id="text"
              type="text"
              v-model="userData.user_second_name"
              placeholder="Введите отчество "
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup>
            <label for="name">Фамилия <span style="color: var(--red-500)">*</span></label>
            <InputText
              id="text"
              type="text"
              v-model="userData.user_last_name"
              placeholder="Введите фамилию"
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup>
            <label for="name">Телефон <span style="color: var(--red-500)">*</span></label>
            <InputText
              id="tel"
              type="tel"
              v-model="userData.user_phone"
              placeholder="Введите телефон"
              required
              :disabled="userData.user_verification === true"
            />
            <!-- mask="+7 (999) 999-99-99" -->
          </InputGroup>
          <InputGroup>
            <label>Дата рождения <span style="color: var(--red-500)">*</span></label>
            <Calendar
              v-model="userData.user_birthday"
              dateFormat="dd.mm.yy"
              placeholder="__.__.____"
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>
          <InputGroup>
            <label>Пол <span style="color: var(--red-500)">*</span></label>
            <Dropdown
              v-model="userData.user_gender"
              :options="user_genderArr"
              optionValue="code"
              optionLabel="name"
              minDate="2020-01-01"
              :placeholder="userData.user_gender"
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>
          <InputGroup>
            <label>Telegram <span style="color: var(--red-500)">*</span></label>
            <InputText
              type="text"
              v-model="userData.user_telegram"
              placeholder="Введите свой Telegram"
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup>
            <label>Регион <span style="color: var(--red-500)">*</span></label>

            <Dropdown
              v-model="userData.user_region"
              :options="regions"
              optionValue="id"
              optionLabel="title.rendered"
              placeholder="Выберите регион"
              class="w-full"
              filter
              filterPlaceholder="Поиск"
              emptyFilterMessage="Нет данных"
              required
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup>
            <label>Город <span style="color: var(--red-500)">*</span></label>
            <InputText
              type="text"
              v-model="userData.user_city"
              required
              :disabled="userData.user_verification === true"
              placeholder="Введите город"
            />
          </InputGroup>
          <InputGroup v-if="userData.user_educational_institution || globalStore.isTalants">
            <label>Учебное заведение <span style="color: var(--red-500)">*</span></label>
            <Dropdown
              v-model="userData.user_educational_institution"
              :options="educational_institutions"
              optionValue="id"
              optionLabel="title.rendered"
              placeholder="Выберите учебное заведение"
              class="w-full"
              filter
              filterPlaceholder="Поиск"
              emptyFilterMessage="Нет данных"
              required
              :disabled="userData.user_verification === true"
            >
              <template #option="slotProps">
                <div v-html="slotProps.option.title.rendered"></div>
              </template>
            </Dropdown>
            <!-- :virtualScrollerOptions="{ showLoader: true, autoSize: true }" -->
          </InputGroup>

          <InputGroup v-if="userData.user_company || globalStore.isAtlants">
            <label>Компания <span style="color: var(--red-500)">*</span></label>
            <InputText
              type="text"
              v-model="userData.user_company"
              required
              placeholder="Введите компанию"
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup v-if="user_verification || in_verifications">
            <label>ИНН <span style="color: var(--red-500)">*</span></label>
            <InputText
              type="text"
              v-model="userData.user_inn"
              required
              placeholder="Введите ИНН "
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup>
            <label>VK ID <span style="color: var(--red-500)">*</span></label>
            <InputText
              type="text"
              v-model="userData.user_vk_id"
              required
              placeholder="Введите VK ID"
              :disabled="userData.user_verification === true"
            />
          </InputGroup>

          <InputGroup>
            <label>ГТО <span style="color: var(--red-500)">*</span></label>
            <InputText
              type="text"
              v-model="userData.user_gto"
              required
              :disabled="userData.user_verification === true"
              placeholder="Введите ГТО"
            />
          </InputGroup>

          <Button label="Сохранить изменения" type="submit" />
        </form>
      </div>
    </div>
    <div class="col">
      <div class="sMyProfileBlock__head">Сменить пароль</div>
      <CabinetUserDataPasswordUpdate />
    </div>
  </div>
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const { userData, regions, user_genderArr } = storeToRefs(globalStore);

  import { useUserStore } from '@/store/userStore';
  import axios from 'axios';
  const userStore = useUserStore();

  const { educational_institutions } = storeToRefs(userStore);

  const customBase64Uploader = async (event) => {
    // const file = event.files[0];
    // userData.user_avatar = file;

    // const reader = new FileReader();
    // let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    // reader.readAsDataURL(blob);

    // reader.onloadend = function () {
    //   const base64data = reader.result;
    //   accreditation.setFile(file);
    // };
    // console.log(event.files[0]);
    globalStore.user_avatar = event.files[0].objectURL;
    globalStore.userData.user_avatar = event.files[0];

    return event.files[0];
  };

  const sendSteamID = async () => {
    const response = await axios.get('https://api.qyber.ru/wp-json/steam/v1/auth');
    const redirectUrl = response.data;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };
  // const in_verifications = globalStore.userData.user_verification == false;
</script>
