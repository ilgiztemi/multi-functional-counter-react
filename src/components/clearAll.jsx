import React from "react";

const ClearAll = ({ counters, onDeleteAll }) => {
  return (
    <div>
      <button style={{ marginTop: "20px" }} onClick={onDeleteAll}>
        DELETE ALL
      </button>
    </div>
  );
};

export default ClearAll;
