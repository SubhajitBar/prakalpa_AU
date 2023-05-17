import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About/About';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import CreateCourses from './components/Admin/CreateCourses/CreateCourses';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Users from './components/Admin/Users/Users';
import ForgetPassword from './components/Auth/ForgetPassword';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import CoursePage from './components/CoursePage/CoursePage';
import Courses from './components/Courses/Courses';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import Subscribe from './components/Payments/Subscribe';
import ChangePassword from './components/Profile/ChangePassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import Request from './components/Request/Request';
import EnrolledUsers from './components/Admin/EnrolledUsers/EnrolledUsers';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from "protected-route-react";
import Loader from './components/Layout/Loader/Loader';
import GuideRegister from './components/AuthGuide/GuideRegister';
import GuideLogin from './components/AuthGuide/GuideLogin';
import ForgetPasswordGuide from './components/AuthGuide/ForgetPasswordGuide';
import ResetPasswordGuide from './components/AuthGuide/ResetPasswordGuide';
import GuideProfile from './components/GuideProfile/GuideProfile';
import AssignedProject from './components/GuideProfile/AssignedProject';
import ChangeGuidePassword from './components/GuideProfile/ChangeGuidePassword';
import UpdateGuideProfile from './components/GuideProfile/UpdateGuideProfile';
import { loadGuide } from './redux/actions/guide';


function App() {

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const dispatch = useDispatch();

  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user)
  const {isGuideAuthenticated, user:guide,message:guideMessage,error:guideError, loading:guideLoading} = useSelector(state => state.guide)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (guideError) {
      toast.error(guideError);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (guideMessage) {
      toast.success(guideMessage);
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch, error, message,guideError,guideMessage])

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadGuide());
  }, [dispatch]);


  return (
    <Router>
      {
        loading || guideLoading  ? (<Loader />) : (
          <>
            <Header isAuthenticated={isAuthenticated || isGuideAuthenticated}  user={user || guide} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects' element={<Courses />} />
              <Route path='/project/:id' element={<ProtectedRoute  isAuthenticated={isAuthenticated || isGuideAuthenticated} >
                <CoursePage user={user || guide} />
              </ProtectedRoute>} />
              {/* USER PROFILE  */}
              <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated } >
                <Profile user={user} />
              </ProtectedRoute>} />
              <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>} />
              <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
                <UpdateProfile user={user} />
              </ProtectedRoute>} />
            {/* GUIDE PROFILE  */}
              <Route path='/guideprofile' element={<ProtectedRoute isAuthenticated={isGuideAuthenticated} redirect="/guidelogin">
                <GuideProfile user={guide} />
              </ProtectedRoute>}/>

              <Route path='/assignedproject' element={<ProtectedRoute isAuthenticated={isGuideAuthenticated} redirect="/guidelogin">
                <AssignedProject user={guide} />
              </ProtectedRoute>}/>

              <Route path='/changeguidepassword' element={<ProtectedRoute isAuthenticated={isGuideAuthenticated}>
                <ChangeGuidePassword/>
              </ProtectedRoute>}/>

              <Route path='/updateguideprofile' element={<ProtectedRoute isAuthenticated={isGuideAuthenticated}>
                <UpdateGuideProfile user={guide} />
              </ProtectedRoute>}/>

            {/* GUIDE AUTH  */}
            <Route path='/guideregister' element={<ProtectedRoute isAuthenticated={!isGuideAuthenticated} redirect="/guideprofile">
              <GuideRegister/>
            </ProtectedRoute>}  />
            <Route path='/guidelogin' element={<ProtectedRoute isAuthenticated={!isGuideAuthenticated} redirect="/guideprofile">
              <GuideLogin/>
            </ProtectedRoute>}  />
            <Route path='/forgetpasswordguide' element={<ProtectedRoute isAuthenticated={!isGuideAuthenticated} redirect="/guideprofile">
              <ForgetPasswordGuide/>
            </ProtectedRoute>}  />
            <Route path='/guide/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isGuideAuthenticated} redirect="/guideprofile">
              <ResetPasswordGuide/>
            </ProtectedRoute>}  />

            {/* USER AUTH  */}
              <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                <Login />
              </ProtectedRoute>} />
              <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                <Register />
              </ProtectedRoute>} />
              <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                <ForgetPassword />
              </ProtectedRoute>} />
              <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                <ResetPassword />
              </ProtectedRoute>} />

              <Route path='/contact' element={<Contact />} />
              <Route path='/request' element={<Request />} />
              <Route path='/about' element={<About />} />

              <Route path='/enrollme/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
                <Subscribe user={user}/>
              </ProtectedRoute>} />
              <Route path='/paymentsuccess' element={<PaymentSuccess />} />
              <Route path='/paymentfail' element={<PaymentFail />} />
              <Route path='*' element={<NotFound />} />


              {/* Admin Routes  */}
              <Route path='/admin/dashboard' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path='/admin/users' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path='/admin/createproject' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  < CreateCourses />
                </ProtectedRoute>
              } />
              <Route path='/admin/projects' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  < AdminCourses />
                </ProtectedRoute>} />
              <Route path='/admin/enrolledusers' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                  < EnrolledUsers />
                </ProtectedRoute>} />

            </Routes>
            <Footer />
            <Toaster />
          </>
        )
      }
    </Router>
  );
}

export default App;
