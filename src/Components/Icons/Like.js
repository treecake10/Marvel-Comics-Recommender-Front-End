import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';

const Like = () => {

    const [isLiked, setLiked] = useState(false);

    const handleLikeIconClick = () => {
        setLiked(!isLiked);
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