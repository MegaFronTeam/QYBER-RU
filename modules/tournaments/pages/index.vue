<template>
  <div>
    <HeaderBlock title="Турниры" bg="/img/headerBlock-bg-9.jpg" class="sHeaderBlock">
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
    <TournamentList />
  </div>

  <!-- <TournamentsListLast /> -->
</template>
<script setup>
import TournamentList from '../components/TournamentList.vue';

definePageMeta({
  breadcrumbName: 'Турниры',
});
</script>
