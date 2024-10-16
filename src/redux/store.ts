import localStorage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import { pokemonApi } from './pokemon';
// import thunk from "redux-thunk"

// Combines all reducers
const reducers = combineReducers({
    [pokemonApi.reducerPath]: pokemonApi.reducer,
})

  // Function to localstore redux state
const persistConfig = {
    // Key property: root
    key: "root",
    // Version
    version: 1,
    // Sets localstorage as the type of storage to use
    storage: localStorage,
    // Blacklist the pokemonApi reducer (It still recives the rehydrate action for some reason)
    blacklist: [pokemonApi.reducerPath]
}

// Persistor to remember the state
const persistedReducer = persistReducer(persistConfig, reducers)

// Function to configure the store
const Store = configureStore({
    // The combinded reducer
    reducer: persistedReducer,
    // Middleware
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(pokemonApi.middleware)
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

// Exporting the full Redux Store
export default Store
