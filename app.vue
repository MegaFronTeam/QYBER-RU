<template>
  <div class="main-wrapper">
    <AppHeader />
    <main>
      <HeaderBlock
        title="Новости"
        :breadcrumbArr="[{ label: 'Новости' }]"
        bg="headerBlock-bg-1.jpg"
      >
        <ul class="sHeaderBlock__filter">
          <li>
            <Button class="active">Все лиги</Button>
          </li>
          <li>
            <Button>Кибер Атланты</Button>
          </li>
          <li>
            <Button>Кибер Таланты</Button>
          </li>
          <li>
            <Button>Все дисциплины</Button>
          </li>
          <li>
            <Button>Counter Strike 2</Button>
          </li>
          <li>
            <Button>Dota 2</Button>
          </li>
        </ul>
      </HeaderBlock>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Subscribe />
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
</style>
