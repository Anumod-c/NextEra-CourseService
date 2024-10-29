import { Course } from "../../model/Course";
import { ICourse } from "../entities/ICourse";
import { ICourseRepository } from "./ICourseRepository";

export class CourseRepository implements ICourseRepository {
    async saveCourse(courseData: ICourse) {
        try {
            const newCourse = new Course(courseData);
            await newCourse.save();
            console.log("Course saved successfully");
            return { success: true, message: "Course saved sucessfully" };
        } catch (error) {
            console.log("saveCourse error", error);
            return {
                success: false,
                message: "Course couldnt save. Please try again",
            };
        }
    }
    async fetchAllCourse() {
        try {
            const allCourse = await Course.find({status:true});
            console.log("allcourse", allCourse);
            if (allCourse) {
                return {
                    courses: allCourse,
                    message: "Fetching course  went successfult",
                    success: true,
                };
            }
        } catch (error) {
            console.log("fetch all course error", error);
            return {
                success: false,
                message: "Course fetch courses. Please try again",
            };
        }
    }
    async fetchLatestCourse() {
        try {
            const LatestCourses = await Course.find({status:true}).sort({ _id: -1 }).limit(5);
            console.log("LatestCourses", LatestCourses);
            if (LatestCourses) {
                return {
                    courses: LatestCourses,
                    message: "Fetching course  went successfult",
                    success: true,
                };
            }
        } catch (error) {
            console.log("fetch all course error", error);
            return {
                success: false,
                message: "Course fetch courses. Please try again",
            };
        }
    }
    async getCoursesByTutorId(tutorId: string) {
        try {
            const courses = await Course.find({ tutorId: tutorId });
            console.log("lllllllllllllll", courses);
            if (!courses) {
                return { success: false, message: "Course not found" };
            }
            return { success: true, message: "Course fetched successfully", courses };
        } catch (error) {
            console.log("Error in fetching coursesBy tutorId");
        }
    }
    async getSingleCourse(courseId: string) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                return { success: false, message: "Couldnt view single course page" };
            }
            return {
                success: true,
                message: "Single Course fetched successfully",
                course,
            };
        } catch (error) {
            console.log("Error in finding singlecourse in db");
        }
    }
    async fetchMyCourses(enrolledCourses: string[]) {
        try {
            console.log(enrolledCourses, "enrolledCourses");
            const courses = await Course.find({ _id: { $in: enrolledCourses } });
            console.log(courses);
            if (!courses) {
                return { success: false, message: "Course not found" };
            }
            return { success: true, message: "Course fetched successfully", courses };
        } catch (error) {
            console.log("Error in fetching my courses form cours db", error);
        }
    }
    async addUserIdToCourse(data: any) {
        try {
            const { userId, courseId } = data;
            console.log(data, "data from adduserid to course");
            const course = await Course.findByIdAndUpdate(
                courseId,
                { $addToSet: { enrolledUsers: userId } }, // Ensure the field name matches
                { new: true }
            ).exec();
            console.log("coursesupdataeddwith userid", course);
            return { success: true, message: "UserId added in courseDB" };
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error adding userId  to course: ${err.message}`);
        }
    }

    async getFullCourses() {
        try {
            const allCourse = await Course.find();
            console.log("allcourses", allCourse);
            if (allCourse) {
                return {
                    courses: allCourse,
                    message: "Fetching course  went successfult",
                    success: true,
                };
            }
        } catch (error) {
            console.log("fetch all course error", error);
            return {
                success: false,
                message: "Course fetch courses. Please try again",
            };
        }
    }
    async getCourseCount() {
        try {
            const courseCount = Course.countDocuments();
            return courseCount;
        } catch (error) {
            console.log("Error fetching course count", error);
        }
    }
    async getTotalCoursesCount(tutorId: string) {
        try {
            const course = await Course.find({ tutorId: tutorId }).countDocuments();
            console.log(course);
            return course;
        } catch (error) {
            console.log("Error in getTotalCoursesCount in courserepo", error);
        }
    }
    async getTotalStudentsCount(tutorId: string) {
        try {
            // Find all courses associated with the tutor
            const courses = await Course.find({ tutorId: tutorId }, "enrolledUsers");

            // Extract all enrolledUsers arrays and flatten them into a single array
            const allEnrolledUsers = courses.flatMap(
                (course) => course.enrolledUsers
            );

            // Remove duplicate user IDs to count unique students
            const uniqueEnrolledUsers = [
                ...new Set(allEnrolledUsers.map((userId) => userId.toString())),
            ];

            // Return the total count of unique enrolled users
            const totalStudents = uniqueEnrolledUsers.length;

            console.log(`Total Students: ${totalStudents}`);
            return totalStudents;
        } catch (error) {
            console.log("Error in getTotalStudentsCount in courserepo", error);
            throw error; // Rethrow the error for further handling
        }
    }
    async fetchCourseChatList(userId: string) {
        try {
            const courses = await Course.find({ enrolledUsers: { $in: [userId] } });
            if (!courses || courses.length === 0) {
                return { success: false, message: "No enrolled courses found." };
            }
            // Return the list of courses
            return { success: true, courses };
        } catch (error) {
            console.log("Error in fetching purhcased courselist for chat", error);
        }
    }
    async changeCourseStatus(data:{courseId:string,status:boolean}){
        try{
            console.log('reached tutro for chaning status')
            const updatedCourse = await Course.findByIdAndUpdate(data.courseId,{status:data.status},{new:true});

            if(!updatedCourse){
                throw new Error("Tutor not found to change status")
            }
            return{
                success:true,
                message:`Course ${data.status ? 'unblocked' : 'blocked'} successfully`,
                course: updatedCourse,
            }
        }catch(error){
              console.error('Error in Admin Repo (changeStatus):', error);
            throw new Error('Error in changing tutor status');
            
        }
    }
}
