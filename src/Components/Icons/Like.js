import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToLikes } from '../State/Auth/Action'

const Like = ({ catId }) => {

    const [isLiked, setLiked] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")

    const handleLikeIconClick = () => {
        setLiked(!isLiked);
        
        dispatch(addToLikes({categoryId:catId, jwt}))
        console.log(catId)
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