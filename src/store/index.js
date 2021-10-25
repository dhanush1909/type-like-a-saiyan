import Vue from "vue";
import Vuex from "vuex";
import TypingTestStore from '@/store/modules/TypingTestStore'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { typingTest: TypingTestStore },
});
