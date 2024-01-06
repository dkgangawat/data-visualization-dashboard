import { useDispatch, useSelector } from "react-redux";
import { data } from "./api/data";
import Home from "./pages/Dashboard";
import { useState } from "react";
import SideBar from "./components/common/SideBar";
import NavBar from "./components/common/NavBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Data from "./pages/Data";
import { toggleSideBar } from "./Store/slices/UiSlice";

const App = () => {
  const UiInteraction = useSelector((state) => state.UiInteraction);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  const dispatch = useDispatch();
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

      <div className="flex-1 text-black ">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </div>

    </>
  );
};

export default App;
