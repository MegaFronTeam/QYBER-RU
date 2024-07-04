<template>
  <div class="sNews">
    <div class="container">
      <div class="template">
        <div class="sNews__list">
          <NewsCard v-if="pending" :skeleton="true" :data="{}" v-for="n in 6" />
          <NewsCard v-for="item of data" v-else :data="item" :key="item.id" />
        </div>
      </div>
      <!-- v-if="data.length > rowsPerPage[0]" -->
      <!-- TODO: add paginator -->
      <div v-if="false" class="template template--footer">
        <Paginator
          :rows="rowsPerPage[0]"
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
  </div>
</template>

<script setup>
  import { useNewsStore } from '@/store/NewsStore';
  const newsStore = useNewsStore();
  const { data } = storeToRefs(newsStore);

  const totalRecords = ref(50);

  newsStore.fetchNews(`?per_page=${totalRecords.value}`);

  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
