<template>
  <div>
    <ProfileHead img="teamData.post_thumbnail">
      <h1 class="mb-12">123w</h1>
      <div class="row mb-12">
        <div class="col-auto">
          <Badge severity="secondary" value="Кибер атланты" class="p-badge-outline" />
        </div>
        <div class="col-auto">
          <Badge severity="danger" value="Кибер таланты" class="p-badge-outline" />
        </div>
        <div class="col-auto">
          <span class="p-badge p-badge-gray"> Dota 2 </span>
        </div>
      </div>
      <span class="sProfileHead__name mb-12">Latvia</span>
      <div class="sProfileHead__time mb-0">ИНН 777777777777</div>
    </ProfileHead>
    <div v-if="false" class="container table-skeleton" style="margin-bottom: 0.8rem">
      <Skeleton height="3rem" borderRadius="12px" style="margin-bottom: 0.8rem" />
      <div class="d-flex align-items-center" style="margin-bottom: 0.5rem">
        <Skeleton shape="circle" size="3rem" style="margin-right: 0.8rem; flex: 0 0 auto" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" />
      </div>
      <div class="d-flex align-items-center" style="margin-bottom: 0.5rem">
        <Skeleton shape="circle" size="3rem" style="margin-right: 0.8rem; flex: 0 0 auto" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" />
      </div>
      <div class="d-flex align-items-center" style="margin-bottom: 0.5rem">
        <Skeleton shape="circle" size="3rem" style="margin-right: 0.8rem; flex: 0 0 auto" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" />
      </div>
    </div>
    <CabinetTeamBlock v-else :teamData="jsonData" />
  </div>
</template>

<script setup>
import ProfileHead from '~/components/cabinet/ProfileHead.vue';
import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

const breadcrumbsStore = useBreadcrumbsStore();

