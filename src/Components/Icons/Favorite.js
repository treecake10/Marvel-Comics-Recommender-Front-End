import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { 
    addToCharacterFavorites, 
    addToEventFavorites, 
    addToCreatorFavorites, 
    addToComicFavorites, 
    unfavoriteItem 
} from '../State/Auth/Action'

const Favorite = ({ itemId, itemType, itemName, actionType, favoritedBool }) => {

    const [isFavorited, setFavorited] = useState(favoritedBool);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const handleFavoriteIconClick = () => {

        setFavorited(!isFavorited);

        if (isFavorited) {

            dispatch(unfavoriteItem({itemId, itemType, actionType, jwt}));
            
        } else {
            switch (itemType) {
                case 'character':
                    dispatch(addToCharacterFavorites({itemId, itemType, itemName, actionType, jwt}));
                    break;
                case 'event':
                    dispatch(addToEventFavorites({itemId, itemType, itemName, actionType, jwt}));
                    break;
                case 'creator':
                    dispatch(addToCreatorFavorites({itemId, itemType, itemName, actionType, jwt}));
                    break;
                case 'comic':
                    dispatch(addToComicFavorites({itemId, itemType, itemName, actionType, jwt}));
                    break;
                default:
                    console.error(`Unknown item type: ${itemType}`);
            }
            
        }
        
        console.log(itemId)
    };

    return(
        <div className="icon-container">
            <div className={`icon-wrapper ${isFavorited ? 'clickedStar' : ''}`} onClick={handleFavoriteIconClick}>
                {isFavorited ? (
                    <FontAwesomeIcon icon={solidStar} />
                ) : (
                    <FontAwesomeIcon icon={faStar} />
                )}
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