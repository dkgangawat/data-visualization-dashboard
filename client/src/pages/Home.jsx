import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../Store/slices/UiSlice";
import { useEffect, useState } from "react";
import DataVisualization from "../components/DataVisualization/DataVisualization";

const Home = () => {
  const UiInteraction = useSelector((state) => state.UiInteraction);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API or source
    // For example, using fetch or axios
    fetch("https://codedeep.live/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="flex">
      {(UiInteraction.isSideBarOpen || windowWidth > 768) && (
        <div className=" flex flex-wrap w-screen md:w-[256px] fixed md:sticky h-screen top-0 z-10 md:z-0  ">
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

      <div className="flex-1   text-black ">
        <NavBar />
        {data.length > 0 ? (
          <DataVisualization data={data} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
