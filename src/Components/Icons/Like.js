import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { 
    addToCharacterLikes,  
    addToEventLikes, 
    addToCreatorLikes, 
    addToComicLikes, 
    unlikeItem 
} from '../State/Auth/Action'

const Like = ({ itemId, itemType, itemName, actionType, likedBool }) => {

    const [isLiked, setLiked] = useState(likedBool);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const handleLikeIconClick = () => {
        
        setLiked(!isLiked);

        if (isLiked) {

            dispatch(unlikeItem({itemId, itemType, actionType, jwt}));
            
        } else {
            switch (itemType) {
                case 'character':
                    dispatch(addToCharacterLikes({itemId, itemType, itemName, actionType, jwt}));
                    break;
                case 'event':
                    dispatch(addToEventLikes({itemId, itemType, itemName, actionType, jwt}));
                    break;
                case 'creator':
                    dispatch(addToCreatorLikes({itemId, itemType, itemName, actionType, jwt}));
                    break;
                case 'comic':
                    dispatch(addToComicLikes({itemId, itemType, itemName, actionType, jwt}));
                    break;
                default:
                    console.error(`Unknown item type: ${itemType}`);
            }
            
        }
        
        console.log(itemId)
    };

    return(
        <div className="icon-container">
            <div className={`icon-wrapper ${isLiked ? 'clickedHeart' : ''}`} onClick={handleLikeIconClick}>
                {isLiked ? (
                    <FontAwesomeIcon icon={solidHeart} />
                ) : (
                    <FontAwesomeIcon icon={faHeart} />
                )}
            </div>

            <div className="icon-text">
                {isLiked ? (
                    <p>Liked</p>
                ) : (
                    <p>Like</p>
                )}  
            </div>
        </div>       
    )
}
export default Like;