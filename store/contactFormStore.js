import axios from 'axios';
import { useUserStore } from './userStore';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useToast } from 'primevue/usetoast';

export const useContactStore = defineStore('contact', () => {
  const { agreement } = useUserStore();
  const disabledForm = ref(false);

  const toast = useToast();

  const showToast = (severity, summary, detail) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 10000,
    });
  };

  const dataForm = ref({
    email: '',
    phone: '',
    name: '',
    message: '',
  });

  const submit = async () => {
    console.log(dataForm.value);
    try {
      const response = await axios.post(`${BASE_URL}/feedback/v1/contacts`, dataForm);
      console.log(data);
      const data = await response;

      console.log(data);
      // if (data.status === true) {
      //   showToast('success', 'Заявка отправлена', 'Мы свяжемся с вами в ближайшее время');
      //   passwordData.value = {
      //     current_password: '',
      //     new_password: '',
      //     repeat_password: '',
      //   };
      // }
    } catch (error) {
      console.error(error);
      if (error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((error) => {
          showToast('error', 'Ошибка', error);
        });
      }
      if (error.response.data.message) showToast('error', 'Ошибка', error.response.data.message);

      return Promise.reject(error);
    }
    // return 'Hello Nitro';
  };

  watch(
    () => agreement,
    () => {
      disabledForm.value = !agreement;
    },
  );

  return {
    disabledForm,
    dataForm,
    submit,
  };
});
