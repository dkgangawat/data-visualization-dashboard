import { MdOutlineDataUsage } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import IconButton from "../IconButton";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../Store/slices/UiSlice";
import { CiFileOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { TfiDashboard } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const SideBar = () => {
  const dispatch = useDispatch();

  const links = [
    { name: "Dashboard", icon: <TfiDashboard />, to: "/" },
    { name: "Data", icon: <CiFileOn />, to: "/data" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <>
      <div className="  w-full h-full bg-white p-4  cursor-pointer ">
        <div className=" text-blue-950 select-none flex items-center justify-between ">
          <div className=" flex items-center ">
            <MdOutlineDataUsage className=" text-3xl inline-block m-2" />
            <span className="">Admin</span>
          </div>
          <div className="md:hidden">
            <IconButton
              onClick={() => {
                dispatch(toggleSideBar(false));
              }}
            >
              <IoMdCloseCircleOutline className=" text-xl text-gray-300 inline-block hover:text-blue-950" />
            </IconButton>
          </div>
        </div>
        <div className=" flex flex-col justify-between h-full">
          {/* links in sidebar with icons and text */}

          <div className=" mt-4 text-gray-500">
            {links.map((link, index) => (
              <Link
                to={link.to}
                key={index}
                className=" flex items-center space-x-2  relative my-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-100 "
              >
                <div className=" text-2xl p-2 font-light">{link.icon}</div>
                <div className=" text-sm">{link.name}</div>
                <IoIosArrowForward className=" absolute right-2 text-gray-300" />
              </Link>
            ))}
          </div>

          {/* logout button */}
          <button
            onClick={handleLogout}
            className=" bg-gray-100 w-full text-gray-500 mb-16 rounded-md py-2 px-4 hover:bg-gray-200 transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
