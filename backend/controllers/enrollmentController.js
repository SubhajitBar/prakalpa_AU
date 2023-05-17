import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import { Enrollment } from "../models/Enrollment.js";
import {Course} from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";


export const createEnrollment = catchAsyncError(async (req, res, next) => {
    const { regId } = req.body;
    if(!regId)return next(new ErrorHandler("Please enter all filds",400))
    let uIds = await Enrollment.findOne({ regId });
    if (uIds) {
        return next(new ErrorHandler("ID already exists", 409))
    };
    

    uIds = await Enrollment.create({
        regId,
    })


    res.status(200).json({
        success: true,
        message: "Registration Id Added Successfully",
        uIds,
    })

});

export const getAllEnrollmentIds = catchAsyncError(async (req, res, next) => {
    const uIds = await Enrollment.find({});
    if (!uIds) return next(new ErrorHandler("Id not found ", 404));

    res.status(200).json({
        success: true,
        message: `${uIds.length} Record Found`,
        uIds,
    });

});

export const deleteEnrollmentIds = catchAsyncError(async (req, res, next) => {
    const uIds = await Enrollment.findById(req.params.id);
    if (!uIds) {
        return next(new ErrorHandler("ID not found", 404));
    };


    await uIds.deleteOne();
    res.status(200).json({
        success: true,
        message: "Registration Id Removed Successfully",
        
    });


});



export const enrollmentVerification = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const project = await Course.findById(req.params.id);

    if (user.role === "admin")
      return next(new ErrorHandler("Admin can't enroll", 400));

    if (!project)
    return next(new ErrorHandler("Project not found", 404));


    const regId = await user.enrollmentId;
    const verify = await Enrollment.findOne({ regId });
    if(!verify) return next(new ErrorHandler("Your University Id is Invalid",404));

    if( user.enrollmentStatus === "active" && user.enrolledProjectId !== project.id) return next(new ErrorHandler("You have already enrolled for another project",400));
    else{

    const verifiedID = await verify.regId;   
    const projectID = await project.id;
   
    if (regId === verifiedID) {
        user.enrollmentStatus = "active"
       user.enrolledProjectId = projectID ;
       
    }};
    
    await user.save();

    // res.redirect(
    //     `${process.env.FRONTEND_URL}/project/${user.enrolledProjectId}`
    // );

    res.status(200).json({
        success: true,
        message: `Your have Enrolled Successfully`

    });

});

export const enrollMe = catchAsyncError(async(req,res,next)=>{


    const user = await User.findById(req.user._id);

    // if (user.role === "admin")
    //   return next(new ErrorHandler("Admin can't buy subscription", 400));
  

    const course = await Course.findById(req.params.id).select("-lectures");
    if (!course) return next(new ErrorHandler("Project not found", 404));

    res.status(200).json({
        success: true,
        course,
    })

})



export const cancelEnrollment = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    if(user.enrollmentStatus === undefined && user.enrolledProjectId === undefined) return next(new ErrorHandler("User is Not Enrolled",400));

    if (user.enrollmentStatus === "active" ){
        user.enrollmentStatus = undefined;
        user.enrolledProjectId = undefined;
    } ;

    await user.save();
    res.status(200).json({
        success: true,
        message: `User Enrollment Cancelled Successfully`,

    });

});

export const getAllEnrolledStudents = catchAsyncError(async (req, res, next) => {

    const user = await User.find({"enrollmentStatus":"active"});       
    
    res.status(200).json({
        success: true,
        message: `${user.length} record found`,
        user,

    });

});