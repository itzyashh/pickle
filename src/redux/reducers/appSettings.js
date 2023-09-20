const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   language: "en",
   isDark:true,
}

const AppSettingSlice = createSlice({
    name: "appSettings",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setTheme: (state, action) => {
            state.isDark = action.payload
        },
        resetUserData: (state) => {
            state.isDark = true
            state.language = "en"
        }
    }

})

export const {setLanguage,setTheme} = AppSettingSlice.actions
export default AppSettingSlice.reducer