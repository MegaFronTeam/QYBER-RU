// import axios from 'axios';
// import { useUserStore } from './userStore';
// import { useContactStore } from '@/store/contactFormStore';
// // import { getEmailErrorsList, getPasswordErrorsList } from '~/utils/errorMessages';

// export default contactForm(async () => {
//   const BASE_URL = import.meta.env.VITE_BASE_URL;
//   const { dataForm, disabledBtn } = useContactStore();
//   const { agreement } = useUserStore();

//   if (!agreement) {
//     disabledBtn.value = true;
//   }
//   console.log(dataForm);
//   const response = await axios.post(`${BASE_URL}/contact/v1/send`, dataForm, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   console.log(data);
//   return await response;

//   // return 'Hello Nitro';
// });
