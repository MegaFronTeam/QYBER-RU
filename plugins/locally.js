export default defineNuxtPlugin(() => {
  const isClient = process.client;
  const localStorage = isClient ? window.localStorage : null;

  return {
    provide: {
      locally: {
        getItem(item) {
          if (localStorage) {
            return localStorage.getItem(item);
          }
        },

        setItem(item, value) {
          if (localStorage) {
            return localStorage.setItem(item, value);
          }
        },
      },

      ifAuthenticated() {
        if (this.$locally.getItem('token') && this.$locally.getItem('email')) {
          return true;
        } else {
          return false;
        }
      }
    },
  };
});
