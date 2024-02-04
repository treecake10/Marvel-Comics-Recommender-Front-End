import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';

const Favorite = () => {

    const [isFavorited, setFavorite] = useState(false);

    const handleFavoriteIconClick = () => {
        setFavorite(!isFavorited);
      };

    return(
        <div className="icon-container">

            <div className="icons">
                <div className={`icon-container ${isFavorited ? 'clickedStar' : ''}`} onClick={handleFavoriteIconClick}>
                    {isFavorited ? (
                        <FontAwesomeIcon icon={solidStar} />
                    ) : (
                        <FontAwesomeIcon icon={faStar} />
                    )}
                </div>
            </div>

            <div className="icon-text">
                {isFavorited ? (
                    <p>Favorited</p>
                ) : (
                    <p>Favorite</p>
                )}  
            </div>
        </div>    
    )
}
export default Favorite;