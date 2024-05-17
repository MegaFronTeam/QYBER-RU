<template>
  <div>
    <HeaderBlock
      :title="data.title.rendered"
      :breadcrumbArr="breadcrumb"
      :bg="data.post_thumbnail"
      class="sHeaderBlock--content"
    >
      <div class="sHeaderBlock__text" v-html="subtitle"></div>
      <div class="sHeaderBlock__author">
        <div class="sHeaderBlock__author-img">
          <NuxtImg
            v-if="data.author_post.avatar"
            :src="data.author_post.avatar.url"
            :alt="data.author_post.avatar.alt"
          />
        </div>
        <div class="sHeaderBlock__author-title">{{ data.author_post.name }}</div>
        <div class="sHeaderBlock__author-date">{{ formattedDate }}, {{ formattedTime }}</div>
      </div>
    </HeaderBlock>
    <Content :title="data.title.rendered" :content="data.content.rendered" />
    <RelatedNews :data="data.related" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { id } = useRoute().params;
const { data } = await useFetch(`https://qyber.ru/wordpress/wp-json/wp/v2/posts/${id}`);

// console.log(data.value);

const subtitle = data._rawValue.excerpt.rendered;
// console.log(subtitle.split('<'));
const date = new Date(data._rawValue.date);
const formattedDate = date
  .toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  .slice(0, -3);
const formattedTime = date.getHours() + ':' + date.getMinutes();

const breadcrumb = ref([
  { label: 'Новости', route: '/news' },
  { label: data._rawValue.title.rendered },
]);
</script>
