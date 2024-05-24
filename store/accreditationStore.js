export const useAccreditationStore = defineStore('accreditation', () => {
  const data = ref({
    inn: '',
    leagues: [],
    file: '',
    selectedWorkStudy: '',
    file: {},
    user_educational_institution: '',
  });

  const typeUSer = ref([
    { name: 'Работаю', value: 'work' },
    { name: 'Учусь', value: 'study' },
    { name: 'Учусь и работаю ', value: 'work_study' },
  ]);

  watch(
    () => data.value.selectedWorkStudy,
    () => {
      if (data.value.selectedWorkStudy === 'study') {
        console.log(data.value.selectedWorkStudy);
        data.value.leagues = ['talants'];
      } else if (data.value.selectedWorkStudy === 'work') {
        console.log(data.value.selectedWorkStudy);
        data.value.leagues = ['atlants'];
      } else if (data.value.selectedWorkStudy === 'work_study') {
        console.log(data.value.selectedWorkStudy);
        data.value.leagues = ['atlants', 'talants'];
      }
    },
  );

  return {
    data,
    typeUSer,
  };
});
