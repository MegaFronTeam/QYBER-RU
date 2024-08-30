<template>
  <div>
    <HeaderBlock
      :title="dataById.title.rendered"
      :bg="dataById.post_thumbnail"
      class="sHeaderBlock--content"
    >
      <div class="sHeaderBlock__text" v-html="dataById.excerpt.rendered"></div>
      <div class="sHeaderBlock__author">
        <div class="sHeaderBlock__author-img">
          <img
            v-if="dataById.author_post.avatar"
            :src="dataById.author_post.avatar.url"
            :alt="dataById.author_post.avatar.alt"
          />
        </div>
        <!-- <div class="sHeaderBlock__author-title">{{ dataById.author_post.name }}</div> -->
        <div class="sHeaderBlock__author-date">
          {{ dataById.formattedDate }}
        </div>
      </div>
    </HeaderBlock>
    <Content :title="dataById.title.rendered" :content="dataById.content.rendered" />
    <RelatedNews v-if="data.length" :data="data" />
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';
  import { useNewsStore } from '~/store/NewsStore';

  const breadcrumbsStore = useBreadcrumbsStore();

  const { id } = useRoute().params;

  const newsStore = useNewsStore();
  await newsStore.fetchNewsById(id);

  const { dataById, data } = storeToRefs(newsStore);

  breadcrumbsStore.setNameFromIds(dataById.value.title.rendered);

  useSeoMeta({
    title: dataById.value.title.rendered,
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
  //
</script>
