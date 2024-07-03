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
      const tournamentPages = glob.sync(join(__dirname, 'pages/*.vue'));

      // const tournamentIdPages = glob.sync(join(__dirname, 'pages/[id]/*.vue'));
      // const tournamentIdPagesMatch = glob.sync(join(__dirname, 'pages/[id]/schedule/[id].vue'));

      tournamentPages.forEach((page) => {
        pages.push({
          name: 'tournaments',
          path: '/tournaments',
          file: resolve(__dirname, page),
        });
      });

      const pagePaths = [
        'contacts',
        'grid',
        'index',
        'participants',
        'referee',
        'rules',
        'schedule',
      ];

      pages.push({
        name: 'tournaments',
        path: '/tournaments',
        file: resolve(__dirname, 'pages/index.vue'),
      });

      pagePaths.forEach((pagePath) => {
        // const page = pagePath.match(/\/([^/]+)\.vue$/)[1];
        if (pagePath === 'schedule') {
          pages.push({
            name: `tournaments-${pagePath}`,
            path: `/tournaments/:id()/schedule`,
            file: resolve(__dirname, `pages/[id]/schedule/index.vue`),
          });
          return;
        }
        pages.push({
          name: `tournaments-${pagePath}`,
          path: `/tournaments/:id()${pagePath === 'index' ? '' : `/${pagePath}`}`,
          file: resolve(__dirname, `pages/[id]/${pagePath}.vue`),
        });
      });

      pages.push({
        name: `tournaments-match`,
        path: `/tournaments/:id()/schedule/:id()`,
        file: resolve(__dirname, `pages/[id]/schedule/[id].vue`),
      });
    });
  },
});
