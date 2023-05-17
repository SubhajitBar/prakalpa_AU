import { createReducer } from "@reduxjs/toolkit";

export const guideReducer = createReducer({},{
    guideLoginRequest:(state)=>{
        state.loading = true;
    },
    guideLoginSuccess:(state,action)=>{
        state.loading = false;
        state.isGuideAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    guideLoginFail:(state,action)=>{
        state.loading = false;
        state.isGuideAuthenticated = false;
        state.error = action.payload;
    },

    guideRegisterRequest: (state) => {
        state.loading = true;
    },
    guideRegisterSuccess: (state, action) => {
        state.loading = false;
        state.isGuideAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;

    },
    guideRegisterFail: (state, action) => {
        state.loading = false;
        state.isGuideAuthenticated = false;
        state.error = action.payload;
    },

    loadGuideRequest:(state)=>{
        state.loading = true;
    },
    loadGuideSuccess:(state,action)=>{
        state.loading = false;
        state.isGuideAuthenticated = true;
        state.user = action.payload;
    },
    loadGuideFail:(state,action)=>{
        state.loading = false;
        state.isGuideAuthenticated = false;
        state.error = action.payload;
    },


    logoutGuideRequest: (state) => {
        state.loading = true;
    },
    logoutGuideSuccess: (state, action) => {
        state.loading = false;
        state.isGuideAuthenticated = false;
        state.user = null;
        state.message = action.payload;

    },
    logoutGuideFail: (state, action) => {
        state.loading = false;
        state.isGuideAuthenticated = true;
        state.error = action.payload;
    },



    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message = null;
    }
})


export const guideProfileReducer = createReducer({enrolledUsers:[],project:[]},{

    updateGuideProfileRequest: (state) => {
        state.loading = true;
    },
    updateGuideProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    updateGuideProfileFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    changeGuidePasswordRequest: state => {
        state.loading = true;
    },
    changeGuidePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    changeGuidePasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    updateGuideProfilePictureRequest: (state) => {
        state.loading = true;
    },
    updateGuideProfilePictureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    updateGuideProfilePictureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    forgetGuidePasswordRequest: state => {
        state.loading = true;
    },
    forgetGuidePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgetGuidePasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    resetGuidePasswordRequest: state => {
        state.loading = true;
    },
    resetGuidePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetGuidePasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    removeFromGuidePlaylistRequest: state => {
        state.loading = true;
      },
      removeFromGuidePlaylistSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      removeFromGuidePlaylistFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },


    getEnrolledProjectUserRequest: (state) =>{
        state.loading = true;
    },
    getEnrolledProjectUserSuccess: (state,action)=>{
        state.loading = false;
        state.enrolledUsers = action.payload.enrolledUsers;
        state.project = action.payload.project;

    },
    getEnrolledProjectUserFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },

      
    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message = null;
    }
}) 
