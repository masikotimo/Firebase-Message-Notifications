import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const initialState = {
  driverToken: 'Expoxxxx',
  
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRIVER_TOKEN':
      return { ...state, driverToken: action.driverToken };
    
    // no default
  }
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['counter'],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
