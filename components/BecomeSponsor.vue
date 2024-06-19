<template>
  <Button class="sHeaderBlock__btn" label="Стать спонсором" @click="visibleShow = true" />
  <Dialog
    v-model:visible="visibleShow"
    modal
    :header="true ? 'Оставить заявку' : 'Заявка отправлена'"
  >
    <div class="form-wrap">
      <transition name="fade">
        <form @submit.prevent="sponsorStore.submit" v-if="true">
          <InputGroup>
            <label for="name">Имя</label>
            <InputText id="name" type="text" v-model="dataForm.name" placeholder="Введите имя" />
          </InputGroup>
          <InputGroup>
            <label for="organization">Должность</label>
            <InputText
              id="organization"
              type="text"
              v-model="dataForm.organization"
              placeholder="Должность"
            />
          </InputGroup>

          <InputGroup>
            <label for="jobtitle">Организация</label>
            <InputText
              id="jobtitle"
              type="text"
              v-model="dataForm.jobtitle"
              placeholder="Название организации"
            />
          </InputGroup>

          <InputGroup>
            <label for="tel">Телефон</label>
            <InputMask
              id="tel"
              type="tel"
              v-model="dataForm.phone"
              mask="+7 (999) 999-99-99"
              placeholder="+7 (___) ___-__-__"
            />
          </InputGroup>
          <InputGroup>
            <label for="email">Email</label>
            <InputText
              id="email"
              type="email"
              v-model="dataForm.email"
              placeholder="Введите ваш Email"
            />
          </InputGroup>
          <InputGroup>
            <label for="textarea">Ваше сообщение</label>
            <Textarea
              id="textarea"
              v-model="dataForm.message"
              placeholder="Введите ваше сообщение"
              autoResize
            />
          </InputGroup>
          <ShareAgreementForm />
          <Button
            type="submit"
            class="btn-lg"
            :disabled="disabledForm === true ? 'disabled' : false"
            >Отправить</Button
          >
        </form>
        <div v-else>
          <p>Мы свяжемся с Вами в ближайшее время</p>
          <Button @click="visibleShow = false" label="Закрыть" />
        </div>
      </transition>
    </div>
  </Dialog>
</template>

<script setup>
  // import { User } from '@/services/user';

  import { useSponsorStore } from '~/store/sponsorFormStore';
  const sponsorStore = useSponsorStore();
  const { disabledForm, dataForm } = storeToRefs(sponsorStore);

  const visibleShow = ref(false);
</script>

<style lang="scss" scoped>
  /* Your component's styles here */
</style>
