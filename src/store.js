import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
        language: localStorage.getItem('language') || 'EN' // 初始语言值
    };
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
      localStorage.setItem('language', language);
    }
  },
  getters: {
    currentLanguage(state) {
      return state.language;
    }
  }
});

export default store;
