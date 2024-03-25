import React, { useState, useEffect } from "react";
import controls from "@/utils/RTEControl";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
	ssr: false,
	loading: () => null,
});
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Button from "@/utils/Button";

const INITIAL_VALUE = {
	title: "",
	short_desc: "",
	assignment_credits: 0.0,
	deadline: "",
	image: "",
	courseId:""
};

const AssignmentCreateForm = ({ btnText, is_class }) => {
	const { edmy_users_token } = parseCookies();
	const [assignment, setAssignment] = useState(INITIAL_VALUE);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [courses,setCourses] = React.useState([])
	const [imagePreview, setImagePreview] = React.useState("");
	const router = useRouter();

	useEffect(() => {
		const isAssignment = Object.values(assignment).every((el) => Boolean(el));
		isAssignment ? setDisabled(false) : setDisabled(true);
	}, [assignment]);

	useEffect(() => {
		const fetchData = async () => {
			const payload = {
				headers: { Authorization: edmy_users_token },
			};
			const response = await axios.get(
				`${baseUrl}/api/courses`,
				payload
			);
			
			setCourses(response.data.courses);
		};

		fetchData();
	}, []);

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "image") {
			const image = files[0].size / 1024 / 1024;
			if (image > 2) {
				toast.error(
					"The photo size greater than 2 MB. Make sure less than 2 MB.",
					{
						style: {
							border: "1px solid #ff0033",
							padding: "16px",
							color: "#ff0033",
						},
						iconTheme: {
							primary: "#ff0033",
							secondary: "#FFFAEE",
						},
					}
				);
				e.target.value = null;
				return;
			}
			setAssignment((prevState) => ({
				...prevState,
				image: files[0],
			}));
			setImagePreview(window.URL.createObjectURL(files[0]));
		} else {
			setAssignment((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	const handleImageUpload = async () => {
		const data = new FormData();
		data.append("file", assignment.image);
		data.append("upload_preset", process.env.UPLOAD_PRESETS);
		data.append("cloud_name", process.env.CLOUD_NAME);
		let response;
		if (assignment.image) {
			response = await axios.post(process.env.CLOUDINARY_URL, data);
		}
		const imageUrl = response.data.url;

		return imageUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let photo;
			if (assignment.image) {
				photo = await handleImageUpload();

				photo = photo.replace(/^http:\/\//i, "https://");
			}

			const {
				title,
				short_desc,
				assignment_credits,
				deadline,
				courseId
			} = assignment;
			const payloadData = {
				title,
				short_desc,
				assignment_credits,
				deadline,
				image: photo,
				is_class,
				courseId,
			};

			const payloadHeader = {
				headers: { Authorization: edmy_users_token },
			};

			const url = `${baseUrl}/api/assignments/new`;
			console.log("THIS IS PAYLOAD DATA",payloadData)
			const response = await axios.post(url, payloadData, payloadHeader);
			setLoading(false);
console.log("RESPONSE",response)

			toast.success(response.data.message, {
				style: {
					border: "1px solid #4BB543",
					padding: "16px",
					color: "#4BB543",
				},
				iconTheme: {
					primary: "#4BB543",
					secondary: "#FFFAEE",
				},
			});

			if (is_class) {
				router.push(`/instructor/courses`);
			} else {
				router.push(
					`/instructor/course/upload/${response.data.assignment.id}`
				);
			}
		} catch (err) {
			 console.log(err);
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Assignment Title
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Assignment Title"
							name="title"
							value={assignment.title}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-md-6">
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							Lessons
						</label>
						<input
							type="number"
							className="form-control"
							placeholder="5"
							name="lessons"
							value={course.lessons}
							onChange={handleChange}
						/>
					</div> */}
				</div>

				
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							Latest Price
						</label>
						<input
							type="number"
							className="form-control"
							placeholder="29.99"
							aria-describedby="latest_price_help"
							name="latest_price"
							value={course.latest_price}
							onChange={handleChange}
						/>
						<div id="latest_price_help" className="form-text">
							The latest price will show as the course price.
						</div>
					</div> */}
			

				<div className="col-md-6">
					 <div className="form-group">
						<label className="form-label fw-semibold">
							Credit Points/Marks
						</label>
						<input
							type="number"
							className="form-control"
							placeholder="10,30,50,100"
							aria-describedby="assignment_credits_help"
							name="assignment_credits"
							value={assignment.assignment_credits}
							onChange={handleChange}
						/>
						<div id="before_price_help" className="form-text">
							Number of Credits of this assignment.
						</div>
					</div> 
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Deadline
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="4 Hours or 2 Weeks"
							name="deadline"
							value={assignment.deadline}
							onChange={handleChange}
						/>
					</div>
				</div>

		
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							Access Time
						</label>
						<select
							className="form-select"
							name="access_time"
							value={assignment.access_time}
							onChange={handleChange}
						>
							<option value="">Select</option>
							<option value="Lifetime">Lifetime</option>
							<option value="Three Months">Three Months</option>
							<option value="Six Months">Six Months</option>
							<option value="1 Year">1 Year</option>
						</select>
					</div> */}
			

				<div className="col-md-6">
					 <div className="form-group">
						<label className="form-label fw-semibold">
							 Image
						</label>
						<input
							type="file"
							className="form-control file-control"
							name="image"
							onChange={handleChange}
							required={true}
						/>
						<div className="form-text">
							Upload image size 750x500!
						</div>

						<div className="mt-2">
							<img
								src={
									imagePreview
										? imagePreview
										: "/images/courses/course-1.jpg"
								}
								alt="image"
								className="img-thumbnail w-100px me-2"
							/>
						</div>
					</div> 
				</div>

				<div className="col-md-6">
					 <div className="form-group">
						<label className="form-label fw-semibold">
							Course
						</label>
						<select
							className="form-select"
							name="courseId"
							value={assignment.courseId}
							onChange={handleChange}
						>
							<option value="">Select</option>
							{courses.length > 0 &&
								courses.map((course) => (
									<option key={course.id} value={course.id}>
										{course.title}
									</option>
								))}
						</select>
					</div> 
				</div>

				<div className="col-md-12">
					<div className="form-group">
						<label className="form-label fw-semibold">
							Short Description
						</label>
						<textarea
							className="form-control"
							name="short_desc"
							value={assignment.short_desc}
							rows="4"
							onChange={handleChange}
						/>
						<div className="form-text">
							The description will highlight all available areas.
						</div>
					</div>
				</div>

				<div className="col-md-6">
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							Overview
						</label>
						<RichTextEditor
							controls={controls}
							value={course.overview}
							onChange={(e) =>
								setCourse((prevState) => ({
									...prevState,
									overview: e,
								}))
							}
						/>
					</div> */}
				</div>
				<div className="col-md-6">
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							Requirements
						</label>
						<RichTextEditor
							controls={controls}
							value={course.requirements}
							onChange={(e) =>
								setCourse((prevState) => ({
									...prevState,
									requirements: e,
								}))
							}
						/>
					</div> */}
				</div>
				<div className="col-md-6">
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							What You Will Learn
						</label>
						<RichTextEditor
							controls={controls}
							value={course.what_you_will_learn}
							onChange={(e) =>
								setCourse((prevState) => ({
									...prevState,
									what_you_will_learn: e,
								}))
							}
						/>
					</div> */}
				</div>
				<div className="col-md-6">
					{/* <div className="form-group">
						<label className="form-label fw-semibold">
							Who Is This Course For?
						</label>
						<RichTextEditor
							controls={controls}
							value={course.who_is_this_course_for}
							onChange={(e) =>
								setCourse((prevState) => ({
									...prevState,
									who_is_this_course_for: e,
								}))
							}
						/>
					</div> */}
				</div>

				<div className="col-12">
					<Button
						loading={loading}
						disabled={disabled}
						btnText={btnText || "Create Assignment"}
						btnClass="default-btn"
					/>
				</div>
			</div>
		</form>
	);
};

export default AssignmentCreateForm;
