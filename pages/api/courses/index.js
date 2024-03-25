// import jwt from "jsonwebtoken";
// import CourseMongo from "@/database/models/coursenew"; // Replace with actual path
// import UserMongo from "@/database/models/usernew"; // Replace with actual path
// import EnrolmentMongo from "@/database/models/enrolmentnew"; // Replace with actual path

// export default async function handler(req, res) {
//   if (!("authorization" in req.headers)) {
//     return res.status(401).json({ message: "No authorization token" });
//   }
//   switch (req.method) {
//     case "GET":
//       await handleGetRequest(req, res);
//       break;
//     default:
//       res.status(405).json({
//         message: `Method ${req.method} not allowed`,
//       });
//   }
// }

// const handleGetRequest = async (req, res) => {
//   try {
//     const { userId } = jwt.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
// console.log(userId)
//     const courses = await CourseMongo.find({
//       userId: userId,
//     })
//       .sort({ created_at: -1 })
//       .populate({
//         path: "userId", // Use the correct reference path for user
//         select: "first_name last_name profile_photo",
//       });

//     const courseIds = courses.map(course => course._id);

//     const enrollments = await EnrolmentMongo.find({
//       courseId: { $in: courseIds },
//     })
//       .select("id courseId")
//       .exec();

//     courses.forEach(course => {
//       course.enrolments = enrollments
//         .filter(enrollment => enrollment.courseId.equals(course._id))
//         .map(enrollment => enrollment.id);
//     });

//     res.status(200).json({
//       courses,
//     });
//   } catch (e) {
//     res.status(400).json({
//       error_code: "get_my_courses",
//       message: e.message,
//     });
//   }
// };
import jwt from "jsonwebtoken";
import CourseMongo from "@/database/models/coursenew"; // Replace with actual path
import UserMongo from "@/database/models/usernew"; // Replace with actual path
import EnrolmentMongo from "@/database/models/enrolmentnew"; // Replace with actual path

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No authorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const courses = await CourseMongo.find({
      userId: userId,
    })
      .sort({ created_at: -1 })
      .populate({
        path: "userId", // Use the correct reference path for user
        select: "first_name last_name profile_photo",
      });
    res.status(200).json({
      courses,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "get_my_courses",
      message: e.message,
    });
  }
};
