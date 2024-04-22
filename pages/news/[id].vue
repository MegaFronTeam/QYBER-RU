<template>
  <HeaderBlock
    title="Начало турнира Кибер Атланты Осень 2024 по Dota 2"
    :breadcrumbArr="breadcrumb"
    bg="headerBlock-bg-2.jpg"
    class="sHeaderBlock--content"
  >
    <p>Стартовал ежегодный корпоративный турнир Кибер Атланты</p>
    <div class="sHeaderBlock__author">
      <div class="sHeaderBlock__author-img">
        <NuxtImg src="img/avatar-img-1.jpg" alt="author" />
      </div>
      <div class="sHeaderBlock__author-title">Сергей Иванов</div>
      <div class="sHeaderBlock__author-date">30 января 2024, 17:50</div>
    </div>
  </HeaderBlock>
  <Content />
  <!-- <h1>News page with id {{ $route.params.id }}</h1> -->
</template>

<script setup>
const breadcrumb = [
  { label: 'Новости', route: '/news' },
  { label: 'Начало турнира Кибер Атланты Осень 2024 по Dota 2' },
];
</script>
