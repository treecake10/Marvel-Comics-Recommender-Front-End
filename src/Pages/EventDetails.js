import React, { useEffect, useMemo, useReducer } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { checkIfItemLiked } from '../Components/State/Auth/Action';
import {
    fetchEventById,
    fetchEventByName,
    fetchSeriesByEventId,
    fetchComicsByEventId,
    fetchCharactersByEventId,
    fetchCreatorsByEventId
} from '../libs/utils';
import ConcurrentDataFetcher from '../Components/DataTools/ConcurrentDataFetcher';
import DataList from "../Components/DataList";
import Like from "../Components/Icons/Like";
import Favorite from "../Components/Icons/Favorite";

// Action types
const SET_LIST = 'SET_LIST';
const SET_LOADING = 'SET_LOADING';

const initialState = {
    prevEvent: [],
    nextEvent: [],
    series: null,
    comics: null,
    creators: null,
    characters: null,
    loadings: {
        prevEvent: false,
        nextEvent: false,
        series: false,
        comics: false,
        creators: false,
        characters: false,
    },
};

// Used to avoid managing seperate state variables for loading and data of comics, characters, events, creators, and series
const reducer = (state, action) => {
    switch (action.type) {
        case SET_LIST:
        return { ...state, [action.listType]: action.result };
        case SET_LOADING:
        return { ...state, loadings: { ...state.loadings, [action.listType]: action.value } };
        default:
        return state;
    }
};

const EventDetails = ({ isAuthenticated }) => {
    const { id } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { series, comics, creators, characters, prevEvent, nextEvent, loadings } = state;

    const jwt = localStorage.getItem("jwt");
    const dispatchCheckLikedItem = useDispatch();
    const isLiked = useSelector(state => state.auth.isLiked);

    useEffect(() => {
        const fetchEventDetails = async () => {
            dispatch({ type: SET_LIST, listType: 'event', result: null });
            dispatch({ type: SET_LIST, listType: 'prevEvent', result: [] });
            dispatch({ type: SET_LIST, listType: 'nextEvent', result: [] });
    
            dispatch({ type: SET_LOADING, listType: 'prevEvent', value: true });
            dispatch({ type: SET_LOADING, listType: 'nextEvent', value: true });
    
            try {
                const eventData = await fetchEventById(id);
                
                dispatch({ type: SET_LIST, listType: 'event', result: eventData[0] });
                if (eventData[0].previous && eventData[0].next) {
                    const prevEvent = eventData[0].previous;
                    const nextEvent = eventData[0].next;
    
                    const prevEventData = await fetchEventByName(prevEvent.name);
                    const nextEventData = await fetchEventByName(nextEvent.name);
    
                    dispatch({ type: SET_LIST, listType: 'prevEvent', result: prevEventData });
                    dispatch({ type: SET_LIST, listType: 'nextEvent', result: nextEventData });
                }
            } catch (error) {
                console.error(error);
            } finally {
                dispatch({ type: SET_LOADING, listType: 'prevEvent', value: false });
                dispatch({ type: SET_LOADING, listType: 'nextEvent', value: false });
            }
        };
    
        fetchEventDetails();
    }, [id]);
    
    const fetchListData = async (fetchFunction, listType, availability) => {

        dispatch({ type: SET_LOADING, listType, value: true });

        try {
            if (availability) {
                const result = await ConcurrentDataFetcher(fetchFunction, id, availability);
                dispatch({ type: SET_LIST, listType, result });
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: SET_LOADING, listType, value: false });
        }
    };

    useEffect(() => {

       dispatchCheckLikedItem(checkIfItemLiked(id, 'event', jwt));
    
    }, [dispatchCheckLikedItem, id, jwt])

    useEffect(() => {
        if (state.event) {
            const { series, comics, characters, creators } = state.event;
            fetchListData(fetchSeriesByEventId, 'series', series?.available);
            fetchListData(fetchComicsByEventId, 'comics', comics?.available);
            fetchListData(fetchCharactersByEventId, 'characters', characters?.available);
            fetchListData(fetchCreatorsByEventId, 'creators', creators?.available);
        }
    }, [state.event]);

    // Memoize the reversedComics array to avoid recomputing it on each render
    const memoizedSeries = useMemo(() => series, [series]);
    const reversedComics = useMemo(() => (comics ? [...comics].reverse() : null), [comics]);
    const memoizedCreators = useMemo(() => creators, [creators]);
    const memoizedCharacters = useMemo(() => characters, [characters]);

    if (!state.event) return null;

    const { title, thumbnail, description } = state.event;

    return (
        <div className="home">
            <div className="container large">
                <div className="details-container">
                    <div className="left-side">
                        <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt='character image full size' />
                        <div className="contents">
                            <br />
                            <div className="contents__arrangement">
                                <h1>{title}</h1>
                            </div>
                            <br />
                            <h2>Description</h2>
                            {description ? <p>{description}</p> : <p>Not Found</p>}
                            <br />
                            <DataList array={prevEvent} listName="Previous Event" loading={loadings.prevEvent}/>
                            <br />
                            <DataList array={nextEvent} listName="Next Event" loading={loadings.nextEvent}/>
                            <br />
                            <div className="contents__arrangement">
                                {isAuthenticated ? (
                                    <Like itemId={id} itemType={'event'} itemName={title} likedBool={isLiked}/>
                                ) : (
                                    <Link to="/authentication?type=detailsPage" className="link-style">
                                        <Like />
                                    </Link>
                                )}
                                <div className="middle-column-spacing"></div>
                                <Link to="/authentication?type=detailsPage" className="link-style">
                                    <Favorite />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="column-space"></div>
                        <DataList array={memoizedCreators} listName="Creators" loading={loadings.creators}/>
                        <div className="column-space"></div>
                        <DataList array={memoizedSeries} listName="Series" loading={loadings.series}/>
                        <div className="column-space"></div>
                        <DataList array={reversedComics} listName="Comics" loading={loadings.comics}/>
                        <div className="column-space"></div>
                        <DataList array={memoizedCharacters} listName="Characters" loading={loadings.characters}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;

