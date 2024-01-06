import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLoginUserMutation } from "../features/user/userApiSlice";
import { setCredentials } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const formInputs = [
    {
      type: "email",
      id: "email",
      value: email,
      autoComplete: "email",
      setValue: setEmail,
      label: "Email",
    },
    {
      type: "password",
      id: "password",
      value: password,
      autoComplete: "current-password",
      setValue: setPassword,
      label: "Password",
    },
  ];

  return (
    <div className="w-full md:w-5/12 max-w-[35rem] border-slate-600 border-2 rounded-lg my-8 md:my-[4rem] mx-auto px-6 pt-14 pb-10">
      <div className="w-full md:w-10/12 mx-auto">
        <h1 className="text-slate-800 font-bold text-4xl">Login</h1>
        <form onSubmit={submitHandler} className="mt-8">
          {formInputs.map((input) => {
            return (
              <div className="w-full mb-3 flex flex-col gap-2" key={input.id}>
                <label
                  htmlFor={input.id}
                  className="text-slate-800 text-md block"
                >
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.id}
                  value={input.value}
                  autoComplete={input.autoComplete}
                  required
                  onChange={(e) => input.setValue(e.target.value)}
                  className="border-slate-400 focus:border-slate-700 text-md text-slate-700 focus:text-slate-800 border-2 rounded-md px-4 py-2 w-full block"
                />
              </div>
            );
          })}
          <p className="mt-6 block">
            Don't have an account?
            <Link to="/register" className="ml-1 text-blue-700 hover:underline">
              Register
            </Link>
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center me-2 mt-4 inline-flex items-center"
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
