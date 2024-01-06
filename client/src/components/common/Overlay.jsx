import React, { useRef, useEffect } from "react";

const Overlay = ({ closeFun, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeFun(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFun]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50 overflow-y-scroll"
    >
      <div ref={ref} >{children}</div>
    </div>
  );
};

export default Overlay;
