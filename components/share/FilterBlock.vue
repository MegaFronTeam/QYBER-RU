<template>
  <div class="flex">
    <ul class="sHeaderBlock__filter">
      <li>
        <Button :class="{ active: filter.leagues === 0 }" @click="changeFilter('leagues', 0)"
          >Все лиги</Button
        >
      </li>
      <li v-for="item in leagues" :key="item.id">
        <Button
          :class="{ active: filter.leagues === item.id }"
          @click="changeFilter('leagues', item.id)"
          >{{ item.name }}</Button
        >
      </li>
    </ul>
    <ul class="sHeaderBlock__filter">
      <li>
        <Button :class="{ active: filter.discipline === 0 }" @click="changeFilter('discipline', 0)"
          >Все дисциплины</Button
        >
      </li>
      <li v-for="item in discipline" :key="item.id">
        <Button
          :class="{ active: filter.discipline === item.id }"
          @click="changeFilter('discipline', item.id)"
          >{{ item.name }}</Button
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useFilterStore } from '@/store/FilterStore';
  const router = useRouter();
  const route = useRoute();
  const props = defineProps({
    fetchMethod: {
      type: Function,
      required: true,
    },
    firstAction: {
      type: Boolean,
      default: true,
    },
  });
  const { fetchMethod, firstAction } = props;

  const filterStore = useFilterStore();
  filterStore.fetchLeagues();
  filterStore.fetchDiscipline();
  const { leagues, discipline } = storeToRefs(filterStore);

  const filter = ref({
    leagues: 0,
    discipline: 0,
  });

  const changeFilter = (key, value, notFetch) => {
    filter.value[key] = value;
    console.log(filter.value);
    const { leagues, discipline } = filter.value;
    if (!notFetch) {
      const path = `?${leagues === 0 ? '' : `leagues=${leagues}`}${
        leagues && discipline ? '&' : ''
      }${discipline === 0 ? '' : `discipline=${discipline}`}`;
      // Set filter to browser path
      router.push({
        query: { ...route.query, ...filter.value },
      });
      fetchMethod(path);
    }
  };

  onMounted(() => {
    if (firstAction === true) {
      if (router.currentRoute.value.query.leagues || router.currentRoute.value.query.discipline) {
        filter.value = {
          leagues: Number(router.currentRoute.value.query.leagues) || 0,
          discipline: Number(router.currentRoute.value.query.discipline) || 0,
        };
        changeFilter('leagues', filter.value.leagues, true);
        changeFilter('discipline', filter.value.discipline, true);

        const path = `?${filter.value.leagues === 0 ? '' : `leagues=${filter.value.leagues}`}${
          filter.value.leagues && filter.value.discipline ? '&' : ''
        }${filter.value.discipline === 0 ? '' : `discipline=${filter.value.discipline}`}`;

        fetchMethod(path);
      } else {
        fetchMethod();
      }
    }
  });
</script>

<style scoped>
  .flex {
    display: flex;
    flex-wrap: wrap;
    margin-top: 3rem;
    flex-wrap: wrap;
    /* align-items: center; */
    justify-content: center;
    gap: 20px;
  }
  ul {
    margin-top: 0;
  }
  button.active {
    pointer-events: none;
  }
</style>
