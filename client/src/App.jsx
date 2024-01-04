import { data } from "./api/data";
import Home from "./pages/Home";

const App = () => {
  let uniqueRegion = data.map((item) => item.topic);
  uniqueRegion = [...new Set(uniqueRegion)];
  console.log(uniqueRegion);
  return (
    <>
      <Home />

    </>
  );
};

export default App;
