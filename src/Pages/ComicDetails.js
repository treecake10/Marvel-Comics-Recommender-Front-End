import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";
import {
    fetchComicById,
    fetchCharactersByComicId,
    fetchCreatorsByComicId
} from '../libs/utils';
import DataSearchFetcher from "../Components/DataTools/DataSearchFetcher";
import DataList from "../Components/DataList";
import Like from "../Components/Icons/Like";
import Favorite from "../Components/Icons/Favorite";

const ComicDetails = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);

    const [data, setData] = useState({
        events: [],
        characters: [],
        creators: []
    });
    
    const [loading, setLoading] = useState({
        events: false,
        characters: false,
        creators: false
    });

    useEffect(() => {
        const fetchComicDetails = async () => {

            setLoading((prevLoading) => ({ ...prevLoading, ['events']: true }));

            try {
                const comicData = await fetchComicById(id);
                setComic(comicData[0]);
                if (comicData[0].events.items) {
                    setData((prevData) => ({ ...prevData, events: comicData[0].events.items }));
                }
            } catch (error) {
            console.error(error);
            } finally {
                setLoading((prevLoading) => ({ ...prevLoading, ['events']: false }));
            }
        }

        fetchComicDetails();
    }, [id]);

    const fetchListData = async (fetchFunction, listType) => {

        setLoading((prevLoading) => ({ ...prevLoading, [listType]: true }));

        try {
            if (comic && comic[listType]?.available) {
                const result = await memoizedDataSearchFetcher(fetchFunction, id);
                setData((prevData) => ({ ...prevData, [listType]: result }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, [listType]: false }));
        }
    };

    useEffect(() => {
        fetchListData(fetchCreatorsByComicId, 'creators');
        fetchListData(fetchCharactersByComicId, 'characters');
    }, [id, comic]);

    const memoizedDataSearchFetcher = useMemo(() => DataSearchFetcher, []);

    if (!comic) return null;

    const { title, thumbnail, series, description } = comic;

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
                            <h2>Series</h2>
                            <p>{series.name}</p>
                            <br />
                            <h2>Description</h2>
                            {description ? <p>{description}</p> : <p>Not Found</p>}
                            <br />
                            <br />
                            <div className="contents__arrangement">
                                <Like />
                                <div className="middle-column-spacing"></div>
                                <Favorite />
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="column-space"></div>
                        <DataList array={data.characters} listName={"Characters"} loading={loading.characters} />
                        <div className="column-space"></div>
                        <DataList array={data.creators} listName={"Creators"} loading={loading.creators} />
                        <div className="column-space"></div>
                        <DataList array={data.events} listName={"Event"} loading={loading.events} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComicDetails;

