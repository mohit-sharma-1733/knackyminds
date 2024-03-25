import React from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import CourseCreateForm from "@/components/Instructor/CourseCreateForm";
import InstructorSideNav from "../dashboard/intructorsidenav";
const Create = ({ user }) => {
	return (
		<>
			<Navbar user={user} />
			<div className="main-content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 col-md-4">
						<InstructorSideNav user={user} />
					</div>

					<div className="col-lg-9 col-md-8">
						<div className="main-content-box">
			<div className="ptb-100">
				<div className="container">
					<h2 className="fw-bold mb-4">Create the Course</h2>

					<ul className="nav-style1">
						<li>
							<Link href="/instructor/courses/">
								<a>Courses</a>
							</Link>
						</li>
						<li>
							<Link href="/instructor/course/create/">
								<a className="active">Create a Course</a>
							</Link>
						</li>
						<li>
							<Link href="/instructor/course/create-class/">
								<a>Create Class Room</a>
							</Link>
						</li>
					</ul>

					<div className="create-course-form">
						<CourseCreateForm />
					</div>
				</div>
			</div>
</div>
</div>
</div>
</div>
</div>

			<Footer />
		</>
	);
};

export default Create;
