import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logoutUser, logout } from "../features/user/userSlice";
import { FaArrowRightToBracket, FaAngleDown } from "react-icons/fa6";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  let userName = useSelector((state) => state.user.userInfo?.name);
  userName = userName?.split(" ")[0];

  const [showDropDown, setShowDropDown] = useState(false);
  const toggleDropDown = () => {
    setShowDropDown((showDropDown) => !showDropDown);
  };

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser()).unwrap();
      dispatch(logout());
      toast.success(res.message);
    } catch (rejectedResponse) {
      toast.error(rejectedResponse.message);
    }
  };

  return (
    <header className="w-full h-16 border-b-2 border-b-black p-5 ">
      <div className="w-8/12 mx-auto flex justify-between items-center">
        <Link to="/">
          <p className="font-bold text-xl">AUTH</p>
        </Link>
        <nav className="flex justify-center items-center gap-8">
          {userName ? (
            <div className="relative">
              <button
                className="flex gap-2 items-center"
                onClick={toggleDropDown}
              >
                {userName}
                <FaAngleDown />
              </button>
              {showDropDown && (
                <div className="absolute top-8 right-[-2rem] w-[140%] bg-slate-800 flex flex-col border-2 rounded-lg overflow-hidden transition-all">
                  <Link
                    to="/profile"
                    className="text-white hover:bg-slate-700 transition-colors py-2.5 px-3"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-slate-700 transition-colors py-2.5 px-3 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/register"
                className="font-medium text-md flex items-center gap-2 hover:scale-110 transition-transform"
                style={({ isActive }) => {
                  return {
                    display: isActive && "none",
                  };
                }}
              >
                <FaArrowRightToBracket />
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="mr-4 font-medium text-md flex items-center gap-2 hover:scale-110 transition-transform"
                style={({ isActive }) => {
                  return {
                    display: isActive && "none",
                  };
                }}
              >
                <FaArrowRightToBracket />
                Login
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
