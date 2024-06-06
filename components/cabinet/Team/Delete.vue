<template>
  <Button @click="visibleShow = true" class="p-button p-component btn-trash">
    <svg-icon name="trash.svg" />
  </Button>
  <Dialog v-model:visible="visibleShow" modal header="Вы уверены, что хотите удалить команду?">
    <p>
      В случае если вы удалите команду, вся информация о ней исчезнет без возможности восстановления
    </p>
    <div class="row">
      <div class="col">
        <Button
          severity="primary"
          @click="
            teamStore.deleteTeam(id);
            visibleShow = false;
          "
          outlined
          >Да</Button
        >
      </div>
      <div class="col">
        <Button @click="visibleShow = false">Нет</Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
  const visibleShow = ref(false);
  import { useTeamStore } from '@/store/TeamStore';
  const teamStore = useTeamStore();

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  });
</script>

<style></style>
