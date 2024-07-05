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

  const props = defineProps({
    fetchMethod: {
      type: Function,
      required: true,
    },
  });
  const { fetchMethod } = props;

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
      history.pushState(null, '', path);
      fetchMethod(path);
    }
  };

  onMounted(() => {
    if (history.state && history.state.current.length > 1) {
      const getArr = history.state.current.split('?');
      const path = getArr[1] ? `?${getArr[1]}` : '';
      const leagues = path.match(/leagues=(\d+)/);
      const discipline = path.match(/discipline=(\d+)/);
      // const { leagues, discipline } = history.state;
      // console.log(leagues, discipline);
      filter.value.leagues = leagues ? +leagues[1] : 0;
      filter.value.discipline = discipline ? +discipline[1] : 0;
      changeFilter('leagues', filter.value.leagues, true);
      changeFilter('discipline', filter.value.discipline, true);

      fetchMethod(path);
    } else {
      fetchMethod();
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
