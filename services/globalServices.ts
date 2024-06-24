import { useGlobalStore } from '../store/globalStore';
export default class GlobalServices {
  static getGlobalStore = () => {
    return useGlobalStore();
  };
  static getHeaders: any = () => {
    const globalStore = useGlobalStore();

    return {
      Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
    };
  };
}
