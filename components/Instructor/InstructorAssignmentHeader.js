import React from "react";
import Link from "next/link";

const InstructorAssignmentHeader = () => {
	return (
		<div className="instructor-header ptb-100">
			<div className="container">
				<div className="instructor-header-content box-shadow border rounded-3">
					<div className="row align-items-center">
						<div className="col-md-6">
							<div className="">
								<h4>Jump Into Assignment Creation</h4>
							</div>
						</div>
						<div className="col-md-6">
							<div className="text-end">
								<Link href="/instructor/assignments/create">
									<a className="default-btn">
										<i className="flaticon-user"></i> Create
										Your Assignment <span></span>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InstructorAssignmentHeader;
