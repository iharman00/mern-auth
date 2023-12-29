import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-16 border-b-2 border-b-black p-5 ">
      <div className="w-10/12 m-auto flex justify-between items-center">
        <Link to="/" className="my-auto">
          <p className="font-bold text-xl">AUTH</p>
        </Link>
        <nav className="flex justify-center items-center gap-4 my-auto">
          <NavLink className="font-medium text-md">Register</NavLink>
          <NavLink className="mr-4 font-medium text-md">Login</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
