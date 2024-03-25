import React from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageNavigation from "@/components/Instructor/PageNavigation";
import { useRouter } from "next/router";
import UploadVideoForm from "@/components/Instructor/UploadVideoForm";
import InstructorSideNav from "pages/instructor/dashboard/intructorsidenav";
const Index = ({ user }) => {
	const router = useRouter();
	const { id: courseId } = router.query;
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
					<PageNavigation
						courseId={courseId}
						activeClassname="upload"
					/>

					<div className="create-course-form">
						<UploadVideoForm courseId={courseId} />
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

export default Index;
