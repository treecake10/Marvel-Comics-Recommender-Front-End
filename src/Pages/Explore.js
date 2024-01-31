import { useState, useRef } from "react";
import React from "react";
import { fetchHeroesByName, fetchCreatorsByName } from "../utils/utils";
import Header from "../Components/Header";
import Container from "../Components/Container";
import Grid from "../Components/Grid";
import Card from "../Components/Card";
import SearchBar from "../Components/SearchBar";
import "../App.css";
import "./Explore.css";

const IMG_FANTASTIC = "portrait_fantastic";

const Explore = () => {

    const [heroes, setHeroes] = useState([]);
    const [creators, setCreators] = useState([]);
    const [error, setError] = useState();
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };


    let characterCards;
    let creatorCards;

    const handleCharacterClick = async (e, args) => {

        e.preventDefault();

        if (args === "") return;

        try {
            return await fetchHeroesByName(args);
        } catch (err) {
            return err;
        }

    };

    const handleCreatorClick = async (e, args) => {

        e.preventDefault();

        if (args === "") return;

        try {
            return await fetchCreatorsByName(args);
        } catch (err) {
            return err;
        }

    };

    if (heroes) {
        characterCards = heroes.map((hero) => (
            <Card
                name={hero.name}
                key={hero.id}
                id={hero.id}
                thumbnail={`${hero.thumbnail.path}/${IMG_FANTASTIC}.${hero.thumbnail.extension}`}
            />
        )); 
    }

    if (creators) {
        creatorCards = creators.map((creator) => (
            <Card
                name={creator.fullName}
                key={creator.id}
                id={creator.id}
                thumbnail={`${creator.thumbnail.path}/${IMG_FANTASTIC}.${creator.thumbnail.extension}`}
            />
        )); 
    }

    return(
        <div className="home">
            <Header/>
                <br />
                <div className="tabs-container">
                    <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" onClick={() => toggleTab(1)}></input>
                    <label for="tab1" class={toggleState === 1 ? "tabs__label active-tab" : "tabs__label"}>Characters</label>
                    
                    <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" onClick={() => toggleTab(2)}></input>
                    <label for="tab2" class={toggleState === 2 ? "tabs__label active-tab" : "tabs__label"}>Comics</label>

                    <input type="radio" class="tabs__radio" name="tabs-example" id="tab3" onClick={() => toggleTab(3)}></input>
                    <label for="tab3" class={toggleState === 3 ? "tabs__label active-tab" : "tabs__label"}>Series</label>

                    <input type="radio" class="tabs__radio" name="tabs-example" id="tab4" onClick={() => toggleTab(4)}></input>
                    <label for="tab4" class={toggleState === 4 ? "tabs__label active-tab" : "tabs__label"}>Events</label>

                    <input type="radio" class="tabs__radio" name="tabs-example" id="tab5" onClick={() => toggleTab(5)}></input>
                    <label for="tab5" class={toggleState === 5 ? "tabs__label active-tab" : "tabs__label"}>Creators</label>
                   
                </div>

                <div class={toggleState === 1 ? "tabs__content" : null}>
                    {toggleState == 1 && ( 
                        <SearchBar
                        handleClick={handleCharacterClick}
                        placeholder={"Search hero..."}
                        setResults={setHeroes}
                        setError={setError}
                        />
                    )}
                   
                   {toggleState == 1 && ( 
                        <Container>
                        <Grid>
                            {characterCards ? characterCards : null}
                        </Grid>
                        </Container>
                   )}
                   
                    
                </div>

                <div class={toggleState === 5 ? "tabs__content" : null}>
                    {toggleState == 5 && ( 
                        <SearchBar
                            handleClick={handleCreatorClick}
                            placeholder={"Search Creator..."}
                            setResults={setCreators}
                            setError={setError}
                        />
                    )}


                    {toggleState == 5 && ( 
                        <Container>
                        <Grid>
                            {creatorCards ? creatorCards : null}
                        </Grid>
                        </Container>
                    )}
                </div>
        </div>
    )
}
export default Explore;