<template>
  <div>
    <MainHeader />
    <Welcome />
    <TournamentsListLast />

    <MainContentBlock :sectionTitle="sectionTitleNewsProps" :footerLink="footerLinkNewsProps">
      <NewsCard v-for="item of data" :data="item" :key="item.id" />
    </MainContentBlock>
  </div>
</template>

<script setup>
  import { useNewsStore } from '@/store/NewsStore';
  const newsStore = useNewsStore();
  const { data } = storeToRefs(newsStore);
  newsStore.fetchNews('?per_page=4');

  const sectionTitleNewsProps = {
    title: 'Последние новости',
    text: 'Актуальные новости киберспортивных турниров от QYBER.RU',
  };
  const footerLinkNewsProps = {
    text: 'Смотреть все новости',
    href: '/news',
  };
</script>
