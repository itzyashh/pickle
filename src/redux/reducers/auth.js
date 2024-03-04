const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    userData: {},
}

const AuthSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        resetUserData: (state) => {
            state.userData = {}
            state.isLogged = false
        }
    }

})

export const {setUserData,resetUserData} = AuthSlice.actions
export default AuthSlice.reducer