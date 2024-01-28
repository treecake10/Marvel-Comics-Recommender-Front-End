import { useState, useRef } from "react";
import React from "react";
import { fetchHeroesByName } from "../utils/utils";
import Header from "./Header";
import Container from "./Container";
import Grid from "./Grid";
import Card from "./Card";
import SearchBar from "./SearchBar";
import "../App.css";
import "./Explore.css";

const IMG_FANTASTIC = "portrait_fantastic";

const Explore = () => {

    const [heroes, setHeroes] = useState([]);
    const [error, setError] = useState();

    let cards;

    const handleClick = async (e, args) => {

        e.preventDefault();

        if (args === "") return;

        try {
            let data = await fetchHeroesByName(args);
            setHeroes(data);
        } catch (err) {
            return err;
        }

    };

    if (heroes) {
        cards = heroes.map((hero) => (
            <Card
                name={hero.name}
                key={hero.id}
                id={hero.id}
                thumbnail={`${hero.thumbnail.path}/${IMG_FANTASTIC}.${hero.thumbnail.extension}`}
            />
        )); 
    }

    return(
        <div className="home">
            <Header/>
            <div className="exp-component">
                <div className="search-container">
                <SearchBar
                    handleClick={handleClick}
                    setHeroes={setHeroes}
                    setError={setError}
                />
                </div>
                <Container>
                <Grid>
                    {cards ? cards : null}
                </Grid>
                </Container>
            </div>
        </div>
    )
}
export default Explore;