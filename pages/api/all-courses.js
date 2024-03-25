import connectDB from '@/database/connection2';
import CourseMongo from '@/database/models/coursenew';
import UserMongo from '@/database/models/usernew';
// import EnrolmentMongo from '@/database/models/enrolmentnew';

export default async function handler(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectDB();
    console.log('CONNECTED TO MONGO');

    switch (req.method) {
      case 'GET':
        await handleGetRequest(req, res);
        break;
      default:
        res.status(405).json({
          message: `Method ${req.method} not allowed`,
        });
    }
  } catch (error) {
    res.status(500).json({
      error_code: 'mongo_connection_error',
      message: 'Error connecting to MongoDB',
    });
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const { page, limit, short, search } = req.query;
    const pageNumber = parseInt(page);
    const getRealNumber = isNaN(pageNumber) ? 0 : pageNumber;
    const coursesOffset = limit * (getRealNumber - 1);
    const LIMIT = parseInt(limit);

    let query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { short_desc: { $regex: search, $options: 'i' } },
      ],
    };

    const totalCourses = await CourseMongo.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / LIMIT);

    const courses = await CourseMongo.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      // You can add more $lookup stages here if needed
      
      {
        $project: {
          title: 1,
          short_desc: 1,
          latest_price: 1,
          before_price: 1,
          lessons: 1,
          duration: 1,
          image: 1,
          slug:1,
          catId:1,
          
          'user.first_name': 1,
          'user.last_name': 1,
          'user.profile_photo': 1,
         
        },
      },
    ]);
    // console.log(courses)
    const coursesCount = await CourseMongo.countDocuments(query);

    res.status(200).json({
      courses,
      totalPages,
      coursesCount,
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_all_courses',
      message: e.message,
    });
  }
};
