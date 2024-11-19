import { Course } from "../../model/Course";
import { Review } from "../../model/Review";
import { ICourse } from "../entities/ICourse";
import { IReview } from "../entities/IReview";
import { ICourseRepository } from "./ICourseRepository";
import mongoose from "mongoose";
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

  async fetchAllCourse(filterOptions: any) {
    try {
        const { search, category, level, sort,page,limit } = filterOptions;
        const skip = (page - 1) * limit;
console.log(filterOptions,'filteredOPtions')
        const filters: any = {
            status: true,
        };
        if (search) filters.title = { $regex: search, $options: "i" };
        if (category) filters.category = category;
        if (level) filters.level = level;
       
        let sortOption: { [key: string]: 1 | -1 } = {};
        if (sort === "price-asc") sortOption.discountPrice = 1;
        if (sort === "price-desc") sortOption.discountPrice = -1;
        if (sort === "rating-desc") sortOption.averageRating = -1;
        if (sort === "rating-asc") sortOption.averageRating = 1;

        // Build the aggregation pipeline
        const pipeline = [
            { $match: filters },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "courseId",
                    as: "reviews",
                },
            },
            {
                $addFields: {
                    averageRating: { $avg: "$reviews.rating" },
                },
            },
            {
                $project: {
                    reviews: 0,
                },
            },
        ]as any[];

        // Only add $sort stage if sortOption has keys
        if (Object.keys(sortOption).length > 0) {
            pipeline.push({ $sort: sortOption });
        }

        const allCourse = await Course.aggregate(pipeline).skip(skip).limit(limit);;
        const totalCount = await Course.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
  
        console.log("allCourse result in repo:", allCourse,totalCount,totalPages);
        return {
            courses: allCourse,
            message: "Fetching courses was successful",
            success: true,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        console.log("error in fetching courses in repo:", error);
        return {
            success: false,
            message: "An error occurred while fetching courses.",
        };
    }
}

