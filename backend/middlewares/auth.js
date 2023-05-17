import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Course } from "../models/Course.js";
import { Guides } from "../models/Guides.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not logged in", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});

export const isGuideAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not logged in", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await Guides.findById(decoded._id);
  next();
});
 

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

  next();
};

export const authorizeSubscribers = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler(`Only Subscribers can acces this resource`, 403)
    );

  next();
};

export const authorizeStudent  = async(req,res,next)=>{
  const project = await Course.findById(req.params.id);

  if (req.user.role !== "admin" && req.user.enrolledProjectId !== project.id){
    return next(new ErrorHandler(`Only enrolled students can access this resource`, 403));
  }

  next();

};

// export const isProjectMatched = catchAsyncError(async (req,res,next)=>{
  
//   const project = await Course.findById(req.params.id);
//   if (req.user.enrolledProjectId === project.id){
//    next();
//   }
// });