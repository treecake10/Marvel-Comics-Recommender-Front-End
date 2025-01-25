import React, { useEffect, useState } from "react";
import DropdownScroll from "../../Components/DropdownScroll";
import "../../App.css";
import "./Recommend.css";

import { getBookmarkedItems } from '../../Components/State/Auth/Action';

const Recommend = () => {
    const jwt = localStorage.getItem("jwt");
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookmarkedItems = async () => {
            if (jwt) {
                setIsLoading(true);
                try {
                    const response = await getBookmarkedItems(jwt); // Assuming `getBookmarkedItems` returns a Promise
                    setBookmarkedItems(response);
                } catch (err) {
                    setError(err.message || "Failed to fetch bookmarked items");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchBookmarkedItems();
    }, [jwt]); // Only depend on `jwt`, not `bookmarkedItems`.

    console.log(bookmarkedItems);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home-recommend">
            <br />
            <br />
            <DropdownScroll options={bookmarkedItems}/>
        </div>
    );
};

export default Recommend;
