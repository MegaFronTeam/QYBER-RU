import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: () => ({
    items: [],
  }),
  actions: {
    createBreadcrumb() {
      const router = useRouter();
      this.items = [];
      const routes = router.options.routes || [];
      const currPagePathArr = router.currentRoute.value.matched[0].path
        .split('/')
        .filter((item) => item !== '')
        .map((item) => '/' + item);
      // console.log('Current Route: ', currPagePathArr);
      // console.log('All routes: ', routes);
      let customPath = '';
      currPagePathArr.forEach((route, index) => {
        customPath += route;
        const result = routes.find((item) => item.path === customPath);

        if (result) {
          if (currPagePathArr.length === index + 1) {
            this.items.push({
              label: result.meta.breadcrumbName,
            });
          } else {
            this.items.push({
              label: result.meta.breadcrumbName,
              route: result.path,
            });
          }
        }
      });
      // console.log('Results: ', this.items);
    },
  },
});
