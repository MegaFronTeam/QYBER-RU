export const useAccreditationStore = defineStore('accreditation', () => {
  const data = ref({
    inn: '',
    leagues: [],
    selectedWorkStudy: '',
    file: {},
    user_educational_institution: '',
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
        data.value.leagues = ['talants'];
      } else if (data.value.selectedWorkStudy === 'work') {
        data.value.leagues = ['atlants'];
      } else if (data.value.selectedWorkStudy === 'work_study') {
        data.value.leagues = ['atlants', 'talants'];
      }
    },
  );

  return {
    data,
    typeUSer,
    setFile,
  };
});
