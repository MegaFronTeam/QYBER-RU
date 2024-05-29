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

      const tournamentIdPages = glob.sync(join(__dirname, 'pages/[id]/*.vue'));

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
        'match',
        'participants',
        'referee',
        'rules',
        'schedule',
      ];

      pagePaths.forEach((pagePath) => {
        // const page = pagePath.match(/\/([^/]+)\.vue$/)[1];
        pages.push({
          name: `tournaments-${pagePath}`,
          path: `/tournaments/:id${pagePath === 'index' ? '' : `/${pagePath}`}`,
          file: resolve(__dirname, `pages/[id]/${pagePath}.vue`),
        });
      });
    });
  },
});
