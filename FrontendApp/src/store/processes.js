const state = {
  processes: "hi",
  apiUrl: "http://10.10.120.43:3030/"
};
const mutations = {
  SET_PROCESSES(state, data) {
    state.processes = data;
  }
};
const actions = {
  initProcesses: ({ commit }) => {
    commit("SET_PROCESSES");
  },
  fetchProcesses: ({ commit }) => {
    // this.$dbCon.service("processes").find({}).then(results => {

    // })
    commit("SET_PROCESSES", "results.data");
  }
};
