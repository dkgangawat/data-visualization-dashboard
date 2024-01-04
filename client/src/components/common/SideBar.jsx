import { MdOutlineDataUsage } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import IconButton from "../IconButton";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../Store/slices/UiSlice";
const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="  w-full h-full bg-white p-4  cursor-pointer">
        <div className=" text-blue-950 select-none flex items-center justify-between ">
          <div className=" ">
            <MdOutlineDataUsage className=" text-3xl inline-block" />
            <span className="">Dashboard</span>
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
      </div>
    </>
  );
};

export default SideBar;
