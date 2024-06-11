import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToLikes, unlikeItem } from '../State/Auth/Action'

const Like = ({ itemId, itemType, itemName, likedBool }) => {

    const [isLiked, setLiked] = useState(likedBool);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const handleLikeIconClick = () => {
        setLiked(!isLiked);

        if (isLiked) {
            dispatch(unlikeItem({itemId, jwt}))
        } else {
            dispatch(addToLikes({itemId, itemType, itemName, jwt}))
        }
        
        console.log(itemId)
      };

    return(
        <div className="icon-container">
            <div className="icons">
                <div className={`icon-container ${isLiked ? 'clickedHeart' : ''}`} onClick={handleLikeIconClick}>
                    {isLiked ? (
                        <FontAwesomeIcon icon={solidHeart} />
                    ) : (
                        <FontAwesomeIcon icon={faHeart} />
                    )}
                </div>
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