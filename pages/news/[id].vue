<template>
  <div>
    <HeaderBlock
      :title="data.title.rendered"
      :bg="data.post_thumbnail"
      class="sHeaderBlock--content"
    >
      <div class="sHeaderBlock__text" v-html="subtitle"></div>
      <div class="sHeaderBlock__author">
        <div class="sHeaderBlock__author-img">
          <img
            v-if="data.author_post.avatar"
            :src="data.author_post.avatar.url"
            :alt="data.author_post.avatar.alt"
          />
        </div>
        <!-- <div class="sHeaderBlock__author-title">{{ data.author_post.name }}</div> -->
        <div class="sHeaderBlock__author-date">{{ formattedDate }}, {{ formattedTime }}</div>
      </div>
    </HeaderBlock>
    <Content :title="data.title.rendered" :content="data.content.rendered" />
    <RelatedNews :data="data.related" />
  </div>
</template>

<!-- TODO: move to store -->
<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';

const breadcrumbsStore = useBreadcrumbsStore();

const { id } = useRoute().params;
const { data } = await axios.get(`https://api.qyber.ru/wp-json/wp/v2/posts/${id}`);
// const router = useRoute();

// console.log(data);
// const title = ref('');
// title.value = data.title.rendered;
// definePageMeta({
//   breadcrumbName: 'Статья',
// });

const subtitle = data.excerpt.rendered;
// console.log(subtitle.split('<'));
const date = new Date(data.date);
const formattedDate = date
  .toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  .slice(0, -3);
const formattedTime = date.getHours() + ':' + date.getMinutes();
// console.log(router);

onMounted(() => {
  breadcrumbsStore.setNameFromIds(data.title.rendered);
});
</script>
