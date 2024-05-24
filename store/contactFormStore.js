export const useUserStore = defineStore('user', () => {
  const dataForm = ref({
    email: '',
    password: '',
    phone: '',
    name: '',
    text: '',
  });
});
