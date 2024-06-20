import { useGlobalStore } from '../store/globalStore';
export default class GlobalServices {
  static getGlobalStore = () => {
    return useGlobalStore();
  };
  static getHeaders: any = () => {
    const globalStore = useGlobalStore();
    console.log(globalStore.email, globalStore.API_KEY);

    return {
      Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
    };
  };
}
