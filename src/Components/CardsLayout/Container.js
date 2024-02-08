import React from "react";

const Container = ({ children, containerName }) => {
    return <div className={containerName}>{children}</div>;
}
export default Container;