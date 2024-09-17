<template>
  <div>
    <HeaderBlock title="Рейтинги" :bg="`/img/headerBlock-bg-1.jpg`">
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
      <SearchBlock />
    </HeaderBlock>
    <RatingBlock />
  </div>
</template>

<script setup lang="ts">
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  const breadcrumbsStore = useBreadcrumbsStore();

  breadcrumbsStore.setNameFromIds();

  const title = 'Рейтинги';

  definePageMeta({
    title: 'Рейтинги',
    breadcrumbName: 'Рейтинги',
  });

  useHead({
    title: 'Рейтинги',
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
</script>
