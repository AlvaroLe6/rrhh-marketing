
import { defineStore } from 'pinia';

export const useStateCheckbox = defineStore('stateCheckbox', {
  state: () => ({
    marketingDisabled: false,
    adminDisabled: false,
    docenteDisabled: false,
  }),
  actions: {
    toggleMarketing() {
      this.marketingDisabled = !this.marketingDisabled;
    },
    toggleAdmin() {
      this.adminDisabled = !this.adminDisabled;
    },
    toggleDocente() {
      this.docenteDisabled = !this.docenteDisabled;
    },
  },
});
