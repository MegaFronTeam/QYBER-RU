<template>
  <div class="checkbox">
    <Checkbox v-model="agreement" inputId="agreement" value="agreement" required />
    <label for="agreement">
      Даю согласие на обработку и хранение моих персональных данных в соответствии с
      <a href="https://api.qyber.ru/wp-content/uploads/2024/05/privacy-policy.pdf" target="_blank"
        >условиями политики конфиденциальности</a
      >
    </label>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/userStore';
  const userStore = useUserStore();
  const { agreement } = storeToRefs(userStore);
</script>
