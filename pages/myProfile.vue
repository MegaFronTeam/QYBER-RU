<template>
  <ProfileHead :breadcrumbArr="[{ label: 'Игроки', route: '/' }, { label: 'Рейтинги' }]">
    <h1 class="verifired">mihailivanov</h1>
    <span class="sProfileHead__name">Михаил Иванов</span>
    <div class="sProfileHead__status online">Онлайн</div>
    <div class="sProfileHead__time">На сайте с 20 декабря 2023</div>
    <div class="row">
      <div class="col-auto">
        <Badge severity="secondary" value="Кибер Таланты" class="p-badge-outline" />
      </div>
      <div class="col-auto">
        <Badge severity="danger" value="Кибер Атланты" class="p-badge-outline" />
      </div>
    </div>
  </ProfileHead>
  <MyProfileBlock />
</template>

<script></script>
