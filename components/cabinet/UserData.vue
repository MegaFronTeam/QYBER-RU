<template>
  <div class="sMyProfileBlock__row row">
    <div class="col">
      <div class="sMyProfileBlock__head">Персональная информация</div>
      <div class="form-wrap">
        <form @submit.prevent="userStore.updateMyProfileData">
          <InputGroup>
            <label for="name">Никнейм</label>
            <InputText
              id="name"
              type="text"
              v-model="userData.user_nicename"
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
            <InputMask
              id="tel"
              type="tel"
              v-model="userData.user_phone"
              placeholder="Введите телефон"
              mask="+7 (999) 999-99-99"
            />
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
            <label>Город</label>
            <InputText type="text" v-model="userData.user_city" placeholder="Введите город" />
          </InputGroup>
          <InputGroup>
            <label>Учебное заведение</label>
            <InputText
              type="text"
              v-model="userData.user_educational_institution.post_title"
              placeholder="Введите учебное заведение"
              disabled
            />
          </InputGroup>
          <InputGroup v-if="userData.user_company">
            <label>Компания</label>
            <InputText
              type="text"
              v-model="userData.user_company"
              placeholder="Введите компанию"
              disabled
            />
          </InputGroup>

          <InputGroup v-if="userData.user_educational_institution">
            <label>Компания</label>
            <InputText
              type="text"
              v-model="userData.user_company"
              placeholder="Введите компанию"
              disabled
            />
          </InputGroup>

          <InputGroup>
            <label>ИНН компании</label>
            <InputText
              type="text"
              v-model="userData.user_inn"
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
        <form @submit.prevent="userStore.updatePassword">
          <InputGroup>
            <label for="password">Текущий пароль</label>
            <Password
              id="password"
              v-model="passwordData.current_password"
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
              v-model="passwordData.new_password"
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
              v-model="passwordData.repeat_password"
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
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  import UserData from './UserData.vue';
  const globalStore = useGlobalStore();
  const { userData } = storeToRefs(globalStore);
  const { user_genderArr } = storeToRefs(globalStore);
  import { useUserStore } from '@/store/userStore';
  const userStore = useUserStore();

  const { passwordData } = storeToRefs(userStore);
</script>
