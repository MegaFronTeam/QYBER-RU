<template>
  <div>
    <MainHeader />
    <Welcome />
    <TournamentsListLast />

    <MainContentBlock :sectionTitle="sectionTitleNewsProps" :footerLink="footerLinkNewsProps">
      <NewsCard
        v-for="item of data"
        :newsData="{
          id: item.id,
          title: item.title.rendered,
          date: item.date,
          excerpt: item.excerpt.rendered,
          thumbnail: item.post_thumbnail,
        }"
        :key="item.id"
      />
    </MainContentBlock>
  </div>
</template>

<script setup>
  import { useTournamentStore } from '@/store/TournamentStore';
  const tournamentStore = useTournamentStore();

  const { data } = await useFetch(`https://api.qyber.ru/wp-json/wp/v2/posts`);

  const sectionTitleNewsProps = {
    title: 'Последние новости',
    text: 'Актуальные новости киберспортивных турниров от QYBER.RU',
  };
  const footerLinkNewsProps = {
    text: 'Смотреть все новости',
    href: '/news',
  };
</script>
