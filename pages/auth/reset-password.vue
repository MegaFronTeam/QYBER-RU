<template>
  <template v-if="ifKeyEmail === true">
    <ResetPasswordStep4 v-if="isSendNewPassword === true" />
    <ResetPasswordStep3 v-else />
  </template>
  <template v-else>
    <ResetPasswordStep2 v-if="isSendEmail" />
    <ResetPasswordStep1 v-else />
  </template>
</template>

<script setup>
  definePageMeta({
    layout: 'auth',
  });
  import { useAuthStore } from '@/store/authStore';
  const authStore = useAuthStore();
  const { isSendNewPassword, ifKeyEmail, isSendEmail } = storeToRefs(authStore);
  const router = useRouter();

  onMounted(() => {
    if (router.currentRoute.value.query.key && router.currentRoute.value.query.email) {
      const key = router.currentRoute.value.query.key;
      authStore.key = key || '';
      const email = router.currentRoute.value.query.email;
      authStore.dataFormNewPassword.email = email || '';
    }
  });

  useSeoMeta({
    title: 'Восстановление пароля',
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
</script>
