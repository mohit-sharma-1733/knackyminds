import jwt from "jsonwebtoken";
import { slugify } from "@/utils/auth";
import Assignment from "database/models/assignment";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "POST":
			await handlePostRequest(req, res);
			break;
		case "DELETE":
			await handleDeleteRequest(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handlePostRequest = async (req, res) => {
	const {
		title,
		short_desc,	
		assignment_credits,
		deadline,
		image,
		courseId,
		is_class,
	} = req.body;
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		let slug = slugify(title);
		const slugExist = await Assignment.findOne({
			where: { slug: slug },
		});

		if (slugExist) {
			slug = `${slug}-${Math.floor(
				Math.random() * (999 - 100 + 1) + 100
			)}`;
		}

		const newassignment = await Assignment.create({
			title,
			slug,
			short_desc,
		
			assignment_credits,
			
			deadline,
			image,

			userId,
			courseId,
			is_class: is_class && true,
		});

		res.status(200).json({
			message:
				"Assignment created successfully!",
			assignment: newassignment,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "create_course",
			message: e.message,
		});
	}
};
