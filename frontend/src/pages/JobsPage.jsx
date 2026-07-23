import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await getJobs();
        setJobs(data.data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">Available Jobs</h1>
          {loading ? <p>Loading...</p> : <div className="grid md:grid-cols-3 gap-6">{jobs.map((job) => <JobCard key={job.id} job={job} />)}</div>}
        </div>
      </div>
    </>
  );
};

export default JobsPage;