const jsonData = {
  ID: 449,

  post_date: '2024-07-01 14:43:36',

  post_content: '',

  post_title: 'PAVEL KHALUNIN update',

  post_excerpt: '',

  post_status: 'publish',

  post_name: 'pavel-khalunin',

  post_modified: '2024-07-01 14:43:36',

  post_thumbnail: 'https://api.qyber.ru/wp-content/uploads/2024/06/ipo-bg.jpg',

  members: [
    {
      id: '14',

      user_login: 'wol1414@gmail.com',

      user_nicename: 'wol1414gmail-com',

      user_nickname: 'wol1414@gmail.com',

      user_first_name: 'PAVEL',

      user_last_name: 'KHALUNIN',

      user_email: 'wol1414@gmail.com',

      active: true,

      role: { value: 'captain', label: 'Капитан' },

      avatar: {
        ID: 1295,

        id: 1295,

        title: 'Screenshot-at-Jan-22-14-30-51-11',

        filename: 'Screenshot-at-Jan-22-14-30-51-11.png',

        filesize: 438183,

        url: 'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

        link: 'https://api.qyber.ru/screenshot-at-jan-22-14-30-51-11/',

        alt: '',

        author: '14',

        description: '',

        caption: '',

        name: 'screenshot-at-jan-22-14-30-51-11',

        status: 'inherit',

        uploaded_to: 0,

        date: '2024-05-31 18:52:01',

        modified: '2024-05-31 18:52:01',

        menu_order: 0,

        mime_type: 'image/png',

        type: 'image',

        subtype: 'png',

        icon: 'https://api.qyber.ru/wp-includes/images/media/default.png',

        width: 0,

        height: 0,

        sizes: {
          thumbnail:
            'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

          'thumbnail-width': 1,

          'thumbnail-height': 1,

          medium:
            'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

          'medium-width': 1,

          'medium-height': 1,

          medium_large:
            'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

          'medium_large-width': 1,

          'medium_large-height': 1,

          large:
            'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

          'large-width': 1,

          'large-height': 1,

          '1536x1536':
            'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

          '1536x1536-width': 1,

          '1536x1536-height': 1,

          '2048x2048':
            'https://api.qyber.ru/wp-content/uploads/2024/05/Screenshot-at-Jan-22-14-30-51-11.png',

          '2048x2048-width': 1,

          '2048x2048-height': 1,
        },
      },
    },

    {
      id: '18',

      user_login: 'janis.paberzs18@gmail.com',

      user_nicename: 'janis-paberzs18gmail-com',

      user_nickname: 'janis.paberzs18@gmail.com',

      user_first_name: 'Имя',

      user_last_name: 'и',

      user_email: 'janis.paberzs18@gmail.com',

      active: true,

      role: { value: 'player', label: 'Игрок' },

      avatar: {
        ID: 1292,

        id: 1292,

        title: 'free-avatar-370-456322-1-1',

        filename: 'free-avatar-370-456322-1-1.webp',

        filesize: 8646,

        url: 'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

        link: 'https://api.qyber.ru/free-avatar-370-456322-1-1/',

        alt: '',

        author: '18',

        description: '',

        caption: '',

        name: 'free-avatar-370-456322-1-1',

        status: 'inherit',

        uploaded_to: 0,

        date: '2024-05-31 15:44:52',

        modified: '2024-05-31 15:44:52',

        menu_order: 0,

        mime_type: 'image/webp',

        type: 'image',

        subtype: 'webp',

        icon: 'https://api.qyber.ru/wp-includes/images/media/default.png',

        width: 0,

        height: 0,

        sizes: {
          thumbnail:
            'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

          'thumbnail-width': 1,

          'thumbnail-height': 1,

          medium: 'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

          'medium-width': 1,

          'medium-height': 1,

          medium_large:
            'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

          'medium_large-width': 1,

          'medium_large-height': 1,

          large: 'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

          'large-width': 1,

          'large-height': 1,

          '1536x1536':
            'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

          '1536x1536-width': 1,

          '1536x1536-height': 1,

          '2048x2048':
            'https://api.qyber.ru/wp-content/uploads/2024/05/free-avatar-370-456322-1-1.webp',

          '2048x2048-width': 1,

          '2048x2048-height': 1,
        },
      },
    },
  ],

  discipline: [
    {
      term_id: 17,

      name: 'Counter-Strike 2',

      slug: 'counter-strike-2',

      term_group: 0,

      term_taxonomy_id: 17,

      taxonomy: 'discipline',

      description: '',

      parent: 0,

      count: 51,

      filter: 'raw',
    },
  ],

  leagues: [
    {
      term_id: 9,

      name: 'QYBER Атланты',

      slug: 'atlants',

      term_group: 0,

      term_taxonomy_id: 9,

      taxonomy: 'leagues',

      description: '',

      parent: 0,

      count: 50,

      filter: 'raw',
    },
  ],

  tournaments: [
    {
      ID: 1060,

      date: '2024-07-01 18:00:00',

      post_title: 'Атланты Лето 2024 | Dota 2',

      discipline: [
        {
          term_id: 17,

          name: 'Counter-Strike 2',

          slug: 'counter-strike-2',

          term_group: 0,

          term_taxonomy_id: 17,

          taxonomy: 'discipline',

          description: '',

          parent: 0,

          count: 51,

          filter: 'raw',
        },
      ],

      leagues: [
        {
          term_id: 9,

          name: 'QYBER Атланты',

          slug: 'atlants',

          term_group: 0,

          term_taxonomy_id: 9,

          taxonomy: 'leagues',

          description: '',

          parent: 0,

          count: 50,

          filter: 'raw',
        },
      ],

      format: '5x5',

      count_commands: 11,

      prize_fund: 17000,
    },

    {
      ID: 836,

      date: '2024-05-01 18:00:00',

      post_title: 'Таланты Лето 2024 | Dota 2',

      discipline: [
        {
          term_id: 17,

          name: 'Counter-Strike 2',

          slug: 'counter-strike-2',

          term_group: 0,

          term_taxonomy_id: 17,

          taxonomy: 'discipline',

          description: '',

          parent: 0,

          count: 51,

          filter: 'raw',
        },
      ],

      leagues: [
        {
          term_id: 9,

          name: 'QYBER Атланты',

          slug: 'atlants',

          term_group: 0,

          term_taxonomy_id: 9,

          taxonomy: 'leagues',

          description: '',

          parent: 0,

          count: 50,

          filter: 'raw',
        },

        {
          term_id: 10,

          name: 'QYBER Таланты',

          slug: 'talants',

          term_group: 0,

          term_taxonomy_id: 10,

          taxonomy: 'leagues',

          description: '',

          parent: 0,

          count: 15,

          filter: 'raw',
        },
      ],

      format: '5x5',

      count_commands: 13,

      prize_fund: 100000,
    },
  ],
};

onMounted(() => {
  breadcrumbsStore.setNameFromIds('123w');
});
</script>
