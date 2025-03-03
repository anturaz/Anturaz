export function updateDrawerState(state, val) {
  state.drawerState = val;
}

export function setUserProfile(state, payload) {
  state.isLoggedIn = true;
  state.user_profile = payload;
}

export function clearUserProfile(state) {
  state.isLoggedIn = false;
  state.user_profile = {};
}
