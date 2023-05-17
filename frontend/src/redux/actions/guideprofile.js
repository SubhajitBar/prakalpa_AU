import { server } from "../store";
import axios from "axios";

export const updateGuideProfile = (name) => async (dispatch) => {
  try {
    dispatch({ type: "updateGuideProfileRequest" });

    const { data } = await axios.put(`${server}/guide/updateprofile`, { name }, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });



    dispatch({ type: "updateGuideProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updateGuideProfileFail", payload: error.response.data.message })
  }
};

export const changeGuidePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "changeGuidePasswordRequest" });
    const { data } = await axios.put(
      `${server}/guide/changepassword`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "changeGuidePasswordSuccess", payload: data.message });
  } catch (error) {

    dispatch({ type: "changeGuidePasswordFail", payload: error.response.data.message, });
  }
};

export const updateGuideProfilePicture = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: 'updateGuideProfilePictureRequest' });

    const { data } = await axios.put(
      `${server}/guide/updateprofilepicture`,
      formdata,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'updateGuideProfilePictureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateGuideProfilePictureFail',
      payload: error.response.data.message,
    });
  }
};

export const forgetGuidePassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetGuidePasswordRequest" });
    const { data } = await axios.post(`${server}/guide/forgetpassword`, { email }, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "forgetGuidePasswordSuccess", payload: data.message });


  } catch (error) {
    dispatch({ type: "forgetGuidePasswordFail", payload: error.response.data.message, });
  }
};

export const resetGuidePassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetGuidePasswordRequest" });

    const { data } = await axios.put(`${server}/guide/resetpassword/${token}`, { password }, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "resetGuidePasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "resetGuidePasswordFail", payload: error.response.data.message });

  }
};

export const addToGuidePlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'addToGuidePlaylistRequest' });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/guide/addtoplaylist`,{id},config);

    dispatch({ type: 'addToGuidePlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addToGuidePlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const removeFromGuidePlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'removeFromGuidePlaylistRequest' });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${server}/guide/removefromplaylist?id=${id}`,
      config
    );

    dispatch({ type: 'removeFromGuidePlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'removeFromGuidePlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const getEnrolledProjectUser = () =>async(dispatch)=>{
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'getEnrolledProjectUserRequest' });

    const { data } = await axios.get(`${server}/guide/enrolledusers`, config);

    dispatch({ type: 'getEnrolledProjectUserSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getEnrolledProjectUserFail',
      payload: error.response.data.message,
    });
  }
}