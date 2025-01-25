import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { 
    addToSeriesBookmarks,
    unbookmarkItem
} from '../State/Auth/Action'

const Bookmark = ({ itemId, itemType, itemName, bookmarkedBool }) => {

    const [isBookmarked, setBookmarked] = useState(bookmarkedBool);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const handleBookmarkIconClick = () => {
        
        setBookmarked(!isBookmarked);

        if (isBookmarked) {

            dispatch(unbookmarkItem({itemId, itemType, jwt}));
            
        } else {
            switch (itemType) {
                case 'series':
                    //console.log(itemsList);
                    dispatch(addToSeriesBookmarks({itemId, itemType, itemName, jwt}));
                    break;
                default:
                    console.error(`Unknown item type: ${itemType}`);
            }
            
        }
        
        console.log(itemId)
    };

    return(
        <div className="icon-container">
            <div className={`icon-wrapper ${isBookmarked ? 'clickedBookmark' : ''}`} onClick={handleBookmarkIconClick}>
                {isBookmarked ? (
                    <FontAwesomeIcon icon={solidBookmark} />
                ) : (
                    <FontAwesomeIcon icon={faBookmark} />
                )}
            </div>

            <div className="icon-text">
                {isBookmarked ? (
                    <p>Bookmarked</p>
                ) : (
                    <p>Bookmark</p>
                )}  
            </div>
        </div>       
    )
}
export default Bookmark;