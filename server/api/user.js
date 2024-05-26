// const BASE_URL = import.meta.env.VITE_BASE_URL;
// import axios from 'axios';
// import { useGlobalStore } from './globalStore';
// const globalStore = useGlobalStore();
// import { useAccreditationStore } from '@/store/accreditationStore';
// const accreditation = useAccreditationStore();

// export default class User {
//   static async sendAccreditation() {
//     try {
//       const response = await axios.post(`${BASE_URL}/profile/v1/verification`, accreditation.data, {
//         headers: {
//           Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(data);
//       const data = await response.data;
//       if (data.success === true) {
//         // getUserData();
//         globalStore.in_verifications = true;
//       }
//     } catch (error) {
//       console.error(error);
//       return Promise.reject(error);
//     }
//   }
// }
