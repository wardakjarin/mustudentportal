import axios from 'axios';
import { useAuth } from '../context/auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const { authTokens } = useAuth();
    if (authTokens) {
      config.headers['x-auth-token'] = authTokens;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuth();
      logout();
    }
    return Promise.reject(error);
  }
);

export const getDashboardData = () => api.get('/api/students/dashboard');
export const getSemesterResults = (semester) => api.get(`/api/students/results/${semester}`);
export const getCourseDetails = (courseCode) => api.get(`/api/students/courses/${courseCode}`);
export const getRetakeInfo = () => api.get('/api/students/retakes');
export const getUpcomingCourses = () => api.get('/api/students/upcoming-courses');

export default api;