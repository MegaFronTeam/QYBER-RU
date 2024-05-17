// import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: ['user1', 'user2', 'user3'],
  }),
  actions: {
    loginUSer() {
      // login logic
    },
    logoutUser() {
      // logout logic
    },
  },
});