import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const complaintAPI = {
  createComplaint: (data) => api.post('/complaints', data),
  getAllComplaints: () => api.get('/complaints'),
  getUserComplaints: () => api.get('/complaints/user/my-complaints'),
  getComplaint: (id) => api.get(`/complaints/${id}`),
  updateComplaintStatus: (id, data) => api.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => api.delete(`/complaints/${id}`),
};

export const commentAPI = {
  getComments: (complaintId) => api.get(`/complaints/${complaintId}/comments`),
  createComment: (complaintId, data) => api.post(`/complaints/${complaintId}/comments`, data),
  deleteComment: (complaintId, commentId) => api.delete(`/complaints/${complaintId}/comments/${commentId}`),
};

export const communityAPI = {
  getComplaintsByLocation: (location) =>
    api.get('/community/nearby', { params: { location } }),
  getComplaintDetails: (complaintId) =>
    api.get(`/community/${complaintId}`),
  addComment: (complaintId, text) =>
    api.post(`/community/${complaintId}/comment`, { text }),
  deleteComment: (complaintId, commentId) =>
    api.delete(`/community/${complaintId}/comment/${commentId}`),
  toggleLike: (complaintId) =>
    api.post(`/community/${complaintId}/like`),
  uploadEvidenceImage: (complaintId, imageUrl) =>
    api.post(`/community/${complaintId}/evidence`, { imageUrl }),
};

export default api;
