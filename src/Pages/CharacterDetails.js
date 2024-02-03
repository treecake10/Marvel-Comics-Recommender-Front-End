import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../utils/utils";
import Like from "../Components/Like";
import Favorite from "../Components/Favorite";
import "./CharacterDetails.css";

const CharacterDetails = () => {

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
                <div className="character__details-container">
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt='character image full size' />
                    <div className="character__details">
                        <br />
                        <h2>Name</h2>
                        <p>{character.name}</p>
                        <br />
                        <h2>Description</h2>
                        {character.description ? (
                            <p>{character.description}</p>
                        ) : <p>Not Found</p>}
                        <br />
                        
                        <div className="character__right">
                            <Like/>
                            <div className="column-spacing"></div>
                            <Favorite/>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
