<template>
  <div>
    <Button
      class="ms-auto btn-sm mb-3"
      severity="primary"
      style="margin-bottom: 1.5rem;"
      outlined
      @click="
        visibleShow = true;
        isSend = false;
      "
      label="Пригласить в команду"
    />

    <Dialog v-model:visible="visibleShow" modal header="Пригласить в команду">
      <div class="form-wrap">
        <transition name="fade">
          <form @submit.prevent="teamStore.inviteMember()" v-if="!teamStore.isCreate">
            <InputGroup>
              <label for="name">Email</label>
              <InputText
                id="name"
                type="email"
                v-model="teamStore.inviteEmail"
                placeholder="Введите email участника"
              />
            </InputGroup>
            <Button type="submit" class="btn-lg">Выслать приглашение</Button>
          </form>
          <div v-else>
            <p>Приглашение успешно отправлено</p>
            <Button @click="visibleShow = false" label="Закрыть" />
          </div>
        </transition>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
// TODO: переделать на Store
const visibleShow = ref(false);
import {useTeamStore} from '@/store/TeamStore';
const  teamStore = useTeamStore();

</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>
