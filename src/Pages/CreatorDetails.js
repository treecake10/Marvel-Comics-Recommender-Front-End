import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchCreatorById, fetchSeriesByCreatorId, fetchEventsByCreatorId } from "../utils/utils";
import ParallelDataFetcher from "../Components/ParallelDataFetcher";
import DataList from "../Components/DataList";
import Like from "../Components/Like";
import Favorite from "../Components/Favorite";
import "./CreatorDetails.css";

const CreatorDetails = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [series, setSeries] = useState([]);
    const [events, setEvents] = useState([]);
    const [loadSeries, setSeriesLoading] = useState(false);
    const [loadEvents, setEventsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creatorData = await fetchCreatorById(id);
                setCreator(creatorData[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    useEffect(() => {
        const fetchListData = async (fetchFunction, listType) => {
            listType === 'events' ? setEventsLoading(true) : setSeriesLoading(true);
            try {
                if (creator && creator[listType]?.available) {
                    const availability = creator[listType].available;
                    const result = await ParallelDataFetcher(fetchFunction, id, availability);
    
                    if (listType === 'events') {
                        setEvents(result);
                    } else {
                        setSeries(result);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                listType === 'events' ? setEventsLoading(false) : setSeriesLoading(false);
            }
        };
    
        fetchListData(fetchEventsByCreatorId, 'events');
        fetchListData(fetchSeriesByCreatorId, 'series');
    
    }, [id, creator]);

    if (!creator) return null;

    const { fullName, thumbnail } = creator;

    return (
        <div className="home">
            <div className="container large">
                <div className="character__details-container">
                    <div className="character__left">
                        <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt='character image full size' />
                        <div className="character__details">
                            <br />
                            <div className="name-container">
                                <h1>{fullName}</h1>
                            </div>
                            <br />
                            <div className="icon-components-creator-container">
                                <Like />
                                <div className="column-spacing"></div>
                                <Favorite />
                            </div>
                        </div>
                    </div>
                    <div className="character__right-creator">
                        <div className="column-space"></div>
                        <DataList array={series} listName={"Series"} loading={loadSeries} />
                        <div className="column-spacing"></div>
                        <DataList array={events} listName={"Events"} loading={loadEvents} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorDetails;
