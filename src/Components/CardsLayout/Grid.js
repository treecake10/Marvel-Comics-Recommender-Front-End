import React from "react";

const Grid = ({ children, gridName }) => {
    return <div className={gridName}>{children}</div>;
}
export default Grid;