<template>
  <div class="wrap-footer">
    <div class="template template--footer">
      <Paginator
        :rows="parePage"
        :totalRecords="totalRecords"
        :rowsPerPageOptions="rowsPerPage"
        :pageLinkSize="4"
      >
        <template #start="slotProps">
          Показано от {{ slotProps.state.page * slotProps.state.rows + 1 }} до
          {{
            slotProps.state.first + slotProps.state.rows > totalRecords
              ? totalRecords
              : slotProps.state.first + slotProps.state.rows
          }}
          из {{ totalRecords }} данных
        </template>
      </Paginator>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const parePage = ref(10);
  const totalRecords = ref(100);
  const rowsPerPage = ref([10, 50, 100]);
</script>

<style></style>
