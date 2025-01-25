import React, { useEffect, useMemo, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkIfItemBookmarked } from '../Components/State/Auth/Action';
import {
  fetchSeriesById,
  fetchComicsBySeriesId,
  fetchCharactersBySeriesId,
  fetchEventsBySeriesId,
  fetchCreatorsBySeriesId,
} from '../libs/utils';
import ConcurrentDataFetcher from '../Components/DataTools/ConcurrentDataFetcher';
import DataList from '../Components/DataList';
import Bookmark from '../Components/Icons/Bookmark';

// Action types
const SET_LIST = 'SET_LIST';
const SET_LOADING = 'SET_LOADING';

const initialState = {
    comics: null,
    characters: null,
    events: null,
    creators: null,
    loadings: {
        comics: false,
        characters: false,
        events: false,
        creators: false,
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

const SeriesDetails = ({ isAuthenticated }) => {

  const { id } = useParams();
  const dispatchCheckItem = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const isBookmarked = useSelector(state => state.auth.isBookmarked);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { comics, characters, events, creators, loadings } = state;
    
  const fetchListData = async (fetchFunction, listType, availability) => {
    try {
      dispatch({ type: SET_LOADING, listType, value: true });

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

    dispatchCheckItem(checkIfItemBookmarked(id, 'series', jwt));

  }, [dispatchCheckItem, id, jwt])

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const seriesData = await fetchSeriesById(id);
        console.log(seriesData[0]);
        dispatch({ type: SET_LIST, listType: 'series', result: seriesData[0] });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  useEffect(() => {
    if (state.series) {
      const { comics, characters, events, creators } = state.series;
      fetchListData(fetchComicsBySeriesId, 'comics', comics?.available);
      fetchListData(fetchCharactersBySeriesId, 'characters', characters?.available);
      fetchListData(fetchCreatorsBySeriesId, 'creators', creators?.available);
      fetchListData(fetchEventsBySeriesId, 'events', events?.available);
    }
  }, [state.series]);

  console.log(characters);

  const charactersArray = useMemo(() => {
    if (!characters) return [];
    return characters.map((ch) => ({
      itemId: ch.id,
      itemType: 'character',
      itemName: ch.name
    }));
  }, [characters]);

  const creatorsArray = useMemo(() => {
    if (!creators) return [];
    return creators.map((cr) => ({
      itemId: cr.id,
      itemType: 'creator',
      firstName: cr.firstName,
      middleName: cr.middleName,
      lastName: cr.lastName
    }));
  }, [creators]);

  const eventsArray = useMemo(() => {
    if (!events) return [];
    return events.map((ev) => ({
      itemId: ev.id,
      itemType: 'event',
      itemName: ev.title
    }));
  }, [events]);

  const otherItemsArray = useMemo(() => {
    return [...charactersArray, ...eventsArray, ...creatorsArray];
  }, [charactersArray, eventsArray, creatorsArray]);

  // Memoize the reversedComics array to avoid recomputing it on each render
  const reversedComics = useMemo(() => (comics ? [...comics].reverse() : null), [comics]);
  const memoizedCreators = useMemo(() => creators, [creators]);
  const memoizedCharacters = useMemo(() => characters, [characters]);
  const memoizedEvents = useMemo(() => events, [events]);

  if (!state.series) return null;

  const { thumbnail, title, description } = state.series;

  console.log('Other items Array:', otherItemsArray);

  return (
    <div className="home">
      <div className="container large">
        <div className="details-container">
          <div className="left-side">
            <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt="character image full size" />
            <div className="contents">
              <br />
              <div className="contents__arrangement">
                <h1>{title}</h1>
              </div>
              <br />
              <h2>Description:</h2>
              {description ? <p>{description}</p> : <p>Not Found</p>}
              <br />
              <div className="contents__arrangement">
                
                {isAuthenticated ? (
                    <Bookmark 
                      itemId={id} 
                      itemType={'series'} 
                      itemName={title} 
                      bookmarkedBool={isBookmarked} 
                    />
                ) : (
                    <Link to="/authentication?type=detailsPage" className="link-style">
                        <Bookmark />
                    </Link>
                )}

                <div className="middle-column-spacing"></div>

              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="column-space"></div>
            <DataList array={reversedComics} listName="Comics" loading={loadings.comics} />
            <div className="column-space"></div>
            <DataList array={memoizedCreators} listName="Creators" loading={loadings.creators} />
            <div className="column-space"></div>
            <DataList array={memoizedCharacters} listName="Characters" loading={loadings.characters} />
            <div className="column-space"></div>
            <DataList array={memoizedEvents} listName="Events" loading={loadings.events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;

