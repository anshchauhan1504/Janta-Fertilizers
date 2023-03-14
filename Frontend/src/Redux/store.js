import { configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartredux"
import userSlice from "./userSlice";


export default configureStore({
    reducer:{
        cart:cartReducer,
        user:userSlice,
    },
})