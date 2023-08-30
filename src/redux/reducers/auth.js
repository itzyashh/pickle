const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    userData: {},
    isLogged: false,
}

const AuthSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.isLogged = action.payload
        },
        resetUserData: (state) => {
            state.userData = {}
            state.isLogged = false
        }
    }

})

export const {setUserData} = AuthSlice.actions
export default AuthSlice.reducer