import api from './api';

export const createJob = (jobData) => api.post('/jobs', jobData);
export const getJobs = (filters) => api.get('/jobs', { params: filters });
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const applyForJob = (jobId, offerData) => api.post(`/jobs/${jobId}/apply`, offerData);
export const getMyJobs = () => api.get('/jobs/my-jobs');
export const updateJobStatus = (jobId, status) => api.put(`/jobs/${jobId}/status`, { status });