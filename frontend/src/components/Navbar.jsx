const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-primary">VicB</div>
        <div className="flex gap-4">
          <a href="/login" className="px-4 py-2 text-primary border-2 border-primary rounded">Login</a>
          <a href="/register" className="px-4 py-2 bg-primary text-white rounded">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;