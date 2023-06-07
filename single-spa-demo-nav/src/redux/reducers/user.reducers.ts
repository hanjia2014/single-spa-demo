const addUser = (state, data: any) => {
  state.users = [...state.users, data.payload];
}

export const userReducers = {
  addUser
}