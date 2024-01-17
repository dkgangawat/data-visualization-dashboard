import React, {  useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/slices/UserSlice";
import {
  MdOutlineAlternateEmail,
  MdLockOutline,
  MdOutlineDataUsage,
} from "react-icons/md";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const loginButton = useRef(null);
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      const userData = {
        username: email,
        password,
      };
      const response = await dispatch(loginUser(userData));
      if (response.payload?.success === true) {
        setPasswordIncorrect(false)
        navigate("/");
      }else{
        setPasswordIncorrect(true)
      }
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center h-screen  text-gray login  p-10">
        <div className=" flex items-center text-blue-950 absolute top-3 left-3 select-none">
          <MdOutlineDataUsage className=" text-3xl md:text-[40px] inline-block m-2" />
          <span className=" font-semibold md:text-xl">Admin</span>
        </div>
        <div className=" border border-gray rounded-lg shadow-lg py-4 ">
          <h1 className=" text-center font-bold text-gray-500 text-2xl py-4  ">
            Login
          </h1>
          {passwordIncorrect && (
            <div className=" text-center text-red-600 text-xs italic">
              username or password is incorrect
            </div>
          )}
          <form className=" flex flex-col gap-4 p-5" onSubmit={loginHandler}>
            <label className=" text-sm text-gray-400 tracking-wider">
              Email
            </label>
            <div className=" flex items-center border-b">
              <MdOutlineAlternateEmail className="  text-gray-400 text-lg m-2" />
              <input
                type="text"
                value={email}
                required
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
                className="  rounded-sm  outline-none text-gray-400 tracking-wide"
              ></input>
            </div>

            <label className="text-sm text-gray-400 tracking-wider">
              Password
            </label>
            <div className=" flex items-center border-b">
              <MdLockOutline className="  text-gray-400 text-lg m-2" />
              <input
                type="password"
                value={password}
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="  rounded-sm py-1 px-2 outline-none text-gray-400"
              ></input>
            </div>

            <button
              ref={loginButton}
              type="submit"
              className=" bg-secondary w-fit mx-auto py-1 px-6 bg-blue-900 hover:bg-blue-950 text-white  rounded-md shadow-md font-bold"
            >
              {user.loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className=" absolute bottom-0 left-0 w-full p-4 ">
          <p className=" text-center text-gray-400 text-xs">
            Designed and Developed by
            <a
              href="https://www.linkedin.com/in/deepak-bairwa/"
              target="_b"
              className=" text-blue-950 font-semibold"
            >
              {" "}
              Deepak Bairwa
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
