import { configureStore } from "@reduxjs/toolkit";
import materialSlice from './Slice';

const Store = configureStore({
    reducer:{
        material: materialSlice
    }
})

export default Store;