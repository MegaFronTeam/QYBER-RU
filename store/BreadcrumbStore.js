import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: () => ({
    items: [],
    lastBreadcrumb: [],
  }),
  getters: {
    itemsWithChildren(state) {
      if (!state.items.length) return [];
      if (!state.lastBreadcrumb.length) return state.items;
      return [...state.items, ...state.lastBreadcrumb];
    },
  },
  actions: {
    // setName(label) {
    //   // console.log(label);
    //   this.lastBreadcrumb.label = label;
    //   return label;
    // },

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
        if (result && result.meta && result.meta.breadcrumbName) {
          if (result.path) {
            this.items.push({
              label: result.meta.breadcrumbName,
              route: result.path,
            });
          } else {
            console.log(2);
            this.items.push({
              label: result.meta.breadcrumbName,
            });
          }
        }
      });
    },

    setNameFromIds(bread) {
      if (this.lastBreadcrumb[0]) {
        this.lastBreadcrumb = [];
      }
      console.log('Bread: ', bread);

      if (!bread) return;
      if (typeof bread === 'string') {
        this.lastBreadcrumb.push({ label: bread });
      } else {
        console.log('Bread: ', bread);
        this.lastBreadcrumb = bread;
      }
    },
  },
});
