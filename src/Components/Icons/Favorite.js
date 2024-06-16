import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { 
    addToCharacterFavorites, 
    addToSeriesFavorites, 
    addToEventFavorites, 
    addToCreatorFavorites, 
    addToComicFavorites, 
    unfavoriteItem 
} from '../State/Auth/Action'

const Favorite = ({ itemId, itemType, itemName, favoritedBool }) => {

    const [isFavorited, setFavorited] = useState(favoritedBool);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const handleFavoriteIconClick = () => {

        setFavorited(!isFavorited);

        if (isFavorited) {

            dispatch(unfavoriteItem({itemId, itemType, jwt}));
            
        } else {
            switch (itemType) {
                case 'character':
                    dispatch(addToCharacterFavorites({itemId, itemType, itemName, jwt}));
                    break;
                case 'series':
                    dispatch(addToSeriesFavorites({itemId, itemType, itemName, jwt}));
                case 'event':
                    dispatch(addToEventFavorites({itemId, itemType, itemName, jwt}));
                case 'creator':
                    dispatch(addToCreatorFavorites({itemId, itemType, itemName, jwt}));
                case 'comic':
                    dispatch(addToComicFavorites({itemId, itemType, itemName, jwt}));
                default:
                    console.error(`Unknown item type: ${itemType}`);
            }
            
        }
        
        console.log(itemId)
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