import connectDB from '@/database/connection2';
import CourseMongo from '@/database/models/coursenew';
import UserMongo from '@/database/models/usernew';
import EnrolmentMongo from '@/database/models/enrolmentnew';
import CategoryMongo from '@/database/models/categorynew';

export default async function handler(req, res) {
  try {
    await connectDB();

    const courses = await CourseMongo.aggregate([
      { $match: { in_home_page: 1, approved: 1 } },
      { $sample: { size: 4 } },
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
          from: 'enrolments',
          localField: '_id',
          foreignField: 'courseId',
          as: 'enrolments',
        },
      },
      {
        $project: {
          title: 1,
          short_desc: 1,
          latest_price: 1,
          before_price: 1,
          lessons: 1,
          duration: 1,
          image: 1,
          'user.first_name': 1,
          'user.last_name': 1,
          'user.profile_photo': 1,
          enrolmentCount: { $size: '$enrolments' },
        },
      },
    ]);

    const categories = await CategoryMongo.aggregate([
      { $sample: { size: 12 } },
    ]);

    res.status(200).json({
      courses,
      categories,
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_my_courses',
      message: e.message,
    });
  }
}
