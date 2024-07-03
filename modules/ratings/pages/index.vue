<template>
  <div>
    <HeaderBlock title="Рейтинги" bg="/img/headerBlock-bg-9.jpg" class="sHeaderBlock">
      <ul class="sHeaderBlock__filter" v-if="false">
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
          <Button>
            <svg-icon name="cs.svg" />
            Counter Strike 2
          </Button>
        </li>
        <li>
          <Button>
            <svg-icon name="dota.svg" />
            Dota 2
          </Button>
        </li>
      </ul>
    </HeaderBlock>
    <h2 class="container">Рейтинги</h2>
  </div>
</template>
<script setup>
definePageMeta({
  breadcrumbName: 'Рейтинги',
});
</script>
