<template>
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
        />
      </InputGroup>
      <Button type="submit" label="Сохранить изменения" />
    </form>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/userStore';
  const userStore = useUserStore();
  const { passwordData, disabledUpdatePassword } = storeToRefs(userStore);
</script>
