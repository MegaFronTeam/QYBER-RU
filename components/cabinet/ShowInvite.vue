<template>
  <!-- <div v-if="globalStore.userData.getInvite === false"> -->
  <div  >
    <Message   :closable="false" >
      <div class="me-auto" >Пользователь Nickname приглашает Вас в команду NameTeam</div> 
      <!-- TODO: заглушки функций есть в useGlobalStore -->
      <Button class="btn-sm " severity="info" @click="userStore.acceptInvite" label="Принять" />  
      <Button class="btn-sm "  severity="info" outlined="" @click="userStore.declineInvite" label="Отклонить" />  
    </Message>
  </div>
</template>

<script setup> 
import { useUserStore } from '@/store/userStore';
import { useGlobalStore } from '@/store/globalStore';
const userStore = useUserStore();
const globalStore = useGlobalStore(); 

const visibleShow = ref(false);

// globalStore.showInvite();

</script>

<style lang="scss" scoped>
.p-message-text{
  display: flex;
  align-items: center;
}
/* Your component's styles here */
</style>