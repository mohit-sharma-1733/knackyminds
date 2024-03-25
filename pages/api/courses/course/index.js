import connectDB from '@/database/connection2';
import CourseMongo from '@/database/models/coursenew';
import UserMongo from '@/database/models/usernew';
import CategoryMongo from '@/database/models/categorynew';
import EnrolmentMongo from '@/database/models/enrolmentnew';
import CourseAssetMongo from '@/database/models/course_assetnew';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    await connectDB();

    const course = await CourseMongo.aggregate([
      {
        $match: { slug: slug },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'catId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'enrolments',
          localField: '_id',
          foreignField: 'courseId',
          as: 'enrolments',
        },
      },
      {
        $lookup: {
          from: 'course_assets',
          localField: '_id',
          foreignField: 'courseId',
          as: 'assets',
        },
      },
      {
        $project: {
          title: 1,
          // Add other fields as needed
          'user.first_name': 1,
          'user.last_name': 1,
          'user.profile_photo': 1,
          'user.bio': 1,
          'category.name': 1,
          'category.slug': 1,
          enrolments: { $size: '$enrolments' },
          assets: { $size: '$assets' },


        
		slug:1,
		overview:1,
		what_you_will_learn:1,
		who_is_this_course_for:1,
		requirements:1,
		is_class:1,
		updated_at:1,
		
		duration:1,
        lessons:1,
        access_time:1
        },
      },
    ]);

    res.status(200).json({
      course: course[0], // Assuming there's only one course with a unique slug
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_course',
      message: e.message,
    });
  }
}
