<template>
  <div class="sNews">
    <div class="container">
      <div class="template">
        <div class="sNews__list">
          <NewsCard v-if="pending" :skeleton="true" :newsData="{}" v-for="n in 6" />
          <NewsCard
            v-for="item of data"
            v-else
            :newsData="{
              id: item.id,
              title: item.title.rendered,
              date: item.date,
              excerpt: item.excerpt.rendered,
              thumbnail: item.post_thumbnail,
            }"
            :key="item.id"
          />
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
const BASE_URL = import.meta.env.VITE_BASE_URL;
const { data, pending } = await useLazyFetch(`${BASE_URL}/wp/v2/posts`);

const totalRecords = ref(10);
const rowsPerPage = ref([5, 10, 50, 100]);
</script>
