import React from "react";

const Slide = ({ id }) => {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        height: "350px",
        border: "1px solid black",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {id}
    </div>
  );
};

export default Slide;
