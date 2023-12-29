import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-6/12 border-slate-600 border-2 rounded-lg my-[5rem] mx-auto px-10 py-20 flex flex-col justify-between">
      <h1 className="text-center font-bold text-4xl">Welcome to Auth</h1>
      <p className="text-center mt-6 mb-4">
        You can login or register if you don't have an account!
      </p>
      <div className="mx-auto mt-5 flex justify-center gap-8 ">
        <Link
          to="/register"
          className="bg-sky-500 rounded-md px-4 py-2 text-white"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-sky-500 rounded-md px-4 py-2 text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
