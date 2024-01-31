import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../utils/utils";
import "./CharacterDetails.css";

const CharacterDetails = () => {
    let { id } = useParams();

    const [character, setCharacter] = useState();

    let series;

    useEffect(() => {
        fetchCharacterById(id)
        .then(data => setCharacter(data[0]))
        .catch(err => console.log(err))
    }, []);

    if (character) {
        series = character.series.items;
    }

    if (!character) return
    
    return (
        <div className="home">
            <div className="container large">
                <div className="character__details-container">
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt='character image full size' />
                    <div className="character__details">
                        <h4>Name</h4>
                        <p>{character.name}</p>
                        <br />
                        {character.description ? (
                            <React.Fragment>
                                <h4>Description</h4>
                                <p>{character.description}</p>
                            </React.Fragment>
                        ) : null}
                        <br />
                        <div className='character__series'>
                            <h4>Series</h4>
                            <ul>
                                {series
                                  ? series.map((title) => (
                                        <li key={Math.random() * 1000}>{title.name}</li>
                                    ))
                                  : null}
                            </ul>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterDetails;