import jwt from "jsonwebtoken";
import UserMongo from "@/database/models/usernew";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    switch (req.method) {
      case "GET":
        const user = await UserMongo.findById(userId);
        res.status(200).json({ user });
        break;
      case "PUT":
        const {
          first_name,
          last_name,
          bio,
          gender,
          website,
          twitter,
          facebook,
          linkedin,
          youtube,
        } = req.body;

        await UserMongo.findByIdAndUpdate(
          userId,
          {
            first_name,
            last_name,
            bio,
            gender,
            website,
            twitter,
            facebook,
            linkedin,
            youtube,
          }
        );

        const updateUser = await UserMongo.findById(userId);

        const edmy_users_token = jwt.sign(
          {
            userId: updateUser._id,
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
            email: updateUser.email,
            role: updateUser.role,
            avatar: updateUser.profile_photo,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.status(200).json({
          message: "Profile updated.",
          edmy_users_token,
        });
        break;
      default:
        res.status(405).json({
          message: `Method ${req.method} not allowed`,
        });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "auth_error",
      message: e.message,
    });
  }
}
