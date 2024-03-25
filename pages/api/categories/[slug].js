import connectDB from '@/database/connection2';
import CategoryMongo from '@/database/models/categorynew';
import CourseMongo from '@/database/models/coursenew';
import UserMongo from '@/database/models/usernew';
import EnrolmentMongo from '@/database/models/enrolmentnew';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    await connectDB();

    const category = await CategoryMongo.findOne({ slug });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const courses = await CourseMongo.aggregate([
      { $match: { catId: category._id } },
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
    res.status(200).json({ courses });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_category_by_id',
      message: e.message,
    });
  }
}
