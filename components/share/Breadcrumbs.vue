<template>
  <Breadcrumb :home="home" :model="itemsWithChildren">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span class="" v-html="item.label"> </span>
        </a>
      </router-link>
      <span v-else v-html="item.label"> </span>
    </template>
    <template #separator="">
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.1689 11.8281L6.32739 10.9848L9.48171 7.82812L6.32739 4.67142L7.17129 3.82812L10.3232 6.98483C10.5468 7.20851 10.6724 7.51184 10.6724 7.82812C10.6724 8.14441 10.5468 8.44774 10.3232 8.67142L7.1689 11.8281Z"
          fill="currentColor"
        />
      </svg>
    </template>
  </Breadcrumb>
</template>
<script setup>
  import { ref } from 'vue';
  import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';

  const home = ref({
    label: 'Главная',
    route: '/',
  });

  const breadcrumbsStore = useBreadcrumbsStore();
  const { itemsWithChildren } = storeToRefs(breadcrumbsStore);

  onMounted(() => {
    breadcrumbsStore.createBreadcrumb();
  });
</script>
