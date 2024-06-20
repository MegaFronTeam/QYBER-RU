import { useGlobalStore } from './globalStore';

export const useAccreditationStore = defineStore('accreditation', () => {
  const globalStore = useGlobalStore();
  const data = ref({
    inn: '',
    leagues: [],
    selectedWorkStudy: '',
    file: {},
    educational_institution: '',
  });

  const typeUSer = ref([
    { name: 'Работаю', value: 'work' },
    { name: 'Учусь', value: 'study' },
    { name: 'Учусь и работаю ', value: 'work_study' },
  ]);

  const setFile = (file) => {
    data.value.file = file;
  };
  watch(
    () => data.value.selectedWorkStudy,
    () => {
      if (data.value.selectedWorkStudy === 'study') {
        data.value.leagues = [9];
      } else if (data.value.selectedWorkStudy === 'work') {
        data.value.leagues = [10];
      } else if (data.value.selectedWorkStudy === 'work_study') {
        data.value.leagues = [10, 9];
      }
      console.log(data.value.leagues);
    },
  );

  return {
    data,
    typeUSer,
    setFile,
  };
});
