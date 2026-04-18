import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Core
export const getSiteSettings = () => api.get('/settings/');
export const getTestimonials = () => api.get('/testimonials/');
export const getGallery = (category) => api.get('/gallery/', { params: category ? { category } : {} });
export const subscribeNewsletter = (email) => api.post('/newsletter/', { email });

// Products
export const getCategories = () => api.get('/products/categories/');
export const getCategoryBySlug = (slug) => api.get(`/products/categories/${slug}/`);
export const getProducts = (params = {}) => api.get('/products/', { params });
export const getProductBySlug = (slug) => api.get(`/products/${slug}/`);
export const getFeaturedProducts = () => api.get('/products/', { params: { is_featured: true } });

// Workshops
export const getWorkshops = (params = {}) => api.get('/workshops/list/', { params });
export const bookWorkshop = (data) => api.post('/workshops/bookings/', data);

// Tuition
export const getSubjects = () => api.get('/tuition/subjects/');
export const getTeachers = (params = {}) => api.get('/tuition/teachers/', { params });
export const getTeacherById = (id) => api.get(`/tuition/teachers/${id}/`);
export const applyTuition = (data) => api.post('/tuition/apply/', data);
export const registerTeacher = (data) => api.post('/tuition/register-teacher/', data);

// Enquiries
export const submitEnquiry = (data) => api.post('/enquiries/enquiry/', data);
export const submitSchoolInquiry = (data) => api.post('/enquiries/school-inquiry/', data);

export default api;
