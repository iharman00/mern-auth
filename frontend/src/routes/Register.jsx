import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { registerUser } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await dispatch(
        registerUser({
          name,
          email,
          password,
        })
      ).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (rejectedResponse) {
      toast.error(rejectedResponse.message);
    }
  };

  const formInputs = [
    {
      type: "text",
      id: "name",
      value: name,
      autoComplete: "name",
      setValue: setName,
      label: "Name",
    },
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
      autoComplete: "new-password",
      setValue: setPassword,
      label: "Password",
    },
    {
      type: "password",
      id: "confirmPassword",
      value: confirmPassword,
      autoComplete: "new-password",
      setValue: setConfirmPassword,
      label: "Confirm password",
    },
  ];

  return (
    <div className="w-5/12 border-slate-600 border-2 rounded-lg my-[4rem] mx-auto pt-14 pb-10">
      <div className="w-10/12 mx-auto">
        <h1 className="text-slate-800 font-bold text-4xl">Register</h1>
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
                  onChange={(e) => input.setValue(e.target.value)}
                  className="border-slate-400 focus:border-slate-700 text-md text-slate-700 focus:text-slate-800 border-2 rounded-md px-4 py-2 w-full block"
                />
              </div>
            );
          })}
          <p className="mt-6 block">
            Already have an account?
            <Link to="/login" className="ml-1 text-sky-500 hover:underline">
              Log In
            </Link>
          </p>

          <button className="bg-sky-500 rounded-md px-4 py-2 text-white mt-4 block">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
