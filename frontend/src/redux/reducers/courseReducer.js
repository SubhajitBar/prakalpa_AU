import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], lectures:[]},
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
    getCourseRequest: state => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    addToGuidePlaylistRequest: state => {
      state.loading = true;
    },
    addToGuidePlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToGuidePlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  });

  export const enrollReducer = createReducer({course:[]},{
    enrollmentRequest:(state)=>{
      state.loading = true
    },
    enrollmentSuccess:(state, action)=>{
      state.loading = false;
      state.course = action.payload;
    },
    enrollmentFail:(state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },


    enrollmentVerificationRequest:(state)=>{
      state.loading = true
    },
    enrollmentVerificationSuccess:(state, action)=>{
      state.loading = false;
      state.message = action.payload;
    },
    enrollmentVerificationFail:(state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },



    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  })