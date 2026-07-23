const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-secondary mb-2">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{job.category}</p>
      <p className="text-primary font-bold">N{job.budget}</p>
      <button className="w-full bg-primary text-white py-2 rounded mt-2">Apply</button>
    </div>
  );
};

export default JobCard;