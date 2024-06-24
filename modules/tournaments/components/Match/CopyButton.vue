<template>
  <Button @click="copyText(data)" class="btn-lg" severity="info">
    <div>
      <div class="small-title">{{ title }}</div>
      <div class="btn-text">{{ data }}</div>
    </div>
  </Button>
</template>

<script setup lang="ts">
  // import { useToast } from 'primevue/usetoast';
  const toasts = useToast();
  defineProps<{
    title: string;
    data: string;
  }>();

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toasts.add({
      severity: 'success',
      summary: 'Скопировано',
      detail: ' ',
    });
  };
</script>
