import { server } from '../store';
import axios from 'axios';


export const createCourse = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(
      `${server}/createproject`,
      formData,
      config
    );

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/project/${id}`, config);

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const addLecture = (id, fromdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(`${server}/project/${id}`, fromdata, config);

    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteLecture = (courseId, lectureId) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });

    const { data } = await axios.delete(`${server}/lecture?projectId=${courseId}&lectureId=${lectureId}`, config);

    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(
      `${server}/admin/users`,
      config
    );

    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllEnrolledUser = () => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'getAllEnrolledUserRequest' });

    const { data } = await axios.get(
      `${server}/admin/getallenrolledstudents`,
      config
    );

    dispatch({ type: 'getAllEnrolledUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({
      type: 'getAllEnrolledUserFail',
      payload: error.response.data.message,
    });
  }
};

export const cancelUserEnrollment = (id) => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'cancelUserEnrollmentRequest' });

    const { data } = await axios.put(
      `${server}/admin/canceluserenrollment/${id}`, {}, config);

    dispatch({ type: 'cancelUserEnrollmentSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'cancelUserEnrollmentFail',
      payload: error.response.data.message,
    });
  }
};


export const getAllRegisteredIds= () => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'getAllRegisteredIdsRequest' });

    const { data } = await axios.get(
      `${server}/admin/getallenrollmentids`, config);

    dispatch({ type: 'getAllRegisteredIdsSuccess', payload: data.uIds });
  } catch (error) {
    dispatch({
      type: 'getAllRegisteredIdsFail',
      payload: error.response.data.message,
    });
  }
};

export const addRegisteredIds = (regId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addRegisteredIdsRequest' });

    const { data } = await axios.post(`${server}/admin/createenrollment`, {regId}, config);

    dispatch({ type: 'addRegisteredIdsSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addRegisteredIdsFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteRegisteredIds = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteRegisteredIdsRequest' });

    const { data } = await axios.delete(`${server}/admin/deleteenrollment/${id}`, config);

    dispatch({ type: 'deleteRegisteredIdsSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteRegisteredIdsFail',
      payload: error.response.data.message,
    });
  }
};


export const updateUserRole = (id) => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });

    const { data } = await axios.put(
      `${server}/admin/user/${id}`,{ },
      config
    );

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

export const getDashboardStats = () => async (dispatch) => {
  try {
    const config = {
        withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });

    const { data } = await axios.get(`${server}/admin/stats`, config);

    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  }
};