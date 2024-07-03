import { fileURLToPath } from 'url';
import { dirname } from 'path';
const { join } = require('path');
import glob from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { defineNuxtModule, extendPages } from '@nuxt/kit';
import { resolve } from 'pathe';

export default defineNuxtModule({
  components: true,
  store: true,
  utils: true,
  setup() {
    extendPages((pages) => {
      const RatingsPages = glob.sync(join(__dirname, 'pages/*.vue'));

      RatingsPages.forEach((page) => {
        pages.push({
          name: 'ratings',
          path: '/ratings',
          file: resolve(__dirname, page),
        });
      });

      const pagePaths = ['index', 'team'];

      pages.push({
        name: 'ratings',
        path: '/ratings',
        file: resolve(__dirname, 'pages/index.vue'),
      });

      pagePaths.forEach((pagePath) => {
        // const page = pagePath.match(/\/([^/]+)\.vue$/)[1];
        if (pagePath === 'team') {
          pages.push({
            name: `ratings-${pagePath}`,
            path: `/ratings/:id()`,
            file: resolve(__dirname, `pages/[id]/team/index.vue`),
          });
          return;
        }
        pages.push({
          name: `ratings-${pagePath}`,
          path: `/ratings`,
          file: resolve(__dirname, `pages/index.vue`),
        });
      });

      pages.push({
        name: `ratings-user`,
        path: `/ratings/:id()/:id()`,
        file: resolve(__dirname, `pages/[id]/team/[id].vue`),
      });
    });
  },
});
