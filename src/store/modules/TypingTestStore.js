const getState = () => ({
    test: {
        type: 'word',
        numberOfWords: 10,
    },
});

const getGetters = () => ({
    numberOfWords: state => state.test.numberOfWords,
});

const getActions = () => ({
    async changeNumOfWords({ commit }, number) {
        commit('setNumOfWords', number);
    }
});

const getMutations = () => ({
    setNumOfWords(state, numOfWords) {
        state.test.numberOfWords = parseInt(numOfWords);
    },
});

export default {
    namespaced: true,
    state: getState(),
    getters: getGetters(),
    actions: getActions(),
    mutations: getMutations(),
};
