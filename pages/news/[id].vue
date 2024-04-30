<template>
  <HeaderBlock
    :title="data.title.rendered"
    :breadcrumbArr="breadcrumb"
    bg="headerBlock-bg-2.jpg"
    class="sHeaderBlock--content"
  >
    <p>{{ data.excerpt.rendered }}</p>
    <div class="sHeaderBlock__author">
      <div class="sHeaderBlock__author-img">
        <NuxtImg src="img/avatar-img-1.jpg" alt="author" />
      </div>
      <div class="sHeaderBlock__author-title">Сергей Иванов</div>
      <div class="sHeaderBlock__author-date">{{ formattedDate }}, {{ formattedTime }}</div>
    </div>
  </HeaderBlock>
  <Content :title="data.title.rendered" :content="data.content.rendered" />
</template>

<script setup>
import { ref } from 'vue';

const { id } = useRoute().params;
const { data } = await useFetch(`https://qyber.ru/wordpress/wp-json/wp/v2/posts/${id}`);

// console.log(data._rawValue);

const date = new Date(data._rawValue.date);
const formattedDate = date
  .toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  .slice(0, -3);
const formattedTime = date.getHours() + ':' + date.getMinutes();

const breadcrumb = ref([
  { label: 'Новости', route: '/news' },
  { label: data._rawValue.title.rendered },
]);
</script>
