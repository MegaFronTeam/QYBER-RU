<template>
  <div class="sNews">
    <div class="container">
      <div class="template">
        <div class="sNews__list">
          <NewsCard v-for="item of data" :newsData="item" :key="item.id" />
        </div>
      </div>
      <!-- v-if="data.length > rowsPerPage[0]" -->
      <div class="template template--footer">
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
const { data: data } = await useLazyFetch('https://qyber.ru/wordpress/wp-json/wp/v2/posts');

const totalRecords = ref(120);
const rowsPerPage = ref([10, 50, 100]);
</script>
