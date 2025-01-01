import { createSlice, configureStore } from '@reduxjs/toolkit'

const StateUtilitySlice = createSlice({
  name: 'state',
  initialState: {state: {}},
  reducers: {
    add: (state, data) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const value = JSON.parse(data.payload.payload)
      const key = data.payload.type
      const newState = {...state.state, [key]: value}

      state.state = newState;
    },
    remove: (state, key) => {
      if (state.state[key.payload]) {
        delete state.state[key.payload];
      }
    }
  }
})

export const { add, remove } = StateUtilitySlice.actions

const StateUtility = configureStore({
  reducer: StateUtilitySlice.reducer
})

export {StateUtility}