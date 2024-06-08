import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { fetchCharacterById } from "../libs/utils";
import Like from "../Components/Icons/Like";
import Favorite from "../Components/Icons/Favorite";

const CharacterDetails = ({ isAuthenticated }) => {

    const { id } = useParams();

    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const characterData = await fetchCharacterById(id);
                setCharacter(characterData[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCharacterDetails();

    }, [id]);

    if (!character) return null;

    return (
        <div className="home">
            <div className="container large">
                <div className="details-container">
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt='character image full size' />
                    <div className="contents">
                        <br />
                        <h2>Name</h2>
                        <p>{character.name}</p>
                        <br />
                        <h2>Description</h2>
                        {character.description ? (
                            <p>{character.description}</p>
                        ) : <p>Not Found</p>}
                        <br />
                        <div className="right-side">

                            {isAuthenticated ? (
                                <Like catId={id}/>
                            ) : (
                                <Link to="/authentication?type=detailsPage" className="link-style">
                                    <Like catId={id}/>
                                </Link>
                            )}
                            
                            <div className="middle-column-spacing"></div>


                            {isAuthenticated ? (
                                <Favorite/>
                            ) : (
                                <Link to="/authentication?type=detailsPage" className="link-style">
                                    <Favorite/>
                                </Link>
                            )}
                            
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
