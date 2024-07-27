<template>
  <div class="flex">
    <ul class="sHeaderBlock__filter">
      <li>
        <Button
          v-if="!hideShowAll"
          :class="{ active: filter.leagues === 0 }"
          @click="changeFilter('leagues', 0)"
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
        <Button
          v-if="!hideShowAll"
          :class="{ active: filter.discipline === 0 }"
          @click="changeFilter('discipline', 0)"
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
    hideShowAll: {
      type: Boolean,
      default: false,
    },
  });
  const { fetchMethod, firstAction } = props;

  const filterStore = useFilterStore();

  await filterStore.fetchLeagues();
  await filterStore.fetchDiscipline();

  const { leagues, discipline } = storeToRefs(filterStore);

  const filter = ref({
    leagues: props.hideShowAll ? 9 : 0,
    discipline: props.hideShowAll ? 17 : 0,
  });

  const changeFilter = (key, value, notFetch) => {
    filter.value[key] = +value;

    // Set filter to browser path

    if (notFetch !== true) {
      const { leagues, discipline } = filter.value;
      const path = { ...route.query };

      if (leagues === 0) delete path.leagues;
      else path.leagues = leagues;

      if (discipline === 0) delete path.discipline;
      else path.discipline = discipline;

      window.history.replaceState(null, '', '?' + new URLSearchParams(path).toString());

      fetchMethod('?' + new URLSearchParams(path).toString());
    }
  };

  onMounted(() => {
    changeFilter('leagues', route.query.leagues || filter.value.leagues, true);
    changeFilter('discipline', route.query.discipline || filter.value.discipline, true);

    if (firstAction !== false) {
      if (props.hideShowAll) {
        fetchMethod(`?leagues=${filter.value.leagues}&discipline=${filter.value.discipline}`);
      } else {
        fetchMethod('?' + new URLSearchParams(route.query).toString());
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
