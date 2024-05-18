export const useGlobalStore = defineStore('global', () => {
  const API_KEY = ref('');
  const email = ref('');
  const userData = ref({}); 
  const user_registered = ref('')
  const user_avatar = ref('')
  const user_first_letter = ref('')
  const leaguesOptions = ref([])
  const isSendVerification = ref(false)

  return {
    API_KEY,
    email,
    userData,
    user_registered,
    user_avatar,
    user_first_letter,
    leaguesOptions,
    isSendVerification
  };
}