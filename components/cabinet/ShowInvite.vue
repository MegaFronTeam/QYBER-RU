<template>
  <!-- <div v-if="globalStore.userData.getInvite === false"> -->
  <div>
    <Message
      v-if="myInvites.length"
      v-for="(item, index) in myInvites"
      :key="index"
      :closable="false"
    >
      <div class="me-auto">
        Пользователь {{ item.author }} приглашает Вас в команду {{ item.post_title }}
      </div>
      <!-- TODO: заглушки функций есть в useGlobalStore -->
      <Button
        class="btn-sm"
        severity="info"
        @click="userStore.acceptInvite(item.ID)"
        label="Принять"
      />
      <Button
        class="btn-sm"
        severity="info"
        outlined=""
        @click="userStore.declineInvite(item.ID)"
        label="Отклонить"
      />
    </Message>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/store/userStore';
  const userStore = useUserStore();

  const { myInvites } = storeToRefs(userStore);

  // globalStore.showInvite();
</script>

<style lang="scss" scoped>
  .p-message-text {
    display: flex;
    align-items: center;
  }
  /* Your component's styles here */
</style>