async fetchLatestCourse() {
  try {
    const LatestCourses = await Course.aggregate([
      {
        $match: { 
          status: true 
        }
      },
      {
        $lookup: {
          from: 'reviews', // Name of the reviews collection
          localField: '_id',
          foreignField: 'courseId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" } // Calculate average rating from reviews
        }
      },
      {
        $project: {
          reviews: 0 // Exclude reviews array if not needed in the output
        }
      }
    ]).sort({createdAt:-1}).limit(5)
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
  async  fetchMostPurchasedCourse() {
    try {
      const mostPurchasedCourses = await Course.aggregate([
        {
          $match: {
            status: true, // Only active courses
          },
        },
        {
          $addFields: {
            enrolledUserCount: { $size: "$enrolledUsers" }, // Count enrolled users
          },
        },
        {
          $lookup: {
            from: "reviews", // Join with the reviews collection
            localField: "_id",
            foreignField: "courseId",
            as: "reviews",
          },
        },
        {
          $addFields: {
            averageRating: { $avg: "$reviews.rating" }, // Calculate average rating
          },
        },
        {
          $project: {
            reviews: 0, // Exclude reviews if not required in the output
          },
        },
        {
          $sort: {
            enrolledUserCount: -1, // Sort by most enrolled users
          },
        },
        {
          $limit: 5, // Limit to top 5 courses
        },
      ]);
  
      if (!mostPurchasedCourses || mostPurchasedCourses.length === 0) {
        return { success: false, message: "No courses found" };
      }
  
      return {
        success: true,
        message: "Most purchased courses fetched successfully",
        courses: mostPurchasedCourses,
      };
    } catch (error) {
      console.error("Error fetching most purchased courses:", error);
      return { success: false, message: "Error fetching courses" };
    }
  }
  
  async fetchMostRatedCourses() {
    try {
        const MostRatedCourses = await Course.aggregate([
            {
                $match: { 
                    status: true 
                }
            },
            {
                $lookup: {
                    from: 'reviews', // Name of the reviews collection
                    localField: '_id',
                    foreignField: 'courseId',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: "$reviews.rating" } // Calculate average rating from reviews
                }
            },
            {
                $match: { averageRating: { $exists: true } } // Ensure that only courses with reviews are included
            },
            {
                $sort: { averageRating: -1 } // Sort by average rating in descending order
            },
            {
                $limit: 5 // Limit to the top 5 courses
            },
            {
                $project: {
                    reviews: 0 // Exclude reviews array if not needed in the output
                }
            }
        ]);

        console.log("MostRatedCourses", MostRatedCourses);
        if (MostRatedCourses) {
            return {
                courses: MostRatedCourses,
                message: "Fetching most rated courses went successfully",
                success: true,
            };
        }
    } catch (error) {
        console.log("fetch most rated courses error", error);
        return {
            success: false,
            message: "Could not fetch most rated courses. Please try again",
        };
    }
}

async getCoursesByTutorId(tutorId: string, page: number = 1, limit: number) {
  try {
    const skip = (page - 1) * limit;

    const courses = await Course.aggregate([
      {
        $match: {
          tutorId: tutorId,
        },
      },
      {
        $lookup: {
          from: "reviews", // Name of the reviews collection
          localField: "_id",
          foreignField: "courseId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] }, 
        },
      },
      {
        $project: {
          reviews: 0, // Exclude the reviews array if not needed
        },
      },
      {
        $skip: skip, // Pagination: skip results
      },
      {
        $limit: limit, // Pagination: limit results
      },
    ]);

    const totalCount = await Course.countDocuments({ tutorId });
    const totalPages = Math.ceil(totalCount / limit);

    if (!courses || courses.length === 0) {
      return { success: false, message: "Courses not found" };
    }

    return {
      success: true,
      message: "Courses fetched successfully",
      courses,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in fetching courses by tutorId:", error);
    return { success: false, message: "Error in fetching courses" };
  }
}

  async getSingleCourse(courseId: string) {
    try {
        const course = await Course.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(courseId) } // Match the specific course by ID
          },
          {
            $lookup: {
              from: 'reviews',                // Name of the reviews collection
              localField: '_id',
              foreignField: 'courseId',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              averageRating: { $avg: "$reviews.rating" } // Calculate the average rating from reviews
            }
          },
          {
            $project: {
              reviews: 0 // Optionally exclude the reviews array
            }
          }
        ]);
    
        if (!course || course.length === 0) {
          return { success: false, message: "Couldn't view single course page" };
        }
    console.log('singleeCourse',course)
        return {
          success: true,
          message: "Single course fetched successfully",
          course: course[0], // course is an array after aggregation
        };
      } catch (error) {
      console.log("Error in finding singlecourse in db");
    }
  }
  async fetchMyCourses(enrolledCourses: string[]) {
    try {
      console.log(enrolledCourses, "enrolledCourses");
  
      const courses = await Course.aggregate([
        {
          $match: {
            _id: { $in: enrolledCourses.map(courseId => new mongoose.Types.ObjectId(courseId)) }
          }
        },
        {
          $lookup: {
            from: 'reviews', // Name of the reviews collection
            localField: '_id',
            foreignField: 'courseId',
            as: 'reviews'
          }
        },
        {
          $addFields: {
            averageRating: { $avg: "$reviews.rating" } // Calculate average rating from reviews
          }
        },
        {
          $project: {
            reviews: 0 // Exclude reviews array if not needed in the output
          }
        }
      ]);
  
      console.log("My Courses:", courses);
  
      if (!courses || courses.length === 0) {
        return { success: false, message: "Courses not found" };
      }
  
      return { success: true, message: "Courses fetched successfully", courses };
    } catch (error) {
      console.log("Error in fetching my courses from course db", error);
      return { success: false, message: "Error fetching courses. Please try again" };
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

  async getFullCourses( page: number = 1, limit: number) {
    try {
      const skip = (page - 1) * limit;

      const allCourse = await Course.find().skip(skip).limit(limit);
      const totalCount = await Course.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      console.log("allcourses", allCourse);
      if (allCourse) {
        return {
          courses: allCourse,
          message: "Fetching course  went successfult",
          success: true,
          totalPages,
          currentPage: page
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
  async changeCourseStatus(data: { courseId: string; status: boolean }) {
    try {
      console.log("reached tutro for chaning status");
      const updatedCourse = await Course.findByIdAndUpdate(
        data.courseId,
        { status: data.status },
        { new: true }
      );

      if (!updatedCourse) {
        throw new Error("Tutor not found to change status");
      }
      return {
        success: true,
        message: `Course ${data.status ? "unblocked" : "blocked"} successfully`,
        course: updatedCourse,
      };
    } catch (error) {
      console.error("Error in Admin Repo (changeStatus):", error);
      throw new Error("Error in changing tutor status");
    }
  }

  async addReviewRating(data: IReview) {
    try {
      const { rating, review, userId, courseId } = data;
      console.log("data from review and rating", data);
      const newReview = new Review({
        rating,
        review,
        userId,
        courseId,
      });
      await newReview.save();
      return { success: true, message: "Review posted succesfuly", newReview };
    } catch (error) {
      console.log("Error in posting review and rating", error);
    }
  }
  async fetchReview(courseId: string) {
    try {
      console.log("courseId from review and rating", courseId);
      const newReview = await Review.find({ courseId });
      console.log("resting2", newReview);

      return { success: true, newReview };
    } catch (error) {
      console.log("Error in posting review and rating", error);
    }
  }
  async getStudentEnrollments(tutorId:string){
    try {
      const enrollmentData = await Course.aggregate([
        { $match: { tutorId } },
        { $project: { courseName: "$title", enrolledCount: { $size: "$enrolledUsers" } } },
      ]);
      return {
        success: true,
        message: "Successfully fetched enrolled students count.",
        enrollmentData,
      };
    } catch (error) {
      console.error("Error fetching student enrollments:", error);
    }
    return {
      success: false,
      message: "Failed to fetch enrolled students count.",
      enrollmentData: [],
    };
  }
}
