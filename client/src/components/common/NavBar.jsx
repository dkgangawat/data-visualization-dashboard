import { useDispatch } from "react-redux";
import IconButton from "../IconButton";
import { toggleSideBar } from "../../Store/slices/UiSlice";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className=" sticky top-0 px-4 py-2 md:p-4 backdrop-blur-sm bg-[#ffffffc3]  ">
        <div className=" w-full  border rounded-md flex justify-between items-center p-2">
          <div className=" flex items-center">
          <IconButton
            className={"md:hidden"}
            onClick={() => {
              dispatch(toggleSideBar());
            }}
          >
            <HiMenuAlt2 />
          </IconButton>
          <div className=" flex items-center select-none cursor-pointer " >
            <IconButton className="  ">
              <IoIosSearch />
            </IconButton>
            <span className=" text-gray-300 text-xs ">Search</span>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
