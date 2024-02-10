import { useState } from "react";
import React, { useMemo } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { 
    fetchCharactersByName, 
    fetchCreatorsByName, 
    fetchSeriesByTitle, 
    fetchComicByTitleAndIssue,
    fetchEventByName } 
from "../../libs/utils";
import DataSearchFetcher from "../../Components/DataTools/DataSearchFetcher";
import ConcurrentDataFetcher from "../../Components/DataTools/ConcurrentDataFetcher";
import Container from "../../Components/CardsLayout/Container";
import Grid from "../../Components/CardsLayout/Grid";
import Card from "../../Components/CardsLayout/Card";
import SearchBar from "../../Components/SearchBar";
import "../../App.css";
import "./Explore.css";

const IMG_FANTASTIC = "portrait_fantastic";

const Explore = () => {

    const [characters, setCharacters] = useState([]);
    const [series, setSeries] = useState([]);
    const [creators, setCreators] = useState([]);
    const [comicTitle, setComicTitle] = useState([]);
    const [event, setEvent] = useState([]);
    const [error, setError] = useState();
    const [toggleState, setToggleState] = useState(1);
    const [loading, setLoading] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleCharacterClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await DataSearchFetcher(fetchCharactersByName, args);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeriesClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await ConcurrentDataFetcher(fetchSeriesByTitle, args, true);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCreatorClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await ConcurrentDataFetcher(fetchCreatorsByName, args, true);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleComicsClick = async (e, { title, year, issue }) => {
        e.preventDefault();
        if (title === "" || year === "" || issue === "") {
            alert("Please fill in all the fields.");
            return;
        }
        if (title === "" || year === "" || issue === "") return [];
        try {
            setLoading(true);
            const result = await fetchComicByTitleAndIssue(title, year, issue);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEventClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await DataSearchFetcher(fetchEventByName, args);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const characterCards = useMemo(() => characters && characters.length > 0 ? characters.map(({ id, name, thumbnail }) => (
        <Card
            name={name}
            key={id}
            category={"character"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )) : null, [characters]);
    
    const seriesCards = useMemo(() => series && series.length > 0 ? series.map(({ id, title, thumbnail }) => (
        <Card
            name={title}
            key={id}
            category={"series"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )) : null, [series]);
    
    const creatorCards = useMemo(() => creators && creators.length > 0 ? creators.map(({ id, fullName, thumbnail }) => (
        <Card
            name={fullName}
            key={id}
            category={"creator"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )) : null, [creators]);
    
    const comicCards = useMemo(() => comicTitle && comicTitle.length > 0 ? comicTitle.map(({ id, title, thumbnail }) => (
        <Card
            name={title}
            key={id}
            category={"comic"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )) : null, [comicTitle]);

    const eventCards = useMemo(() => event && event.length > 0 ? event.map(({ id, title, thumbnail }) => (
        <Card
            name={title}
            key={id}
            category={"event"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )) : null, [event]);
    
    return(
        <div className="home">
            <br />
            <div className="tabs-container">
                {[1, 2, 3, 4, 5].map((index) => (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            className="tabs__radio"
                            name="tabs-example"
                            id={`tab${index}`}
                            onClick={() => toggleTab(index)}
                        ></input>
                        <label
                            htmlFor={`tab${index}`}
                            className={
                                toggleState === index ? "tabs__label active-tab" : "tabs__label"
                            }
                        >
                            {index === 1 
                                ? "Characters" 
                                : index === 2 
                                ? "Comics" 
                                : index === 3 
                                ? "Series" 
                                : index === 4 
                                ? "Events" 
                                : index === 5 
                                ? "Creators"
                                : null
                            }
                        </label>
                    </React.Fragment>
                ))}
            </div>

            <div className={toggleState === 1 ? "tabs__content" : null}>
                {toggleState === 1 && ( 
                    <React.Fragment>
                        <SearchBar
                            handleClick={handleCharacterClick}
                            placeholder1={"Search character or team..."}
                            setResults={setCharacters}
                            setError={setError}
                        />

                        <Container containerName={loading ? "center-loading" : "container-component characters-or-creators"}>
                            <Grid gridName={"grid-component"}>
                            
                                {loading ? (
                                    <div className="loading-container">
                                        <ClipLoader
                                            color={'#F0131E'}
                                            loading={loading}
                                            size={50}
                                            aria-label="Loading Grid"
                                            data-testid="loader"
                                        />
                                    </div>
                                ) : (
                                    characterCards
                                )}

                            </Grid>
                        </Container>
                    </React.Fragment>
                )}  
            </div>

            <div className={toggleState === 2 ? "tabs__content" : null}>
                {toggleState === 2 && ( 
                    <React.Fragment>
                        <SearchBar
                            handleClick={handleComicsClick}
                            comicSearch={true}
                            placeholder1={"Title name"}
                            placeholder2={"Start year"}
                            placeholder3={"Issue #"}
                            setResults={setComicTitle}
                            setError={setError}
                        />

                        <Container containerName={loading ? "center-loading" : "container-component comics-or-events"}>
                            <Grid gridName={"grid-component"}>
                                {loading ? (
                                    <div className="loading-container">
                                        <ClipLoader
                                            color={'#F0131E'}
                                            loading={loading}
                                            size={50}
                                            aria-label="Loading Grid"
                                            data-testid="loader"
                                        />
                                    </div>
                                ) : (
                                    comicCards
                                )} 
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}  
            </div>

            <div className={toggleState === 3 ? "tabs__content" : null}>
                {toggleState === 3 && ( 
                    <React.Fragment>
                        <p className="creator-paragraph">Enter full name of title for fastest/most accurate results:</p>
                        <SearchBar
                            handleClick={handleSeriesClick}
                            placeholder1={"Search title or series..."}
                            setResults={setSeries}
                            setError={setError}
                        />

                        <Container containerName={loading ? "center-loading" : "container-component series"}>
                            <Grid gridName={"grid-component"}>
                                {loading ? (
                                    <div className="loading-container">
                                        <ClipLoader
                                            color={'#F0131E'}
                                            loading={loading}
                                            size={50}
                                            aria-label="Loading Grid"
                                            data-testid="loader"
                                        />
                                    </div>
                                ) : (
                                    seriesCards
                                )}
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}  
            </div>

            <div className={toggleState === 4 ? "tabs__content" : null}>
                {toggleState === 4 && ( 
                    <React.Fragment>
                        {/* <p className="creator-paragraph">Enter the complete name of the title to find a comic series:</p> */}
                        <SearchBar
                            handleClick={handleEventClick}
                            placeholder1={"Search event..."}
                            setResults={setEvent}
                            setError={setError}
                        />

                        <Container containerName={loading ? "center-loading" : "container-component comics-or-events"}>
                            <Grid gridName={"grid-component"}>
                                {loading ? (
                                    <div className="loading-container">
                                        <ClipLoader
                                            color={'#F0131E'}
                                            loading={loading}
                                            size={50}
                                            aria-label="Loading Grid"
                                            data-testid="loader"
                                        />
                                    </div>
                                ) : (
                                    eventCards
                                )}
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}  
            </div>

            <div className={toggleState === 5 ? "tabs__content" : null}>
                {toggleState === 5 && ( 
                    <React.Fragment>
                        <SearchBar
                            handleClick={handleCreatorClick}
                            placeholder1={"Search creator..."}
                            setResults={setCreators}
                            setError={setError}
                        />
                        <Container containerName={loading ? "center-loading" : "container-component characters-or-creators"}>
                            <Grid gridName={"grid-component"}>
                            {loading ? (
                                <div className="loading-container">
                                    <ClipLoader
                                        color={'#F0131E'}
                                        loading={loading}
                                        size={50}
                                        aria-label="Loading Grid"
                                        data-testid="loader"
                                    />
                                </div>
                            ) : (
                                creatorCards
                            )}
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}
            </div>
            <br />
            <br/>
        </div>
    )
}
export default Explore;



