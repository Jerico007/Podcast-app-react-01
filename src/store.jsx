import { configureStore,combineSlices } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";

import podcastsReducer from "./Slices/podcastsSilce";

const rootReducer = combineSlices({
    user:userReducer,
    podcasts:podcastsReducer,
})

const store = configureStore({
    reducer:rootReducer
    
});

export default store;