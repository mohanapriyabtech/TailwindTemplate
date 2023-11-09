import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
 
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import PaginationInfo from '../TablePagination';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import logo from '../../webim/logo.png';
import { MailIcon, BellIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
  



const validationSchema = Yup.object().shape({
    description: Yup.string().trim().required('Description is required'),
    course: Yup.string().trim().required('Course name is required'),
    instructor: Yup.string(),
    // profile_image: Yup.string(),
    category_id: Yup.string(),
});


const MentorCourseEditPage = () => {
    const inputRef = useRef(null);
    const [editedItem, setEditedItem] = useState(null);

    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    // course pagination
    const [totalItems, setTotalItems] = useState(0);

    const [selectedCourses, setSelectedCourses] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categorysPerPage = 10;

    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [courseList, setCourseList] = useState([]);


    const [searchAuthorQuery, setSearchAuthorQuery] = useState('');
    const [selectedAuthorCourses, setSelectedAuthorCourses] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [currentAuthorPage, setCurrentAuthorPage] = useState(1);

    const [selectedMentorIds, setSelectedMentorIds] = useState([]);


    // Fetch category data from an API
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/admin/list-category`;


    const fetchCourseList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/mentor/list-course`);
            const courseData = response.data.data;
            setCourseList(courseData);
            setTotalItems(courseData.length)
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    const fetchCategoryList = async () => {
        try {
            const response = await axios.get(apiUrl);
            const categoryData = response.data.data;
            setCategoryList(categoryData);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    const fetchAuthorList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/mentor/list-mentor`);
            const categoryData = response.data.data;
            setAuthorList(categoryData);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    useEffect(() => {
        console.log(currentPage, "current page")
        fetchAuthorList();
        fetchCourseList();
        fetchCategoryList();
    }, []);


    useEffect(() => {
        if (searchQuery) {
            fetchDataWithSearch();
        } else {
            fetchCourseList();
        }
    }, [searchQuery]);


    const fetchDataWithSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/search-category?category=${searchQuery}`,
                { headers }
            );
            setCategoryList(response.data.data);
        } catch (error) {
            console.error('Error searching for categorys:', error);
        }
    };

    useEffect(() => {
        if (searchAuthorQuery) {
            fetchDataWithAuthorSearch();
        } else {
            fetchAuthorList();
        }
    }, [searchAuthorQuery]);

    const fetchDataWithAuthorSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/mentor/search-mentor?mentor=${searchAuthorQuery}`,
                { headers }
            );
            setAuthorList(response.data.data);
        } catch (error) {
            console.error('Error searching for categorys:', error);
        }
    };


    const handleCheckboxChange = (categoryId) => {
        if (selectedCourses.includes(categoryId)) {
            setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse !== categoryId));
        } else {
            setSelectedCourses([...selectedCourses, categoryId]);
        }
    };

    // category pagination

    const indexOfLastCourse = currentPage * categorysPerPage;
    const indexOfFirstCourse = indexOfLastCourse - categorysPerPage;
    const currentCourses = categoryList.slice(indexOfFirstCourse, indexOfLastCourse);

    // author pagination

    const indexOfLastAuthor = currentAuthorPage * categorysPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - categorysPerPage;
    const currentAuthors = authorList.slice(indexOfFirstAuthor, indexOfLastAuthor);



    const nextPage = () => {
        if (indexOfLastCourse < categoryList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextAuthorPage = () => {
        if (indexOfLastAuthor < authorList.length) {
            setCurrentAuthorPage(currentAuthorPage + 1);
        }
    };

    const prevAuthorPage = () => {
        if (currentAuthorPage > 1) {
            setCurrentAuthorPage(currentAuthorPage - 1);
        }
    };


    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [instructors, setInstructors] = useState([]);
    const [instructorSelect, setInstructorSelect] = useState('');

    const [category, setCategory] = useState([]);
    const [categorySelect, setCategorySelect] = useState('');

    let { id } = useParams();

    const initialValues = {
        description: localStorage.getItem('description') || '',
        instructor: localStorage.getItem('instructor') || '',
        course: localStorage.getItem('course') || '',
        category_id: localStorage.getItem('category_id') || '',
        profile_image: null,
    };

    const instructorId = initialValues.instructor;
    const updatedItems = instructors.filter((item) => item._id !== instructorId);

    const categoryId = initialValues.category_id;
    const updatedCategory = category.filter((item) => item._id !== categoryId);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/mentor/list-mentor`);
                const instructorData = response.data.data;
                setInstructors(instructorData);

            } catch (error) {
                console.error('Error fetching instructor data:', error);
            }
        };

        fetchInstructors();
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/list-category`);
                const instructorData = response.data.data;
                setCategory(instructorData);

            } catch (error) {
                console.error('Error fetching instructor data:', error);
            }
        };

        fetchCategory();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('mentor-token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/mentor/get-mentor/${initialValues.instructor}`, { headers })
            .then((response) => {
                const data = response.data.data;
                setInstructorSelect(data.mentor_name);

            })
            .catch((error) => {
                console.error('Error fetching instructor data:', error);
            });
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('mentor-token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/admin/get-category/${initialValues.category_id}`, { headers })
            .then((response) => {
                const data = response.data.data;
                setCategorySelect(data.category_name);

            })
            .catch((error) => {
                console.error('Error fetching instructor data:', error);
            });
    }, []);

    const handleSubmit = async (values) => {
        try {
            console.log(instructorSelect, "instructor select")
            const form_data = new FormData();

            if (formik.values.course !== initialValues.course) {
                form_data.append('course', formik.values.course);
            }
            if (formik.values.description !== initialValues.description) {
                form_data.append('description', formik.values.description);
            }
            if (formik.values.instructor !== initialValues.instructor) {
                form_data.append('instructor', formik.values.instructor);
            }

            if (formik.values.category_id !== initialValues.category_id) {
                form_data.append('category_id', formik.values.category_id);
            }

            if (formik.values.profile_image) {
                const file_data = new FormData();
                file_data.append('media', formik.values.profile_image);
                file_data.append('service', 'mentors');

                const fileResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/file-upload/upload`, file_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                form_data.append('profile_image', fileResponse.data.data[0].name);
            } else {
                // profile_image is not edited 
                form_data.append('profile_image', initialValues.profile_image);
            }

            const token = localStorage.getItem('mentor-token');
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/mentor/edit-course/${id}`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                formik.resetForm();
                setModalMessage('Mentor updated successfully!');
                setShowSuccessModal(true);
                setEditedItem(null);
                showToast()
                navigate('/mentor-course');
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };

    const handleFileChange = (e) => {
        formik.setFieldValue('profile_image', e.target.files[0]);
    };
    const [currentCoursePage, setCurrentCoursePage] = useState(1);
    const itemsPerCoursePage = 10;
    const lastCourseIndex = currentCoursePage * itemsPerCoursePage;
    const firstCourseIndex = lastCourseIndex - itemsPerCoursePage;
    const displayedCourses = courseList.slice(firstCourseIndex, lastCourseIndex);

    const fileName = localStorage.getItem('profile_image');
    const token = localStorage.getItem('mentor-token');

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const [notifications, setNotifications] = useState(false)

    const toggleNotifications = () => {
      setNotifications(!notifications)
    }

    //log out function
    const handleLogoutClick = () => {
        localStorage.removeItem('token')
        navigate("/")
    }
    useEffect(() => {
        // Use the ref to focus on the input element
        if (inputRef.current) {
          inputRef.current.focus();
        }
    }, []);


    const showToast = () => {
        toast.success('Courses updated successfully', {
          position: 'top-right',
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }





    return (

        <>
            <div className="w-full flex-col md:flex-row p-4 md:p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8 w-8" /> 
                        <span style={{ fontSize: '24px',fontWeight: 'bold',color: 'black'}} className="animate-pulse">Xpert</span>
                    </div>
                    <div className="flex flex-row justify-end w-full">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border border-gray-300 rounded px-2 py-1 mr-4"
                                value={searchAuthorQuery}
                                onChange={(e) => setSearchAuthorQuery(e.target.value)}
                            />
                            {notifications && (
                                <div className="fixed top-20 right-10 md:right-20 lg:right-20 xl:right-30 z-50">
                                    <div className="bg-white border border-gray-300 shadow-md rounded-lg w-72 md:w-80 p-4">
                                    <h2 className="text-xl font-bold mb-3">Notifications</h2>
                                    <ul className="list-disc pl-4">
                                        <li className="notification text-green-600 mb-2">
                                        <i className="fas fa-check-circle text-xl mr-2"></i>
                                        Notification 1 - This is a success message.
                                        </li>
                                        <li className="notification text-green-600 mb-2">
                                        <i className="fas fa-check-circle text-xl mr-2"></i>
                                        Notification 2 - Operation was successful.
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                )}
                            <button className="text-white bg-green-700 hover-bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick= {handleLogoutClick}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* <div className="w-2/8 p-4 bg-gray-300">
                    <h2 className="text-lg font-semibold mb-3">Category List</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-500 rounded-lg"
                            placeholder="Search Category"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ul>
                        {currentCourses.map((category) => (
                            <li key={category._id} className="flex items-center mb-2 ml-2" style={{ marginLeft: '2rem' }}>
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedCourses.includes(category._id)}
                                    onChange={() => handleCheckboxChange(category._id)}
                                />
                                {category.category_name}
                            </li>
                        ))}
                    </ul>
                    {categoryList.length > categorysPerPage && (
                        <div className="flex justify-end mt-3">
                            {currentPage > 1 && (
                                <button
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={prevPage}
                                    style={{ marginRight: 'auto' }}
                                >
                                    Prev
                                </button>
                            )}
                            <button
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={nextPage}
                                disabled={lastCourseIndex >= courseList.length}
                                style={{ marginLeft: 'auto' }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div> */}


                <div className="w-full p-4 bg-gray-100 ml-10">
                    <h1 className="text-xl mb-4 font-bold">Courses</h1>
                    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="text-gray-700 dark:text-gray-400 block mb-2 font-medium">Course Title</label>
                                <input
                                    className="w-2/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-400"
                                    placeholder="Enter Course Title"
                                    name="course"
                                    value={formik.values.course}
                                    onChange={formik.handleChange}
                                    ref={inputRef} 
                                />
                                {formik.touched.course && formik.errors.course ? (
                                    <div className="text-red-600 mt-2">{formik.errors.course}</div>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-700 dark:text-gray-400 block mb-2 font-medium">Description</label>
                                <textarea
                                    className="w-2/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-400"
                                    rows="3"
                                    placeholder="Enter a description."
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-red-600 mt-2">{formik.errors.description}</div>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400 mb-2 font-medium">Instructor</label>
                                <div className="relative">
                                    <select
                                        className="w-1/4 h-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-purple-400"
                                        name="instructor"
                                        value={formik.values.instructor}
                                        onChange={formik.handleChange}
                                    >
                                        {instructorSelect ? (
                                            <option value={instructorSelect}>{instructorSelect}</option>
                                        ) : (
                                            <option value="">Select an instructor</option>
                                        )}
                                        {updatedItems.map((instructor) => (
                                            <option key={instructor._id} value={instructor._id}>
                                                {instructor.mentor_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {formik.touched.instructor && formik.errors.instructor ? (
                                    <div className="text-red-600 mt-2">{formik.errors.instructor}</div>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400 mb-2 font-medium">Category</label>
                                <div className="relative">
                                    <select
                                        className="w-1/4 h-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-purple-400"
                                        name="category_id"
                                        value={formik.values.category_id}
                                        onChange={formik.handleChange}
                                    >
                                        {categorySelect ? (
                                            <option value={categorySelect}>{categorySelect}</option>
                                        ) : (
                                            <option value="">Select a Category</option>
                                        )}
                                        {updatedCategory.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {formik.touched.category_id && formik.errors.category_id ? (
                                    <div className="text-red-600 mt-2">{formik.errors.category_id}</div>
                                ) : null}
                            </div>




                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400 mb-2 font-medium">Cover Image Upload</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                                        name="profile_image"
                                        onChange={handleFileChange}
                                    />
                                    <div className="py-2 px-4 text-gray-500">
                                        <label className="cursor-pointer text-purple-600 border border-gray-300 rounded-lg px-3 py-2">
                                            Choose File
                                            <input type="file" className="hidden" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" name="profile_image" onChange={handleFileChange} />

                                        </label>
                                        <span> </span>
                                        {formik.values.profile_image ? formik.values.profile_image.name : fileName}
                                    </div>
                                </div>
                                {formik.touched.profile_image && formik.errors.profile_image ? (
                                    <div className="text-red-600">{formik.errors.profile_image}</div>
                                ) : null}
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-50 px-4 py-2 text-sm font-medium text-white transition-transform duration-300 bg-purple-600 border border-transparent rounded-md focus:outline-none focus:ring focus:ring-purple-400 hover:bg-purple-700 transform active:scale-95"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>


        </>
    );
};

export default MentorCourseEditPage;
