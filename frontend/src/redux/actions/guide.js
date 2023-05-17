import { server } from "../store";
import axios from "axios";


export const loadGuide = () => async (dispatch) => {
    try {
        dispatch({ type: "loadGuideRequest" });
        const { data } = await axios.get(`${server}/guide/me`, { withCredentials: true });

        dispatch({ type: 'loadGuideSuccess', payload: data.user });

    } catch (error) {
        dispatch({ type: 'loadGuideFail',  });

    }
};


export const guideLogin = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: "guideLoginRequest" });

        const { data } = await axios.post(`${server}/guide/login`, { email, password }, {
            headers: {
                "Content-type": "application/json"
            }, withCredentials: true,
        });

        dispatch({ type: 'guideLoginSuccess', payload: data });


    } catch (error) {
        dispatch({ type: 'guideLoginFail', payload: error.response.data.message });

    }
}

export const guideRegister = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: "guideRegisterRequest" });

        const { data } = await axios.post(`${server}/guide/register`, formdata, {
            headers: {
                "Content-type": "multipart/form-data",
            }, withCredentials: true,
        });

        dispatch({ type: 'guideRegisterSuccess', payload: data });


    } catch (error) {
        dispatch({ type: 'guideRegisterFail', payload: error.response.data.message });

    }
};

export const guideLogout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutGuideRequest" });

        const { data } = await axios.get(`${server}/guide/logout`, { withCredentials: true, });

        dispatch({ type: 'logoutGuideSuccess', payload: data.message });


    } catch (error) {
        dispatch({ type: 'logoutGuideFail', payload: error.response.data.message });

    }
};
