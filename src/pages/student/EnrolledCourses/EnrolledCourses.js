import React, { useState, useEffect } from 'react'
import Navbar from '../Dashboard/Sidebar/Sidebar'
import StuCourseCard from './StuCourseCard';
import Button from '@mui/material/Button';
import './EnrolledCourses.css'
import getToken from '../../../services/getToken';
import { getEnrolledCourses } from './../../../services/Apis';
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../../Loading/Loading';

const EnrolledCourses = () => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [profile, setProfile] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    // console.log(enrolledCourses)

    // console.log(courses)
    // console.log(profile)


    const token = getToken('student');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const [EnrolledCourses] = await Promise.all([
                        getEnrolledCourses()
                    ]);
                    setEnrolledCourses(EnrolledCourses);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!token) {
        return <Navigate to="/student/login" />;
    }

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='EC-container stu_background_img'>
            <Navbar />


            <div className='edc_container_enrolled_course'>
                <div className="coverEnrolledCourses">
                    <div className='edu_search_bar stu_margin'>
                        <input
                            className='edu_stu-viewcourses-large-input'
                            type="text"
                            placeholder="Search by course title" />

                        <Button variant="contained">Search</Button>

                    </div>
                    <div className='stu-main-container'>

                        {/* <video src='http://localhost:8000/Campus_Diaries_S1_Ep1.mp4' style={{ margin: "80px" }}> </video> */}

                        {/* <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                height="700"
                controls
                controlsList="nodownload"
            >
                <source src="http://localhost:8000/Campus_Diaries_S1_Ep1.mp4" />
            </video> */}

                        {
                            enrolledCourses && enrolledCourses.map((course, index) => (
                                <StuCourseCard key={index} courseCode={course.courseCode} courseDescription={course.courseDescription} courseTitle={course.courseTitle} instructor={course.instructor} courserating={course.courserating} enrolledStudents={course.enrolledStudents} coursePrice={course.coursePrice} _id={course._id} />
                            ))
                        }


                        {/* <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1" /> */}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default EnrolledCourses
