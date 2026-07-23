import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-primary to-accent py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Find Help Fast. Get Hired Faster.</h1>
        <p className="text-xl mb-8">Connect with skilled workers instantly</p>
        <a href="/jobs" className="px-8 py-3 bg-white text-primary rounded font-bold">Browse Jobs</a>
      </div>
    </>
  );
};

export default LandingPage;