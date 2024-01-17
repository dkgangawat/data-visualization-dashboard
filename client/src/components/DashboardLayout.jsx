import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {  useNavigate, } from "react-router-dom";
import SideBar from "./common/SideBar";
import { toggleSideBar } from "../Store/slices/UiSlice";
import NavBar from "./common/NavBar";
import { setLoggedIn } from "../Store/slices/UserSlice";
import Cookies from "js-cookie";

const DashboardLayout = ({ children }) => {
  const UiInteraction = useSelector((state) => state.UiInteraction);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      if (!user.loggedIn) {
        dispatch(setLoggedIn());
      } 
    }else{
      navigate("/login")
    }
  }, [user]);
  return (
    <>
      <div className="flex">
        {(UiInteraction.isSideBarOpen || windowWidth > 768) && (
          <div className=" flex flex-wrap w-screen md:w-[256px] fixed md:sticky h-screen top-0 z-50  ">
            <div className="border h-screen w-[256px]  ">
              <SideBar />
            </div>
            <div
              className=" bg-[#0009] flex-1 h-screen "
              onClick={() => {
                dispatch(toggleSideBar(false));
              }}
            ></div>
          </div>
        )}

        <div className="flex-1 text-black overflow-y-hidden">
          <NavBar />
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
