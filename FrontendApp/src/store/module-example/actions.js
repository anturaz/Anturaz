export function someAction(/* context */) {}

export function authenticate({ commit }, payload) {
  if (authService.isLoggedIn()) {
    commit("setUserProfile", payload);
  } else {
    commit("clearUserProfile");
  }
}
