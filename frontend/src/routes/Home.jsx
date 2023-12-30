import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full md:w-6/12 max-w-[35rem] border-slate-600 border-2 rounded-lg my-[5rem] mx-auto px-10 py-20 flex flex-col justify-between">
      <h1 className="text-center font-bold text-4xl">Welcome to Auth</h1>
      <p className="text-center mt-6 mb-4">
        Login here or register if you don't have an account!
      </p>
      <div className="mx-auto mt-5 flex justify-center gap-8 ">
        <Link
          to="/register"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center me-2 mt-4 inline-flex items-center"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center me-2 mt-4 inline-flex items-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
