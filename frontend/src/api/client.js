import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({ baseURL: BASE_URL });

export const getSiteSettings = () => api.get('/settings/');
export const getCertifications = () => api.get('/certifications/');
export const getDivisions = () => api.get('/divisions/');
export const getDivision = (slug) => api.get(`/divisions/${slug}/`);
export const getProducts = (division = '') =>
  api.get('/products/', { params: division ? { division } : {} });
export const getNews = () => api.get('/news/');
export const getJobs = () => api.get('/jobs/');
export const getStats = () => api.get('/stats/');
export const getGallery = () => api.get('/gallery/');
export const submitContact = (data) => api.post('/contact/', data);
