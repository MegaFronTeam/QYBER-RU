<template>
  <div>
    <MainHeader />
    <Welcome />
    <MainContentBlock :sectionTitle="sectionTitleTournamentsProps">
      В разработке...
    </MainContentBlock>
    <MainContentBlock :sectionTitle="sectionTitleNewsProps" :footerLink="footerLinkNewsProps">
      <NewsCard
        v-for="item of data.related"
        :newsData="{
          id: item.ID,
          title: item.post_title,
          date: item.post_date,
          excerpt: item.post_excerpt,
          thumbnail: item.post_thumbnail,
        }"
        :key="item.id"
      />
    </MainContentBlock>
  </div>
</template>

<script setup>
const { data } = await useFetch(`https://qyber.ru/wordpress/wp-json/wp/v2/posts/1`);
const sectionTitleTournamentsProps = {
  title: 'Ближайшие турниры',
  text: 'Ты лидер команды? Подай заявку на участие в ближайшем турнире!',
};
const footerLinkTournamentsProps = {
  text: 'Смотреть все турниры',
  href: '/',
};
const sectionTitleNewsProps = {
  title: 'Последние новости',
  text: 'Актуальные новости киберспортивных турниров от QYBER.RU',
};
const footerLinkNewsProps = {
  text: 'Смотреть все новости',
  href: '/news',
};
</script>
