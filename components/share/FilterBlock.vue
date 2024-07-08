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
  import { ref, onMounted, defineProps } from 'vue';
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
      default: false,
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
    const { leagues, discipline } = filter.value;
    if (!notFetch) {
      let path = route.query;

      path.leagues = leagues;
      path.discipline = discipline;

      if (leagues === 0) delete path.leagues;
      if (discipline === 0) delete path.discipline;

      // Set filter to browser path
      router.push({
        query: { ...route.query, ...path },
      });

      path = new URLSearchParams(path).toString();

      fetchMethod('?' + path);
    }
  };

  onMounted(() => {
    if (firstAction === true) {
      if (route.query.leagues || route.query.discipline) {
        changeFilter('leagues', filter.value.leagues, true);
        changeFilter('discipline', filter.value.discipline, true);
        console.log(route.query.leagues, route.query.discipline);

        filter.value.leagues = +route.query.leagues || 0;
        filter.value.discipline = +route.query.discipline || 0;

        const path = new URLSearchParams(route.query).toString();

        fetchMethod('?' + path);
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
