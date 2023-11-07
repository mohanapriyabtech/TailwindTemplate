import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../webim/logo.png';

const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    course: Yup.string().required('Course name is required'),
    instructor: Yup.string().required('Instructor is required'),
    cover_image: Yup.string(),
    category_id: Yup.string().required('Category is required'),
});

function CourseCreatePage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [instructors, setInstructors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        course: '',
        cover_image: null,
        category_id: ''
    });

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/mentor/list-mentor`);
                const instructorData = response.data.data;
                setInstructors(instructorData);
            } catch (error) {
                console.error('Error fetching instructor data:', error);
            }
        };

        fetchInstructors();
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/admin/list-category`);
                const categoryData = response.data.data;
                setCategories(categoryData);

            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategory();
    }, [apiUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        formik.setFieldValue('cover_image', file);
    };

    const handleSubmit = async (values) => {
        try {
            const form_data = new FormData();

            form_data.append('description', formik.values.description);
            form_data.append('course', formik.values.course);
            form_data.append('instructor', formik.values.instructor);
            form_data.append('category_id', formik.values.category_id);

            const file_data = new FormData();
            file_data.append('media', formik.values.cover_image);
            file_data.append('service', 'courses');

            const fileResponse = await axios.post(`http://localhost:4000/api/v1/file-upload/upload`, file_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            form_data.append('cover_image', fileResponse.data.data[0].name);

            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:4000/api/v1/admin/create-course`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                formik.resetForm();
                navigate('/mentor-course');
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };

    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <div className="w-full flex-col md:flex-row p-4 md:p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8 w-8" /> 
                        <span style={{ fontSize: '24px',fontWeight: 'bold',color: 'black'}} className="animate-pulse">Xpert</span>
                    </div>
                   
                </div>
            </div>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md bg-white p-8 rounded-md shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 ">Course Create Form</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 mt-10">Course Name</label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400"
                            placeholder="Course name"
                            name="course"
                            value={formik.values.course}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.course && formik.errors.course && (
                            <div className="text-red-600 mt-2">{formik.errors.course}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400"
                            rows="3"
                            placeholder="Enter description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-600 mt-2">{formik.errors.description}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Instructor</label>
                        <select
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400"
                            name="instructor"
                            value={formik.values.instructor}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select an instructor</option>
                            {instructors.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>
                                    {instructor.mentor_name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.instructor && formik.errors.instructor && (
                            <div className="text-red-600 mt-2">{formik.errors.instructor}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Category</label>
                        <select
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400"
                            name="category_id"
                            value={formik.values.category_id}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.category_id && formik.errors.category_id && (
                            <div className="text-red-600 mt-2">{formik.errors.category_id}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Profile Image Upload</label>
                        <input
                            type="file"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400"
                            accept=".png, .jpeg, .jpg, .svg, .gif"
                            name="cover_image"
                            onChange={handleFileChange}
                        />
                        {formik.touched.cover_image && formik.errors.cover_image && (
                            <div className="text-red-600 mt-2">{formik.errors.cover_image}</div>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200"
                            disabled={formik.isSubmitting}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default CourseCreatePage;
