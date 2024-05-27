<template>
  <div class="sMyProfileBlock__row row">
    <div class="col">
      <div class="sMyProfileBlock__head">Персональная информация</div>
      <div class="form-wrap">
        <form @submit.prevent="userStore.updateMyProfileData">
          <!-- TODO: доделать отпарвку аватара кабинета -->
          <InputGroup>
            <label for="textarea">Загрузить аватар </label>
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
            <label for="name">Никнейм</label>
            <InputText
              id="name"
              type="text"
              v-model="userData.user_nickname"
              placeholder="Введите никнейм"
            />
          </InputGroup>
          <InputGroup>
            <label for="name">Email</label>
            <InputText
              id="email"
              type="email"
              v-model="userData.user_email"
              placeholder="Введите почту"
            />
          </InputGroup>
          <InputGroup>
            <label for="name">Имя</label>
            <InputText
              id="text"
              type="text"
              v-model="userData.user_first_name"
              placeholder="Введите имя "
            />
          </InputGroup>

          <InputGroup>
            <label for="name">Фамилия</label>
            <InputText
              id="text"
              type="text"
              v-model="userData.user_last_name"
              placeholder="Введите фамилию"
            />
          </InputGroup>

          <InputGroup>
            <label for="name">Телефон</label>
            <InputText
              id="tel"
              type="tel"
              v-model="userData.user_phone"
              placeholder="Введите телефон"
            />
            <!-- mask="+7 (999) 999-99-99" -->
          </InputGroup>
          <InputGroup>
            <label>Дата рождения</label>
            <Calendar
              v-model="userData.user_birthday"
              dateFormat="dd.mm.yy"
              placeholder="__.__.____"
            />
          </InputGroup>
          <InputGroup>
            <label>Пол</label>
            <Dropdown
              v-model="userData.user_gender"
              :options="user_genderArr"
              optionValue="code"
              optionLabel="name"
              :placeholder="userData.user_gender"
            />
          </InputGroup>
          <InputGroup>
            <label>Telegram</label>
            <InputText
              type="text"
              v-model="userData.user_telegram"
              placeholder="Введите свой Telegram"
            />
          </InputGroup>

          <InputGroup>
            <label>Регион</label>

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
            />
          </InputGroup>

          <InputGroup>
            <label>Город</label>
            <InputText type="text" v-model="userData.user_city" placeholder="Введите город" />
          </InputGroup>
          <InputGroup v-if="userData.user_educational_institution || globalStore.isTalants">
            <label>Учебное заведение</label>
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
            >
              <template #option="slotProps">
                <div v-html="slotProps.option.title.rendered"></div>
              </template>
            </Dropdown>
            <!-- :virtualScrollerOptions="{ showLoader: true, autoSize: true }" -->
          </InputGroup>

          <InputGroup v-if="userData.user_company || globalStore.isAtlants">
            <label>Компания</label>
            <InputText type="text" v-model="userData.user_company" placeholder="Введите компанию" />
          </InputGroup>

          <InputGroup v-if="user_verification || in_verifications">
            <label>ИНН </label>
            <InputText type="text" v-model="userData.user_inn" placeholder="Введите ИНН " />
          </InputGroup>

          <InputGroup>
            <label>VK ID</label>
            <InputText type="text" v-model="userData.user_vk_id" placeholder="Введите VK ID" />
          </InputGroup>

          <InputGroup>
            <label>ГТО</label>
            <InputText type="text" v-model="userData.user_gto" placeholder="Введите ГТО" />
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

  const { userData, regions, user_genderArr } = storeToRefs(globalStore);

  import { useUserStore } from '@/store/userStore';
  const userStore = useUserStore();

  const { educational_institutions } = storeToRefs(userStore);

  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    userData.user_avatar = file;

    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      accreditation.setFile(file);
    };
    // console.log(logo.value);
  };
  // const in_verifications = globalStore.userData.user_verification == false;
</script>
