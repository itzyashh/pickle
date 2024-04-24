import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    }

const persistedReducer = persistReducer(persistConfig, reducer);

export default  store =  configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);