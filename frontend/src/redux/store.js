import {configureStore} from "@reduxjs/toolkit";
import { profileReducer,  subscriptionReducer,  userReducer } from "./reducers/userReducer";
import { courseReducer, enrollReducer } from './reducers/courseReducer';
import { adminReducer } from "./reducers/adminReducer";
import { otherReducer } from "./reducers/otherReducer";
import { guideProfileReducer, guideReducer } from "./reducers/guideReducer";


const store = configureStore({
    reducer:{
        user: userReducer,
        guide: guideReducer,
        profile: profileReducer,
        guideprofile: guideProfileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
        enroll: enrollReducer,
        admin: adminReducer,
        other: otherReducer,
    },
});

export default store; 

export const server = 'https://prakalpa-server.onrender.com/api';
