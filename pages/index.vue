<template>
  <div>
    <MainHeader />
    <Welcome />
    <MainContentBlock
      :sectionTitle="sectionTitleTournamentsProps"
      :footerLink="footerLinkTournamentsProps"
    >
      Need cards for tournaments
    </MainContentBlock>
    <MainContentBlock :sectionTitle="sectionTitleNewsProps" :footerLink="footerLinkNewsProps">
      Need content for 4 last cards
    </MainContentBlock>
  </div>
</template>

<script setup>
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
  href: '/',
};
</script>
