const getState = () => ({
    test: {
        type: 'Words',
        numberOfWords: 10,
        time: 15,
    },
});

const getGetters = () => ({
    numberOfWords: state => state.test.numberOfWords,
    testType: state => state.test.type,
    testTime: state => state.test.time,
});

const getActions = () => ({
    changeNumOfWords({ commit }, number) {
        commit('setNumOfWords', number);
    },

    changeTestType({ commit }, type) {
        commit('setTestType', type);
        if (type === 'Words') {
            commit('setNumOfWords', 10);
        } else {
            commit('setTestTime', 15);
            commit('setNumOfWords', 75);
        }
    },

    changeTestTime({ commit }, time) {
        commit('setTestTime', time);
        let numberOfWords = parseInt((time / 60) * 300);
        commit('setNumOfWords', numberOfWords);
    }
});

const getMutations = () => ({
    setNumOfWords(state, numOfWords) {
        state.test.numberOfWords = parseInt(numOfWords);
    },

    setTestType(state, type) {
        state.test.type = type;
    },

    setTestTime(state, time) {
        state.test.time = parseInt(time);
    }
});

export default {
    namespaced: true,
    state: getState(),
    getters: getGetters(),
    actions: getActions(),
    mutations: getMutations(),
};
